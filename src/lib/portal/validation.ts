import { z } from "zod";
import { PASSWORD_MAX_LENGTH } from "./password";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  // Do not enforce the strength policy on login; only bound the size (protects the hash function).
  password: z.string().min(1).max(PASSWORD_MAX_LENGTH),
});

export const employeeListQuerySchema = z.object({
  q: z.string().trim().max(80).optional(),
  status: z.enum(["ACTIVE", "PROBATION", "ON_LEAVE", "SUSPENDED", "RESIGNED", "TERMINATED"]).optional(),
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});
