// app/api/generate-matches/route.ts
import { type NextRequest, NextResponse } from "next/server"
// ↓ pull in the admin client instead of createServerClient
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(request: NextRequest) {
  try {
    const { profileId } = await request.json()

    if (!profileId) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 })
    }

    // Use the admin client here
    const supabase = supabaseAdmin

    // Fetch current profile
    const { data: currentProfile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", profileId)
      .single()

    if (profileError) {
      console.error("Profile fetch error:", profileError)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Fetch all other profiles
    const { data: allProfiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .neq("id", profileId)
      .limit(10)

    if (profilesError) {
      console.error("Profiles fetch error:", profilesError)
      return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 })
    }

    if (!allProfiles || allProfiles.length === 0) {
      return NextResponse.json({ error: "No profiles available for matching" }, { status: 404 })
    }

    // Generate matches using simple scoring algorithm
    const matches = allProfiles.map((profile) => {
      let score = 50 // Base score

      // Industry match bonus
      if (profile.industry === currentProfile.industry) {
        score += 30
      }

      // Role compatibility
      if (profile.role && currentProfile.role && profile.role !== currentProfile.role) {
        score += 15
      }

      // Profile completion bonus
      score += (profile.completion_percentage / 100) * 20

      // Add some randomness
      score += Math.random() * 10 - 5

      return {
        profileId: profile.id,
        score: Math.min(Math.max(Math.round(score), 0), 100),
      }
    })

    // Save matches to database
    const matchInserts = matches.map((m) => ({
      profile_id: profileId,
      matched_profile_id: m.profileId,
      match_score: m.score,
      status: "pending",
    }))

    const { error: insertError } = await supabase.from("matches").insert(matchInserts)

    if (insertError) {
      console.error("Match insert error:", insertError)
      return NextResponse.json({ error: "Failed to save matches" }, { status: 500 })
    }

    return NextResponse.json({ success: true, matches })
  } catch (error) {
    console.error("Error generating matches:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
