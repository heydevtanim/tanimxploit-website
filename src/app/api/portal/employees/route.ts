import { NextResponse, type NextRequest } from "next/server";
import { employeeListQuerySchema } from "@/lib/portal/validation";
import { authorizeApi } from "@/modules/auth/guard";
import { listEmployees } from "@/modules/employees/service";

export const dynamic = "force-dynamic";

/** GET /api/portal/employees?q=&status=&page=&pageSize= - same scope rules as the page. */
export async function GET(request: NextRequest) {
  const auth = await authorizeApi("employee.view_own", "employee.view_team", "employee.view_directory", "employee.view_all");
  if (auth.response) return auth.response;

  const parsed = employeeListQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  const result = await listEmployees(auth.user, parsed.data);
  return NextResponse.json(
    { data: result.rows, meta: { total: result.total, page: result.page, pageSize: result.pageSize, totalPages: result.totalPages } },
    { headers: { "Cache-Control": "no-store" } },
  );
}
