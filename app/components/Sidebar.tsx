"use client"
import {
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon,
  VideoCameraIcon,
  UsersIcon,
  DocumentChartBarIcon,
  CogIcon,
} from "@heroicons/react/24/outline"

const navigationItems = [
  { name: "Event Management", icon: CalendarIcon, href: "/events" },
  { name: "Real-Time Dashboard", icon: ChartBarIcon, href: "/", active: true },
  { name: "Matching Tracker", icon: UserGroupIcon, href: "/matching" },
  { name: "Meeting Monitoring", icon: VideoCameraIcon, href: "/meetings" },
  { name: "Participant Management", icon: UsersIcon, href: "/participants" },
  { name: "Reports", icon: DocumentChartBarIcon, href: "/reports" },
  { name: "AI Matching Settings", icon: CogIcon, href: "/settings" },
]

export function Sidebar() {
  return (
    <div className="w-[70px] bg-[#1F25FF] flex flex-col items-center py-4 space-y-6">
      {navigationItems.map((item) => (
        <div
          key={item.name}
          className={`flex flex-col items-center space-y-1 p-2 rounded-lg cursor-pointer transition-all hover:brightness-110 ${
            item.active ? "bg-[#4A50FF]" : ""
          }`}
        >
          <item.icon className="h-6 w-6 text-white" />
          <span className="text-xs text-white text-center leading-tight">
            {item.name.split(" ").map((word, i) => (
              <div key={i}>{word}</div>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}
