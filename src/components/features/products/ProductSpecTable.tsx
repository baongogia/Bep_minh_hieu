import type { Product } from "@/types/product";

type ProductSpecTableProps = {
  specifications: Product["specifications"];
};

function isSpecRecord(
  value: Product["specifications"],
): value is Record<string, string | number | boolean | null> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function ProductSpecTable({ specifications }: ProductSpecTableProps) {
  if (
    !isSpecRecord(specifications) ||
    Object.keys(specifications).length === 0
  ) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Thông số kỹ thuật đang được cập nhật.
      </p>
    );
  }

  const entries = Object.entries(specifications);

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value]) => (
            <tr
              key={key}
              className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
            >
              <th className="w-1/3 bg-zinc-50 px-4 py-3 text-left font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {key}
              </th>
              <td className="px-4 py-3 font-mono text-zinc-900 dark:text-zinc-50">
                {value === null ? "—" : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
