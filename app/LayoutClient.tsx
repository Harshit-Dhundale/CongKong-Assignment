// app/LayoutClient.tsx
"use client"

import { useState } from "react"
import { Sidebar }      from "./components/Sidebar"
import { TopBar }       from "./components/TopBar"
import { ContextPanel } from "./components/ContextPanel"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Sidebar drawer */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-indigo-600
          transform transition-transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto
        `}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col md:pl-0">
        {/* Top bar + hamburger */}
        <header className="flex items-center justify-between border-b bg-white px-4 md:px-6">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen
              ? <XMarkIcon className="h-6 w-6 text-gray-700" />
              : <Bars3Icon className="h-6 w-6 text-gray-700" />}
          </button>
          <TopBar />
        </header>

        {/* Content + ContextPanel */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            {children}

            {/* MOBILE: show context panel below the dashboard */}
            <div className="block lg:hidden mt-8">
              <ContextPanel />
            </div>
          </main>

          {/* DESKTOP: context panel on the right */}
          <aside className="hidden lg:block w-[25%] border-l p-6 overflow-auto">
            <ContextPanel />
          </aside>
        </div>
      </div>
    </>
  )
}
