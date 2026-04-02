const STORAGE_KEYS = {
  suggestedResources: "np_suggested_resources_v1",
  calendarEvents: "np_calendar_events_v1",
  forumPosts: "np_forum_posts_v1",
  schoolLinks: "np_school_links_v1",
  alertSignups: "np_alert_signups_v1",
  bulletinInbox: "np_bulletin_inbox_v1",
  communityComments: "np_community_comments_v1",
};

const activeWarnings = [];

const liveUpdates = [
  "Library maker lab opens new fabrication slots this Friday.",
  "Downtown cleanup volunteers needed for Saturday morning check-in.",
  "Lions Club spring drive is collecting nonperishables through March 28.",
  "NJ Transit service advisory now posted on the bulletin board page.",
  "Town Hall listening session added for next Wednesday at 7 PM.",
];

const resourceData = [
  {
    id: "food-pantry",
    name: "New Providence Food Pantry",
    category: "food",
    neighborhood: "downtown",
    tags: ["food", "assistance", "free"],
    address: "30 South St, New Providence, NJ",
    phone: "(908) 464-1849",
    hours: "Tue & Thu 10am-12pm",
    description:
      "Weekly food assistance for residents in need with quick, low-friction support and community coordination.",
    position: { x: -60, z: 20 },
  },
  {
    id: "lions-club",
    name: "Lions Club of New Providence",
    category: "civic",
    neighborhood: "downtown",
    tags: ["volunteer", "fundraising", "service"],
    address: "New Providence, NJ",
    phone: "",
    hours: "Meets monthly",
    description:
      "Volunteer service organization running food drives, fundraisers, and civic projects across the borough.",
    position: { x: -40, z: 45 },
  },
  {
    id: "library",
    name: "New Providence Memorial Library",
    category: "education",
    neighborhood: "downtown",
    tags: ["books", "maker lab", "programs", "free"],
    address: "377 Elkwood Ave, New Providence, NJ",
    phone: "(908) 665-0311",
    hours: "Mon-Thu 9am-9pm, Fri-Sat 9am-5pm",
    description:
      "Public library offering books, digital resources, a maker lab, and year-round community programming.",
    position: { x: -80, z: -10 },
    spotlight: true,
    image: "assets/community/library-exterior-spring.jpg",
  },
  {
    id: "paca",
    name: "PACA Arts Collective",
    category: "arts",
    neighborhood: "downtown",
    tags: ["art", "culture", "workshops", "exhibits"],
    address: "Community Arts Loft, New Providence",
    phone: "",
    hours: "Varies",
    description:
      "Local arts organization hosting workshops, rotating exhibits, and community-focused cultural events.",
    position: { x: -92, z: 8 },
  },
  {
    id: "scouts",
    name: "Scouts BSA Troop 61",
    category: "youth",
    neighborhood: "fairview",
    tags: ["youth", "outdoors", "leadership"],
    address: "New Providence, NJ",
    phone: "",
    hours: "Weekly meetings",
    description:
      "Youth leadership, outdoor skills, camping, and community service through local scouting programs.",
    position: { x: 30, z: -40 },
  },
  {
    id: "pta",
    name: "NPHS Parent-Teacher Association",
    category: "education",
    neighborhood: "downtown",
    tags: ["school", "parents", "community"],
    address: "New Providence High School",
    phone: "",
    hours: "Monthly meetings",
    description:
      "Family engagement and school support programming for district families and school staff.",
    position: { x: -20, z: 30 },
  },
  {
    id: "senior-center",
    name: "New Providence Senior Center",
    category: "social",
    neighborhood: "downtown",
    tags: ["seniors", "programs", "social"],
    address: "New Providence Community Center",
    phone: "",
    hours: "Weekdays 9am-4pm",
    description:
      "Programs, activities, and social events for seniors with regular wellness and connection offerings.",
    position: { x: 10, z: 15 },
  },
  {
    id: "rec-dept",
    name: "NP Recreation Department",
    category: "recreation",
    neighborhood: "downtown",
    tags: ["sports", "programs", "youth", "adults"],
    address: "Municipal Building, New Providence",
    phone: "(908) 665-1413",
    hours: "Mon-Fri 9am-5pm",
    description:
      "Youth and adult sports leagues, summer camps, fitness programs, and seasonal town events.",
    position: { x: 20, z: -20 },
  },
  {
    id: "artisan-market",
    name: "Fairview Artisan Market",
    category: "shopping",
    neighborhood: "fairview",
    tags: ["market", "local", "shopping"],
    address: "Fairview Ave, New Providence",
    phone: "",
    hours: "Weekends (seasonal)",
    description:
      "Seasonal pop-up market featuring handmade goods, neighborhood vendors, and local makers.",
    position: { x: 10, z: -55 },
  },
  {
    id: "oakwood-trail",
    name: "Oakwood Loop Trail",
    category: "outdoors",
    neighborhood: "oakwood",
    tags: ["hiking", "nature", "free"],
    address: "Oakwood Ave, New Providence",
    phone: "",
    hours: "Dawn to dusk",
    description:
      "A shaded loop trail with gentle elevation, popular with walkers, runners, and families.",
    position: { x: 150, z: 90 },
  },
  {
    id: "lions-park",
    name: "Lions Park & Pavilion",
    category: "recreation",
    neighborhood: "fairview",
    tags: ["park", "picnic", "sports", "free"],
    address: "Lions Park, New Providence",
    phone: "",
    hours: "Dawn to dusk",
    description:
      "A central gathering spot for picnics, youth sports, community days, and summer programming.",
    position: { x: 105, z: -38 },
    spotlight: true,
    image: "assets/community/pavilion-park.jpg",
  },
  {
    id: "central-bistros",
    name: "Central Ave Dining District",
    category: "dining",
    neighborhood: "downtown",
    tags: ["food", "dining", "restaurants"],
    address: "Central Ave, New Providence",
    phone: "",
    hours: "Varies by restaurant",
    description:
      "A cluster of local dining favorites ranging from quick bites to sit-down neighborhood staples.",
    position: { x: -70, z: 35 },
    spotlight: true,
    image: "assets/community/downtown-shops.jpg",
  },
  {
    id: "maple-coffee",
    name: "Maple Street Coffee",
    category: "dining",
    neighborhood: "downtown",
    tags: ["coffee", "cafe", "social"],
    address: "Maple St, New Providence",
    phone: "",
    hours: "Mon-Fri 6am-6pm",
    description:
      "Cozy grab-and-go coffee spot for students, commuters, and weekend downtown walks.",
    position: { x: -52, z: 18 },
  },
  {
    id: "muboo",
    name: "MuBoo Youth Arts Collective",
    category: "youth",
    neighborhood: "downtown",
    tags: ["youth", "arts", "mentorship"],
    address: "New Providence",
    phone: "",
    hours: "Varies",
    description:
      "Creative mentorship and arts access for local students through youth-led programming.",
    position: { x: 60, z: 10 },
  },
  {
    id: "clubbing",
    name: "Clubbing Social Club",
    category: "social",
    neighborhood: "downtown",
    tags: ["social", "meetups", "hobbies"],
    address: "New Providence",
    phone: "",
    hours: "Weekly",
    description:
      "Open social group for hobby nights, meetups, and intergenerational community events.",
    position: { x: 80, z: -15 },
  },
  {
    id: "np-health",
    name: "NP Community Health Services",
    category: "health",
    neighborhood: "downtown",
    tags: ["health", "wellness", "medical"],
    address: "New Providence, NJ",
    phone: "",
    hours: "Mon-Fri 8am-5pm",
    description:
      "Local health resources, wellness programs, referrals, and preventive care information.",
    position: { x: -30, z: -25 },
  },
  {
    id: "animal-shelter",
    name: "New Providence Animal Shelter",
    category: "social",
    neighborhood: "fairview",
    tags: ["animals", "adoption", "lost-pet"],
    address: "New Providence",
    phone: "",
    hours: "Tue-Sun 11am-5pm",
    description:
      "Animal adoptions, foster support, lost and found coordination, and pet community resources.",
    position: { x: 50, z: 55 },
  },
  {
    id: "np-eac",
    name: "NP Environmental Advisory Committee",
    category: "civic",
    neighborhood: "downtown",
    tags: ["environment", "sustainability", "civic"],
    address: "Municipal Building, New Providence",
    phone: "",
    hours: "Monthly meetings",
    description:
      "Town advisory group focused on sustainability initiatives, policy, and environmental stewardship.",
    position: { x: -15, z: -50 },
  },
  {
    id: "nphs-athletics",
    name: "NPHS Athletics Programs",
    category: "youth",
    neighborhood: "downtown",
    tags: ["sports", "youth", "school"],
    address: "New Providence High School",
    phone: "",
    hours: "Seasonal",
    description:
      "Varsity and JV athletics programming with student participation across multiple seasons.",
    position: { x: -10, z: 60 },
    image: "assets/community/school-campus-drive.jpg",
  },
  {
    id: "np-fire",
    name: "NP Volunteer Fire Department",
    category: "civic",
    neighborhood: "downtown",
    tags: ["safety", "volunteer", "emergency"],
    address: "14 South St, New Providence",
    phone: "(908) 464-3838",
    hours: "24/7 emergency response",
    description:
      "Volunteer fire department delivering emergency response, drills, and community safety programming.",
    position: { x: 0, z: 0 },
    spotlight: true,
    image: "assets/community/firehouse-exterior.jpg",
  },
];

const directoryData = [
  {
    id: "dir-lions",
    name: "New Providence Lions Club",
    category: "civic",
    description: "Volunteer service, fundraising, scholarships, and hands-on support for local residents.",
    url: "https://www.nplions.org/",
  },
  {
    id: "dir-muboo",
    name: "New Providence Music Boosters",
    category: "arts",
    description: "Parent-and-community support for school music, performances, scholarships, and arts events.",
    url: "https://www.npmusicboosters.org/about-us",
  },
  {
    id: "dir-parents",
    name: "NP Parent and Student Site",
    category: "advocacy",
    description: "District family resources for communication, technology help, health, safety, and student support.",
    url: "https://sites.google.com/npsdnj.org/np-parent-and-student-site/home",
  },
  {
    id: "dir-pack363",
    name: "Cub Scout Pack 363",
    category: "youth",
    description: "Youth scouting with outdoor skills, service projects, and family-friendly events in town.",
    url: "https://pack363-np.org/",
  },
  {
    id: "dir-public-art",
    name: "New Providence Public Art",
    category: "arts",
    description: "Community-supported sculptures, installations, and creative projects across borough spaces.",
    url: "https://www.newprov.us/321/NP-Public-Art",
  },
  {
    id: "dir-seniors",
    name: "DeCorso Community Center",
    category: "social",
    description: "The home of the New Providence Senior Citizens Club, classes, trips, and weekday programming.",
    url: "https://www.newprov.us/278/Seniors",
  },
  {
    id: "dir-rec",
    name: "New Providence Recreation",
    category: "sports",
    description: "Official borough hub for leagues, camps, classes, parks, and seasonal community activities.",
    url: "https://www.newprov.us/191/Community-Activities",
  },
  {
    id: "dir-library",
    name: "Friends of the New Providence Memorial Library",
    category: "advocacy",
    description: "Volunteer and fundraising support for concerts, art exhibits, programs, and library improvements.",
    url: "https://newprovlibrary.org/friends/",
  },
  {
    id: "dir-green-team",
    name: "New Providence Green Team",
    category: "civic",
    description: "Volunteer sustainability work focused on environmental, social, and long-range borough goals.",
    url: "https://www.newprov.us/296/Volunteer-Advisory-Committees",
  },
  {
    id: "dir-pal",
    name: "New Providence PAL",
    category: "sports",
    description: "Youth sports leagues, coaching, and town athletics for football, basketball, softball, and more.",
    url: "https://newprovidencepal.org/",
  },
];

const bulletinSeed = [
  {
    type: "New Regulation",
    title: "Outdoor dining permit renewals due March 31",
    note: "Updated safety checklist now required with each submission.",
  },
  {
    type: "Lost Pet",
    title: "Missing tabby last seen near Fairview Ave",
    note: "Contact the shelter if spotted between 5 and 7 PM.",
  },
  {
    type: "Street Project",
    title: "South Street resurfacing begins next Monday",
    note: "Night work will run from 8 PM to 5 AM for two weeks.",
  },
  {
    type: "Safety",
    title: "Crosswalk lighting upgrade at Elkwood Ave",
    note: "Pedestrian beacon testing is scheduled for Thursday.",
  },
  {
    type: "Community",
    title: "Volunteer signups open for Spring Cleanup",
    note: "Registration available through the recreation office this week.",
  },
  {
    type: "Urgent",
    title: "Weather watch team on standby for heavy rain",
    note: "Drainage hot spots are being monitored overnight.",
  },
];

const bulletinLiveFeed = [
  "Library challenge registration now open for grades 4 through 8.",
  "Pothole repairs on Springfield Ave moved up to Friday morning.",
  "Volunteer fire department blood drive exceeded donor target this week.",
  "Community pantry evening shift still needs two volunteers tomorrow.",
];

