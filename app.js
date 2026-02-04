const attractionData = [
  {
    name: "Central Ave Bistros",
    category: "restaurants",
    neighborhood: "downtown",
    type: "Dining",
  },
  {
    name: "Oakwood Loop Trail",
    category: "hiking",
    neighborhood: "oakwood",
    type: "Outdoor",
  },
  {
    name: "Fairview Artisan Market",
    category: "shopping",
    neighborhood: "fairview",
    type: "Shopping",
  },
  {
    name: "Community Arts Loft",
    category: "arts",
    neighborhood: "downtown",
    type: "Culture",
  },
  {
    name: "Lions Park Pavilion",
    category: "hiking",
    neighborhood: "fairview",
    type: "Recreation",
  },
  {
    name: "Maple Street Coffee",
    category: "restaurants",
    neighborhood: "downtown",
    type: "Cafe",
  },
];

const fundingData = [
  { label: "Infrastructure", value: 82 },
  { label: "Public Safety", value: 64 },
  { label: "Community Spaces", value: 56 },
  { label: "Sustainability", value: 38 },
];

const mapLocations = [
  {
    name: "Downtown Core",
    description: "Dining, local shops, and commuter access.",
    coordinates: [-74.4066, 40.6989],
  },
  {
    name: "Lions Park",
    description: "Community pool, pavilion, and sports fields.",
    coordinates: [-74.4027, 40.6958],
  },
  {
    name: "Library District",
    description: "Learning, events, and quiet spaces.",
    coordinates: [-74.4112, 40.7023],
  },
  {
    name: "Retail Corridor",
    description: "Artisan markets and local boutiques.",
    coordinates: [-74.4035, 40.7012],
  },
];

