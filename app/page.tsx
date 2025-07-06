import { KPIGrid } from "./components/KPIGrid"
import { ActivityChart } from "./components/ActivityChart"
import { InsightCards } from "./components/InsightCards"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">REAL-TIME KPI DASHBOARD</h1>
        <KPIGrid />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div className="lg:col-span-1">
          <InsightCards />
        </div>
      </div>
    </div>
  )
}