const officialCalendar = [
  {
    id: "listen-session",
    date: "2026-04-02",
    title: "Downtown Listening Session",
    location: "Municipal building",
    note: "Open public conversation on traffic, downtown walkability, and project priorities.",
    source: "official",
  },
  {
    id: "cleanup-kickoff",
    date: "2026-04-04",
    title: "Spring Cleanup Kickoff",
    location: "Lions Park pavilion",
    note: "Volunteer check-in begins at 9:00 AM with supplies and route assignments.",
    source: "official",
  },
  {
    id: "maker-lab",
    date: "2026-04-07",
    title: "Library Teen Maker Lab",
    location: "Memorial Library",
    note: "Hands-on fabrication session for students in grades 6 through 10.",
    source: "official",
  },
  {
    id: "board-workshop",
    date: "2026-04-11",
    title: "Board of Education Workshop",
    location: "District offices",
    note: "Workshop session covering next-year priorities, facilities, and staffing.",
    source: "official",
  },
  {
    id: "garden-day",
    date: "2026-04-12",
    title: "Memorial Garden Service Day",
    location: "9/11 Memorial garden",
    note: "Volunteer planting and seasonal cleanup with borough staff and residents.",
    source: "official",
  },
  {
    id: "pantry-drive",
    date: "2026-04-17",
    title: "Pantry Evening Drive",
    location: "Community pantry annex",
    note: "Donation sorting and evening collection window for shelf-stable goods.",
    source: "official",
  },
  {
    id: "arts-night",
    date: "2026-04-18",
    title: "PACA Open Studio Night",
    location: "Community Arts Loft",
    note: "Resident gallery walk, youth work showcase, and informal drop-in workshops.",
    source: "official",
  },
  {
    id: "earth-week",
    date: "2026-04-22",
    title: "Earth Week Volunteer Rally",
    location: "Town Green",
    note: "Neighborhood sustainability booths, sign-ups, and environmental project updates.",
    source: "official",
  },
  {
    id: "safety-fair",
    date: "2026-04-25",
    title: "Neighborhood Safety Fair",
    location: "Volunteer fire department",
    note: "Emergency preparedness demos, family safety guides, and equipment tours.",
    source: "official",
  },
  {
    id: "grant-wrapup",
    date: "2026-04-30",
    title: "Grant Review Wrap-Up",
    location: "Municipal chambers",
    note: "Public summary of spring grants, timelines, and near-term construction scheduling.",
    source: "official",
  },
];

const educationUpdates = [
  {
    title: "Budget session recap",
    text: "The board reviewed instructional priorities, staffing, and capital requests for next year.",
  },
  {
    title: "Weather protocol reminder",
    text: "Delayed opening communication now posts to the district homepage and emergency text alerts.",
  },
  {
    title: "Reading challenge launch",
    text: "The public library and district are partnering on a town-wide spring reading challenge.",
  },
];

const educationLinkMeta = {
  district: {
    label: "District Site",
    description:
      "Official district updates, board notices, calendars, and school-wide announcements.",
  },
  portal: {
    label: "Parent Portal",
    description:
      "Family access to schedules, grades, attendance, and other student account details.",
  },
  menus: {
    label: "Lunch Menus",
    description:
      "Current meal schedules, cafeteria updates, and nutrition information for families.",
  },
};

const defaultSchoolLinks = {
  district: "https://nphs.npsd.k12.nj.us/",
  portal: "https://powerschool.npsd.us/public/home.html",
  menus: "https://www.npsd.k12.nj.us/programsservices/food-services",
};

const forumSeed = [
  {
    id: "crosswalk-request",
    title: "Crosswalk Request",
    question: "How do I request a new crosswalk near the school campus?",
    answer:
      "Submit a Town Improvement Ticket on the support page with the exact location, nearby landmarks, and why the crossing is needed. Public Works and the police department review those requests together.",
    source: "official",
  },
  {
    id: "winter-hiking",
    title: "Winter Hiking",
    question: "What is the best local trail when the weather is cold but dry?",
    answer:
      "Oakwood Loop Trail is the safest default for a short winter walk. It has a manageable grade, good visibility, and steady use throughout the day.",
    source: "public",
  },
  {
    id: "volunteer-needs",
    title: "Volunteer Needs",
    question: "Where can I volunteer this month if I only have a few hours?",
    answer:
      "The Lions Club pantry drive, library event support, and the Spring Cleanup all have short-shift options that work well for first-time volunteers.",
    source: "community",
  },
];

const forumSourceMeta = {
  community: {
    label: "Community Question",
    note: "Replies are open so neighbors can share suggestions and experience.",
    locked: false,
    anonymous: false,
  },
  public: {
    label: "Public",
    note: "This public-facing thread is read-only in the forum view.",
    locked: true,
    anonymous: false,
  },
  official: {
    label: "Public Official",
    note: "Public official posts stay anonymous and replies are turned off.",
    locked: true,
    anonymous: true,
  },
};

const fundingData = [
  { label: "Infrastructure", amount: 5.5 },
  { label: "Public Safety", amount: 4.6 },
  { label: "Community Spaces", amount: 4.6 },
  { label: "Sustainability", amount: 3.7 },
];

function getFundingBreakdown(items) {
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  if (!totalAmount) {
    return items.map((item) => ({ ...item, share: 0 }));
  }

  const withShares = items.map((item, index) => {
    const rawShare = (item.amount / totalAmount) * 100;
    const wholeShare = Math.floor(rawShare);
    return {
      ...item,
      index,
      rawShare,
      share: wholeShare,
      remainder: rawShare - wholeShare,
    };
  });

  let remainingPoints = 100 - withShares.reduce((sum, item) => sum + item.share, 0);
  withShares
    .slice()
    .sort((left, right) => right.remainder - left.remainder || left.index - right.index)
    .slice(0, remainingPoints)
    .forEach((item) => {
      item.share += 1;
    });

  return withShares.sort((left, right) => left.index - right.index);
}

const communityMemoryShowcase = [
  {
    id: "concert-green",
    title: "Summer concert on the green",
    location: "Town Green",
    ageLabel: "8 months ago",
    strengthScore: 82,
    revived: true,
    excerpt:
      "Families spread out lawn chairs while the sky turned pink over the band shell and the whole green felt connected for a night.",
    detail:
      "Residents described this memory as one of those evenings where different parts of town mixed naturally: younger families near the fountain, older neighbors near the path, and students drifting between both.",
  },
  {
    id: "maple-bakery",
    title: "The bakery on Maple before school",
    location: "Maple Avenue",
    ageLabel: "17 months ago",
    strengthScore: 46,
    revived: false,
    excerpt:
      "People still remember the smell of bread and warm cookies right before first period and the way everyone stopped in for a few minutes.",
    detail:
      "Even though the storefront is gone, the post keeps coming back whenever people talk about places that made downtown feel personal and welcoming.",
  },
  {
    id: "snow-hill",
    title: "Snow tunnel season on Fairview Hill",
    location: "Fairview",
    ageLabel: "3 years ago",
    strengthScore: 68,
    revived: true,
    excerpt:
      "After the storm, neighbors built sled paths, tiny snow walls, and long tunnels that stayed up for almost a week.",
    detail:
      "This memory revives whenever winter photos are shared because it represents a very local kind of community tradition: kids outside for hours while adults trade shovels and hot chocolate.",
  },
];

const communityUnsentShowcase = [
  {
    id: "quiet-students",
    title: "Checking in on quiet students",
    tone: "Care",
    body:
      "I wish more people checked in on the quiet students. A lot of people look completely fine until you actually ask how they are doing.",
    detail:
      "Notes like this make room for honesty without demanding attention. The goal is to answer with care, not noise.",
    reactions: {
      heardYou: 18,
      relate: 11,
      support: 14,
      thankYou: 6,
    },
  },
  {
    id: "library-thanks",
    title: "A thank you never sent",
    tone: "Gratitude",
    body:
      "I never properly thanked the librarian who helped me after school. That room felt safe on days when everything else felt loud.",
    detail:
      "Gratitude belongs here too. A note can be deeply personal while still feeling gentle, public, and shared.",
    reactions: {
      heardYou: 9,
      relate: 15,
      support: 8,
      thankYou: 21,
    },
  },
  {
    id: "new-family",
    title: "Starting over quietly",
    tone: "Transition",
    body:
      "Moving into a new town is lonelier than people think. I am grateful when even one person remembers my name a second time.",
    detail:
      "Some thoughts are too small or tender for a public debate, but they still shape what community feels like day to day.",
    reactions: {
      heardYou: 13,
      relate: 17,
      support: 12,
      thankYou: 4,
    },
  },
];

const communityIssueShowcase = {
  title: "Should the town open a supervised teen center on Friday evenings?",
  perspectives: [
    {
      id: "student",
      label: "Student",
      summary:
        "Students may value a safe place to gather that does not require spending money downtown every weekend.",
      concerns: ["Access", "Hours", "Activities"],
      values: ["Belonging", "Affordability", "Safety"],
      actions: [
        "Keep entry free or very low cost",
        "Offer both social and quiet spaces",
        "Survey students after the pilot",
      ],
      compromise:
        "Start with Friday-only hours for six months and review attendance, behavior, and student feedback.",
    },
    {
      id: "parent",
      label: "Parent",
      summary:
        "Parents may support the idea if transportation, supervision, and closing procedures are clearly defined in advance.",
      concerns: ["Supervision", "Transportation", "Pickup Procedures"],
      values: ["Security", "Consistency", "Wellbeing"],
      actions: [
        "Publish arrival and pickup expectations",
        "Require trained staff on site",
        "Set a firm closing routine for the pilot",
      ],
      compromise:
        "Begin with an earlier closing time and expand only if the first review period goes well.",
    },
    {
      id: "business-owner",
      label: "Business Owner",
      summary:
        "Business owners may focus on parking, noise, and whether the program reduces loitering in nearby commercial areas.",
      concerns: ["Noise", "Parking", "Downtown Impact"],
      values: ["Order", "Predictability", "Community Vitality"],
      actions: [
        "Track neighborhood complaints during the pilot",
        "Coordinate parking expectations",
        "Keep entrances supervised before and after closing",
      ],
      compromise:
        "Review attendance and downtown complaint data every 30 days before continuing the pilot unchanged.",
    },
    {
      id: "local-official",
      label: "Local Official",
      summary:
        "Officials may weigh staffing, insurance, cost, and whether the program can be measured with clear success criteria.",
      concerns: ["Budget", "Staffing", "Liability"],
      values: ["Accountability", "Feasibility", "Public Trust"],
      actions: [
        "Define measurable success criteria before launch",
        "Set a fixed pilot budget",
        "Publish a review timeline with public updates",
      ],
      compromise:
        "Approve a limited pilot with a public report at 60 days and a final recommendation after six months.",
    },
  ],
};

const communityModerationQueue = [
  {
    label: "Message Review",
    title: "A new note is waiting for review",
    note: "A quick check keeps the public feed calm, safe, and consistent with community standards.",
  },
  {
    label: "Reply Review",
    title: "A supportive reply is in the queue",
    note: "Replies stay short and carefully moderated so the space feels reassuring rather than overwhelming.",
  },
  {
    label: "Decision Record",
    title: "Each action leaves a clear trail",
    note: "Approvals, removals, and notes are recorded so moderation stays consistent over time.",
  },
];

const communityCommentSeeds = {
  "memory:concert-green": [
    {
      name: "Ella",
      body: "I still remember how many families stayed long after the music ended just talking on the lawn.",
      createdAt: "2026-03-14T18:00:00.000Z",
    },
  ],
  "memory:maple-bakery": [
    {
      name: "Neighbor",
      body: "That place always smelled warm before school, even on the coldest mornings.",
      createdAt: "2026-03-11T08:15:00.000Z",
    },
  ],
  "memory:snow-hill": [
    {
      name: "Ari",
      body: "The tunnel stayed up for days and every kid on the block ended up there at some point.",
      createdAt: "2026-03-09T15:40:00.000Z",
    },
  ],
  "unsent:quiet-students": [
    {
      name: "Anonymous",
      body: "A small check-in can change the whole day for someone who is trying hard not to be noticed.",
      createdAt: "2026-03-16T12:05:00.000Z",
    },
  ],
  "unsent:library-thanks": [
    {
      name: "Neighbor",
      body: "The library has quietly carried a lot of people through difficult seasons.",
      createdAt: "2026-03-13T16:20:00.000Z",
    },
  ],
  "unsent:new-family": [
    {
      name: "Anonymous",
      body: "Being remembered matters more than people realize when you are still learning a place.",
      createdAt: "2026-03-10T10:50:00.000Z",
    },
  ],
  "issue:student": [
    {
      name: "Resident",
      body: "A space like this could help students who want somewhere safe to go without having to spend money.",
      createdAt: "2026-03-17T09:00:00.000Z",
    },
  ],
  "issue:parent": [
    {
      name: "Parent",
      body: "I would support it if pickup rules, supervision, and staffing were all very clear from the start.",
      createdAt: "2026-03-18T19:10:00.000Z",
    },
  ],
  "issue:business-owner": [
    {
      name: "Business Owner",
      body: "Downtown businesses would probably want regular check-ins about noise and parking during the pilot.",
      createdAt: "2026-03-15T14:35:00.000Z",
    },
  ],
  "issue:local-official": [
    {
      name: "Town Staff",
      body: "A short pilot with clear review dates would make the decision easier to evaluate fairly.",
      createdAt: "2026-03-19T11:45:00.000Z",
    },
  ],
  "forum:volunteer-needs": [
    {
      name: "Neighbor",
      body: "The pantry always has short sorting shifts, and cleanup mornings are easy to join even for first-timers.",
      createdAt: "2026-03-19T14:20:00.000Z",
    },
    {
      name: "Maya",
      body: "If you want something indoors, the library usually posts event-help slots that only last a couple of hours.",
      createdAt: "2026-03-20T11:05:00.000Z",
    },
  ],
};

