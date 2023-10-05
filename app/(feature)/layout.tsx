import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="flex h-full grow flex-col">
        <Navbar />
        {children}
      </div>
    </>
  );
}
