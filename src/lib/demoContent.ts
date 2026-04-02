import {
  computeClarity,
  computeFeedScore,
  computeFreshnessScore,
  computeStrengthScore,
  type MemoryMetrics,
} from "@/lib/memoryScoring";

type DemoComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  replies?: DemoComment[];
};

export type DemoMemory = {
  id: string;
  title: string;
  body: string;
  excerpt: string;
  locationName: string | null;
  eventDate: string | null;
  createdAt: string;
  author: string;
  metrics: MemoryMetrics;
  comments: DemoComment[];
};

export type DemoUnsentMessage = {
  id: string;
  title: string | null;
  body: string;
  toneTag: string;
  featured: boolean;
  createdAt: string;
  replyEnabled: boolean;
  replies: DemoComment[];
  reactionCounts: Record<string, number>;
};

export type DemoPerspective = {
  perspectiveKey: string;
  displayName: string;
  summary: string;
  topConcerns: string[];
  topValues: string[];
  suggestedActions: string[];
  compromise?: { title: string; body: string } | null;
};

export type DemoIssue = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  updatedAt: string;
  commonGround: string[];
  perspectives: DemoPerspective[];
};

const memoryEntries: DemoMemory[] = [
  {
    id: "memory-concert",
    title: "Last summer concert at the park",
    body: "It felt like the whole town showed up with lawn chairs and snacks. The sky turned pink right when the band started and every family seemed to know exactly where to spread their blankets.",
    excerpt: "A warm evening on the Town Green that still feels shared.",
    locationName: "Town Green",
    eventDate: "2025-07-14T19:30:00.000Z",
    createdAt: "2025-07-15T09:00:00.000Z",
    author: "Maya Patel",
    metrics: {
      daysOld: 8,
      weightedInteractions: 17,
      recentWeightedInteractions: 8,
      uniqueParticipants: 11,
      commentCount: 4,
      contextAdditions: 1,
      locationVerifications: 1,
    },
    comments: [
      {
        id: "memory-comment-1",
        author: "Sofie Chen",
        body: "My family sat near the fountain. I remember kids dancing by the stage.",
        createdAt: "2025-07-15T10:20:00.000Z",
        replies: [
          {
            id: "memory-comment-1-reply-1",
            author: "Jordan Lee",
            body: "Same here. That night felt like summer arriving all at once.",
            createdAt: "2025-07-15T11:15:00.000Z",
          },
        ],
      },
    ],
  },
  {
    id: "memory-bakery",
    title: "Old bakery before it closed",
    body: "I still remember the smell when you opened the front door. It was the place everyone stopped by after school, and the paper bag always steamed up before you made it to the corner.",
    excerpt: "A quieter memory that fades without community context.",
    locationName: "Maple Avenue",
    eventDate: "2024-10-01T13:00:00.000Z",
    createdAt: "2024-10-03T09:00:00.000Z",
    author: "Jordan Lee",
    metrics: {
      daysOld: 160,
      weightedInteractions: 8,
      recentWeightedInteractions: 0,
      uniqueParticipants: 3,
      commentCount: 1,
      contextAdditions: 0,
      locationVerifications: 0,
    },
    comments: [
      {
        id: "memory-comment-2",
        author: "Trusted Member",
        body: "The owner used to hand out extra cookies before closing.",
        createdAt: "2024-10-05T13:15:00.000Z",
      },
    ],
  },
];

export const demoMemories = memoryEntries.map((entry) => {
  const strengthScore = computeStrengthScore(entry.metrics);
  const freshnessScore = computeFreshnessScore(entry.metrics.daysOld);
  const feedScore = computeFeedScore({
    strengthScore,
    freshnessScore,
    engagementVelocity: Math.min(100, entry.metrics.recentWeightedInteractions * 8),
    localRelevance: entry.locationName ? 80 : 50,
  });

  return {
    ...entry,
    strengthScore,
    clarity: computeClarity(strengthScore),
    feedScore,
    revivedRecently: entry.metrics.recentWeightedInteractions >= 5,
  };
});

