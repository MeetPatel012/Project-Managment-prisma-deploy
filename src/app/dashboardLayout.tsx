"use client";

import Navbar from "@/components/Navbar";
import { useAppSelector } from "./redux";

export default function DashboardLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const isSlidebarCollapsed = useAppSelector(
    (state) => state.global.isSliderCollapsed,
  );

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {sidebar}
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSlidebarCollapsed ? "" : "md:pl-64"
        } `}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}
