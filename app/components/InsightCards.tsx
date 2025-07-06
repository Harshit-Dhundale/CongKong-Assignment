"use client"

import { ArrowRightIcon } from "@heroicons/react/24/outline"

const insights = [
  {
    id: 1,
    color: "yellow",
    title: "Surge industry identified",
    description: "Match success rate between ▲ Technology sector participants has increased by 24%",
    ctaText: "View detailed report",
  },
  {
    id: 2,
    color: "yellow",
    title: "Numerous uncompleted profiles",
    description: "24 participants haven't completed their profiles - matches may be inaccurate",
    ctaText: "Send notification",
  },
]

export function InsightCards() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Real-Time Insights</h3>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="bg-white rounded-xl border border-gray-200 p-4 flex">
            <div className={`w-2 bg-${insight.color}-500 rounded-l-lg -m-4 mr-4`}></div>
            <div>
              <div className="font-bold">{insight.title}</div>
              <p className="text-gray-600 text-sm my-2">{insight.description}</p>
              <button className="text-blue-500 font-medium flex items-center">
                {insight.ctaText} <ArrowRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