const supportModalContent = {
  alerts: {
    title: "Town Alert Sign-up",
    body: `
      <p>Choose how you want to hear from the town during weather, utility, and emergency events.</p>
      <form data-alert-signup-form novalidate>
        <label class="input-group"><span>Name</span><input class="input" name="name" type="text" required></label>
        <label class="input-group"><span>Email</span><input class="input" name="email" type="email" required></label>
        <label class="input-group"><span>Phone</span><input class="input" name="phone" type="text"></label>
        <div class="button-row"><button class="button button-primary" type="submit">Save Sign-up</button></div>
        <p class="form-status" data-modal-status></p>
      </form>
    `,
  },
  hotlines: {
    title: "Support & Hotlines",
    body: `
      <ul class="stack-list">
        <li><strong>911</strong> Emergency dispatch</li>
        <li><strong>988</strong> Suicide & Crisis Lifeline</li>
        <li><strong>211</strong> Local services and assistance navigation</li>
        <li><strong>NJ Mental Health Hotline</strong> Statewide support resources</li>
        <li><strong>Local Wellness Center</strong> Community counseling referrals</li>
      </ul>
    `,
  },
  pantry: {
    title: "Schedule a Pantry Pickup",
    body: `
      <form data-pantry-form novalidate>
        <label class="input-group"><span>Name</span><input class="input" name="name" type="text" required></label>
        <label class="input-group"><span>Preferred Day</span><input class="input" name="day" type="text" placeholder="Tuesday morning"></label>
        <label class="input-group"><span>Notes</span><textarea class="input" name="notes" rows="4"></textarea></label>
        <div class="button-row"><button class="button button-primary" type="submit">Request Pickup</button></div>
        <p class="form-status" data-modal-status></p>
      </form>
    `,
  },
  "lost-pet": {
    title: "Report a Lost Pet",
    body: `
      <form data-lost-pet-form novalidate>
        <label class="input-group"><span>Pet name</span><input class="input" name="pet" type="text" required></label>
        <label class="input-group"><span>Description</span><textarea class="input" name="description" rows="4" required></textarea></label>
        <label class="input-group"><span>Last seen</span><input class="input" name="lastSeen" type="text" required></label>
        <label class="input-group"><span>Contact</span><input class="input" name="contact" type="text" required></label>
        <div class="button-row"><button class="button button-primary" type="submit">Send Report</button></div>
        <p class="form-status" data-modal-status></p>
      </form>
    `,
  },
  ticket: {
    title: "File a Town Improvement Ticket",
    body: `
      <form data-ticket-form novalidate>
        <label class="input-group">
          <span>Category</span>
          <select class="input" name="category" required>
            <option value="">Choose a category</option>
            <option value="Pothole">Pothole</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Signage">Signage</option>
            <option value="Sidewalk">Sidewalk</option>
            <option value="Drainage">Drainage</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label class="input-group"><span>Location</span><input class="input" name="location" type="text" required></label>
        <label class="input-group"><span>Description</span><textarea class="input" name="description" rows="4" required></textarea></label>
        <div class="button-row"><button class="button button-primary" type="submit">Create Ticket</button></div>
        <p class="form-status" data-modal-status></p>
      </form>
    `,
  },
  contacts: {
    title: "Emergency Contacts",
    body: `
      <ul class="stack-list">
        <li><strong>911</strong> Emergency response</li>
        <li><strong>Police non-emergency</strong> (908) 665-1111</li>
        <li><strong>Town Hall</strong> (908) 665-1400</li>
        <li><strong>Public Works</strong> (908) 665-1400</li>
        <li><strong>After-hours utilities</strong> Local emergency notice line</li>
      </ul>
    `,
  },
  volunteer: {
    title: "Volunteer Opportunities",
    body: `
      <ul class="stack-list">
        <li>Spring Cleanup marshals - Saturday morning</li>
        <li>Library teen maker lab event support - Thursday evening</li>
        <li>Food pantry sorting team - Tuesday and Thursday shifts</li>
        <li>Senior center tech help desk - once per month</li>
      </ul>
    `,
  },
};

function safeRead(key, storage = localStorage, fallback = []) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function safeWrite(key, value, storage = localStorage) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

function safeInit(fn) {
  try {
    fn();
  } catch (error) {
    console.error(error);
  }
}

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function debounce(fn, wait = 150) {
  let timeout = 0;
  return (...args) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => fn(...args), wait);
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function capitalize(value = "") {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  const ratio = (value - inMin) / (inMax - inMin);
  return outMin + ratio * (outMax - outMin);
}

function formatCommunityCommentDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Today";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parsed);
}

function createLocalDate(year, monthIndex, day) {
  return new Date(year, monthIndex, day, 12);
}

function createDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseCalendarDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return createLocalDate(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (typeof value !== "string") return null;

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return createLocalDate(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]));
  }

  const shortMatch = value.match(/^([A-Za-z]{3,9})\s+(\d{1,2})(?:,\s*(\d{4}))?$/);
  if (shortMatch) {
    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const monthIndex = monthNames.findIndex((month) =>
      month.startsWith(shortMatch[1].toLowerCase()),
    );
    if (monthIndex >= 0) {
      const year = Number(shortMatch[3] || new Date().getFullYear());
      return createLocalDate(year, monthIndex, Number(shortMatch[2]));
    }
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return createLocalDate(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function shiftCalendarMonth(date, amount) {
  return createLocalDate(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameCalendarMonth(left, right) {
  return (
    left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth()
  );
}

function formatCalendarMonthLabel(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
}

function formatCalendarSelectedLabel(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function normalizeCalendarItems(items, fallbackSource = "submitted") {
  return items
    .map((item, index) => {
      const dateObject = parseCalendarDate(item.date);
      if (!dateObject) return null;
      return {
        id: item.id || `calendar-${fallbackSource}-${index}`,
        date: createDateKey(dateObject),
        dateObject,
        title: String(item.title || "").trim(),
        note: String(item.note || "").trim(),
        location: String(item.location || "").trim(),
        source: item.source || fallbackSource,
      };
    })
    .filter(Boolean)
    .sort(
      (left, right) =>
        left.dateObject.getTime() - right.dateObject.getTime() ||
        left.title.localeCompare(right.title),
    );
}

function readCommunityCommentStore() {
  return safeRead(STORAGE_KEYS.communityComments, localStorage, {});
}

function getCommunityComments(threadKey) {
  const store = readCommunityCommentStore();
  const seeded = communityCommentSeeds[threadKey] || [];
  const stored = Array.isArray(store[threadKey]) ? store[threadKey] : [];
  return [...seeded, ...stored].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

function addCommunityComment(threadKey, comment) {
  const store = readCommunityCommentStore();
  const next = {
    ...store,
    [threadKey]: [...(Array.isArray(store[threadKey]) ? store[threadKey] : []), comment],
  };
  safeWrite(STORAGE_KEYS.communityComments, next, localStorage);
}

function renderCommunityCommentBlock({
  threadKey,
  title,
  emptyText,
  submitLabel,
  placeholder,
  defaultName,
  comments = getCommunityComments(threadKey),
  countOverride,
}) {
  const commentCount = typeof countOverride === "number" ? countOverride : comments.length;
  const countLabel = `${commentCount} ${commentCount === 1 ? "comment" : "comments"}`;

  return `
    <div class="community-comment-block" data-community-thread="${threadKey}">
      <div class="community-comment-block__top">
        <p class="input-label">${escapeHtml(title)}</p>
        <span class="community-comment-count">${escapeHtml(countLabel)}</span>
      </div>
      <div class="community-comment-list">
        ${
          comments.length
            ? comments
                .map(
                  (comment) => `
                    <article class="community-comment">
                      <div class="community-comment__meta">
                        <strong>${escapeHtml(comment.name || defaultName)}</strong>
                        <span>${escapeHtml(formatCommunityCommentDate(comment.createdAt))}</span>
                      </div>
                      <p class="community-comment__body">${escapeHtml(comment.body)}</p>
                    </article>
                  `,
                )
                .join("")
            : `<p class="community-comment-empty">${escapeHtml(emptyText)}</p>`
        }
      </div>
      <form
        class="community-comment-form"
        data-community-comment-form="${threadKey}"
        data-default-name="${escapeHtml(defaultName)}"
        novalidate
      >
        <label class="input-group">
          <span>Name (optional)</span>
          <input class="input" name="name" type="text" maxlength="40" placeholder="${escapeHtml(defaultName)}" />
        </label>
        <label class="input-group">
          <span>Comment</span>
          <textarea class="input" name="body" rows="3" placeholder="${escapeHtml(placeholder)}" required></textarea>
        </label>
        <div class="button-row">
          <button class="button button-ghost" type="submit">${escapeHtml(submitLabel)}</button>
        </div>
        <p class="form-status" data-community-comment-status></p>
      </form>
    </div>
  `;
}

function bindCommunityCommentForms(root, rerender) {
  $$("[data-community-comment-form]", root).forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const body = String(formData.get("body") || "").trim();
      const status = $("[data-community-comment-status]", form);
      const defaultName = form.dataset.defaultName || "Neighbor";

      if (body.length < 3) {
        if (status) {
          status.textContent = "Please write a little more before posting.";
          status.className = "form-status is-error";
        }
        return;
      }

      addCommunityComment(form.dataset.communityCommentForm, {
        name: String(formData.get("name") || "").trim() || defaultName,
        body,
        createdAt: new Date().toISOString(),
      });

      showToast("Comment added.", "success");
      rerender();
    });
  });
}

function smoothSwap(elements, update, delay = 180) {
  const targets = (Array.isArray(elements) ? elements : [elements]).filter(Boolean);
  if (!targets.length) {
    update();
    return;
  }

  targets.forEach((element) => element.classList.add("copy-fade-out"));
  window.setTimeout(() => {
    update();
    requestAnimationFrame(() => {
      targets.forEach((element) => element.classList.remove("copy-fade-out"));
    });
  }, delay);
}

function getCategoryLabel(category) {
  const labels = {
    all: "All",
    food: "Food",
    civic: "Civic",
    education: "Education",
    youth: "Youth",
    arts: "Arts",
    recreation: "Recreation",
    outdoors: "Outdoors",
    health: "Health",
    social: "Social",
    dining: "Dining",
    shopping: "Shopping",
  };
  return labels[category] || capitalize(category);
}

function showToast(message, type = "info") {
  let root = $(".toast-stack");
  if (!root) {
    root = document.createElement("div");
    root.className = "toast-stack";
    document.body.appendChild(root);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  root.appendChild(toast);

  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(18px)";
    window.setTimeout(() => toast.remove(), 320);
  }, 3200);
}

const modalState = {
  root: null,
  panel: null,
  close: null,
  content: null,
  previousFocus: null,
};

function ensureModalRoot() {
  if (modalState.root) return modalState;
  const root = document.createElement("div");
  root.className = "modal-root";
  root.innerHTML = `
    <div class="modal-backdrop" data-modal-backdrop></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-live="polite">
      <button class="modal-close" type="button" aria-label="Close modal" data-modal-close>&times;</button>
      <div data-modal-content></div>
    </div>
  `;
  document.body.appendChild(root);
  modalState.root = root;
  modalState.panel = $("[data-modal-content]", root);
  modalState.close = $("[data-modal-close]", root);

  modalState.close.addEventListener("click", closeModal);
  $("[data-modal-backdrop]", root).addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && root.classList.contains("is-open")) {
      closeModal();
    }
  });

  return modalState;
}

function closeModal() {
  const { root, previousFocus } = ensureModalRoot();
  root.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

function openModal({ title, body, onOpen }) {
  const { root, panel } = ensureModalRoot();
  modalState.previousFocus = document.activeElement;
  panel.innerHTML = `<h2>${escapeHtml(title)}</h2>${body}`;
  root.classList.add("is-open");
  if (typeof onOpen === "function") onOpen(root);
  const focusTarget = root.querySelector("input, textarea, select, button");
  if (focusTarget) focusTarget.focus();
}

function intersectOnce(selector, callback, options = {}) {
  const elements = $$(selector);
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      callback(entry.target);
      observer.unobserve(entry.target);
    });
  }, options);
  elements.forEach((element) => observer.observe(element));
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "ig");
  return escapeHtml(text).replace(regex, "<mark>$1</mark>");
}

function buildBulletinInbox() {
  return safeRead(STORAGE_KEYS.bulletinInbox, sessionStorage, []);
}

function pushBulletinInbox(item) {
  const inbox = buildBulletinInbox();
  inbox.unshift(item);
  safeWrite(STORAGE_KEYS.bulletinInbox, inbox, sessionStorage);
}

