import Iconify from "@/Iconify";

interface Nasabah {
  key_person_name: string;
  key_person_dob: string;
  key_person_hp: string;
}

export default function KeyPerson({ nasabah }: { nasabah: Nasabah }) {
  return (
    <div className="group relative basis-1/2 overflow-hidden rounded-xl border border-base-300 px-8 py-5 text-base-content-400">
      <h3 className="mb-2 text-xl font-semibold text-base-content-200">
        Key Person
      </h3>
      <p className="font-bold">
        Name: <span className="font-normal">{nasabah.key_person_name}</span>
      </p>
      <p className="font-bold">
        Date of Birth:{" "}
        <span className="font-normal">{nasabah.key_person_dob}</span>
      </p>
      <p className="font-bold">
        Phone: <span className="font-normal">{nasabah.key_person_hp}</span>
      </p>
      <button className="absolute right-3 top-3 translate-x-[calc(100%+0.75rem)] translate-y-[calc(-100%-0.75rem)] scale-0 rounded-lg border border-base-200 bg-base-100 p-2 transition duration-300 ease-out hover:border-base-300 hover:bg-base-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:shadow-sm">
        <Iconify
          icon="solar:pen-bold-duotone"
          className="text-lg text-base-content-100"
        />
      </button>
    </div>
  );
}
