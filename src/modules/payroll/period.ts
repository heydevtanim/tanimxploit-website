import { PayrollError } from "./calculate";

export type PayrollState = "DRAFT" | "REVIEW" | "APPROVED" | "PAID" | "LOCKED";

const FORWARD: Record<PayrollState, PayrollState[]> = {
  DRAFT: ["REVIEW"],
  REVIEW: ["DRAFT", "APPROVED"],
  APPROVED: ["REVIEW", "PAID"],
  PAID: ["LOCKED"],
  LOCKED: [],
};

/** Items, components and amounts may be edited only before approval. */
export function isPayrollEditable(state: PayrollState): boolean {
  return state === "DRAFT" || state === "REVIEW";
}

export function assertPayrollEditable(state: PayrollState): void {
  if (!isPayrollEditable(state)) {
    throw new PayrollError(
      "PERIOD_LOCKED",
      "This payroll is approved, paid or locked. Create an approved adjustment instead of editing it.",
    );
  }
}

/**
 * Allowed state changes. Reopening a LOCKED period (LOCKED -> REVIEW) is only possible with the
 * explicit `reopen` flag, which the caller must guard with `payroll.reopen` and a recorded reason.
 */
export function assertPayrollTransition(
  from: PayrollState,
  to: PayrollState,
  options: { reopen?: boolean } = {},
): void {
  if (from === "LOCKED" && to === "REVIEW" && options.reopen) return;
  if (!FORWARD[from].includes(to)) {
    throw new PayrollError("INVALID_TRANSITION", `Payroll cannot move from ${from} to ${to}.`);
  }
}

/** The person who prepared a payroll run should not also approve it (unless explicitly allowed). */
export function assertSeparationOfDuties(preparedById: string, approverId: string, allowSelfApproval = false): void {
  if (!allowSelfApproval && preparedById === approverId) {
    throw new PayrollError("SELF_APPROVAL", "A payroll run must be approved by a different authorized user.");
  }
}
