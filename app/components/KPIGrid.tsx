'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  UsersIcon,
  BoltIcon,
  ArrowPathIcon,
  StarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'

interface KPIRecord {
  metric_name: string
  value: number
}

const config = [
  { key: 'total_participants', label: 'Total Participants', icon: UsersIcon },
  {
    key: 'realtime_demifed',
    label: 'Real-Time Demified',
    icon: BoltIcon,
    format: (v: number) => `${v} (19%)`,
  },
  { key: 'total_matches', label: 'Total Matches', icon: ArrowPathIcon },
  {
    key: 'avg_satisfaction',
    label: 'Average Satisfaction',
    icon: StarIcon,
    format: (v: number) => `${v}%`,
  },
  { key: 'total_meetings', label: 'Total Meetings', icon: CalendarIcon },
  {
    key: 'peak_concurrency',
    label: 'Peak',
    icon: ArrowTrendingUpIcon,
    format: (v: number) => (v / 10).toFixed(1),
  },
]

export function KPIGrid() {
  const [metrics, setMetrics] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let channel: any
    ;(async () => {
      await loadMetrics()
      channel = supabase
        .channel('kpi-updates')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'kpi_metrics' }, loadMetrics)
        .subscribe()
      setLoading(false)
    })()
    return () => channel && supabase.removeChannel(channel)
  }, [])

  async function loadMetrics() {
    try {
      const { data: rawMetrics, error } = await supabase
        .from('kpi_metrics')
        .select('metric_name, value')
        .order('recorded_at', { ascending: false })

      if (error) throw error
      const map: Record<string, number> = {}
      const rows = (rawMetrics ?? []) as KPIRecord[]
      rows.forEach(m => {
        if (!map[m.metric_name]) map[m.metric_name] = m.value
      })
      setMetrics(map)
    } catch (e) {
      console.error('KPI load failed', e)
    }
  }

  if (loading) {
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">{/* skeleton... */}</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {config.map(c => {
        const Icon = c.icon
        const val = metrics[c.key] || 0
        const display = c.format ? c.format(val) : val
        return (
          <div key={c.key} className="bg-white border p-4 rounded-lg flex items-center">
            <Icon className="h-6 w-6 text-blue-500 mr-3" />
            <div>
              <div className="text-gray-500 text-sm">{c.label}</div>
              <div className="text-2xl font-bold">{display}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}