import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "./components/Sidebar"
import { TopBar } from "./components/TopBar"
import { ContextPanel } from "./components/ContextPanel"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CongKong Matching Dashboard",
  description: "Real-time KPI dashboard for participant matching and meeting management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen bg-gray-50`}>
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
            <ContextPanel />
          </div>
        </div>
      </body>
    </html>
  )
}