function openSupportModal(key) {
  const config = supportModalContent[key];
  if (!config) return;
  openModal({
    title: config.title,
    body: config.body,
    onOpen: () => {
      const root = ensureModalRoot().root;
      if (key === "alerts") {
        const form = root.querySelector("[data-alert-signup-form]");
        const status = root.querySelector("[data-modal-status]");
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const payload = Object.fromEntries(new FormData(form).entries());
          const signups = safeRead(STORAGE_KEYS.alertSignups, localStorage, []);
          signups.unshift(payload);
          safeWrite(STORAGE_KEYS.alertSignups, signups, localStorage);
          status.textContent = "You're signed up for town alerts.";
          status.className = "form-status is-success";
          showToast("Alert preferences updated.", "success");
        });
      }

      if (key === "pantry") {
        const form = root.querySelector("[data-pantry-form]");
        const status = root.querySelector("[data-modal-status]");
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          status.textContent = "Pickup request received.";
          status.className = "form-status is-success";
          showToast("Pickup request received.", "success");
        });
      }

      if (key === "lost-pet") {
        const form = root.querySelector("[data-lost-pet-form]");
        const status = root.querySelector("[data-modal-status]");
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const payload = Object.fromEntries(new FormData(form).entries());
          pushBulletinInbox({
            type: "Lost Pet",
            title: `${payload.pet} reported missing`,
            note: `${payload.description} · Last seen ${payload.lastSeen} · ${payload.contact}`,
          });
          status.textContent = "Lost pet notice submitted to the community board.";
          status.className = "form-status is-success";
          showToast("Lost pet notice submitted.", "success");
        });
      }

      if (key === "ticket") {
        const form = root.querySelector("[data-ticket-form]");
        const status = root.querySelector("[data-modal-status]");
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const payload = Object.fromEntries(new FormData(form).entries());
          const ticketId = `T-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
          pushBulletinInbox({
            type: "Street Project",
            title: `${payload.category} ticket ${ticketId} created`,
            note: `${payload.location} · ${payload.description}`,
          });
          status.textContent = `Ticket ${ticketId} submitted successfully.`;
          status.className = "form-status is-success";
          showToast(`Ticket ${ticketId} submitted.`, "success");
        });
      }
    },
  });
}

function initPageTransitions() {
  document.body.classList.add("page-ready");
  $$("a[href]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (link.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      document.body.classList.remove("page-ready");
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 380);
    });
  });
}

function initHeader() {
  const header = $("[data-header]");
  const toggle = $("[data-menu-toggle]");
  const nav = $("[data-nav]");
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  if (toggle && nav) {
    const mobileNavQuery = window.matchMedia("(max-width: 1180px)");
    nav.id ||= "site-navigation";
    toggle.setAttribute("aria-controls", nav.id);

    const setMenuState = (isOpen) => {
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      document.body.classList.toggle("nav-open", isOpen);
      nav.setAttribute("aria-hidden", String(mobileNavQuery.matches ? !isOpen : false));
      if ("inert" in nav) {
        nav.inert = mobileNavQuery.matches ? !isOpen : false;
      }
    };

    const syncMenuState = () => {
      if (!mobileNavQuery.matches) {
        setMenuState(false);
        nav.removeAttribute("aria-hidden");
        if ("inert" in nav) {
          nav.inert = false;
        }
        return;
      }
      setMenuState(document.body.classList.contains("nav-open"));
    };

    toggle.addEventListener("click", () => {
      if (!mobileNavQuery.matches) return;
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      setMenuState(!expanded);
    });

    $$("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        setMenuState(false);
      }
    });

    if ("addEventListener" in mobileNavQuery) {
      mobileNavQuery.addEventListener("change", syncMenuState);
    } else {
      mobileNavQuery.addListener(syncMenuState);
    }

    syncMenuState();
  }
}

function initWarningBanner() {
  const banner = $("[data-warning-banner]");
  const text = $("[data-warning-text]");
  const alertsButton = $("[data-open-alerts]");
  if (!banner || !text) return;

  if (!activeWarnings.length) {
    banner.classList.add("is-hidden");
  } else {
    banner.classList.remove("is-hidden");
    text.textContent = activeWarnings[0].text;
    banner.addEventListener("click", () => {
      openModal({
        title: "Active Town Alerts",
        body: `<ul class="stack-list">${activeWarnings
          .map((warning) => `<li>${escapeHtml(warning.text)}</li>`)
          .join("")}</ul>`,
      });
    });
  }

  if (alertsButton) {
    alertsButton.addEventListener("click", () => {
      if (!activeWarnings.length) {
        openModal({
          title: "Town Alerts",
          body: "<p>There are no active warnings right now. You can still use the Support page to sign up for alert notifications.</p>",
        });
        return;
      }
      banner.click();
    });
  }
}

function initReveals() {
  intersectOnce(
    ".reveal",
    (element) => {
      element.classList.add("is-visible");
    },
    { threshold: 0.16 },
  );
}

function initCounters() {
  intersectOnce("[data-count]", (element) => {
    const target = Number(element.dataset.count || 0);
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";
    const start = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted =
        target >= 1000 && !suffix
          ? Math.round(current).toLocaleString()
          : Number(current.toFixed(target % 1 ? 1 : 0)).toLocaleString();
      element.textContent = `${prefix}${formatted}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

function initHomeLiveUpdates() {
  const target = $("[data-live-updates]");
  const today = $("[data-today-date]");
  if (today) {
    today.textContent = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }
  if (!target) return;

  let messageIndex = 0;
  target.textContent = liveUpdates[messageIndex];
  window.setInterval(() => {
    messageIndex = (messageIndex + 1) % liveUpdates.length;
    smoothSwap(target, () => {
      target.textContent = liveUpdates[messageIndex];
    });
  }, 4200);
}

function initHomeLayerCards() {
  const cards = $$("[data-layer-card]");
  if (!cards.length) return;

  const setActive = (activeCard) => {
    cards.forEach((card, index) => {
      const isActive = card === activeCard;
      card.classList.toggle("is-active", isActive);
      card.style.zIndex = isActive ? "4" : String(cards.length - index);
    });
  };

  const initial = cards.find((card) => card.classList.contains("is-active")) || cards[0];
  setActive(initial);

  cards.forEach((card) => {
    card.addEventListener("click", () => setActive(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActive(card);
      }
    });
  });
}

function initHomeHighlights() {
  const stage = $("[data-home-highlights]");
  if (!stage) return;
  const image = $("[data-highlight-image]");
  const title = $("[data-highlight-title]");
  const note = $("[data-highlight-note]");
  const link = $("[data-highlight-link]");
  const progress = $("[data-highlight-progress]");
  const prev = $("[data-highlight-prev]");
  const next = $("[data-highlight-next]");
  const dots = $("[data-highlight-dots]");
  const slides = resourceData.filter((item) => item.spotlight);
  if (!slides.length) return;

  let index = 0;
  let interval = 0;

  const renderDots = () => {
    dots.innerHTML = "";
    slides.forEach((item, itemIndex) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = itemIndex === index ? "active" : "";
      dot.setAttribute("aria-label", `Show ${item.name}`);
      dot.addEventListener("click", () => {
        index = itemIndex;
        render();
        restart();
      });
      dots.appendChild(dot);
    });
  };

  const commitSlide = () => {
    const slide = slides[index];
    image.style.backgroundImage = `url("${slide.image}")`;
    title.textContent = slide.name;
    note.textContent = slide.description;
    link.href = `explore.html?resource=${slide.id}`;
    progress.style.width = "0%";
    window.requestAnimationFrame(() => {
      progress.style.transition = "width 7.2s linear";
      progress.style.width = "100%";
    });
    renderDots();
  };

  const render = (immediate = false) => {
    if (immediate) {
      commitSlide();
      return;
    }
    stage.classList.add("is-swapping");
    window.setTimeout(() => {
      commitSlide();
      requestAnimationFrame(() => stage.classList.remove("is-swapping"));
    }, 220);
  };

  const restart = () => {
    window.clearInterval(interval);
    progress.style.transition = "none";
    interval = window.setInterval(() => {
      index = (index + 1) % slides.length;
      render();
    }, 7400);
  };

  prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
    restart();
  });

  next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    render();
    restart();
  });

  stage.addEventListener("mouseenter", () => window.clearInterval(interval));
  stage.addEventListener("mouseleave", restart);

  render(true);
  restart();
}

function createCategoryIcon(category) {
  return getCategoryLabel(category).slice(0, 1);
}

function getSuggestedResources() {
  return safeRead(STORAGE_KEYS.suggestedResources, localStorage, []);
}

function getAllResources() {
  return [...resourceData, ...getSuggestedResources()];
}

let selectedResourceId = null;
let townMapApi = null;

function syncResourceDetail(resource) {
  const panel = $("[data-resource-detail]");
  if (!panel || !resource) return;
  const media = $("[data-detail-media]", panel);
  const mediaImage = $("[data-detail-image]", panel);
  $("[data-detail-name]", panel).textContent = resource.name;
  $("[data-detail-description]", panel).textContent = resource.description;
  if (media && mediaImage) {
    if (resource.image) {
      media.hidden = false;
      mediaImage.src = resource.image;
      mediaImage.alt = `${resource.name} in New Providence`;
    } else {
      media.hidden = true;
      mediaImage.src = "";
      mediaImage.alt = "";
    }
  }
  const address = $("[data-detail-address]", panel);
  const phone = $("[data-detail-phone]", panel);
  const hours = $("[data-detail-hours]", panel);
  address.innerHTML = resource.address
    ? `<a href="https://www.google.com/maps/search/${encodeURIComponent(resource.address)}" target="_blank" rel="noreferrer">${escapeHtml(
        resource.address,
      )}</a>`
    : "—";
  phone.textContent = resource.phone || "—";
  hours.textContent = resource.hours || "—";
  const tags = $("[data-detail-tags]", panel);
  tags.innerHTML = "";
  [...(resource.tags || []), resource.suggested ? "suggested" : "official"].forEach((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    tags.appendChild(chip);
  });
}

