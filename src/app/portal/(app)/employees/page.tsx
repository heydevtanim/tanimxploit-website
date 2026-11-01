import type { Metadata } from "next";
import Link from "next/link";
import { EmploymentBadge, PageHeader, titleCase } from "@/components/portal/ui";
import { employeeListQuerySchema } from "@/lib/portal/validation";
import { requirePermission } from "@/modules/auth/guard";
import { listEmployees } from "@/modules/employees/service";

export const metadata: Metadata = { title: "Employees" };

type SearchParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function EmployeesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const user = await requirePermission("employee.view_own", "employee.view_team", "employee.view_directory", "employee.view_all");
  const raw = await searchParams;
  const parsed = employeeListQuerySchema.safeParse({
    q: first(raw.q) || undefined,
    status: first(raw.status) || undefined,
    page: first(raw.page) || undefined,
    pageSize: first(raw.pageSize) || undefined,
  });
  const query = parsed.success ? parsed.data : employeeListQuerySchema.parse({});
  const result = await listEmployees(user, query);

  const href = (page: number) => {
    const sp = new URLSearchParams();
    if (query.q) sp.set("q", query.q);
    if (query.status) sp.set("status", query.status);
    sp.set("page", String(page));
    return `/portal/employees?${sp.toString()}`;
  };

  return (
    <>
      <PageHeader title="Employees" description={`${result.total} record${result.total === 1 ? "" : "s"} you can see.`} />

      <form method="get" className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          name="q"
          defaultValue={query.q ?? ""}
          placeholder="Search name or employee ID"
          aria-label="Search employees"
          maxLength={80}
          className="min-w-64 flex-1 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
        <select
          name="status"
          defaultValue={query.status ?? ""}
          aria-label="Filter by status"
          className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {["ACTIVE", "PROBATION", "ON_LEAVE", "SUSPENDED", "RESIGNED", "TERMINATED"].map((s) => (
            <option key={s} value={s}>
              {titleCase(s)}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-ink-100 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-ink-100 text-sm">
          <thead className="bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th scope="col" className="px-4 py-3">ID</th>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Department</th>
              <th scope="col" className="px-4 py-3">Designation</th>
              <th scope="col" className="px-4 py-3">Work mode</th>
              <th scope="col" className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {result.rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              result.rows.map((e) => (
                <tr key={e.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3 font-mono text-xs text-ink-600">{e.employeeCode}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">
                    <Link href={`/portal/employees/${e.id}`} className="hover:text-brand-700">
                      {e.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{e.department ?? "-"}</td>
                  <td className="px-4 py-3">{e.designation ?? "-"}</td>
                  <td className="px-4 py-3">{titleCase(e.workMode)}</td>
                  <td className="px-4 py-3">
                    <EmploymentBadge status={e.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {result.totalPages > 1 ? (
        <nav aria-label="Pagination" className="mt-4 flex items-center justify-between text-sm">
          <span className="text-ink-500">
            Page {result.page} of {result.totalPages}
          </span>
          <span className="flex gap-2">
            {result.page > 1 ? (
              <Link href={href(result.page - 1)} className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 hover:bg-ink-50">
                Previous
              </Link>
            ) : null}
            {result.page < result.totalPages ? (
              <Link href={href(result.page + 1)} className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 hover:bg-ink-50">
                Next
              </Link>
            ) : null}
          </span>
        </nav>
      ) : null}
    </>
  );
}
