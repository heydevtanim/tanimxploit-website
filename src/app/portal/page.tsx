import { redirect } from "next/navigation";
import { DEFAULT_LANDING_PATH } from "@/lib/portal/constants";

export default function PortalIndex() {
  redirect(DEFAULT_LANDING_PATH);
}
