"use client"

import { BellIcon } from "@heroicons/react/24/outline"

export function TopBar() {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-end px-6 space-x-4">
      <BellIcon className="h-5 w-5 text-gray-600" />
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
        A
      </div>
      <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
        PRESENTATION
      </button>
    </div>
  )
}
