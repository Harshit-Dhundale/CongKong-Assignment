'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface TopMatch {
  id: string          // this is the match-record primary key
  profileId: string
  full_name: string
  match_score: number
}
interface UpcomingMeeting {
  id: string
  full_name: string
  scheduled_time: string
}

const PASTEL_COLORS = ['#FFD1DC','#C5E1A5','#81D4FA','#FFF59D','#CE93D8']
const DARK_COLORS   = ['#00796B','#303F9F','#7B1FA2','#689F38','#F57C00']

export function ContextPanel() {
  const [matches, setMatches] = useState<TopMatch[]>([])
  const [meetings, setMeetings] = useState<UpcomingMeeting[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      await Promise.all([loadMatches(), loadMeetings()])
      setLoading(false)
    })()
  }, [])

  async function loadMatches() {
    const { data: raw, error } = await supabase
      .from('matches')
      .select('id, match_score, matched_profile:matched_profile_id(id, full_name)')
      .order('match_score', { ascending: false })
      .limit(5)

    if (error) {
      console.error('loadMatches error:', error.message, error.details)
      return
    }

    const rows = raw ?? []
    const list = rows.map((r: any) => ({
      id:          r.id,                  // match record ID
      profileId:   r.matched_profile.id,
      full_name:   r.matched_profile.full_name,
      match_score: r.match_score,
    }))
    setMatches(list)
  }

  async function loadMeetings() {
    const { data: raw, error } = await supabase
      .from('meetings')
      // alias participant_id → participant
      .select('id, scheduled_time, participant:participant_id(id, full_name)')
      .eq('status', 'scheduled')
      .order('scheduled_time')
      .limit(5)

    if (error) {
      console.error('loadMeetings error:', error.message, error.details)
      return
    }

    const rows = raw ?? []
    const list = rows.map((r: any) => ({
      id: r.id,
      full_name: r.participant.full_name,
      scheduled_time: r.scheduled_time,
    }))
    setMeetings(list)
  }

  return (
   <div className="block lg:block w-full lg:w-[25%] bg-white border-l p-6 space-y-8 overflow-auto">
      {/* Matching TOP 5 */}
      <div>
        <h4 className="font-semibold mb-3">Matching TOP 5</h4>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center py-2 animate-pulse">
              <div className="w-6 h-6 bg-gray-200 rounded-full mr-3" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          ))
        ) : (
          // 1) sort by score desc
          // 2) reduce to first occurrence of each profileId
          // 3) take top 5
          matches
            .sort((a, b) => b.match_score - a.match_score)
            .reduce<TopMatch[]>((uniques, m) => {
              if (!uniques.find(x => x.profileId === m.profileId)) {
                uniques.push(m)
              }
              return uniques
            }, [])
            .slice(0, 5)
            .map((m, idx) => (
              <div key={m.profileId} className="flex items-center py-2">
                <div
                  className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-xs text-white font-medium"
                  style={{ backgroundColor: PASTEL_COLORS[idx] }}
                >
                  {idx + 1}
                </div>
                <div className="text-sm">{m.full_name}</div>
              </div>
            ))
        )}
      </div>

      {/* Meeting in Anticipation */}
      <div>
        <h4 className="font-semibold mb-3">Meeting in Anticipation</h4>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center py-2 animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded-full mr-3" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            ))
          : meetings.map((m, i) => (
              <div key={m.id} className="flex items-center py-2">
                <div
                  className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-xs text-white font-medium"
                  style={{ backgroundColor: DARK_COLORS[i] }}
                >
                  {i + 1}
                </div>
                <div className="text-sm">{m.full_name}</div>
              </div>
            ))}
      </div>
    </div>
  )
}