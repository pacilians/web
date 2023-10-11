import NavMenu from "./NavMenu";
import NavTitle from "./NavTitle";
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  return (
    <nav className="flex h-20 shrink-0 items-center justify-between px-10">
      <div className="flex items-center">
        <NavTitle />
      </div>
      <ThemeSelector />
      <NavMenu />
    </nav>
  );
}
