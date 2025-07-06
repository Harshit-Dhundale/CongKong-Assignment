// scripts/seedAll.js
import 'dotenv/config'
import { supabaseAdmin } from '../lib/supabase.js'

// 5 “real” profiles (you already created these in auth.users)
const realProfiles = [
  { id: '550e8400-e29b-41d4-a716-446655440001', user_id: '550e8400-e29b-41d4-a716-446655440001', full_name: 'Kim Min Jun',   role: 'Software Engineer',    industry: 'Technology', completion_percentage: 95 },
  { id: '550e8400-e29b-41d4-a716-446655440002', user_id: '550e8400-e29b-41d4-a716-446655440002', full_name: 'Yoon Ji Soo',    role: 'Product Manager',      industry: 'Technology', completion_percentage: 88 },
  { id: '550e8400-e29b-41d4-a716-446655440003', user_id: '550e8400-e29b-41d4-a716-446655440003', full_name: 'Kang Seo Youn',  role: 'UX Designer',          industry: 'Design',     completion_percentage: 92 },
  { id: '550e8400-e29b-41d4-a716-446655440004', user_id: '550e8400-e29b-41d4-a716-446655440004', full_name: 'Cha Do Yeon',    role: 'Marketing Manager',    industry: 'Marketing',  completion_percentage: 85 },
  { id: '550e8400-e29b-41d4-a716-446655440005', user_id: '550e8400-e29b-41d4-a716-446655440005', full_name: 'Jo Seo Yeon',    role: 'Data Scientist',       industry: 'Technology', completion_percentage: 90 },
]

// 10 “dummy” profiles—no corresponding auth.users entries
const dummyProfiles = [
  { id: '17c07af0-e9d6-46ef-b203-99a20a554167', user_id: null, full_name: 'Kang Min Joon',   role: 'Frontend Developer', industry: 'Technology', completion_percentage: 93 },
  { id: '208c2424-b443-4793-be16-5c339a8bcf48', user_id: null, full_name: 'Jo Seo Youn',      role: 'Data Scientist',    industry: 'Technology', completion_percentage: 90 },
  { id: '58702e6f-c386-4c2a-b094-a77eaa0d5ddb', user_id: null, full_name: 'Jeong Do Youn',    role: 'Sales Manager',     industry: 'Sales',      completion_percentage: 84 },
  { id: '597d3b79-3a92-4993-84d5-d56fcd842b3e', user_id: null, full_name: 'Lee Hye Rim',      role: 'Product Manager',   industry: 'Technology', completion_percentage: 95 },
  { id: '6120d7b1-3101-4b6d-a771-6baa2951da6b', user_id: null, full_name: 'Yoon Ji Soo',      role: 'Software Engineer', industry: 'Technology', completion_percentage: 88 },
  { id: '69bf5be2-b334-450f-bdb7-b01da8cf0045', user_id: null, full_name: 'Cha Do Yeon',      role: 'Marketing Manager', industry: 'Marketing',  completion_percentage: 85 },
  { id: 'a97f9537-cf33-451c-b7f9-9fee0c44e03b', user_id: null, full_name: 'Choi Seo Youn',    role: 'Business Analyst',  industry: 'Finance',    completion_percentage: 87 },
  { id: 'c3415a44-9c75-49ba-a0b7-3009b4cdeb76', user_id: null, full_name: 'Lim Seo Youn',     role: 'Project Manager',   industry: 'Consulting', completion_percentage: 89 },
  { id: 'c7676370-ee99-48a8-a334-0c79cc44e477', user_id: null, full_name: 'Lim Si Woo',       role: 'DevOps Engineer',   industry: 'Technology', completion_percentage: 91 },
  { id: 'cccc83c3-3a9f-4b76-8c9a-e3cf854b3bac', user_id: null, full_name: 'Kang Seo Youn',    role: 'UX Designer',       industry: 'Design',     completion_percentage: 92 },
]

async function seedProfiles() {
  console.log('🔹 Seeding profiles…')
  const all = [...dummyProfiles, ...realProfiles]
  const { error } = await supabaseAdmin
    .from('profiles')
    .upsert(all, { onConflict: 'id' })
  if (error) console.error('  ❌ profiles error:', error.message)
}

async function seedKpiMetrics() {
  console.log('🔹 Seeding KPI metrics…')
  const metricNames = ['total_participants','realtime_demifed','total_matches','avg_satisfaction','total_meetings','peak_concurrency']
  const now    = new Date().toISOString()
  const plus1h = new Date(Date.now() + 3600_000).toISOString()
  const plus2h = new Date(Date.now() + 2*3600_000).toISOString()

  for (let ts of [now, plus1h, plus2h]) {
    const batch = metricNames.map((m,i) => ({
      metric_name: m,
      value: [150,29,160,78,18,43][i],
      recorded_at: ts,
    }))
    const { error } = await supabaseAdmin.from('kpi_metrics').insert(batch)
    if (error) console.error('  ❌ kpi_metrics error:', error.message)
  }
}

async function seedActivityLogs() {
  console.log('🔹 Seeding activity_logs…')
  const hours = [9,10,11,12,13,14,15,16]
  const loginCounts   = [35,45,65,85,95,105,90,75]
  const meetingCounts = [25,35,45,55,65,70,60,50]
  const inserts = []

  hours.forEach((h,i) => {
    const ts = new Date(Date.UTC(2025,6,6,h,0,0)).toISOString()
    inserts.push({ activity_type:'login',         count:loginCounts[i],   hour:ts })
    inserts.push({ activity_type:'meeting_start', count:meetingCounts[i], hour:ts })
  })

  const { error } = await supabaseAdmin
    .from('activity_logs')
    .upsert(inserts, { onConflict: 'id' })
  if (error) console.error('  ❌ activity_logs error:', error.message)
}

async function seedMatches() {
  console.log('🔹 Seeding matches…')
  const statuses = ['pending','accepted']
  const inserts = []

  realProfiles.forEach((p1) => {
    realProfiles.forEach((p2) => {
      if (p1.id === p2.id) return
      inserts.push({
        profile_id: p1.id,
        matched_profile_id: p2.id,
        match_score: Math.floor(70 + Math.random()*30),
        status: statuses[Math.floor(Math.random()*statuses.length)],
      })
    })
  })

  const { error } = await supabaseAdmin
    .from('matches')
    .upsert(inserts, { onConflict: 'id' })
  if (error) console.error('  ❌ matches error:', error.message)
}

async function seedMeetings() {
  console.log('🔹 Seeding meetings…')
  const base = Date.UTC(2025,6,6,14,0,0)
  const inserts = realProfiles.map((p,i) => ({
    organizer_id:   p.id,
    participant_id: realProfiles[(i+1)%realProfiles.length].id,
    scheduled_time: new Date(base + i*30*60_000).toISOString(),
    duration_minutes: 30,
    status: 'scheduled',
  }))

  const { error } = await supabaseAdmin
    .from('meetings')
    .upsert(inserts, { onConflict: 'id' })
  if (error) console.error('  ❌ meetings error:', error.message)
}

async function main() {
  await seedProfiles()
  await seedKpiMetrics()
  await seedActivityLogs()
  await seedMatches()
  await seedMeetings()
  console.log('✅ All dummy data seeded!')
}

main().catch(console.error)