function renderAttractions() {
  const categorySelect = document.getElementById("category-select");
  const neighborhoodSelect = document.getElementById("neighborhood-select");
  const attractionCards = document.getElementById("attraction-cards");

  if (!categorySelect || !neighborhoodSelect || !attractionCards) {
    return;
  }

  const category = categorySelect.value;
  const neighborhood = neighborhoodSelect.value;

  const filtered = attractionData.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesNeighborhood =
      neighborhood === "all" || item.neighborhood === neighborhood;
    return matchesCategory && matchesNeighborhood;
  });

  attractionCards.innerHTML = "";
  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "attraction-card";
    card.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>${item.type}</p>
      </div>
      <span>${item.neighborhood}</span>
    `;
    attractionCards.appendChild(card);
  });

  if (filtered.length === 0) {
    attractionCards.innerHTML = "<p>No attractions match yet.</p>";
  }
}

function initAttractions() {
  const categorySelect = document.getElementById("category-select");
  const neighborhoodSelect = document.getElementById("neighborhood-select");

  if (!categorySelect || !neighborhoodSelect) {
    return;
  }

  categorySelect.addEventListener("change", renderAttractions);
  neighborhoodSelect.addEventListener("change", renderAttractions);
  renderAttractions();
}

function initFundingChart() {
  const fundingChart = document.getElementById("funding-chart");
  if (!fundingChart) return;

  fundingChart.innerHTML = "";
  fundingData.forEach((item) => {
    const row = document.createElement("div");
    row.className = "chart-row";
    row.innerHTML = `
      <strong>${item.label}</strong>
      <div class="chart-bar" style="width: ${item.value}%"></div>
      <span>${item.value}% allocation</span>
    `;
    fundingChart.appendChild(row);
  });
}

function initCarousel() {
  const carouselTrack = document.getElementById("carousel-track");
  const carouselButtons = document.querySelectorAll(".carousel-btn");
  if (!carouselTrack || carouselButtons.length === 0) return;

  let carouselIndex = 0;
  let carouselStep = 240;

  function updateCarouselStep() {
    const firstCard = carouselTrack.querySelector(".carousel-card");
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    carouselStep = Math.round(cardWidth + 16);
  }

  function moveCarousel(direction) {
    const cards = carouselTrack.children.length;
    carouselIndex = (carouselIndex + direction + cards) % cards;
    carouselTrack.style.transform = `translateX(-${carouselIndex * carouselStep}px)`;
  }

  carouselButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.direction === "next" ? 1 : -1;
      moveCarousel(direction);
    });
  });

  window.addEventListener("resize", updateCarouselStep);
  updateCarouselStep();
  setInterval(() => moveCarousel(1), 4500);
}

function initChatbot() {
  const chatWindow = document.getElementById("chat-window");
  const chatInput = document.querySelector(".chat-input input");
  const chatButton = document.querySelector(".chat-input button");
  const chatNote = document.getElementById("chat-note");

  if (!chatWindow || !chatInput || !chatButton) return;

  async function sendChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    const userBubble = document.createElement("div");
    userBubble.className = "chat-message user";
    userBubble.textContent = text;
    chatWindow.appendChild(userBubble);

    const botBubble = document.createElement("div");
    botBubble.className = "chat-message bot";
    botBubble.textContent = "Thinking...";
    chatWindow.appendChild(botBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error("Chat service unavailable");
      }

      const data = await response.json();
      botBubble.textContent = data.reply;
      if (chatNote) {
        chatNote.textContent = "Gemini chat online.";
      }
    } catch (error) {
      botBubble.textContent =
        "Chatbot is offline. Start the server to enable Gemini responses.";
      if (chatNote) {
        chatNote.textContent =
          "Waiting for Gemini API connection. Check server and API key.";
      }
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
    chatInput.value = "";
  }

  chatButton.addEventListener("click", sendChat);
  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendChat();
    }
  });
}

function initHeroHighlights() {
  const itemOne = document.getElementById("hero-highlight-item");
  const itemTwo = document.getElementById("hero-highlight-item-2");
  if (!itemOne || !itemTwo) return;

  const highlights = [
    "Winter Fest Parade route released today.",
    "Downtown sidewalk repairs begin next week.",
    "Library maker lab opens Saturday at 11 AM.",
    "Youth sports signup closes Friday.",
    "Town Hall listening session at 7 PM.",
  ];

  let index = 0;

  function render() {
    itemOne.textContent = highlights[index % highlights.length];
    itemTwo.textContent = highlights[(index + 1) % highlights.length];
  }

  render();
  setInterval(() => {
    index = (index + 1) % highlights.length;
    render();
  }, 2600);
}

function initTypewriter() {
  const box = document.getElementById("typewriter-box");
  if (!box) return;

  const messages = [
    "Welcome to New Providence community day.",
    "Fresh town updates delivered in real time.",
    "Connect with neighbors, projects, and events.",
    "Submit a request and we will route it fast.",
  ];

  let messageIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = messages[messageIndex];
    if (!deleting) {
      charIndex += 1;
      box.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 600);
        return;
      }
    } else {
      charIndex -= 1;
      box.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
      }
    }
    setTimeout(tick, deleting ? 30 : 45);
  }

  tick();
}

function initHighlightsTypewriter() {
  const box = document.getElementById("highlights-typewriter");
  const titleBox = document.getElementById("highlights-title");
  const hero = document.getElementById("highlights-media");
  const imageA = document.getElementById("highlights-image-a");
  const imageB = document.getElementById("highlights-image-b");
  const dotsContainer = document.getElementById("highlights-dots");
  const prevBtn = document.getElementById("highlights-prev");
  const nextBtn = document.getElementById("highlights-next");
  if (!box) return;

  const events = [
    {
      title: "Winter Fest Parade",
      note: "Upcoming: Feb 14 · Downtown loop · Volunteer spots open.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80",
    },
    {
      title: "Library Maker Lab",
      note: "Upcoming: Sat 11 AM · All ages welcome.",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=80",
    },
    {
      title: "Community Cleanup",
      note: "Past: 120+ bags collected · Thanks volunteers!",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80",
    },
    {
      title: "Town Council Recap",
      note: "Past: Meeting highlights posted online.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80",
    },
  ];

  let currentIndex = 0;
  let typingToken = 0;
  let activeLayer = 0;

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    events.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "highlights-dot";
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => setEvent(index));
      dotsContainer.appendChild(dot);
    });
  }

  function typeText(target, text, speed, token) {
    return new Promise((resolve) => {
      let i = 0;
      function step() {
        if (token !== typingToken) return resolve();
        target.textContent = text.slice(0, i);
        i += 1;
        if (i <= text.length) {
          setTimeout(step, speed);
        } else {
          resolve();
        }
      }
      step();
    });
  }

  async function setEvent(index) {
    currentIndex = (index + events.length) % events.length;
    const current = events[currentIndex];
    typingToken += 1;
    const token = typingToken;

    if (imageA && imageB) {
      const nextLayer = activeLayer === 0 ? imageB : imageA;
      const currentLayer = activeLayer === 0 ? imageA : imageB;
      nextLayer.style.backgroundImage = `url(\"${current.image}\")`;
      nextLayer.classList.add("is-active");
      currentLayer.classList.remove("is-active");
      activeLayer = activeLayer === 0 ? 1 : 0;
    } else if (hero) {
      hero.style.backgroundImage = `linear-gradient(180deg, rgba(10, 18, 14, 0.55), rgba(10, 18, 14, 0.15)), radial-gradient(circle at top, rgba(30, 77, 43, 0.55), transparent 60%), url(\"${current.image}\")`;
    }

    if (titleBox) titleBox.textContent = "";
    box.textContent = "";
    renderDots();

    if (titleBox) {
      await typeText(titleBox, current.title, 80, token);
    }
    await typeText(box, current.note, 45, token);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => setEvent(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => setEvent(currentIndex + 1));
  }

  renderDots();
  setEvent(0);
}

