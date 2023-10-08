const files = [
  {
    id: 1,
    name: "Document 1",
    timestampModified: "2023-10-10",
    timestampCreated: "2023-10-05",
  },
  {
    id: 2,
    name: "Document 2",
    timestampModified: "2023-10-09",
    timestampCreated: "2023-10-03",
  },
  {
    id: 3,
    name: "Document 3",
    timestampModified: "2023-10-08",
    timestampCreated: "2023-10-01",
  },
  {
    id: 4,
    name: "Document 4",
    timestampModified: "2023-10-07",
    timestampCreated: "2023-10-02",
  },
  {
    id: 5,
    name: "Document 5",
    timestampModified: "2023-10-06",
    timestampCreated: "2023-10-04",
  },
  {
    id: 6,
    name: "Document 6",
    timestampModified: "2023-10-05",
    timestampCreated: "2023-10-06",
  },
  {
    id: 7,
    name: "Document 7",
    timestampModified: "2023-10-04",
    timestampCreated: "2023-10-07",
  },
  {
    id: 8,
    name: "Document 8",
    timestampModified: "2023-10-03",
    timestampCreated: "2023-10-08",
  },
  {
    id: 9,
    name: "Document 9",
    timestampModified: "2023-10-02",
    timestampCreated: "2023-10-09",
  },
  {
    id: 10,
    name: "Document 10",
    timestampModified: "2023-10-01",
    timestampCreated: "2023-10-10",
  },
];

export default function Mandatory() {
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
              Modified
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
            ></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.id}
              className="odd:bg-base-backdrop-200 even:bg-base-200"
            >
              <td>{file.name}</td>
              <td>{file.timestampModified}</td>
              <td>{file.timestampCreated}</td>
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
