const STORAGE_KEYS = {
  suggestedResources: "np_suggested_resources_v1",
  calendarEvents: "np_calendar_events_v1",
  forumPosts: "np_forum_posts_v1",
  schoolLinks: "np_school_links_v1",
  alertSignups: "np_alert_signups_v1",
  bulletinInbox: "np_bulletin_inbox_v1",
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
    spotlight: true,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=75",
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
    spotlight: true,
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=75",
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
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=75",
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
    spotlight: true,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=75",
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
  },
];

const directoryData = [
  {
    id: "dir-lions",
    name: "Lions Club of New Providence",
    category: "civic",
    description: "Volunteer service, fundraising, and community support initiatives.",
  },
  {
    id: "dir-paca",
    name: "PACA Arts Collective",
    category: "arts",
    description: "Community arts workshops, exhibits, and public cultural programming.",
  },
  {
    id: "dir-pta",
    name: "Parent-Teacher Association",
    category: "advocacy",
    description: "School-family partnership and district support programming.",
  },
  {
    id: "dir-troop61",
    name: "Scouts BSA Troop 61",
    category: "youth",
    description: "Outdoor leadership, service, and mentoring through scouting.",
  },
  {
    id: "dir-muboo",
    name: "MuBoo Youth Arts Collective",
    category: "arts",
    description: "Creative mentorship and youth-led arts expression.",
  },
  {
    id: "dir-clubbing",
    name: "Clubbing Social Club",
    category: "social",
    description: "Meetups and hobby nights open to the broader town community.",
  },
  {
    id: "dir-rec",
    name: "NP Recreation Department",
    category: "sports",
    description: "Programs, leagues, camps, and recreation planning across town.",
  },
  {
    id: "dir-library",
    name: "Library Friends Group",
    category: "advocacy",
    description: "Volunteer and fundraising support for library programs and expansion.",
  },
  {
    id: "dir-eac",
    name: "Environmental Advisory Committee",
    category: "civic",
    description: "Sustainability and environmental action planning.",
  },
  {
    id: "dir-seniors",
    name: "Senior Social Circle",
    category: "social",
    description: "Programs, luncheons, and social events for local seniors.",
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
  { date: "Mar 20", title: "Board of Education Workshop", note: "District offices" },
  { date: "Mar 22", title: "Spring Cleanup Kickoff", note: "Lions Park pavilion" },
  { date: "Mar 26", title: "Library Teen Maker Lab", note: "Memorial Library" },
  { date: "Apr 02", title: "Downtown Listening Session", note: "Municipal building" },
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
  district: "https://www.npsdnj.org/",
  portal: "https://powerschool.npsdnj.org/public/",
  menus: "https://www.npsdnj.org/apps/pages/food-services",
};

const forumSeed = [
  {
    id: "crosswalk-request",
    title: "Crosswalk Request",
    question: "How do I request a new crosswalk near the school campus?",
    answer:
      "Submit a Town Improvement Ticket on the support page with the exact location, nearby landmarks, and why the crossing is needed. Public Works and the police department review those requests together.",
  },
  {
    id: "winter-hiking",
    title: "Winter Hiking",
    question: "What is the best local trail when the weather is cold but dry?",
    answer:
      "Oakwood Loop Trail is the safest default for a short winter walk. It has a manageable grade, good visibility, and steady use throughout the day.",
  },
  {
    id: "volunteer-needs",
    title: "Volunteer Needs",
    question: "Where can I volunteer this month if I only have a few hours?",
    answer:
      "The Lions Club pantry drive, library event support, and the Spring Cleanup all have short-shift options that work well for first-time volunteers.",
  },
];

const fundingData = [
  { label: "Infrastructure", value: 82 },
  { label: "Public Safety", value: 64 },
  { label: "Community Spaces", value: 56 },
  { label: "Sustainability", value: 38 },
];

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
      <button class="modal-close" type="button" aria-label="Close modal" data-modal-close>x</button>
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
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      document.body.classList.toggle("nav-open", !expanded);
    });

    $$("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
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
  $("[data-detail-name]", panel).textContent = resource.name;
  $("[data-detail-description]", panel).textContent = resource.description;
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
      const active = item.id === selectedResourceId ? ' style="border-color: var(--np-gold);"' : "";
      const spotlight = item.spotlight ? '<span class="resource-card__badge">Spotlight</span>' : "";
      const badge = item.suggested ? '<span class="resource-card__badge">Suggested</span>' : spotlight;
      return `
        <article class="resource-card card"${active} data-resource-card="${item.id}">
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
        </article>
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
      if (townMapApi) townMapApi.focus(resource.id);
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
      if (townMapApi) townMapApi.focus(selectedResourceId);

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
  const calendarGrid = $("[data-calendar-grid]");
  const openModalButton = $("[data-open-calendar-modal]");
  if (!loop || !live || !calendarGrid) return;

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

  let liveIndex = 0;
  const cycleLive = () => {
    smoothSwap(live, () => {
      live.textContent = bulletinLiveFeed[liveIndex];
    });
    liveIndex = (liveIndex + 1) % bulletinLiveFeed.length;
  };
  live.textContent = bulletinLiveFeed[liveIndex];
  liveIndex = (liveIndex + 1) % bulletinLiveFeed.length;
  window.setInterval(cycleLive, 4600);

  const renderCalendar = () => {
    const custom = safeRead(STORAGE_KEYS.calendarEvents, localStorage, []);
    const itemsToRender = [...officialCalendar, ...custom];
    calendarGrid.innerHTML = itemsToRender
      .map(
        (item) => `
          <article class="calendar-entry">
            <span class="calendar-entry__date">${escapeHtml(item.date)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.note || "")}</p>
          </article>
        `,
      )
      .join("");
  };

  renderCalendar();

  if (openModalButton) {
    openModalButton.addEventListener("click", () => {
      openModal({
        title: "Add an Event",
        body: `
          <form data-calendar-form novalidate>
            <label class="input-group"><span>Date</span><input class="input" name="date" type="text" placeholder="Apr 12" required></label>
            <label class="input-group"><span>Title</span><input class="input" name="title" type="text" required></label>
            <label class="input-group"><span>Details</span><textarea class="input" name="note" rows="4"></textarea></label>
            <div class="button-row"><button class="button button-primary" type="submit">Save Event</button></div>
            <p class="form-status" data-modal-status></p>
          </form>
        `,
        onOpen: () => {
          const form = $("[data-calendar-form]", ensureModalRoot().root);
          const status = $("[data-modal-status]", ensureModalRoot().root);
          form.addEventListener("submit", (event) => {
            event.preventDefault();
            const payload = Object.fromEntries(new FormData(form).entries());
            const items = safeRead(STORAGE_KEYS.calendarEvents, localStorage, []);
            items.push(payload);
            safeWrite(STORAGE_KEYS.calendarEvents, items, localStorage);
            status.textContent = "Event added to the community calendar.";
            status.className = "form-status is-success";
            renderCalendar();
            showToast("Calendar event added.", "success");
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

  const render = (activeId) => {
    const posts = [...forumSeed, ...safeRead(STORAGE_KEYS.forumPosts, localStorage, [])];
    const active = posts.find((item) => item.id === activeId) || posts[0];

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
      <h2>${escapeHtml(active.question)}</h2>
      <p>${escapeHtml(active.answer || active.details)}</p>
    `;

    $$("[data-forum-tab]", tabs).forEach((button) => {
      button.addEventListener("click", () => render(button.dataset.forumTab));
    });
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
    const posts = safeRead(STORAGE_KEYS.forumPosts, localStorage, []);
    const entry = {
      id: `post-${Date.now().toString(36)}`,
      title: String(data.question).trim().slice(0, 22),
      question: String(data.question).trim(),
      answer: String(
        data.details || "Community responses will appear here as neighbors contribute.",
      ).trim(),
    };
    posts.push(entry);
    safeWrite(STORAGE_KEYS.forumPosts, posts, localStorage);
    form.reset();
    status.textContent = "Question posted to the forum.";
    status.className = "form-status is-success";
    render(entry.id);
    showToast("Forum question posted.", "success");
  });
}

function initFundingPage() {
  if (document.body.dataset.page !== "funding") return;
  const root = $("[data-funding-bars]");
  if (!root) return;
  root.innerHTML = fundingData
    .map(
      (item) => `
        <article class="funding-row">
          <div class="funding-row__top">
            <strong>${escapeHtml(item.label)}</strong>
            <span>${item.value}%</span>
          </div>
          <div class="funding-bar"><span data-bar-width="${item.value}%"></span></div>
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

function initModalForms() {
  // Reserved hook for future page-specific modal hydration.
}

function initMapReset() {
  const resetButton = document.querySelector('[data-reset-map]');
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      const iframe = document.getElementById('map-iframe');
      if (iframe) {
        iframe.src = iframe.src; // Reload the iframe to reset to default view
      }
    });
  }
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
  safeInit(initModalForms);
  safeInit(initMapReset);
});
