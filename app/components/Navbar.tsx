import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  return (
    <nav className="flex h-20 items-center justify-between pr-10">
      <h3 className="text-3xl font-semibold text-base-content">Home</h3>
      <ThemeSelector />
    </nav>
  );
}
