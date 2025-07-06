export interface Profile {
  id: string
  user_id: string
  full_name: string
  avatar_url?: string
  role?: string
  industry?: string
  completion_percentage: number
  created_at: string
}

export interface KPIMetric {
  id: number
  metric_name:
    | "total_participants"
    | "realtime_demifed"
    | "total_matches"
    | "avg_satisfaction"
    | "total_meetings"
    | "peak_concurrency"
  value: number
  recorded_at: string
}

export interface Match {
  id: number
  profile_id: string
  matched_profile_id: string
  match_score: number
  status: string
  created_at: string
}

export interface Meeting {
  id: number
  organizer_id: string
  participant_id: string
  scheduled_time: string
  duration_minutes: number
  status: string
  created_at: string
}

export interface ActivityLog {
  id: number
  activity_type: "login" | "meeting_start"
  count: number
  hour: string
}