function focusExploreEmbeddedMap(resource, options = {}) {
  const iframe = document.getElementById("map-iframe");
  if (!iframe || !resource) return;

  if (!iframe.dataset.defaultSrc) iframe.dataset.defaultSrc = iframe.src;

  const query = (resource.address || `${resource.name}, New Providence, NJ`).trim();
  iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

  const tooltip = $("[data-map-tooltip]");
  if (tooltip) {
    tooltip.textContent = `Focused on ${resource.name}.`;
  }

  const shouldScroll =
    options.scroll ?? window.matchMedia("(max-width: 1080px)").matches;
  if (shouldScroll) {
    iframe.closest(".map-shell")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function focusExploreMapById(id, options = {}) {
  const resource = getAllResources().find((item) => item.id === id);
  if (!resource) return;

  if (townMapApi) {
    townMapApi.focus(id);
    return;
  }

  focusExploreEmbeddedMap(resource, options);
}

function resetExploreMap() {
  if (townMapApi) {
    townMapApi.reset();
    return;
  }

  const iframe = document.getElementById("map-iframe");
  if (!iframe) return;

  if (!iframe.dataset.defaultSrc) iframe.dataset.defaultSrc = iframe.src;
  iframe.src = iframe.dataset.defaultSrc;

  const tooltip = $("[data-map-tooltip]");
  if (tooltip) {
    tooltip.textContent = "Showing the full town map.";
  }
}

function renderExploreResources() {
  const results = $("[data-resource-results]");
  const search = $("[data-resource-search]");
  const neighborhood = $("[data-neighborhood-filter]");
  const count = $("[data-results-count]");
  if (!results || !search || !neighborhood) return;

  const activePill = $(".filter-pill.is-active");
  const category = activePill ? activePill.dataset.category : "all";
  const query = search.value.trim().toLowerCase();
  const allResources = getAllResources();
  const filtered = allResources.filter((item) => {
    const haystack = [
      item.name,
      item.description,
      item.address,
      item.phone,
      item.hours,
      ...(item.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = category === "all" || item.category === category;
    const matchesNeighborhood =
      neighborhood.value === "all" || item.neighborhood === neighborhood.value;
    return matchesQuery && matchesCategory && matchesNeighborhood;
  });

  count.textContent = `Showing ${filtered.length} of ${allResources.length} resources`;

  if (townMapApi) {
    townMapApi.filter({
      ids: new Set(filtered.map((item) => item.id)),
    });
  }

  if (!filtered.length) {
    results.innerHTML = `
      <div class="resource-empty">
        <p class="eyebrow">No results</p>
        <h3>Nothing matches that filter yet.</h3>
        <p>Try searching a category, neighborhood, or a simpler keyword.</p>
      </div>
    `;
    return;
  }

  results.innerHTML = filtered
    .map((item) => {
      const active = item.id === selectedResourceId;
      const spotlight = item.spotlight ? '<span class="resource-card__badge">Spotlight</span>' : "";
      const badge = item.suggested ? '<span class="resource-card__badge">Suggested</span>' : spotlight;
      const media = item.image
        ? `
          <div class="resource-card__image-wrap">
            <img
              class="resource-card__image"
              src="${item.image}"
              alt=""
              loading="lazy"
            />
          </div>
        `
        : "";
      return `
        <button
          class="resource-card card${active ? " is-selected" : ""}"
          type="button"
          data-resource-card="${item.id}"
          aria-pressed="${active ? "true" : "false"}"
        >
          ${media}
          <div class="resource-card__top">
            <span class="resource-card__icon">${createCategoryIcon(item.category)}</span>
            ${badge}
          </div>
          <h3>${highlightText(item.name, query)}</h3>
          <p>${highlightText(item.description, query)}</p>
          <div class="resource-card__meta">
            <span class="resource-card__badge">${getCategoryLabel(item.category)}</span>
            <span class="resource-card__badge">${item.neighborhood || "Suggested"}</span>
          </div>
          <span class="resource-card__action">
            View on map
            <span class="resource-card__arrow" aria-hidden="true">→</span>
          </span>
        </button>
      `;
    })
    .join("");

  $$("[data-resource-card]", results).forEach((card) => {
    card.addEventListener("click", () => {
      const resource = getAllResources().find((item) => item.id === card.dataset.resourceCard);
      if (!resource) return;
      selectedResourceId = resource.id;
      syncResourceDetail(resource);
      renderExploreResources();
      focusExploreMapById(resource.id);
    });
  });
}

function initExploreFilters() {
  const pillRoot = $("[data-category-pills]");
  if (!pillRoot) return;
  const categories = [
    "all",
    "food",
    "civic",
    "education",
    "youth",
    "arts",
    "recreation",
    "outdoors",
    "health",
    "social",
    "dining",
    "shopping",
  ];
  pillRoot.innerHTML = categories
    .map(
      (category) => `
        <button
          class="filter-pill${category === "all" ? " is-active" : ""}"
          type="button"
          data-category="${category}"
        >
          ${getCategoryLabel(category)}
        </button>
      `,
    )
    .join("");

  $$(".filter-pill", pillRoot).forEach((pill) => {
    pill.addEventListener("click", () => {
      $$(".filter-pill", pillRoot).forEach((button) => button.classList.remove("is-active"));
      pill.classList.add("is-active");
      renderExploreResources();
    });
  });
}

function initResourceDetailActions() {
  const mapButton = $("[data-detail-map]");
  const shareButton = $("[data-detail-share]");

  if (mapButton) {
    mapButton.addEventListener("click", () => {
      if (!selectedResourceId) {
        showToast("Select a resource first.", "error");
        return;
      }

      const resource = getAllResources().find((item) => item.id === selectedResourceId);
      focusExploreMapById(selectedResourceId);

      if (resource?.address) {
        window.open(
          `https://www.google.com/maps/search/${encodeURIComponent(resource.address)}`,
          "_blank",
          "noopener,noreferrer",
        );
      } else {
        showToast("Map focus updated.", "success");
      }
    });
  }

  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      if (!selectedResourceId) {
        showToast("Select a resource first.", "error");
        return;
      }

      const url = `${window.location.origin}${window.location.pathname}?resource=${selectedResourceId}`;

      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(url);
        showToast("Resource link copied.", "success");
      } catch (error) {
        openModal({
          title: "Share Resource",
          body: `
            <p>Use the link below to share this resource.</p>
            <label class="input-group">
              <span>Share Link</span>
              <input class="input" type="text" readonly value="${escapeHtml(url)}" data-share-link-input>
            </label>
          `,
          onOpen: () => {
            const input = $("[data-share-link-input]", ensureModalRoot().root);
            if (input) {
              input.focus();
              input.select();
            }
          },
        });
      }
    });
  }
}

function createPinTexture(fill, stroke) {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const context = canvas.getContext("2d");

  context.beginPath();
  context.fillStyle = "rgba(0,0,0,0.16)";
  context.ellipse(48, 78, 16, 8, 0, 0, Math.PI * 2);
  context.fill();

  context.lineWidth = 5;
  context.fillStyle = fill;
  context.strokeStyle = stroke;
  context.beginPath();
  context.arc(48, 34, 18, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.beginPath();
  context.moveTo(48, 52);
  context.lineTo(36, 78);
  context.lineTo(60, 78);
  context.closePath();
  context.fill();
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function initExploreTown() {
  const mount = $("[data-town-map]");
  const tooltip = $("[data-map-tooltip]");
  const resetButton = $("[data-reset-map]");
  if (!mount || typeof THREE === "undefined") return;

  const loading = document.createElement("div");
  loading.className = "town-loading";
  loading.textContent = "Loading town...";
  mount.appendChild(loading);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xe8ece8, 0.00045);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.touchAction = "none";
  mount.appendChild(renderer.domElement);

  const bounds = {
    south: 40.672,
    west: -74.45,
    north: 40.723,
    east: -74.374,
  };
  const center = {
    lat: (bounds.south + bounds.north) / 2,
    lon: (bounds.west + bounds.east) / 2,
  };
  const metersPerLat = 111320;
  const metersPerLon = metersPerLat * Math.cos((center.lat * Math.PI) / 180);
  const mapWidth = Math.max(1100, (bounds.east - bounds.west) * metersPerLon);
  const mapDepth = Math.max(1100, (bounds.north - bounds.south) * metersPerLat);
  const frustum = Math.max(mapWidth, mapDepth) * 0.42;
  const aspect = mount.clientWidth / mount.clientHeight;
  const camera = new THREE.OrthographicCamera(
    (frustum * aspect) / -2,
    (frustum * aspect) / 2,
    frustum / 2,
    frustum / -2,
    1,
    6000,
  );
  const target = new THREE.Vector3(0, 0, 0);
  camera.position.set(frustum * 0.9, frustum * 0.86, frustum * 0.9);
  camera.lookAt(target);

  const ambient = new THREE.AmbientLight(0xffffff, 0.72);
  const sun = new THREE.DirectionalLight(0xfff7e1, 1.2);
  sun.position.set(frustum, frustum * 1.4, frustum * 0.5);
  sun.castShadow = true;
  scene.add(ambient, sun);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(mapWidth, mapDepth),
    new THREE.MeshStandardMaterial({
      color: 0xf2f5f2,
      roughness: 0.95,
      metalness: 0,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const roadsGroup = new THREE.Group();
  const buildingsGroup = new THREE.Group();
  const pinsGroup = new THREE.Group();
  scene.add(roadsGroup, buildingsGroup, pinsGroup);

  const roadMaterial = new THREE.LineBasicMaterial({ color: 0x1f3028, opacity: 0.34, transparent: true });
  const buildingMaterial = new THREE.MeshStandardMaterial({
    color: 0xf7f3eb,
    roughness: 0.9,
    metalness: 0,
  });
  const officialPinTexture = createPinTexture("#f0b429", "#0f2d1f");
  const suggestedPinTexture = createPinTexture("#1e5c35", "#c9922a");

  function project(lat, lon) {
    return {
      x: (lon - center.lon) * metersPerLon,
      z: (center.lat - lat) * metersPerLat,
    };
  }

  const pins = new Map();
  let activeIds = new Set(getAllResources().map((resource) => resource.id));
  let selectedPinId = null;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let dragState = null;
  let pickMode = false;
  let pickCallback = null;
  let pendingPin = null;

  function setTooltip(message) {
    if (!tooltip) return;
    tooltip.textContent = message || "";
  }

  function setPointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function hitTest(collection) {
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(collection.children, false)[0];
  }

  function focusPin(id, duration = 720) {
    const pin = pins.get(id);
    if (!pin) return;
    const offset = camera.position.clone().sub(target);
    const nextTarget = new THREE.Vector3(pin.position.x, 0, pin.position.z);
    const nextCamera = nextTarget.clone().add(offset);
    const startTarget = target.clone();
    const startCamera = camera.position.clone();
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      target.lerpVectors(startTarget, nextTarget, eased);
      camera.position.lerpVectors(startCamera, nextCamera, eased);
      camera.lookAt(target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function setSelectedPin(id) {
    selectedPinId = id;
    pins.forEach((pin, pinId) => {
      const scale = pin.userData.baseScale * (pinId === id ? 1.24 : 1);
      pin.scale.set(scale, scale, 1);
    });
  }

  function addResourcePin(resource, suggested = false) {
    const texture = suggested ? suggestedPinTexture : officialPinTexture;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(material);
    const scale = suggested ? 44 : 48;
    sprite.scale.set(scale, scale, 1);
    sprite.position.set(resource.position.x, 20, resource.position.z);
    sprite.userData = { id: resource.id, baseScale: scale };
    sprite.visible = activeIds.has(resource.id);
    pinsGroup.add(sprite);
    pins.set(resource.id, sprite);
  }

  function rebuildPins() {
    pinsGroup.clear();
    pins.clear();
    resourceData.forEach((resource) => addResourcePin(resource, false));
    getSuggestedResources().forEach((resource) => addResourcePin(resource, true));
    if (selectedPinId) setSelectedPin(selectedPinId);
  }

  function beginPick(callback) {
    pickMode = true;
    pickCallback = callback;
    setTooltip("Click on the map to place the suggested resource.");
  }

  function clearPendingPin() {
    if (!pendingPin) return;
    pinsGroup.remove(pendingPin);
    pendingPin = null;
    setTooltip("");
  }

  function saveSuggestedResource(resource) {
    const existing = getSuggestedResources();
    existing.unshift({ ...resource, suggested: true });
    safeWrite(STORAGE_KEYS.suggestedResources, existing, localStorage);
    rebuildPins();
  }

  function setFilter({ ids }) {
    activeIds = ids;
    pins.forEach((pin, id) => {
      pin.visible = activeIds.has(id);
    });
  }

  function updatePickPreview(point) {
    if (!pendingPin) {
      const material = new THREE.SpriteMaterial({
        map: suggestedPinTexture,
        transparent: true,
        depthWrite: false,
      });
      pendingPin = new THREE.Sprite(material);
      pendingPin.scale.set(44, 44, 1);
      pinsGroup.add(pendingPin);
    }
    pendingPin.position.set(point.x, 20, point.z);
  }

  function parseHeight(tags) {
    if (!tags) return 8;
    const explicit = tags.height || tags["building:height"];
    if (explicit) {
      const value = parseFloat(String(explicit).replace(/[^\d.]/g, ""));
      if (Number.isFinite(value)) return Math.max(8, Math.min(120, value));
    }
    const levels = parseFloat(tags["building:levels"]);
    if (Number.isFinite(levels)) return Math.max(8, Math.min(120, levels * 3));
    return 8;
  }

  const overpassQuery = `
[out:json][timeout:25];
(
  way["building"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
  way["highway"~"motorway|trunk|primary|secondary|tertiary|residential|unclassified|service|living_street"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
);
out geom;
`;

  async function fetchTownGeometryData() {
    try {
      const directResponse = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: overpassQuery,
      });

      if (directResponse.ok) {
        return await directResponse.json();
      }
    } catch (error) {
      console.warn("Direct Overpass request unavailable, falling back to local proxy.", error);
    }

    const localResponse = await fetch("/api/osm");

    if (!localResponse.ok) {
      throw new Error("OSM request failed");
    }

    return await localResponse.json();
  }

  async function loadTownGeometry() {
    loading.textContent = "Loading town geometry from OpenStreetMap";
    const data = await fetchTownGeometryData();

    const buildingElements = [];
    const roadSegments = [];

    (data.elements || []).forEach((element) => {
      if (element.type !== "way" || !Array.isArray(element.geometry)) return;
      if (element.tags?.building) {
        let minX = Infinity;
        let maxX = -Infinity;
        let minZ = Infinity;
        let maxZ = -Infinity;

        element.geometry.forEach((point) => {
          const projected = project(point.lat, point.lon);
          minX = Math.min(minX, projected.x);
          maxX = Math.max(maxX, projected.x);
          minZ = Math.min(minZ, projected.z);
          maxZ = Math.max(maxZ, projected.z);
        });

        if (!Number.isFinite(minX) || !Number.isFinite(minZ)) return;
        const width = maxX - minX;
        const depth = maxZ - minZ;
        if (width < 4 || depth < 4) return;
        buildingElements.push({
          x: (minX + maxX) / 2,
          z: (minZ + maxZ) / 2,
          width,
          depth,
          height: parseHeight(element.tags),
          type: element.tags.building,
        });
        return;
      }

      if (element.tags?.highway) {
        for (let index = 0; index < element.geometry.length - 1; index += 1) {
          const start = project(element.geometry[index].lat, element.geometry[index].lon);
          const end = project(element.geometry[index + 1].lat, element.geometry[index + 1].lon);
          roadSegments.push(start, end);
        }
      }
    });

    const buildingMesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      buildingMaterial,
      Math.min(buildingElements.length, 7000),
    );
    const helper = new THREE.Object3D();
    const palette = {
      apartments: 0xf7f3eb,
      residential: 0xfdfcf8,
      commercial: 0xf3eddc,
      school: 0xf6ead0,
      civic: 0xf3f7f2,
      default: 0xf7f3eb,
    };

    buildingElements.slice(0, 7000).forEach((building, index) => {
      helper.position.set(building.x, building.height / 2, building.z);
      helper.scale.set(building.width, building.height, building.depth);
      helper.updateMatrix();
      buildingMesh.setMatrixAt(index, helper.matrix);
      const color = new THREE.Color(
        palette[building.type] ||
          (building.type === "yes" ? palette.residential : palette.default),
      );
      buildingMesh.setColorAt(index, color);
    });
    buildingMesh.instanceMatrix.needsUpdate = true;
    if (buildingMesh.instanceColor) buildingMesh.instanceColor.needsUpdate = true;
    buildingsGroup.add(buildingMesh);

    roadSegments.forEach((segment, index) => {
      if (index % 2 !== 0) return;
      const next = roadSegments[index + 1];
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(segment.x, 0.6, segment.z),
        new THREE.Vector3(next.x, 0.6, next.z),
      ]);
      const line = new THREE.Line(geometry, roadMaterial);
      roadsGroup.add(line);
    });

    loading.remove();
  }

  function buildFallbackTown() {
    const group = new THREE.Group();
    const helper = new THREE.Object3D();
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), buildingMaterial, 520);
    for (let index = 0; index < 520; index += 1) {
      const x = (Math.random() - 0.5) * mapWidth * 0.6;
      const z = (Math.random() - 0.5) * mapDepth * 0.6;
      const width = 10 + Math.random() * 18;
      const depth = 10 + Math.random() * 20;
      const height = 8 + Math.random() * 40;
      helper.position.set(x, height / 2, z);
      helper.scale.set(width, height, depth);
      helper.updateMatrix();
      mesh.setMatrixAt(index, helper.matrix);
      mesh.setColorAt(index, new THREE.Color(index % 5 === 0 ? "#f6ead0" : "#f8f7f2"));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
    buildingsGroup.add(group);
    loading.textContent = "Preview map ready";
    window.setTimeout(() => loading.remove(), 1400);
  }

  loadTownGeometry().catch((error) => {
    console.error(error);
    buildFallbackTown();
  });

  rebuildPins();

  function resetView() {
    const startTarget = target.clone();
    const startCamera = camera.position.clone();
    const endTarget = new THREE.Vector3(0, 0, 0);
    const endCamera = new THREE.Vector3(frustum * 0.9, frustum * 0.86, frustum * 0.9);
    const started = performance.now();
    const duration = 720;
    const step = (now) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      target.lerpVectors(startTarget, endTarget, eased);
      camera.position.lerpVectors(startCamera, endCamera, eased);
      camera.lookAt(target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function resize() {
    const nextAspect = mount.clientWidth / mount.clientHeight;
    camera.left = (frustum * nextAspect) / -2;
    camera.right = (frustum * nextAspect) / 2;
    camera.top = frustum / 2;
    camera.bottom = frustum / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
  }

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  renderer.domElement.addEventListener("contextmenu", (event) => event.preventDefault());
  renderer.domElement.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const nextZoom = camera.zoom * (1 - event.deltaY * 0.0015);
      camera.zoom = Math.max(0.6, Math.min(4.5, nextZoom));
      camera.updateProjectionMatrix();
    },
    { passive: false },
  );

  renderer.domElement.addEventListener("pointerdown", (event) => {
    setPointer(event);
    raycaster.setFromCamera(pointer, camera);
    const pinHit = raycaster.intersectObjects(pinsGroup.children, false)[0];
    if (pinHit && pinHit.object.userData.id) {
      const resource = getAllResources().find((item) => item.id === pinHit.object.userData.id);
      if (!resource) return;
      selectedResourceId = resource.id;
      syncResourceDetail(resource);
      setSelectedPin(resource.id);
      renderExploreResources();
      return;
    }

    if (pickMode) {
      const groundHit = raycaster.intersectObject(ground, false)[0];
      if (!groundHit) return;
      updatePickPreview(groundHit.point);
      pickMode = false;
      if (pickCallback) {
        pickCallback({ x: Math.round(groundHit.point.x), z: Math.round(groundHit.point.z) });
      }
      return;
    }

    dragState = {
      x: event.clientX,
      y: event.clientY,
      button: event.button,
      pointerId: event.pointerId,
    };
    renderer.domElement.setPointerCapture(event.pointerId);
  });

  renderer.domElement.addEventListener("pointermove", (event) => {
    setPointer(event);
    if (dragState) {
      const dx = event.clientX - dragState.x;
      const dy = event.clientY - dragState.y;
      dragState.x = event.clientX;
      dragState.y = event.clientY;

      if (dragState.button === 2) {
        const offset = camera.position.clone().sub(target);
        const spherical = new THREE.Spherical().setFromVector3(offset);
        spherical.theta -= dx * 0.0045;
        spherical.phi = Math.min(Math.PI / 2.15, Math.max(Math.PI / 4.8, spherical.phi - dy * 0.0036));
        offset.setFromSpherical(spherical);
        camera.position.copy(target).add(offset);
        camera.lookAt(target);
      } else {
        const right = new THREE.Vector3();
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.setY(0).normalize();
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
        const scale = 1 / camera.zoom;
        const delta = new THREE.Vector3()
          .addScaledVector(right, dx * -0.9 * scale)
          .addScaledVector(forward, dy * 0.9 * scale);
        target.add(delta);
        camera.position.add(delta);
      }
      return;
    }

    raycaster.setFromCamera(pointer, camera);
    const pinHit = raycaster.intersectObjects(pinsGroup.children, false)[0];
    if (pinHit && pinHit.object.userData.id) {
      const resource = getAllResources().find((item) => item.id === pinHit.object.userData.id);
      renderer.domElement.style.cursor = "pointer";
      setTooltip(resource ? resource.name : "");
      return;
    }

    if (pickMode) {
      const groundHit = raycaster.intersectObject(ground, false)[0];
      if (groundHit) updatePickPreview(groundHit.point);
      renderer.domElement.style.cursor = "crosshair";
      return;
    }

    renderer.domElement.style.cursor = "grab";
    setTooltip("");
  });

  const endDrag = () => {
    dragState = null;
    renderer.domElement.style.cursor = pickMode ? "crosshair" : "grab";
  };
  renderer.domElement.addEventListener("pointerup", endDrag);
  renderer.domElement.addEventListener("pointercancel", endDrag);

  if (resetButton) resetButton.addEventListener("click", resetView);
  window.addEventListener("resize", resize);

  townMapApi = {
    filter({ ids }) {
      setFilter({ ids });
    },
    focus(id) {
      setSelectedPin(id);
      focusPin(id);
    },
    reset() {
      resetView();
    },
    beginPick(callback) {
      beginPick(callback);
    },
    saveSuggested(resource) {
      saveSuggestedResource(resource);
    },
    clearPending() {
      clearPendingPin();
    },
  };

  const requested = new URLSearchParams(window.location.search).get("resource");
  const initial = getAllResources().find((item) => item.id === requested) || resourceData[0];
  if (initial) {
    selectedResourceId = initial.id;
    syncResourceDetail(initial);
    setSelectedPin(initial.id);
    window.setTimeout(() => focusPin(initial.id, 520), 500);
  }

  animate();
}

