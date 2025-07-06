'use client'

import { useState, useEffect } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts'
import { supabase } from '@/lib/supabase'

interface ActivityRow {
  activity_type: 'login' | 'meeting_start'
  count: number
  hour: string
}
interface ActivityData {
  hour: string
  login: number
  meeting: number
}

const fallbackData: ActivityData[] = [
  { hour: '09:00', login: 35, meeting: 25 },
  { hour: '10:00', login: 45, meeting: 35 },
  { hour: '11:00', login: 65, meeting: 45 },
  { hour: '12:00', login: 85, meeting: 55 },
  { hour: '13:00', login: 95, meeting: 65 },
  { hour: '14:00', login: 105, meeting: 70 },
  { hour: '15:00', login: 90, meeting: 60 },
  { hour: '16:00', login: 75, meeting: 50 },
]

export function ActivityChart() {
  const [data, setData] = useState<ActivityData[]>(fallbackData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const { data: rawRows, error } = await supabase
        .from('activity_logs')
        .select('activity_type, count, hour')
        .order('hour', { ascending: true })

      if (error) throw error
      const rows = (rawRows ?? []) as ActivityRow[]
      
      if (rows.length) {
        const map: Record<string, ActivityData> = {}
        rows.forEach(r => {
          const hr = new Date(r.hour).getHours().toString().padStart(2, '0') + ':00'
          if (!map[hr]) map[hr] = { hour: hr, login: 0, meeting: 0 }
          if (r.activity_type === 'login') map[hr].login += r.count
          else map[hr].meeting += r.count
        })
        setData(Object.values(map))
      }
    } catch (err) {
      console.error('ActivityChart fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Activity by Time</h3>
      {loading ? (
        <div className="flex h-[280px] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="login" name="Participant Login" stroke="#1F25FF" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="meeting" name="Meeting" stroke="#00C853" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}