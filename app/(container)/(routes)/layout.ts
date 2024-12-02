import Sidebar from "@/app/(container)/_components/sidebar";
import type { Metadata } from "next";
import Navbar from "../(landing)/_components/navbar";

export const metadata: Metadata = {
  title: "Dashboard | Genius",
  description: "AI SaaS Platform.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full relative flex">
      <div className="hidden min-h-full md:flex md:w-72 md:flex-col md:fixed left-0 top-0 md:inset-y-0">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full min-h-full md:pl-72 ">
        {children}
      </div>
    </div>
  );
}