function initExplorePage() {
  if (document.body.dataset.page !== "explore") return;
  initExploreFilters();
  initResourceDetailActions();
  initExploreTown();

  const search = $("[data-resource-search]");
  const neighborhood = $("[data-neighborhood-filter]");
  if (search) search.addEventListener("input", debounce(renderExploreResources, 150));
  if (neighborhood) neighborhood.addEventListener("change", renderExploreResources);

  if (!selectedResourceId) {
    const requested = new URLSearchParams(window.location.search).get("resource");
    const initial = getAllResources().find((item) => item.id === requested);
    if (initial) {
      selectedResourceId = initial.id;
      syncResourceDetail(initial);
      focusExploreMapById(initial.id, { scroll: false });
    }
  }

  const form = $("[data-suggest-form]");
  if (form) {
    const status = $("[data-suggest-status]");
    const setError = (field, message) => {
      const error = $(`[data-error-for="${field}"]`, form);
      if (error) {
        error.textContent = message || "";
        error.className = message ? "is-error" : "";
      }
    };

    $("[data-pick-location]").addEventListener("click", () => {
      if (!townMapApi) return;
      status.textContent = "Click anywhere on the map to set a location.";
      townMapApi.beginPick((position) => {
        form.dataset.pickX = String(position.x);
        form.dataset.pickZ = String(position.z);
        status.textContent = "Location selected on the map.";
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      let valid = true;
      ["name", "category", "description"].forEach((key) => {
        const missing = !String(data[key] || "").trim();
        setError(key, missing ? "This field is required." : "");
        valid = valid && !missing;
      });
      const hasPoint = form.dataset.pickX && form.dataset.pickZ;
      if (!hasPoint) {
        status.textContent = "Use the map picker before submitting.";
        status.className = "form-status is-error";
        valid = false;
      }
      if (!valid) return;

      const resource = {
        id: `suggested-${slugify(data.name)}-${Date.now().toString(36)}`,
        name: data.name.trim(),
        category: data.category,
        neighborhood: "suggested",
        tags: String(data.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        address: data.address || "",
        phone: data.phone || "",
        hours: data.hours || "",
        description: data.description.trim(),
        position: {
          x: Number(form.dataset.pickX),
          z: Number(form.dataset.pickZ),
        },
        suggested: true,
      };

      townMapApi.saveSuggested(resource);
      townMapApi.clearPending();
      selectedResourceId = resource.id;
      syncResourceDetail(resource);
      renderExploreResources();
      form.reset();
      delete form.dataset.pickX;
      delete form.dataset.pickZ;
      status.textContent = `${resource.name} has been submitted for review.`;
      status.className = "form-status is-success";
      showToast("Suggestion received.", "success");
    });
  }

  renderExploreResources();
}

function renderBulletinCards() {
  const track = $("[data-bulletin-track]");
  if (!track) return [];
  const inbox = buildBulletinInbox();
  const items = [...bulletinSeed, ...inbox];
  const colorMap = {
    "New Regulation": "#d4830a",
    "Lost Pet": "#b83232",
    "Street Project": "#1e5c35",
    Safety: "#1f3028",
    Community: "#2a7a4b",
    Urgent: "#b83232",
  };

  track.innerHTML = "";
  items.concat(items).forEach((item) => {
    const card = document.createElement("article");
    card.className = "bulletin-card";
    card.innerHTML = `
      <span class="bulletin-card__pill" style="background:${colorMap[item.type] || "#1f3028"}18;color:${colorMap[item.type] || "#1f3028"}">
        ${escapeHtml(item.type)}
      </span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.note)}</p>
    `;
    track.appendChild(card);
  });
  return items;
}

function initBulletinPage() {
  if (document.body.dataset.page !== "bulletin") return;
  const loop = $("[data-bulletin-loop]");
  const live = $("[data-bulletin-live]");
  const liveNextButton = $("[data-live-next]");
  const calendar = $("[data-bulletin-calendar]");
  const calendarGrid = $("[data-calendar-grid]");
  const calendarMonth = $("[data-calendar-month]");
  const calendarEvents = $("[data-calendar-events]");
  const selectedLabel = $("[data-calendar-selected-label]");
  const previousMonthButton = $("[data-calendar-prev]");
  const nextMonthButton = $("[data-calendar-next]");
  const openModalButton = $("[data-open-calendar-modal]");
  if (
    !loop ||
    !live ||
    !calendar ||
    !calendarGrid ||
    !calendarMonth ||
    !calendarEvents ||
    !selectedLabel ||
    !previousMonthButton ||
    !nextMonthButton
  ) {
    return;
  }

  const items = renderBulletinCards();
  const track = $("[data-bulletin-track]");
  let offset = 0;
  let paused = false;

  const measure = () => {
    const firstHalf = Array.from(track.children).slice(0, items.length);
    return firstHalf.reduce((sum, element) => sum + element.getBoundingClientRect().width + 16, 0);
  };

  let width = 0;
  const animate = () => {
    if (!paused) {
      if (!width) width = measure();
      offset -= 0.4;
      if (Math.abs(offset) >= width) offset = 0;
      track.style.transform = `translateX(${offset}px)`;
    }
    requestAnimationFrame(animate);
  };
  loop.addEventListener("mouseenter", () => {
    paused = true;
  });
  loop.addEventListener("mouseleave", () => {
    paused = false;
  });
  animate();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let liveIndex = 0;
  let liveCycleInterval = 0;
  const cycleLive = () => {
    smoothSwap(live, () => {
      live.textContent = bulletinLiveFeed[liveIndex];
    }, 250);
    liveIndex = (liveIndex + 1) % bulletinLiveFeed.length;
  };
  const restartLiveCycle = () => {
    window.clearInterval(liveCycleInterval);
    liveCycleInterval = window.setInterval(cycleLive, 5200);
  };
  live.textContent = bulletinLiveFeed[liveIndex];
  liveIndex = (liveIndex + 1) % bulletinLiveFeed.length;
  restartLiveCycle();

  if (liveNextButton) {
    liveNextButton.addEventListener("click", () => {
      if (liveNextButton.animate && !prefersReducedMotion) {
        liveNextButton.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(0.92)" },
            { transform: "scale(1)" },
          ],
          {
            duration: 320,
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          },
        );
      }
      cycleLive();
      restartLiveCycle();
    });
  }

  const today = createLocalDate(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  let visibleMonth = createLocalDate(today.getFullYear(), today.getMonth(), 1);
  let selectedDateKey = createDateKey(today);
  let calendarTransitionTimer = 0;

  const animateCalendarButton = (button) => {
    if (prefersReducedMotion || !button?.animate) return;
    button.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.92)" },
        { transform: "scale(1)" },
      ],
      {
        duration: 260,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    );
  };

  const transitionCalendar = (motion, update) => {
    if (prefersReducedMotion) {
      update();
      return;
    }

    window.clearTimeout(calendarTransitionTimer);
    calendar.classList.remove("is-animating");
    calendar.dataset.motion = motion;
    void calendar.offsetWidth;
    calendar.classList.add("is-animating");

    calendarTransitionTimer = window.setTimeout(() => {
      update();
      requestAnimationFrame(() => {
        calendar.classList.remove("is-animating");
      });
    }, motion === "month" ? 210 : 170);
  };

  const getCalendarItems = () => {
    const custom = normalizeCalendarItems(
      safeRead(STORAGE_KEYS.calendarEvents, localStorage, []),
      "submitted",
    );
    return normalizeCalendarItems(officialCalendar, "official")
      .concat(custom)
      .sort(
        (left, right) =>
          left.dateObject.getTime() - right.dateObject.getTime() ||
          Number(left.source === "submitted") - Number(right.source === "submitted") ||
          left.title.localeCompare(right.title),
      );
  };

  const selectDateForMonth = (items, preferredDateKey = selectedDateKey) => {
    const preferredDate = parseCalendarDate(preferredDateKey);
    if (preferredDate && isSameCalendarMonth(preferredDate, visibleMonth)) {
      selectedDateKey = createDateKey(preferredDate);
      return;
    }

    const inMonth = items.filter((item) => isSameCalendarMonth(item.dateObject, visibleMonth));
    if (inMonth.length) {
      selectedDateKey = inMonth[0].date;
      return;
    }

    if (isSameCalendarMonth(today, visibleMonth)) {
      selectedDateKey = createDateKey(today);
      return;
    }

    selectedDateKey = createDateKey(
      createLocalDate(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1),
    );
  };

  const renderCalendar = () => {
    const itemsToRender = getCalendarItems();
    const itemsByDate = new Map();
    itemsToRender.forEach((item) => {
      const existing = itemsByDate.get(item.date) || [];
      existing.push(item);
      itemsByDate.set(item.date, existing);
    });

    selectDateForMonth(itemsToRender);
    calendarMonth.textContent = formatCalendarMonthLabel(visibleMonth);

    const monthStart = createLocalDate(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const startingOffset = monthStart.getDay();
    const gridStart = createLocalDate(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      1 - startingOffset,
    );

    calendarGrid.innerHTML = Array.from({ length: 42 }, (_, index) => {
      const day = createLocalDate(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + index,
      );
      const dayKey = createDateKey(day);
      const dayItems = itemsByDate.get(dayKey) || [];
      const isCurrentMonth = isSameCalendarMonth(day, visibleMonth);
      const isToday = dayKey === createDateKey(today);
      const isSelected = dayKey === selectedDateKey;
      const classes = [
        "bulletin-calendar__day",
        isCurrentMonth ? "" : "is-outside-month",
        isToday ? "is-today" : "",
        isSelected ? "is-selected" : "",
        dayItems.length ? "has-events" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const markerMarkup = dayItems
        .slice(0, 3)
        .map(
          (item) =>
            `<span class="bulletin-calendar__marker ${
              item.source === "submitted"
                ? "bulletin-calendar__marker--submitted"
                : "bulletin-calendar__marker--official"
            }"></span>`,
        )
        .join("");

      return `
        <button
          class="${classes}"
          type="button"
          data-calendar-date="${dayKey}"
          aria-label="${escapeHtml(
            `${formatCalendarSelectedLabel(day)}${dayItems.length ? `, ${dayItems.length} event${dayItems.length === 1 ? "" : "s"}` : ""}`,
          )}"
        >
          <span class="bulletin-calendar__day-number">${day.getDate()}</span>
          <span class="bulletin-calendar__markers">${markerMarkup}</span>
        </button>
      `;
    }).join("");

    const selectedDate = parseCalendarDate(selectedDateKey) || monthStart;
    const selectedItems = itemsByDate.get(selectedDateKey) || [];
    selectedLabel.textContent = formatCalendarSelectedLabel(selectedDate);

    calendarEvents.innerHTML = selectedItems.length
      ? selectedItems
          .map(
            (item) => `
              <article class="bulletin-event-card bulletin-event-card--${escapeHtml(item.source)}">
                <span class="bulletin-event-card__badge bulletin-event-card__badge--${escapeHtml(item.source)}">
                  ${item.source === "submitted" ? "Resident Added" : "Town Event"}
                </span>
                <h3>${escapeHtml(item.title)}</h3>
                ${
                  item.location
                    ? `<p class="bulletin-event-card__meta">${escapeHtml(item.location)}</p>`
                    : ""
                }
                ${
                  item.note ? `<p>${escapeHtml(item.note)}</p>` : `<p>No extra details added yet.</p>`
                }
              </article>
            `,
          )
          .join("")
      : `
          <div class="bulletin-calendar__empty">
            <p>No events are listed for this date yet.</p>
            <p class="helper-text">Use Add Event to place a resident submission on the calendar.</p>
          </div>
        `;
  };

  calendarGrid.addEventListener("click", (event) => {
    const target = event.target.closest("[data-calendar-date]");
    if (!target) return;
    if (selectedDateKey === target.dataset.calendarDate) return;
    selectedDateKey = target.dataset.calendarDate;
    transitionCalendar("day", renderCalendar);
  });

  previousMonthButton.addEventListener("click", () => {
    animateCalendarButton(previousMonthButton);
    visibleMonth = shiftCalendarMonth(visibleMonth, -1);
    selectDateForMonth(getCalendarItems(), null);
    transitionCalendar("month", renderCalendar);
  });

  nextMonthButton.addEventListener("click", () => {
    animateCalendarButton(nextMonthButton);
    visibleMonth = shiftCalendarMonth(visibleMonth, 1);
    selectDateForMonth(getCalendarItems(), null);
    transitionCalendar("month", renderCalendar);
  });

  renderCalendar();

  if (openModalButton) {
    openModalButton.addEventListener("click", () => {
      openModal({
        title: "Add an Event",
        body: `
          <form data-calendar-form novalidate>
            <label class="input-group"><span>Date</span><input class="input" name="date" type="date" value="${escapeHtml(selectedDateKey)}" required></label>
            <label class="input-group"><span>Title</span><input class="input" name="title" type="text" maxlength="80" required></label>
            <label class="input-group"><span>Location</span><input class="input" name="location" type="text" maxlength="80" placeholder="Town Green"></label>
            <label class="input-group"><span>Details</span><textarea class="input" name="note" rows="4" placeholder="Share timing, who it is for, or what people should bring."></textarea></label>
            <small>Resident-added events stay on this browser unless cleared.</small>
            <div class="button-row"><button class="button button-primary" type="submit">Save Event</button></div>
            <p class="form-status" data-modal-status></p>
          </form>
        `,
        onOpen: (root) => {
          const form = $("[data-calendar-form]", root);
          const status = $("[data-modal-status]", root);
          form.addEventListener("submit", (event) => {
            event.preventDefault();
            const payload = Object.fromEntries(new FormData(form).entries());
            const parsedDate = parseCalendarDate(String(payload.date || ""));
            const title = String(payload.title || "").trim();

            if (!parsedDate || !title) {
              status.textContent = "Please add both a date and an event title.";
              status.className = "form-status is-error";
              return;
            }

            const items = safeRead(STORAGE_KEYS.calendarEvents, localStorage, []);
            items.unshift({
              id: `calendar-${slugify(title)}-${Date.now().toString(36)}`,
              date: createDateKey(parsedDate),
              title,
              location: String(payload.location || "").trim(),
              note: String(payload.note || "").trim(),
              source: "submitted",
            });
            safeWrite(STORAGE_KEYS.calendarEvents, items, localStorage);
            visibleMonth = createLocalDate(parsedDate.getFullYear(), parsedDate.getMonth(), 1);
            selectedDateKey = createDateKey(parsedDate);
            status.textContent = "Event added to the community calendar.";
            status.className = "form-status is-success";
            transitionCalendar("day", renderCalendar);
            showToast("Calendar event added.", "success");
            form.reset();
            const dateInput = $("[name='date']", form);
            if (dateInput) dateInput.value = selectedDateKey;
          });
        },
      });
    });
  }
}

function initDirectoryPage() {
  if (document.body.dataset.page !== "directory") return;
  const grid = $("[data-directory-grid]");
  const search = $("[data-directory-search]");
  const filter = $("[data-directory-filter]");
  if (!grid || !search || !filter) return;

  const render = () => {
    const query = search.value.trim().toLowerCase();
    const category = filter.value;
    const items = directoryData.filter((item) => {
      const matchesQuery =
        !query ||
        `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query);
      const matchesCategory = category === "all" || item.category === category;
      return matchesQuery && matchesCategory;
    });

    grid.innerHTML = items
      .map(
        (item) => `
          <article class="directory-card">
            <p class="eyebrow">${getCategoryLabel(item.category)}</p>
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.description)}</p>
            ${
              item.url
                ? `<a class="button button-primary" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">Visit site</a>`
                : ""
            }
          </article>
        `,
      )
      .join("");
  };

  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  render();
}

function initSupportPage() {
  if (document.body.dataset.page !== "support") return;
  $$("[data-support-action]").forEach((button) => {
    button.addEventListener("click", () => {
      openSupportModal(button.dataset.supportAction);
    });
  });
}

function initEducationPage() {
  if (document.body.dataset.page !== "education") return;
  const card = $("[data-education-update-card]");
  const title = $("[data-education-update-title]");
  const text = $("[data-education-update-text]");
  if (card && title && text) {
    let index = 0;
    const cycle = (immediate = false) => {
      const update = () => {
        title.textContent = educationUpdates[index].title;
        text.textContent = educationUpdates[index].text;
        index = (index + 1) % educationUpdates.length;
      };
      if (immediate) {
        update();
        return;
      }
      smoothSwap(card, update, 220);
    };
    cycle(true);
    window.setInterval(() => cycle(), 5200);
  }

  $$("[data-edu-link]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.eduLink;
      const links = {
        ...defaultSchoolLinks,
        ...safeRead(STORAGE_KEYS.schoolLinks, localStorage, {}),
      };
      const nextUrl = links[key];
      const meta = educationLinkMeta[key] || {
        label: "School Resource",
        description: "Open this district resource in a new tab.",
      };
      if (!nextUrl) {
        openModal({
          title: "School Link",
          body: "<p>This district shortcut will be connected here soon.</p>",
        });
        return;
      }

      openModal({
        title: meta.label,
        body: `
          <p>${escapeHtml(meta.description)}</p>
          <div class="button-row">
            <a class="button button-primary" href="${escapeHtml(nextUrl)}" target="_blank" rel="noopener noreferrer">
              Open ${escapeHtml(meta.label)}
            </a>
          </div>
        `,
      });
    });
  });
}

function initForumPage() {
  if (document.body.dataset.page !== "forum") return;
  const tabs = $("[data-forum-tabs]");
  const panel = $("[data-forum-panel]");
  const form = $("[data-forum-form]");
  const status = $("[data-forum-status]");
  if (!tabs || !panel || !form) return;

  const normalizeForumPost = (item, index) => {
    const source = Object.hasOwn(forumSourceMeta, item?.source) ? item.source : "community";
    const question = String(item?.question || "").trim();
    const details = String(item?.details || item?.answer || "").trim();

    return {
      id: String(item?.id || `forum-${index}`),
      title: String(item?.title || question || `Question ${index + 1}`)
        .trim()
        .slice(0, 28),
      question,
      details,
      answer: String(item?.answer || details).trim(),
      source,
    };
  };

  const getPosts = () =>
    [...forumSeed, ...safeRead(STORAGE_KEYS.forumPosts, localStorage, [])].map(normalizeForumPost);

  const render = (activeId) => {
    const posts = getPosts();
    const active = posts.find((item) => item.id === activeId) || posts[0];
    const sourceMeta = forumSourceMeta[active.source] || forumSourceMeta.community;
    const threadKey = `forum:${active.id}`;
    const repliesEnabled = active.source === "community";

    tabs.innerHTML = posts
      .map(
        (item) => `
          <button class="forum-tab${item.id === active.id ? " active" : ""}" type="button" data-forum-tab="${item.id}">
            ${escapeHtml(item.title)}
          </button>
        `,
      )
      .join("");

    panel.innerHTML = `
      <div class="forum-panel__meta">
        <span class="forum-source forum-source--${escapeHtml(active.source)}">${escapeHtml(sourceMeta.label)}</span>
        <span class="forum-panel__meta-text">${escapeHtml(
          sourceMeta.anonymous ? "Anonymous post" : repliesEnabled ? "Replies open" : "Read-only thread",
        )}</span>
      </div>
      <h2>${escapeHtml(active.question)}</h2>
      <p>${escapeHtml(active.answer || active.details)}</p>
      ${
        repliesEnabled
          ? renderCommunityCommentBlock({
              threadKey,
              title: "Responses",
              emptyText: "No replies yet. Add the first helpful response.",
              submitLabel: "Post Reply",
              placeholder: "Share a helpful answer, tip, or resource...",
              defaultName: "Neighbor",
            })
          : `
            <div class="forum-lock-note">
              <p class="input-label">Replies</p>
              <p>${escapeHtml(sourceMeta.note)}</p>
            </div>
          `
      }
    `;

    $$("[data-forum-tab]", tabs).forEach((button) => {
      button.addEventListener("click", () => render(button.dataset.forumTab));
    });

    if (repliesEnabled) {
      bindCommunityCommentForms(panel, () => render(active.id));
    }
  };

  render();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (!String(data.question || "").trim()) {
      status.textContent = "Please add a question before posting.";
      status.className = "form-status is-error";
      return;
    }

    const source = Object.hasOwn(forumSourceMeta, data.source) ? data.source : "community";
    const posts = safeRead(STORAGE_KEYS.forumPosts, localStorage, []);
    const entry = {
      id: `post-${Date.now().toString(36)}`,
      title: String(data.question).trim().slice(0, 22),
      question: String(data.question).trim(),
      answer: String(
        data.details || "Community responses will appear here as neighbors contribute.",
      ).trim(),
      details: String(data.details || "").trim(),
      source,
    };
    posts.push(entry);
    safeWrite(STORAGE_KEYS.forumPosts, posts, localStorage);
    form.reset();
    status.textContent =
      source === "community"
        ? "Community question posted. Replies are now open."
        : source === "official"
          ? "Public official post added anonymously."
          : "Public question posted to the forum.";
    status.className = "form-status is-success";
    render(entry.id);
    showToast("Forum question posted.", "success");
  });
}

function initFundingPage() {
  if (document.body.dataset.page !== "funding") return;
  const root = $("[data-funding-bars]");
  if (!root) return;
  const breakdown = getFundingBreakdown(fundingData);
  root.innerHTML = breakdown
    .map(
      (item) => `
        <article class="funding-row">
          <div class="funding-row__top">
            <strong>${escapeHtml(item.label)}</strong>
            <span>${item.share}% · $${item.amount.toFixed(1)}M</span>
          </div>
          <div class="funding-bar"><span data-bar-width="${item.share}%"></span></div>
        </article>
      `,
    )
    .join("");

  intersectOnce("[data-funding-bars]", () => {
    $$("[data-bar-width]", root).forEach((bar) => {
      bar.style.width = bar.dataset.barWidth;
    });
  });
}

function getCommunityMemoryVisuals(score) {
  const safeScore = clampNumber(score, 0, 100);
  return {
    blurPx: mapRange(safeScore, 0, 100, 2.8, 0),
    grayscale: mapRange(safeScore, 0, 100, 0.72, 0),
    opacity: mapRange(safeScore, 0, 100, 0.58, 1),
  };
}

function initCommunityPage() {
  if (document.body.dataset.page !== "community") return;

  const memoriesRoot = $("[data-community-memories]");
  const unsentRoot = $("[data-community-unsent]");
  const queueRoot = $("[data-community-queue]");
  const issueTabs = $("[data-community-issue-tabs]");
  const issuePanel = $("[data-community-issue-panel]");

  if (memoriesRoot) {
    const renderMemories = () => {
      memoriesRoot.innerHTML = communityMemoryShowcase
        .map((memory) => {
          const threadKey = `memory:${memory.id}`;
          const comments = getCommunityComments(threadKey);
          const previewComments = comments.slice(0, 2);
          const visuals = getCommunityMemoryVisuals(memory.strengthScore);
          return `
            <article class="card community-memory-card">
              <p class="eyebrow">Town Memory</p>
              <h3>${escapeHtml(memory.title)}</h3>
              <div class="community-memory-card__meta">
                <span>${escapeHtml(memory.location)}</span>
                <span>${escapeHtml(memory.ageLabel)}</span>
              </div>
              <div class="tag-list">
                ${memory.revived ? "<span>Still in conversation</span>" : "<span>Resting quietly</span>"}
                <span>${memory.strengthScore}/100 vividness</span>
              </div>
              <div
                class="community-memory-card__preview"
                style="filter: blur(${visuals.blurPx.toFixed(2)}px) grayscale(${visuals.grayscale.toFixed(2)}); opacity: ${visuals.opacity.toFixed(2)};"
              >
                ${escapeHtml(memory.excerpt)}
              </div>
              <div class="community-memory-card__bar" aria-hidden="true">
                <span style="width:${memory.strengthScore}%"></span>
              </div>
              <button class="button button-ghost" type="button" data-community-memory-open="${memory.id}">
                Read story
              </button>
              ${renderCommunityCommentBlock({
                threadKey,
                title: "Memory Notes",
                emptyText: "Be the first to add a detail or memory.",
                submitLabel: "Add Comment",
                placeholder: "Add a detail, memory, or reflection...",
                defaultName: "Neighbor",
                comments: previewComments,
                countOverride: comments.length,
              })}
            </article>
          `;
        })
        .join("");

      $$("[data-community-memory-open]", memoriesRoot).forEach((button) => {
        button.addEventListener("click", () => {
          const memory = communityMemoryShowcase.find((item) => item.id === button.dataset.communityMemoryOpen);
          if (!memory) return;
          openModal({
            title: memory.title,
            body: `
              <p><strong>Location:</strong> ${escapeHtml(memory.location)}</p>
              <p><strong>Age:</strong> ${escapeHtml(memory.ageLabel)}</p>
              <p><strong>Vividness:</strong> ${memory.strengthScore}/100</p>
              <p>${escapeHtml(memory.detail)}</p>
            `,
          });
        });
      });

      bindCommunityCommentForms(memoriesRoot, renderMemories);
    };

    renderMemories();
  }

  if (unsentRoot) {
    const renderUnsent = () => {
      unsentRoot.innerHTML = communityUnsentShowcase
        .map((message) => {
          const threadKey = `unsent:${message.id}`;
          return `
            <article class="card community-note-card">
              <p class="eyebrow">${escapeHtml(message.tone)}</p>
              <h3>${escapeHtml(message.title)}</h3>
              <p>${escapeHtml(message.body)}</p>
              <div class="community-note-card__reactions">
                <button class="filter-pill community-note-card__reaction" type="button" data-community-reaction="${message.id}" data-reaction-key="heardYou">
                  Heard you · <span>${message.reactions.heardYou}</span>
                </button>
                <button class="filter-pill community-note-card__reaction" type="button" data-community-reaction="${message.id}" data-reaction-key="relate">
                  Relate · <span>${message.reactions.relate}</span>
                </button>
                <button class="filter-pill community-note-card__reaction" type="button" data-community-reaction="${message.id}" data-reaction-key="support">
                  Support · <span>${message.reactions.support}</span>
                </button>
                <button class="filter-pill community-note-card__reaction" type="button" data-community-reaction="${message.id}" data-reaction-key="thankYou">
                  Thank you · <span>${message.reactions.thankYou}</span>
                </button>
              </div>
              <button class="button button-ghost" type="button" data-community-unsent-open="${message.id}">
                Read note
              </button>
              ${renderCommunityCommentBlock({
                threadKey,
                title: "Responses",
                emptyText: "Be the first to leave a thoughtful response.",
                submitLabel: "Add Response",
                placeholder: "Write a calm, supportive response...",
                defaultName: "Anonymous",
              })}
            </article>
          `;
        })
        .join("");

      $$("[data-community-unsent-open]", unsentRoot).forEach((button) => {
        button.addEventListener("click", () => {
          const message = communityUnsentShowcase.find((item) => item.id === button.dataset.communityUnsentOpen);
          if (!message) return;
          openModal({
            title: message.title,
            body: `
              <p><strong>Theme:</strong> ${escapeHtml(message.tone)}</p>
              <p>${escapeHtml(message.detail)}</p>
            `,
          });
        });
      });

      $$("[data-community-reaction]", unsentRoot).forEach((button) => {
        button.addEventListener("click", () => {
          if (button.dataset.locked === "true") {
            showToast("Support already sent here.", "info");
            return;
          }

          const count = button.querySelector("span");
          const current = Number(count?.textContent || "0");
          if (count) count.textContent = String(current + 1);
          button.dataset.locked = "true";
          button.classList.add("is-active");
          showToast("Support reaction added.", "success");
        });
      });

      bindCommunityCommentForms(unsentRoot, renderUnsent);
    };

    renderUnsent();
  }

  if (queueRoot) {
    queueRoot.innerHTML = communityModerationQueue
      .map(
        (item) => `
          <article class="calendar-entry">
            <span class="calendar-entry__date">${escapeHtml(item.label)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `,
      )
      .join("");
  }

  if (issueTabs && issuePanel) {
    const renderPerspective = (perspectiveId) => {
      const active =
        communityIssueShowcase.perspectives.find((item) => item.id === perspectiveId) ||
        communityIssueShowcase.perspectives[0];
      const threadKey = `issue:${active.id}`;

      issueTabs.innerHTML = communityIssueShowcase.perspectives
        .map(
          (item) => `
            <button
              class="forum-tab${item.id === active.id ? " active" : ""}"
              type="button"
              data-community-issue-tab="${item.id}"
            >
              ${escapeHtml(item.label)}
            </button>
          `,
        )
        .join("");

      issuePanel.innerHTML = `
        <h2>${escapeHtml(active.label)} Perspective</h2>
        <p>${escapeHtml(active.summary)}</p>
        <div class="tag-list">
          ${active.values.map((value) => `<span>${escapeHtml(value)}</span>`).join("")}
        </div>
        <div class="community-issue-columns">
          <div>
            <p class="input-label">Top Concerns</p>
            <ul class="stack-list">
              ${active.concerns.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
          <div>
            <p class="input-label">Suggested Actions</p>
            <ul class="stack-list">
              ${active.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="calendar-entry community-compromise-card">
          <span class="calendar-entry__date">Compromise idea</span>
          <p>${escapeHtml(active.compromise)}</p>
        </div>
        ${renderCommunityCommentBlock({
          threadKey,
          title: "Community Notes",
          emptyText: "Share a thought on this point of view.",
          submitLabel: "Add Comment",
          placeholder: "Add a thought about this perspective...",
          defaultName: "Resident",
        })}
      `;

      $$("[data-community-issue-tab]", issueTabs).forEach((button) => {
        button.addEventListener("click", () => {
          renderPerspective(button.dataset.communityIssueTab);
        });
      });

      bindCommunityCommentForms(issuePanel, () => renderPerspective(active.id));
    };

    renderPerspective(communityIssueShowcase.perspectives[0].id);
  }
}

function initModalForms() {
  // Reserved hook for future page-specific modal hydration.
}

function initMapReset() {
  const resetButton = document.querySelector('[data-reset-map]');
  const iframe = document.getElementById('map-iframe');
  if (resetButton && iframe) {
    resetButton.addEventListener('click', function() {
      resetExploreMap();
    });
  }
}

function initScrollPrompt() {
  if ($("[data-scroll-prompt]")) return;
  const main = $("main");
  if (!main) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prompt = document.createElement("button");
  prompt.type = "button";
  prompt.className = "scroll-prompt";
  prompt.dataset.scrollPrompt = "true";
  prompt.setAttribute("aria-label", "Scroll down");
  prompt.setAttribute("aria-hidden", "true");
  prompt.innerHTML = '<span class="chevron-icon chevron-icon--down" aria-hidden="true"></span>';
  document.body.appendChild(prompt);

  const getScrollTarget = () => {
    const sections = $$("main > section");
    return sections.find((section) => section.getBoundingClientRect().top > 120) || sections[1] || sections[0];
  };

  const updatePrompt = () => {
    const canScroll = document.documentElement.scrollHeight - window.innerHeight > 200;
    const shouldShow = canScroll && window.scrollY < 60 && !document.body.classList.contains("nav-open");
    prompt.classList.toggle("is-visible", shouldShow);
    prompt.setAttribute("aria-hidden", shouldShow ? "false" : "true");
  };

  prompt.addEventListener("click", () => {
    const target = getScrollTarget();
    const fallbackTop = Math.max(window.innerHeight * 0.82, 360);
    const top = target
      ? Math.max(target.getBoundingClientRect().top + window.scrollY - 92, fallbackTop)
      : fallbackTop;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  const handleUpdate = () => requestAnimationFrame(updatePrompt);
  window.addEventListener("scroll", handleUpdate, { passive: true });
  window.addEventListener("resize", handleUpdate);
  updatePrompt();
}

document.addEventListener("DOMContentLoaded", () => {
  safeInit(ensureModalRoot);
  safeInit(initPageTransitions);
  safeInit(initHeader);
  safeInit(initWarningBanner);
  safeInit(initReveals);
  safeInit(initCounters);
  safeInit(initHomeLiveUpdates);
  safeInit(initHomeLayerCards);
  safeInit(initHomeHighlights);
  safeInit(initExplorePage);
  safeInit(initBulletinPage);
  safeInit(initDirectoryPage);
  safeInit(initSupportPage);
  safeInit(initEducationPage);
  safeInit(initForumPage);
  safeInit(initFundingPage);
  safeInit(initCommunityPage);
  safeInit(initModalForms);
  safeInit(initMapReset);
  safeInit(initScrollPrompt);
});
