/**
 * Payroll calculation (pure, no database). Money is handled in integer minor units (poisha,
 * 1 BDT = 100 poisha) so floating point never touches salary amounts.
 *
 * Deliberately NOT here: automatic deductions from attendance. Company policy and the applicable
 * Bangladesh employment rules must be written down first; until then a deduction only exists as an
 * explicit, APPROVED adjustment. All amounts in tests are illustrations, not policy.
 */

export type PayrollErrorCode =
  | "INVALID_AMOUNT"
  | "UNAPPROVED_ADJUSTMENT"
  | "NEGATIVE_NET"
  | "PERIOD_LOCKED"
  | "INVALID_TRANSITION"
  | "SELF_APPROVAL";

export class PayrollError extends Error {
  readonly code: PayrollErrorCode;
  constructor(code: PayrollErrorCode, message: string) {
    super(message);
    this.name = "PayrollError";
    this.code = code;
  }
}

/** "20000.50" -> 2000050. Accepts at most two decimals; rejects negatives and junk. */
export function toMinor(amount: string | number): number {
  const text = typeof amount === "number" ? String(amount) : amount.trim();
  if (!/^\d{1,13}(\.\d{1,2})?$/.test(text)) {
    throw new PayrollError("INVALID_AMOUNT", `Invalid money amount: ${String(amount)}`);
  }
  const [whole, frac = ""] = text.split(".");
  return Number(whole) * 100 + Number(frac.padEnd(2, "0"));
}

export function formatBdt(minor: number): string {
  const negative = minor < 0;
  const abs = Math.abs(minor);
  const whole = Math.floor(abs / 100).toLocaleString("en-US");
  const frac = String(abs % 100).padStart(2, "0");
  return `${negative ? "-" : ""}৳${whole}.${frac}`;
}

export interface SalaryLine {
  name: string;
  type: "EARNING" | "DEDUCTION";
  amountMinor: number;
}

export interface AdjustmentInput {
  type: "ADDITION" | "DEDUCTION";
  amountMinor: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface PayrollResult {
  grossMinor: number;
  deductionsMinor: number;
  netMinor: number;
  /** Frozen copy stored on the payroll item so history never changes. */
  snapshot: {
    lines: SalaryLine[];
    adjustments: Omit<AdjustmentInput, "status">[];
  };
}

function assertMinor(n: number, label: string): void {
  if (!Number.isSafeInteger(n) || n < 0) {
    throw new PayrollError("INVALID_AMOUNT", `${label} must be a non-negative integer (minor units).`);
  }
}

/**
 * gross = earnings + approved additions
 * deductions = deduction components + approved deductions
 * net = gross - deductions
 * A PENDING or REJECTED adjustment passed in is an error (it must be filtered out earlier), so it can
 * never silently change someone's pay. A negative net is an error that needs human review.
 */
export function calculatePayrollItem(lines: SalaryLine[], adjustments: AdjustmentInput[] = []): PayrollResult {
  let earnings = 0;
  let deductionLines = 0;
  for (const line of lines) {
    assertMinor(line.amountMinor, `Component "${line.name}"`);
    if (line.type === "EARNING") earnings += line.amountMinor;
    else deductionLines += line.amountMinor;
  }

  let additions = 0;
  let adjustmentDeductions = 0;
  for (const adj of adjustments) {
    assertMinor(adj.amountMinor, "Adjustment");
    if (adj.status !== "APPROVED") {
      throw new PayrollError("UNAPPROVED_ADJUSTMENT", "Only approved adjustments may be included in payroll.");
    }
    if (adj.type === "ADDITION") additions += adj.amountMinor;
    else adjustmentDeductions += adj.amountMinor;
  }

  const grossMinor = earnings + additions;
  const deductionsMinor = deductionLines + adjustmentDeductions;
  const netMinor = grossMinor - deductionsMinor;
  if (![grossMinor, deductionsMinor].every(Number.isSafeInteger)) {
    throw new PayrollError("INVALID_AMOUNT", "Amount is too large.");
  }
  if (netMinor < 0) {
    throw new PayrollError("NEGATIVE_NET", "Deductions exceed gross pay. Review before continuing.");
  }

  return {
    grossMinor,
    deductionsMinor,
    netMinor,
    snapshot: {
      lines: lines.map((l) => ({ ...l })),
      adjustments: adjustments.map(({ type, amountMinor, reason }) => ({ type, amountMinor, reason })),
    },
  };
}
