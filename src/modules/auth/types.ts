import type { Actor } from "@/lib/portal/access";

export interface LoginState {
  error: string | null;
}

/** The signed-in user as seen by pages and actions. Extends Actor so access helpers accept it. */
export interface PortalUser extends Actor {
  email: string;
  displayName: string;
  employeeCode: string | null;
  roleKeys: readonly string[];
  roleNames: readonly string[];
  mustChangePassword: boolean;
}
