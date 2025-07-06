-- Insert sample profiles
INSERT INTO profiles (id, user_id, full_name, avatar_url, role, industry, completion_percentage) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Kim Min Jun', null, 'Software Engineer', 'Technology', 95),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Yoon Ji Soo', null, 'Product Manager', 'Technology', 88),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Kang Seo Youn', null, 'UX Designer', 'Design', 92),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Cha Do Yeon', null, 'Marketing Manager', 'Marketing', 85),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Jo Seo Yeon', null, 'Data Scientist', 'Technology', 90);

-- Insert KPI metrics
INSERT INTO kpi_metrics (metric_name, value) VALUES
('total_participants', 150),
('realtime_demifed', 29),
('total_matches', 160),
('avg_satisfaction', 78),
('total_meetings', 18),
('peak_concurrency', 43);

-- Insert sample matches
INSERT INTO matches (profile_id, matched_profile_id, match_score, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 85, 'pending'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', 92, 'accepted'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 78, 'pending'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 82, 'pending'),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 75, 'pending');

-- Insert sample meetings
INSERT INTO meetings (organizer_id, participant_id, scheduled_time, duration_minutes, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '2024-01-15 14:00:00+00', 30, 'scheduled'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '2024-01-15 15:30:00+00', 30, 'scheduled'),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', '2024-01-15 16:00:00+00', 30, 'scheduled');

-- Insert activity logs for chart data
INSERT INTO activity_logs (activity_type, count, hour) VALUES
('login', 35, '2024-01-15 09:00:00+00'),
('login', 45, '2024-01-15 10:00:00+00'),
('login', 65, '2024-01-15 11:00:00+00'),
('login', 85, '2024-01-15 12:00:00+00'),
('login', 95, '2024-01-15 13:00:00+00'),
('login', 105, '2024-01-15 14:00:00+00'),
('login', 90, '2024-01-15 15:00:00+00'),
('login', 75, '2024-01-15 16:00:00+00'),
('meeting_start', 25, '2024-01-15 09:00:00+00'),
('meeting_start', 35, '2024-01-15 10:00:00+00'),
('meeting_start', 45, '2024-01-15 11:00:00+00'),
('meeting_start', 55, '2024-01-15 12:00:00+00'),
('meeting_start', 65, '2024-01-15 13:00:00+00'),
('meeting_start', 70, '2024-01-15 14:00:00+00'),
('meeting_start', 60, '2024-01-15 15:00:00+00'),
('meeting_start', 50, '2024-01-15 16:00:00+00');