export const demoUnsentMessages: DemoUnsentMessage[] = [
  {
    id: "unsent-quiet-students",
    title: null,
    body: "I wish people checked in on quiet students more. A lot of people look fine when they really are not.",
    toneTag: "care",
    featured: true,
    createdAt: "2026-03-22T10:00:00.000Z",
    replyEnabled: true,
    replies: [
      {
        id: "unsent-reply-1",
        author: "Moderator User",
        body: "You are not the only one who feels this way. Thank you for saying it.",
        createdAt: "2026-03-22T11:00:00.000Z",
      },
    ],
    reactionCounts: {
      heard_you: 12,
      relate: 9,
      support: 16,
      thank_you: 3,
    },
  },
  {
    id: "unsent-library",
    title: "To the librarian who stayed late",
    body: "I never said thank you to the librarian who helped me every day after school. That room felt safe when a lot of other places did not.",
    toneTag: "gratitude",
    featured: false,
    createdAt: "2026-03-18T17:30:00.000Z",
    replyEnabled: true,
    replies: [
      {
        id: "unsent-reply-2",
        author: "Sofie Chen",
        body: "This made me think about a teacher I never properly thanked either.",
        createdAt: "2026-03-18T19:10:00.000Z",
      },
    ],
    reactionCounts: {
      heard_you: 4,
      relate: 7,
      support: 8,
      thank_you: 10,
    },
  },
];

export const demoIssues: DemoIssue[] = [
  {
    id: "issue-teen-center",
    slug: "teen-center-friday-evenings",
    title: "Should the town open a supervised teen center on Friday evenings?",
    summary:
      "The proposal would open a supervised public space for teens on Friday evenings from 6 PM to 10 PM.",
    body:
      "The town is considering a six-month pilot program using the community center gym and two adjacent rooms. Supporters argue it creates a safe social space. Critics want clearer staffing, transportation, and budget details.",
    category: "youth-and-community",
    updatedAt: "2026-03-28T12:00:00.000Z",
    commonGround: [
      "The program should be safe.",
      "The program should be affordable.",
      "The town should evaluate outcomes after launch.",
    ],
    perspectives: [
      {
        perspectiveKey: "student",
        displayName: "Student",
        summary:
          "Students may value having a safe place to meet friends without needing to spend money.",
        topConcerns: ["access", "hours", "activities"],
        topValues: ["belonging", "affordability", "safety"],
        suggestedActions: [
          "Keep entry free",
          "Offer mixed study and recreation spaces",
          "Survey students after the pilot",
        ],
        compromise: {
          title: "Pilot nights",
          body: "Run only on Fridays for six months and review attendance before expanding.",
        },
      },
      {
        perspectiveKey: "parent",
        displayName: "Parent",
        summary:
          "Parents may support the program if supervision and transportation are clearly defined.",
        topConcerns: ["supervision", "transportation", "pickup procedures"],
        topValues: ["security", "structure", "wellbeing"],
        suggestedActions: [
          "Require trained staff on site",
          "Publish pickup procedures",
          "Set clear closing rules",
        ],
        compromise: {
          title: "Earlier close",
          body: "Close at 9:30 PM during the pilot and reassess based on attendance and safety data.",
        },
      },
      {
        perspectiveKey: "business_owner",
        displayName: "Business Owner",
        summary:
          "Business owners may care about foot traffic, noise, and whether the program reduces loitering elsewhere.",
        topConcerns: ["noise", "parking", "downtown impact"],
        topValues: ["order", "predictability", "community vitality"],
        suggestedActions: [
          "Coordinate parking zones",
          "Keep entrances supervised",
          "Track complaints and attendance monthly",
        ],
        compromise: {
          title: "Data review",
          body: "Review complaint and attendance data every 30 days and publish the results.",
        },
      },
    ],
  },
];

export const demoModerationQueue = [
  {
    id: "queue-unsent-1",
    targetType: "unsent_message",
    title: "Pending anonymous message",
    reason: "Contains contact_info and duplicate_recent_content flags",
    status: "pending",
  },
  {
    id: "queue-report-1",
    targetType: "unsent_reply",
    title: "Reported reply",
    reason: "User report: personal information",
    status: "open",
  },
];
