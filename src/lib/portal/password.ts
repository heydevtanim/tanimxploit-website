/**
 * Password hashing with scrypt (Node built-in, memory-hard, no native dependency).
 * Stored format: scrypt$N$r$p$<salt b64url>$<hash b64url>
 * Parameters are stored with each hash, so cost can be raised later and old hashes re-hashed on login.
 * To move to Argon2id later, add a new prefix in verifyPassword and rehash on next successful login.
 */
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import type { ScryptOptions } from "node:crypto";

const PARAMS = { N: 2 ** 15, r: 8, p: 1 } as const;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const MAX_N = 2 ** 17; // refuse absurd values read from a tampered record

export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

function derive(password: string, salt: Buffer, N: number, r: number, p: number): Promise<Buffer> {
  const options: ScryptOptions = { N, r, p, maxmem: 256 * N * r };
  return new Promise((resolve, reject) => {
    scryptCallback(password.normalize("NFKC"), salt, KEY_LENGTH, options, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);
  const key = await derive(password, salt, PARAMS.N, PARAMS.r, PARAMS.p);
  return ["scrypt", PARAMS.N, PARAMS.r, PARAMS.p, salt.toString("base64url"), key.toString("base64url")].join("$");
}

interface ParsedHash {
  N: number;
  r: number;
  p: number;
  salt: Buffer;
  key: Buffer;
}

function parseHash(stored: string): ParsedHash | null {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return null;
  const N = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);
  if (![N, r, p].every((n) => Number.isInteger(n) && n > 0)) return null;
  if (N > MAX_N || (N & (N - 1)) !== 0 || r > 32 || p > 4) return null;
  const salt = Buffer.from(parts[4], "base64url");
  const key = Buffer.from(parts[5], "base64url");
  if (salt.length < 8 || key.length !== KEY_LENGTH) return null;
  return { N, r, p, salt, key };
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parsed = parseHash(stored);
  if (!parsed) return false;
  const candidate = await derive(password, parsed.salt, parsed.N, parsed.r, parsed.p);
  return timingSafeEqual(candidate, parsed.key);
}

/** True when a stored hash uses weaker parameters than the current ones. */
export function needsRehash(stored: string): boolean {
  const parsed = parseHash(stored);
  if (!parsed) return true;
  return parsed.N < PARAMS.N || parsed.r < PARAMS.r || parsed.p < PARAMS.p;
}

let dummyHash: Promise<string> | null = null;

/**
 * Spend the same time as a real check when the account does not exist, so response time does not
 * reveal which emails are registered.
 */
export async function burnPasswordCheck(password: string): Promise<void> {
  dummyHash ??= hashPassword(randomBytes(16).toString("hex"));
  await verifyPassword(password, await dummyHash);
}

const COMMON_PASSWORDS = new Set([
  "password1234",
  "123456789012",
  "qwertyuiop12",
  "tanimxploit",
  "tanimxploit123",
  "welcome12345",
  "changeme1234",
  "admin1234567",
]);

/** Returns a list of problems; an empty list means the password is acceptable. */
export function passwordPolicyProblems(password: string, context: { email?: string } = {}): string[] {
  const problems: string[] = [];
  if (password.length < PASSWORD_MIN_LENGTH) problems.push(`Use at least ${PASSWORD_MIN_LENGTH} characters.`);
  if (password.length > PASSWORD_MAX_LENGTH) problems.push(`Use at most ${PASSWORD_MAX_LENGTH} characters.`);
  if (/^(.)\1+$/.test(password)) problems.push("Do not repeat a single character.");
  if (COMMON_PASSWORDS.has(password.toLowerCase())) problems.push("This password is too common.");
  const local = context.email?.split("@")[0]?.toLowerCase();
  if (local && local.length >= 4 && password.toLowerCase().includes(local)) {
    problems.push("Do not include your email name in the password.");
  }
  return problems;
}
