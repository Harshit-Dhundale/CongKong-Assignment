// scripts/seed.js
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function main() {
  console.log('Seeding…')

  // 1. Create auth.users for each profile
  const users = [
    { id: '550e8400-e29b-41d4-a716-446655440001', email: 'kim.min.jun@example.com' },
    { id: '550e8400-e29b-41d4-a716-446655440002', email: 'yoon.ji.soo@example.com' },
    { id: '550e8400-e29b-41d4-a716-446655440003', email: 'kang.seo.youn@example.com' },
    { id: '550e8400-e29b-41d4-a716-446655440004', email: 'cha.do.yeon@example.com' },
    { id: '550e8400-e29b-41d4-a716-446655440005', email: 'jo.seo.yeon@example.com' },
  ]
  for (let u of users) {
    const { error } = await supabase.auth.admin.createUser({
      id: u.id,
      email: u.email,
      password: 'TempPass123!',
      email_confirm: true,
    })
    if (error) console.error('User creation failed:', error.message)
  }

  // 2. Seed profiles
  await supabase.from('profiles').upsert([
    { id: users[0].id, user_id: users[0].id, full_name: 'Kim Min Jun', role: 'Software Engineer', industry: 'Technology', completion_percentage: 95 },
    { id: users[1].id, user_id: users[1].id, full_name: 'Yoon Ji Soo',    role: 'Product Manager',    industry: 'Technology', completion_percentage: 88 },
    { id: users[2].id, user_id: users[2].id, full_name: 'Kang Seo Youn',  role: 'UX Designer',        industry: 'Design',     completion_percentage: 92 },
    { id: users[3].id, user_id: users[3].id, full_name: 'Cha Do Yeon',    role: 'Marketing Manager',  industry: 'Marketing',  completion_percentage: 85 },
    { id: users[4].id, user_id: users[4].id, full_name: 'Jo Seo Yeon',    role: 'Data Scientist',     industry: 'Technology', completion_percentage: 90 },
  ])

  // 3. Seed kpi_metrics
  await supabase.from('kpi_metrics').upsert([
    { metric_name: 'total_participants', value: 150 },
    { metric_name: 'realtime_demifed',   value: 29  },
    { metric_name: 'total_matches',      value: 160 },
    { metric_name: 'avg_satisfaction',   value: 78  },
    { metric_name: 'total_meetings',     value: 18  },
    { metric_name: 'peak_concurrency',   value: 43  },
  ])

  // 4. Seed activity_logs
  const hours = ['09','10','11','12','13','14','15','16']
  const loginCounts   = [35,45,65,85,95,105,90,75]
  const meetingCounts = [25,35,45,55,65,70,60,50]
  await Promise.all(hours.map((h,i) =>
    supabase.from('activity_logs').upsert({
      id: i+1,
      activity_type: 'login',
      count: loginCounts[i],
      hour: `2025-07-06T${h}:00:00Z`
    })
  ))
  await Promise.all(hours.map((h,i) =>
    supabase.from('activity_logs').upsert({
      id: 9+i,
      activity_type: 'meeting_start',
      count: meetingCounts[i],
      hour: `2025-07-06T${h}:00:00Z`
    })
  ))

  // 5. Seed matches
  await supabase.from('matches').upsert([
    { profile_id: users[0].id, matched_profile_id: users[1].id, match_score: 85, status: 'pending'  },
    { profile_id: users[0].id, matched_profile_id: users[4].id, match_score: 92, status: 'accepted' },
    { profile_id: users[1].id, matched_profile_id: users[2].id, match_score: 78, status: 'pending'  },
    { profile_id: users[2].id, matched_profile_id: users[3].id, match_score: 82, status: 'pending'  },
    { profile_id: users[3].id, matched_profile_id: users[4].id, match_score: 75, status: 'pending'  },
  ])

  // 6. Seed meetings
  await supabase.from('meetings').upsert([
    { organizer_id: users[0].id, participant_id: users[1].id, scheduled_time: '2025-07-06T14:00:00Z', duration_minutes: 30, status: 'scheduled' },
    { organizer_id: users[2].id, participant_id: users[3].id, scheduled_time: '2025-07-06T15:30:00Z', duration_minutes: 30, status: 'scheduled' },
    { organizer_id: users[4].id, participant_id: users[0].id, scheduled_time: '2025-07-06T16:00:00Z', duration_minutes: 30, status: 'scheduled' },
  ])

  console.log('✅ Seeding complete')
}

main().catch(console.error)
