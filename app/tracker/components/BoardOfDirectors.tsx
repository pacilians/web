import Iconify from "@components/Iconify";

interface Bod {
  id: string;
  name: string;
  role: string;
}

export default function BoardOfDirectors({ bod }: { bod: Bod[] }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-base-300 px-8 py-5 text-base-content-400">
      <h3 className="mb-2 text-xl font-semibold text-base-content-200">
        Board of Directors
      </h3>
      {bod.map((person) => (
        <div className="mb-2 flex flex-col" key={person.id}>
          <p className="font-bold">
            Name: <span className="font-normal">{person.name}</span>
          </p>
          <p className="font-bold">
            Role: <span className="font-normal">{person.role}</span>
          </p>
        </div>
      ))}

    </div>
  );
}
