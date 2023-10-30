import { twMerge } from "tailwind-merge";

export function randomGradient() {
  const stops = [
    "from-pink-500 via-red-500 to-yellow-500",
    "from-green-300 via-blue-500 to-purple-600",
    "from-pink-300 via-purple-300 to-indigo-400",
    "from-green-200 via-green-300 to-blue-500",
    "from-green-200 via-green-400 to-purple-700",
    "from-green-300 via-yellow-300 to-pink-300",
    "from-rose-500 via-red-400 to-red-500",
  ];
  const direction = [
    "bg-gradient-to-t",
    "bg-gradient-to-tr",
    "bg-gradient-to-r",
    "bg-gradient-to-br",
    "bg-gradient-to-b",
    "bg-gradient-to-bl",
    "bg-gradient-to-l",
    "bg-gradient-to-tl",
    "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))]",
    "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))]",
    "bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))]",
    "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]",
    "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]",
    "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]",
    "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]",
    "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]",
  ];

  return twMerge(
    stops[Math.floor(Math.random() * stops.length)],
    direction[Math.floor(Math.random() * direction.length)],
  );
}

export function formatDate(
  isoDateString: string | undefined,
  time?: boolean,
) {
  if (!isoDateString) return "-";

  let date = new Date(isoDateString.slice(0, -1));

  let dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let datePart = date.toLocaleDateString(undefined, dateOptions);

  if (time) {
    let timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let timePart = date.toLocaleTimeString(undefined, timeOptions);

    return `${datePart}, ${timePart}`;
  } else {
    return datePart;
  }
}
