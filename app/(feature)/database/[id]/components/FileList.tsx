import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type FileNasabah = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function FileList({ file }: { file: FileNasabah[] }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section>
      <table className="min-w-full overflow-hidden rounded-xl border border-base-300">
        <thead className="border-b border-base-300 bg-base-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
            >
              Created
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
            >
              Modified
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-medium text-base-content-300"
            ></th>
          </tr>
        </thead>
        <tbody>
          {file.map((file) => (
            <tr
              key={file.id}
              className="odd:bg-base-backdrop-200 even:bg-base-200"
              onClick={() => {
                router.push(`${pathname}/${file.id}`);
              }}
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-base-content-200">
                {file.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-base-content-500">
                {file.created_at}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-base-content-500">
                {file.updated_at}
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