function initBulletinLoop() {
  const track = document.getElementById("bulletin-track");
  const loop = document.querySelector(".bulletin-loop");
  if (!track || !loop) return;

  const originalCards = Array.from(track.children);
  originalCards.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  let offset = 0;
  let loopWidth = 0;
  let speed = 0.4;
  let paused = false;
  let isDragging = false;
  let startX = 0;
  let startOffset = 0;

  function updateLoopWidth() {
    const cards = Array.from(track.children).slice(0, originalCards.length);
    loopWidth = cards.reduce((total, card) => total + card.offsetWidth + 16, 0);
  }

  function step() {
    if (!loopWidth) updateLoopWidth();
    if (!paused && !isDragging) {
      offset -= speed;
    }
    if (Math.abs(offset) >= loopWidth) {
      offset = 0;
    }
    track.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(step);
  }

  loop.addEventListener("mouseenter", () => {
    paused = true;
  });

  loop.addEventListener("mouseleave", () => {
    paused = false;
  });

  loop.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startOffset = offset;
    loop.setPointerCapture(event.pointerId);
  });

  loop.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const delta = event.clientX - startX;
    offset = startOffset + delta;
  });

  loop.addEventListener("pointerup", (event) => {
    isDragging = false;
    loop.releasePointerCapture(event.pointerId);
  });

  loop.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  window.addEventListener("resize", updateLoopWidth);
  updateLoopWidth();
  requestAnimationFrame(step);
}

function initHighlights() {
  const highlight = document.getElementById("highlights-item");
  if (!highlight) return;

  const items = [
    "Storm alert test planned for Friday at 3 PM.",
    "Library hosts a teen maker workshop this weekend.",
    "Downtown sidewalk repairs enter phase two next week.",
    "Community pantry needs volunteers for evening shifts.",
    "Winter Fest Parade route released today.",
  ];

  let index = 0;
  highlight.textContent = items[index];

  setInterval(() => {
    highlight.classList.add("fade");
    setTimeout(() => {
      index = (index + 1) % items.length;
      highlight.textContent = items[index];
      highlight.classList.remove("fade");
    }, 600);
  }, 3500);
}

function initForumTabs() {
  const tabs = document.querySelectorAll(".forum-tab");
  const panels = document.querySelectorAll(".forum-panel");
  if (tabs.length === 0 || panels.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((btn) => btn.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });
}

function initMap() {
  const mapContainer = document.getElementById("map");
  const tooltip = document.getElementById("map-tooltip");
  const resetMap = document.getElementById("reset-map");

  if (!mapContainer || typeof mapboxgl === "undefined") return;

  if (!window.MAPBOX_TOKEN || window.MAPBOX_TOKEN.includes("YOUR")) {
    mapContainer.innerHTML =
      "<p class='note'>Add your Mapbox access token to enable the map.</p>";
    return;
  }

  mapboxgl.accessToken = window.MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: mapContainer,
    style: "mapbox://styles/mapbox/light-v11",
    center: [-74.4066, 40.6989],
    zoom: 13.3,
  });

  mapLocations.forEach((location) => {
    const el = document.createElement("div");
    el.className = "map-marker";
    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat(location.coordinates)
      .addTo(map);

    el.addEventListener("mouseenter", () => {
      if (!tooltip) return;
      tooltip.textContent = `${location.name}: ${location.description}`;
      tooltip.classList.add("visible");
    });

    el.addEventListener("mouseleave", () => {
      if (!tooltip) return;
      tooltip.classList.remove("visible");
    });

    el.addEventListener("click", () => {
      map.flyTo({ center: location.coordinates, zoom: 14.4 });
      if (!tooltip) return;
      tooltip.textContent = `${location.name}: ${location.description}`;
      tooltip.classList.add("visible");
    });
  });

  if (resetMap) {
    resetMap.addEventListener("click", () => {
      map.flyTo({ center: [-74.4066, 40.6989], zoom: 13.3 });
      if (tooltip) tooltip.classList.remove("visible");
    });
  }
}

initAttractions();
initFundingChart();
initCarousel();
initChatbot();
initMap();
initBulletinLoop();
initHighlights();
initForumTabs();
initHeroHighlights();
initTypewriter();
initHighlightsTypewriter();

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");

  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (link.target === "_blank") return;
      if (url.pathname === window.location.pathname && url.hash) return;
      event.preventDefault();
      document.body.classList.remove("page-ready");
      setTimeout(() => {
        window.location.href = url.href;
      }, 220);
    });
  });
});
