const attractionData = [
  {
    id: "central-ave-bistros",
    name: "Central Ave Bistros",
    category: "restaurants",
    neighborhood: "downtown",
    type: "Dining",
    description:
      "A cluster of local dining favorites with quick bites and sit-down options near the downtown core.",
    position: { x: -70, z: 35 },
  },
  {
    id: "maple-street-coffee",
    name: "Maple Street Coffee",
    category: "restaurants",
    neighborhood: "downtown",
    type: "Cafe",
    description:
      "Grab-and-go coffee with a cozy atmosphere — perfect for students, commuters, and weekend walks.",
    position: { x: -52, z: 18 },
  },
  {
    id: "community-arts-loft",
    name: "Community Arts Loft",
    category: "arts",
    neighborhood: "downtown",
    type: "Culture",
    description:
      "Local showcases, workshops, and rotating exhibits highlighting student and community artists.",
    position: { x: -92, z: 8 },
  },
  {
    id: "fairview-artisan-market",
    name: "Fairview Artisan Market",
    category: "shopping",
    neighborhood: "fairview",
    type: "Shopping",
    description:
      "Seasonal pop-ups featuring handmade goods, local vendors, and weekend specials.",
    position: { x: 10, z: -55 },
  },
  {
    id: "lions-park-pavilion",
    name: "Lions Park Pavilion",
    category: "hiking",
    neighborhood: "fairview",
    type: "Recreation",
    description:
      "A central gathering spot for community picnics, youth sports, and summer events.",
    position: { x: 105, z: -38 },
  },
  {
    id: "oakwood-loop-trail",
    name: "Oakwood Loop Trail",
    category: "hiking",
    neighborhood: "oakwood",
    type: "Outdoor",
    description:
      "A shaded loop with gentle elevation and scenic stretches for walkers and runners.",
    position: { x: 150, z: 90 },
  },
];

// Expose for other scripts/pages without coupling to window properties.
window.NP_ATTRACTIONS = attractionData;

const fundingData = [
  { label: "Infrastructure", value: 82 },
  { label: "Public Safety", value: 64 },
  { label: "Community Spaces", value: 56 },
  { label: "Sustainability", value: 38 },
];

const SUGGESTIONS_STORAGE_KEY = "np_suggested_attractions_v1";
const BULLETIN_INBOX_KEY = "np_bulletin_inbox_v1";
let selectedAttractionId = null;

function loadSuggestedAttractions() {
  try {
    const raw = localStorage.getItem(SUGGESTIONS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSuggestedAttractions(list) {
  try {
    localStorage.setItem(SUGGESTIONS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Best-effort demo storage.
  }
}

function loadStorageJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveStorageJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Best-effort demo storage.
  }
}

function loadSessionJSON(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveSessionJSON(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Best-effort demo storage.
  }
}

function enqueueBulletinInbox(item) {
  if (!item) return;
  const list = loadSessionJSON(BULLETIN_INBOX_KEY, []);
  const next = Array.isArray(list) ? list : [];
  next.unshift(item);
  saveSessionJSON(BULLETIN_INBOX_KEY, next);
}

function consumeBulletinInbox() {
  const list = loadSessionJSON(BULLETIN_INBOX_KEY, []);
  try {
    sessionStorage.removeItem(BULLETIN_INBOX_KEY);
  } catch {
    // ignore
  }
  return Array.isArray(list) ? list : [];
}

function findAttractionById(id) {
  if (!id) return null;
  const official = attractionData.find((item) => item.id === id);
  if (official) return { kind: "official", item: official };
  const suggested = loadSuggestedAttractions().find((item) => item.id === id);
  if (suggested) return { kind: "suggested", item: suggested };
  return null;
}

function categoryLabel(category) {
  const labels = {
    restaurants: "Restaurants",
    hiking: "Hiking & Parks",
    shopping: "Shopping",
    arts: "Arts & Culture",
  };
  return labels[category] || category || "Unknown";
}

function setAttractionDetails(id, { focusMap = true } = {}) {
  const detailsTitle = document.getElementById("details-title");
  const detailsDesc = document.getElementById("details-desc");
  const detailsMeta = document.getElementById("details-meta");

  const resolved = findAttractionById(id);
  if (!resolved) return;

  selectedAttractionId = id;
  if (window.NP_TOWN3D_API?.select) {
    window.NP_TOWN3D_API.select(id);
  }

  if (detailsTitle) detailsTitle.textContent = resolved.item.name;
  if (detailsDesc) detailsDesc.textContent = resolved.item.description || "";
  if (detailsMeta) {
    detailsMeta.innerHTML = "";
    const pills = [
      resolved.kind === "suggested" ? "Suggested" : "Official",
      categoryLabel(resolved.item.category),
      resolved.item.neighborhood ? resolved.item.neighborhood : null,
    ].filter(Boolean);

    pills.forEach((label) => {
      const pill = document.createElement("span");
      pill.className = "meta-pill";
      pill.textContent = label;
      detailsMeta.appendChild(pill);
    });
  }

  renderAttractions();

  if (focusMap && window.NP_TOWN3D_API?.focus) {
    window.NP_TOWN3D_API.focus(id);
  }
}

window.NP_SELECT_ATTRACTION = setAttractionDetails;

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
    if (item.id && item.id === selectedAttractionId) {
      card.classList.add("selected");
    }
    card.dataset.attractionId = item.id;
    card.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>${item.type}</p>
      </div>
      <span>${item.neighborhood}</span>
    `;
    card.addEventListener("click", () => {
      setAttractionDetails(item.id);
    });
    attractionCards.appendChild(card);
  });

  if (filtered.length === 0) {
    attractionCards.innerHTML = "<p>No attractions match yet.</p>";
  }

  const suggestions = loadSuggestedAttractions();
  if (suggestions.length > 0) {
    const divider = document.createElement("div");
    divider.className = "list-divider";
    divider.textContent = "Suggested (local)";
    attractionCards.appendChild(divider);

    suggestions.forEach((item) => {
      const card = document.createElement("div");
      card.className = "attraction-card suggested";
      if (item.id && item.id === selectedAttractionId) {
        card.classList.add("selected");
      }
      card.dataset.attractionId = item.id;
      card.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <p>${categoryLabel(item.category)} · Suggested</p>
        </div>
        <span>pending</span>
      `;
      card.addEventListener("click", () => {
        setAttractionDetails(item.id);
      });
      attractionCards.appendChild(card);
    });
  }
}

function initAttractions() {
  const categorySelect = document.getElementById("category-select");
  const neighborhoodSelect = document.getElementById("neighborhood-select");

  if (!categorySelect || !neighborhoodSelect) {
    return;
  }

  function sync() {
    renderAttractions();
    if (window.NP_TOWN3D_API?.setFilter) {
      window.NP_TOWN3D_API.setFilter({
        category: categorySelect.value,
        neighborhood: neighborhoodSelect.value,
      });
    }
  }

  categorySelect.addEventListener("change", sync);
  neighborhoodSelect.addEventListener("change", sync);
  sync();
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

function initSuggestionForm() {
  const nameInput = document.getElementById("suggest-name");
  const categorySelect = document.getElementById("suggest-category");
  const descInput = document.getElementById("suggest-desc");
  const pickButton = document.getElementById("suggest-pick");
  const submitButton = document.getElementById("suggest-submit");
  const status = document.getElementById("suggest-status");

  if (
    !nameInput ||
    !categorySelect ||
    !descInput ||
    !pickButton ||
    !submitButton
  ) {
    return;
  }

  let picked = null;

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  pickButton.addEventListener("click", () => {
    if (!window.NP_TOWN3D_API?.beginPick) {
      setStatus("3D map not ready yet.");
      return;
    }
    setStatus("Click on the 3D map to place your suggestion.");
    window.NP_TOWN3D_API.beginPick((pos) => {
      picked = pos;
      setStatus("Location set. Press Submit to save your suggestion.");
    });
  });

  submitButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    const category = categorySelect.value;

    if (!name) {
      setStatus("Please add a name.");
      return;
    }
    if (!description) {
      setStatus("Please add a short description.");
      return;
    }
    if (!picked) {
      setStatus("Pick a location on the map first.");
      return;
    }

    const suggestion = {
      id: `suggest-${Date.now().toString(36)}`,
      name,
      category,
      neighborhood: "",
      type: "Suggested",
      description,
      position: picked,
    };

    const list = loadSuggestedAttractions();
    list.unshift(suggestion);
    saveSuggestedAttractions(list);

    if (window.NP_TOWN3D_API?.addSuggestion) {
      window.NP_TOWN3D_API.addSuggestion(suggestion);
    }
    if (window.NP_TOWN3D_API?.clearPickPreview) {
      window.NP_TOWN3D_API.clearPickPreview();
    }

    setAttractionDetails(suggestion.id);
    setStatus("Suggestion saved locally (demo).");

    nameInput.value = "";
    descInput.value = "";
    picked = null;
  });
}

function initTown3D() {
  const container = document.getElementById("town3d");
  const tooltip = document.getElementById("map-tooltip");
  const resetButton = document.getElementById("reset-town");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  const loading = document.createElement("div");
  loading.className = "town-loading";
  loading.textContent = "Loading town…";
  container.appendChild(loading);

  if (typeof THREE === "undefined") {
    loading.textContent =
      "3D map unavailable (Three.js didn’t load). If you’re offline, download Three.js and link it locally.";
    return;
  }

  let scene = null;
  let renderer = null;

  try {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (error) {
    loading.textContent =
      "3D map unavailable (WebGL error). Try enabling WebGL or using a different browser.";
    console.error(error);
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.touchAction = "none";

  // Approximate full-town bounds (New Providence + immediate edges).
  const osmBounds = {
    south: 40.672,
    west: -74.45,
    north: 40.723,
    east: -74.374,
  };
  const osmCenter = {
    lat: (osmBounds.south + osmBounds.north) / 2,
    lon: (osmBounds.west + osmBounds.east) / 2,
  };

  const metersPerLat = 111_320;
  const metersPerLon = metersPerLat * Math.cos((osmCenter.lat * Math.PI) / 180);
  const groundWidth = Math.max(600, (osmBounds.east - osmBounds.west) * metersPerLon);
  const groundDepth = Math.max(
    600,
    (osmBounds.north - osmBounds.south) * metersPerLat,
  );

  const frustumSize = Math.max(260, Math.max(groundWidth, groundDepth) * 0.35);
  const fogDensity = Math.max(
    0.00018,
    Math.min(0.00055, 1 / (frustumSize * 1.45)),
  );
  scene.fog = new THREE.FogExp2(0xe6efe8, fogDensity);

  const initialRect = container.getBoundingClientRect();
  const initialWidth = Math.max(1, Math.round(initialRect.width));
  const initialHeight = Math.max(1, Math.round(initialRect.height));
  const aspect = initialWidth / initialHeight;
  const farPlane = Math.max(8000, frustumSize * 6);
  const camera = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    0.1,
    farPlane,
  );

  camera.zoom = 2.1;
  camera.updateProjectionMatrix();
  camera.position.set(frustumSize * 0.55, frustumSize * 1.05, frustumSize * 0.55);
  camera.lookAt(0, 0, 0);

  // Lightweight isometric controls (OrbitControls-free) to keep this a single-file build.
  const controls = (() => {
    const target = new THREE.Vector3(0, 0, 0);
    const state = {
      dragging: false,
      button: 0,
      pointerId: null,
      lastX: 0,
      lastY: 0,
      minZoom: 0.85,
      maxZoom: 6.5,
      minPolar: Math.PI / 10,
      maxPolar: Math.PI / 2.7,
    };

    function updateCameraLook() {
      camera.lookAt(target);
    }

    function panPixels(dxPx, dyPx) {
      const rect = renderer.domElement.getBoundingClientRect();
      const panX =
        (dxPx * (frustumSize * (rect.width / rect.height))) /
        rect.width /
        camera.zoom;
      const panZ = (dyPx * frustumSize) / rect.height / camera.zoom;

      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.setY(0).normalize();
      const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

      const delta = new THREE.Vector3();
      delta.addScaledVector(right, -panX);
      delta.addScaledVector(forward, panZ);

      target.add(delta);
      camera.position.add(delta);
    }

    function rotatePixels(dxPx, dyPx) {
      const rotSpeed = 0.005;
      const offset = camera.position.clone().sub(target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta -= dxPx * rotSpeed;
      spherical.phi -= dyPx * rotSpeed;
      spherical.phi = Math.max(state.minPolar, Math.min(state.maxPolar, spherical.phi));
      offset.setFromSpherical(spherical);
      camera.position.copy(target).add(offset);
      updateCameraLook();
    }

    function onWheel(event) {
      event.preventDefault();
      const zoomSpeed = 0.0018;
      const next = camera.zoom * (1 - event.deltaY * zoomSpeed);
      camera.zoom = Math.max(state.minZoom, Math.min(state.maxZoom, next));
      camera.updateProjectionMatrix();
    }

    renderer.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
    renderer.domElement.addEventListener(
      "wheel",
      (event) => onWheel(event),
      { passive: false },
    );

    renderer.domElement.addEventListener("pointerup", () => {
      state.dragging = false;
      state.pointerId = null;
      renderer.domElement.style.cursor = "grab";
    });

    renderer.domElement.addEventListener("pointercancel", () => {
      state.dragging = false;
      state.pointerId = null;
      renderer.domElement.style.cursor = "grab";
    });

    function beginDrag(event) {
      state.dragging = true;
      state.button = event.button;
      state.pointerId = event.pointerId;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
      renderer.domElement.style.cursor = event.button === 2 ? "grabbing" : "grabbing";
    }

    function drag(event) {
      if (!state.dragging || state.pointerId !== event.pointerId) return;
      const dx = event.clientX - state.lastX;
      const dy = event.clientY - state.lastY;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      if (state.button === 2) rotatePixels(dx, dy);
      else panPixels(dx, dy);
    }

    return {
      target,
      update: updateCameraLook,
      beginDrag,
      drag,
    };
  })();

  const ambient = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff4d1, 1.15);
  sun.position.set(240, 380, 160);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(groundWidth, groundDepth),
    new THREE.MeshStandardMaterial({
      color: 0xf7fbf8,
      roughness: 0.98,
      metalness: 0.0,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.userData.kind = "ground";
  scene.add(ground);

  // Town geometry populated from OpenStreetMap (Overpass API). Falls back to demo blocks.
  let townBuildings = null;
  let townRoads = null;

  const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
  const buildingMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9,
    metalness: 0.0,
    vertexColors: true,
  });

  const roadMaterial = new THREE.LineBasicMaterial({
    color: 0x1e4d2b,
    transparent: true,
    opacity: 0.55,
  });

  function project(lat, lon) {
    return {
      x: (lon - osmCenter.lon) * metersPerLon,
      z: (osmCenter.lat - lat) * metersPerLat,
    };
  }

  function parseHeight(tags) {
    if (!tags) return null;
    const rawHeight = tags.height || tags["building:height"];
    if (rawHeight) {
      const parsed = parseFloat(String(rawHeight).replace(/[a-z]/gi, ""));
      if (Number.isFinite(parsed)) return Math.max(6, Math.min(120, parsed));
    }
    const levels = parseFloat(tags["building:levels"]);
    if (Number.isFinite(levels)) return Math.max(6, Math.min(120, levels * 3));
    return null;
  }

  function demoTown() {
    const dummy = new THREE.Object3D();
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#f3f7fa"),
      new THREE.Color("#eef5f0"),
      new THREE.Color("#fff4d1"),
    ];
    const buildingCount = 520;
    const buildings = new THREE.InstancedMesh(
      buildingGeometry,
      buildingMaterial,
      buildingCount,
    );
    buildings.castShadow = true;
    buildings.receiveShadow = true;

    function rand(min, max) {
      return min + Math.random() * (max - min);
    }

    for (let i = 0; i < buildingCount; i += 1) {
      const x = rand(-groundWidth * 0.25, groundWidth * 0.25);
      const z = rand(-groundDepth * 0.25, groundDepth * 0.25);
      const w = rand(10, 22);
      const d = rand(10, 24);
      const h = rand(8, 46);

      dummy.position.set(x, h / 2, z);
      dummy.scale.set(w, h, d);
      dummy.rotation.y = rand(-0.5, 0.5);
      dummy.updateMatrix();
      buildings.setMatrixAt(i, dummy.matrix);
      buildings.setColorAt(i, palette[i % palette.length]);
    }

    buildings.instanceMatrix.needsUpdate = true;
    if (buildings.instanceColor) buildings.instanceColor.needsUpdate = true;

    if (townBuildings) scene.remove(townBuildings);
    if (townRoads) scene.remove(townRoads);

    scene.add(buildings);
    townBuildings = buildings;
    townRoads = null;
    loading.textContent = "Demo town (fallback)";
    setTimeout(() => loading.remove(), 1200);
  }

  async function loadOsmTown() {
    loading.textContent = "Loading OpenStreetMap…";

    const query = `
[out:json][timeout:25];
(
  way["building"](${osmBounds.south},${osmBounds.west},${osmBounds.north},${osmBounds.east});
  way["highway"~"motorway|trunk|primary|secondary|tertiary|residential|unclassified|service|living_street"](${osmBounds.south},${osmBounds.west},${osmBounds.north},${osmBounds.east});
);
out geom;
`;

    async function fetchOverpass() {
      function fetchWithTimeout(url, options, timeoutMs) {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
        const opts = { ...options, signal: controller.signal };
        return fetch(url, opts).finally(() => window.clearTimeout(timeoutId));
      }

      // Prefer same-origin proxy (more reliable CORS-wise). Falls back to direct Overpass.
      try {
        const proxy = await fetchWithTimeout(
          "/api/osm",
          { cache: "no-store" },
          1200,
        );
        if (proxy.ok) return proxy.json();
      } catch {
        // ignore
      }

      const response = await fetchWithTimeout(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: query,
        },
        12_000,
      );

      if (!response.ok) {
        throw new Error("Overpass request failed");
      }

      return response.json();
    }

    const data = await fetchOverpass();

    const buildings = [];
    const roadVerts = [];

    for (const el of data.elements || []) {
      if (el.type !== "way" || !Array.isArray(el.geometry)) continue;
      const tags = el.tags || {};

      if (tags.building) {
        let minX = Infinity;
        let maxX = -Infinity;
        let minZ = Infinity;
        let maxZ = -Infinity;

        for (const p of el.geometry) {
          const q = project(p.lat, p.lon);
          minX = Math.min(minX, q.x);
          maxX = Math.max(maxX, q.x);
          minZ = Math.min(minZ, q.z);
          maxZ = Math.max(maxZ, q.z);
        }

        const w = maxX - minX;
        const d = maxZ - minZ;
        if (!Number.isFinite(w) || !Number.isFinite(d)) continue;
        if (w < 3 || d < 3) continue;

        const height = parseHeight(tags) || 6 + Math.min(40, Math.sqrt(w * d) * 0.35);
        buildings.push({
          cx: (minX + maxX) / 2,
          cz: (minZ + maxZ) / 2,
          w,
          d,
          h: height,
          kind: tags.building,
          area: w * d,
        });
        continue;
      }

      if (tags.highway) {
        for (let i = 0; i < el.geometry.length - 1; i += 1) {
          const a = project(el.geometry[i].lat, el.geometry[i].lon);
          const b = project(el.geometry[i + 1].lat, el.geometry[i + 1].lon);
          roadVerts.push(a.x, 0.3, a.z, b.x, 0.3, b.z);
        }
      }
    }

    buildings.sort((a, b) => b.area - a.area);
    const maxBuildings = 6500;
    const count = Math.min(maxBuildings, buildings.length);

    loading.textContent = `Building 3D town… (${count.toLocaleString()} buildings)`;

    const mesh = new THREE.InstancedMesh(buildingGeometry, buildingMaterial, count);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const colors = {
      house: new THREE.Color("#ffffff"),
      residential: new THREE.Color("#f3f7fa"),
      apartments: new THREE.Color("#eef5f0"),
      commercial: new THREE.Color("#fff4d1"),
      retail: new THREE.Color("#fff4d1"),
      school: new THREE.Color("#fff4d1"),
    };

    for (let i = 0; i < count; i += 1) {
      const b = buildings[i];
      const w = Math.max(4, Math.min(120, b.w));
      const d = Math.max(4, Math.min(120, b.d));
      const h = Math.max(6, Math.min(120, b.h));

      dummy.position.set(b.cx, h / 2, b.cz);
      dummy.scale.set(w, h, d);
      dummy.rotation.y = 0;
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const col = colors[b.kind] || colors.residential;
      mesh.setColorAt(i, col);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    if (townBuildings) scene.remove(townBuildings);
    townBuildings = mesh;
    scene.add(mesh);

    if (roadVerts.length > 0) {
      const roadGeo = new THREE.BufferGeometry();
      roadGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(roadVerts, 3),
      );
      const roads = new THREE.LineSegments(roadGeo, roadMaterial);
      roads.frustumCulled = false;
      if (townRoads) scene.remove(townRoads);
      townRoads = roads;
      scene.add(roads);
    }

    loading.remove();
  }

  let didFallback = false;

  function ensureFallback() {
    if (didFallback) return;
    didFallback = true;
    demoTown();
  }

  const fallbackTimer = window.setTimeout(() => {
    ensureFallback();
  }, 2200);

  loadOsmTown()
    .then(() => {
      window.clearTimeout(fallbackTimer);
    })
    .catch(() => {
      window.clearTimeout(fallbackTimer);
      ensureFallback();
    });

  // Pins
  const pinsGroup = new THREE.Group();
  scene.add(pinsGroup);

  function createPinTexture({ fill, outline }) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      return texture;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Drop shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx.beginPath();
    ctx.ellipse(64, 104, 22, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pin body
    ctx.fillStyle = fill;
    ctx.strokeStyle = outline;
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.arc(64, 46, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(64, 68);
    ctx.lineTo(48, 102);
    ctx.lineTo(80, 102);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }

  const pinTextureOfficial = createPinTexture({
    fill: "#ffb81c",
    outline: "#1e4d2b",
  });
  const pinTextureSuggested = createPinTexture({
    fill: "#1e4d2b",
    outline: "#ffb81c",
  });

  function makePinSprite(texture, scale = 22) {
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    material.fog = false;
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(scale, scale, 1);
    sprite.renderOrder = 10;
    return sprite;
  }

  const pinsById = new Map();

  function addPin(item, kind) {
    const texture = kind === "suggested" ? pinTextureSuggested : pinTextureOfficial;
    const baseScale = kind === "suggested" ? 40 : 44;
    const sprite = makePinSprite(texture, baseScale);
    sprite.position.set(item.position.x, 40, item.position.z);
    sprite.userData = { kind: "pin", id: item.id, baseScale };
    pinsGroup.add(sprite);
    pinsById.set(item.id, sprite);
    return sprite;
  }

  attractionData.forEach((item) => addPin(item, "official"));
  loadSuggestedAttractions().forEach((item) => addPin(item, "suggested"));

  // Interaction
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pickCallback = null;
  let previewPin = null;
  let isDragging = false;

  function setTooltip(message) {
    if (!tooltip) return;
    if (!message) {
      tooltip.classList.remove("visible");
      return;
    }
    tooltip.textContent = message;
    tooltip.classList.add("visible");
  }

  function updatePointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function getGroundHit(event) {
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(ground, false);
    return hits.length ? hits[0] : null;
  }

  function getPinHit(event) {
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pinsGroup.children, false);
    return hits.length ? hits[0] : null;
  }

  renderer.domElement.addEventListener("pointermove", (event) => {
    if (isDragging) {
      controls.drag(event);
      return;
    }
    const hit = getPinHit(event);
    if (hit?.object?.userData?.id) {
      const resolved = findAttractionById(hit.object.userData.id);
      setTooltip(resolved ? resolved.item.name : "");
      renderer.domElement.style.cursor = "pointer";
      return;
    }
    renderer.domElement.style.cursor = pickCallback ? "crosshair" : "grab";
    setTooltip("");
  });

  renderer.domElement.addEventListener("pointerdown", (event) => {
    const pinHit = getPinHit(event);
    if (pinHit?.object?.userData?.id) {
      setAttractionDetails(pinHit.object.userData.id, { focusMap: false });
      return;
    }

    if (pickCallback) {
      const groundHit = getGroundHit(event);
      if (!groundHit) return;
      const point = groundHit.point;
      const pos = { x: Math.round(point.x), z: Math.round(point.z) };

      if (!previewPin) {
        previewPin = makePinSprite(pinTextureSuggested, 20);
        previewPin.position.set(pos.x, 18, pos.z);
        pinsGroup.add(previewPin);
      } else {
        previewPin.position.set(pos.x, 18, pos.z);
      }

      const cb = pickCallback;
      pickCallback = null;
      cb(pos);
      return;
    }

    isDragging = true;
    controls.beginDrag(event);
  });

  renderer.domElement.addEventListener("pointerup", () => {
    isDragging = false;
  });

  renderer.domElement.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  // Smooth focus
  const defaultTarget = controls.target.clone();
  const defaultCam = camera.position.clone();
  const defaultZoom = camera.zoom;

  function tweenTo(target, camPos) {
    const startTime = performance.now();
    const duration = 650;
    const fromTarget = controls.target.clone();
    const fromCam = camera.position.clone();

    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animate(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const k = easeInOut(t);
      controls.target.lerpVectors(fromTarget, target, k);
      camera.position.lerpVectors(fromCam, camPos, k);
      if (t < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function focus(id) {
    const pin = pinsById.get(id);
    if (!pin) return;
    const target = new THREE.Vector3(pin.position.x, 0, pin.position.z);
    const offset = camera.position.clone().sub(controls.target);
    tweenTo(target, target.clone().add(offset));
  }

  function reset() {
    tweenTo(defaultTarget.clone(), defaultCam.clone());
    camera.zoom = defaultZoom;
    camera.updateProjectionMatrix();
  }

  function setFilter({ category, neighborhood }) {
    pinsById.forEach((sprite, id) => {
      const resolved = findAttractionById(id);
      if (!resolved) return;
      if (resolved.kind === "suggested") {
        sprite.visible = true;
        return;
      }
      const matchesCategory =
        category === "all" || resolved.item.category === category;
      const matchesNeighborhood =
        neighborhood === "all" || resolved.item.neighborhood === neighborhood;
      sprite.visible = matchesCategory && matchesNeighborhood;
    });
  }

  function beginPick(cb) {
    pickCallback = cb;
    renderer.domElement.style.cursor = "crosshair";
  }

  function addSuggestion(item) {
    if (!item?.id || pinsById.has(item.id)) return;
    addPin(item, "suggested");
  }

  function clearPickPreview() {
    if (!previewPin) return;
    pinsGroup.remove(previewPin);
    previewPin.material?.dispose?.();
    previewPin = null;
  }

  function select(id) {
    pinsById.forEach((sprite, key) => {
      const s = sprite.userData?.baseScale || 22;
      const bump = key === id ? 1.28 : 1;
      sprite.scale.set(s * bump, s * bump, 1);
    });
  }

  window.NP_TOWN3D_API = {
    focus,
    reset,
    setFilter,
    beginPick,
    addSuggestion,
    clearPickPreview,
    select,
  };

  if (resetButton) resetButton.addEventListener("click", reset);

  let lastWidth = 0;
  let lastHeight = 0;

  function syncSize() {
    const rect = container.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    if (width === lastWidth && height === lastHeight) return;
    lastWidth = width;
    lastHeight = height;

    renderer.setSize(width, height, false);
    const nextAspect = width / height;
    camera.left = (frustumSize * nextAspect) / -2;
    camera.right = (frustumSize * nextAspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", syncSize);
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => syncSize());
    ro.observe(container);
  }
  // Try a few times in case layout settles after first paint.
  for (let i = 0; i < 5; i += 1) {
    requestAnimationFrame(syncSize);
  }

  function loop() {
    syncSize();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  loop();
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
  const tabList = document.querySelector(".forum-tabs");
  const panelWrap = document.querySelector(".forum-panels");
  if (!tabList || !panelWrap) return;

  tabList.addEventListener("click", (event) => {
    const tab = event.target.closest(".forum-tab");
    if (!tab || !tabList.contains(tab)) return;
    const target = tab.dataset.tab;
    if (!target) return;

    tabList.querySelectorAll(".forum-tab").forEach((btn) => {
      btn.classList.remove("active");
    });
    panelWrap.querySelectorAll(".forum-panel").forEach((panel) => {
      panel.classList.remove("active");
    });

    tab.classList.add("active");
    const panel = document.getElementById(target);
    if (panel) panel.classList.add("active");
  });
}

function initBulletinInbox() {
  const track = document.getElementById("bulletin-track");
  if (!track) return;

  const items = consumeBulletinInbox();
  if (items.length === 0) return;

  const fragment = document.createDocumentFragment();
  const maxItems = 6;
  const limited = items.slice(0, maxItems);

  limited.forEach((item) => {
    const card = document.createElement("div");
    card.className = "bulletin-card is-new";
    card.dataset.kind = "inbox-item";

    const tag = document.createElement("p");
    tag.className = "tag is-new";
    tag.textContent = "New Addition";

    const title = document.createElement("h3");
    const body = document.createElement("p");
    const meta = document.createElement("p");
    meta.className = "note";
    meta.textContent = "Submitted from Support (clears on refresh).";

    const kind = item.kind || "submission";

    if (kind === "lost-pet") {
      const name = item.petName ? String(item.petName) : "Lost pet report";
      const lastSeen = item.lastSeen ? String(item.lastSeen) : "Unknown location";
      title.textContent = `${name} · ${lastSeen}`;
      body.textContent = String(item.description || "");
      if (item.contact) {
        const contact = document.createElement("p");
        contact.className = "note";
        contact.textContent = `Contact: ${String(item.contact)}`;
        card.appendChild(tag);
        card.appendChild(title);
        card.appendChild(body);
        card.appendChild(contact);
        card.appendChild(meta);
        fragment.appendChild(card);
        return;
      }
    } else if (kind === "town-ticket") {
      const category = item.category ? String(item.category) : "Town issue";
      const location = item.location ? String(item.location) : "Unknown location";
      title.textContent = `${category} · ${location}`;
      body.textContent = String(item.description || "");
      if (item.id) {
        meta.textContent = `Ticket ${String(item.id)} · clears on refresh.`;
      }
    } else {
      title.textContent = String(item.title || "New submission");
      body.textContent = String(item.description || "");
    }

    card.appendChild(tag);
    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(meta);
    fragment.appendChild(card);
  });

  track.insertBefore(fragment, track.firstChild);
}

function showToast(message, { duration = 2800 } = {}) {
  const existing = document.querySelector(".np-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "np-toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("visible"));

  window.setTimeout(() => {
    toast.classList.remove("visible");
    window.setTimeout(() => toast.remove(), 260);
  }, duration);
}

function openModal({ title, content } = {}) {
  const lastActive = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;

  const backdrop = document.createElement("div");
  backdrop.className = "np-modal-backdrop";
  backdrop.innerHTML = `
    <div class="np-modal" role="dialog" aria-modal="true">
      <div class="np-modal-header">
        <h3 class="np-modal-title"></h3>
        <button class="ghost np-modal-close" type="button">Close</button>
      </div>
      <div class="np-modal-body"></div>
    </div>
  `;

  const titleEl = backdrop.querySelector(".np-modal-title");
  const bodyEl = backdrop.querySelector(".np-modal-body");
  const closeBtn = backdrop.querySelector(".np-modal-close");
  if (titleEl) titleEl.textContent = title || "Details";

  if (bodyEl) {
    if (typeof content === "string") {
      bodyEl.innerHTML = content;
    } else if (content instanceof Node) {
      bodyEl.appendChild(content);
    }
  }

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  function close() {
    document.removeEventListener("keydown", onKeyDown);
    document.body.style.overflow = previousOverflow;
    backdrop.remove();
    if (lastActive) lastActive.focus();
  }

  function onKeyDown(event) {
    if (event.key === "Escape") close();
  }

  document.addEventListener("keydown", onKeyDown);

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });

  if (closeBtn) closeBtn.addEventListener("click", close);

  document.body.appendChild(backdrop);
  if (closeBtn && closeBtn instanceof HTMLElement) closeBtn.focus();

  return { close, body: bodyEl };
}

function initTownAlertsButton() {
  const button = document.getElementById("town-alerts-btn");
  const banner = document.getElementById("warning-banner");
  if (!button || !banner) return;

  button.addEventListener("click", () => {
    banner.scrollIntoView({ behavior: "smooth", block: "start" });
    banner.classList.remove("flash");
    // Force reflow so the animation restarts.
    void banner.offsetWidth;
    banner.classList.add("flash");

    const heading = banner.querySelector("strong")?.textContent?.trim() || "Warnings";
    const message = banner.querySelector("span")?.textContent?.trim() || "";
    openModal({
      title: heading,
      content: `
        <p>${message}</p>
        <p class="note">Demo: This panel is ready for live town alert feeds.</p>
      `,
    });
  });
}

function initBulletinCalendar() {
  const addButton = document.getElementById("bulletin-add-event");
  const grid = document.getElementById("calendar-grid");
  if (!addButton || !grid) return;

  const CALENDAR_STORAGE_KEY = "np_calendar_events_v1";

  function loadEvents() {
    const raw = loadStorageJSON(CALENDAR_STORAGE_KEY, []);
    return Array.isArray(raw) ? raw : [];
  }

  function saveEvents(list) {
    saveStorageJSON(CALENDAR_STORAGE_KEY, list);
  }

  function formatDate(value) {
    const d = new Date(value);
    if (!Number.isFinite(d.getTime())) return String(value || "");
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function render() {
    grid
      .querySelectorAll('[data-kind="user-event"], [data-kind="user-divider"]')
      .forEach((el) => el.remove());

    const events = loadEvents();
    if (events.length === 0) return;

    const divider = document.createElement("div");
    divider.className = "calendar-divider";
    divider.dataset.kind = "user-divider";
    divider.textContent = "Your Added Events";
    grid.appendChild(divider);

    events.forEach((event) => {
      const card = document.createElement("div");
      card.dataset.kind = "user-event";

      const date = document.createElement("p");
      date.className = "calendar-date";
      date.textContent = formatDate(event.date);

      const title = document.createElement("p");
      title.textContent = event.title || "Untitled event";

      card.appendChild(date);
      card.appendChild(title);

      if (event.details) {
        const details = document.createElement("p");
        details.className = "note";
        details.textContent = event.details;
        card.appendChild(details);
      }

      grid.appendChild(card);
    });
  }

  render();

  addButton.addEventListener("click", () => {
    const modal = openModal({ title: "Add a town event" });
    if (!modal.body) return;

    const form = document.createElement("form");

    const rows = document.createElement("div");
    rows.className = "np-modal-grid";

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Date";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.required = true;
    dateInput.valueAsDate = new Date();
    dateLabel.appendChild(dateInput);

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Event title";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "e.g., PTA meeting";
    titleInput.required = true;
    titleLabel.appendChild(titleInput);

    rows.appendChild(dateLabel);
    rows.appendChild(titleLabel);

    const detailsLabel = document.createElement("label");
    detailsLabel.textContent = "Details (optional)";
    const detailsInput = document.createElement("textarea");
    detailsInput.rows = 3;
    detailsInput.placeholder = "Time, location, notes…";
    detailsLabel.appendChild(detailsInput);

    const actions = document.createElement("div");
    actions.className = "np-modal-actions";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "ghost";
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", modal.close);

    const saveBtn = document.createElement("button");
    saveBtn.type = "submit";
    saveBtn.className = "primary";
    saveBtn.textContent = "Add event";

    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);

    form.appendChild(rows);
    form.appendChild(detailsLabel);
    form.appendChild(actions);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = titleInput.value.trim();
      const dateValue = dateInput.value;
      const details = detailsInput.value.trim();

      if (!title) {
        showToast("Add an event title.");
        return;
      }
      if (!dateValue) {
        showToast("Pick a date.");
        return;
      }

      const entry = {
        id: `event-${Date.now().toString(36)}`,
        date: dateValue,
        title,
        details,
        createdAt: new Date().toISOString(),
      };

      const list = loadEvents();
      list.unshift(entry);
      saveEvents(list);
      render();
      modal.close();
      showToast("Event added (saved locally).");
    });

    modal.body.appendChild(form);
    titleInput.focus();
  });
}

function initEducationLinks() {
  const buttons = document.querySelectorAll(".edu-link[data-edu-link]");
  if (buttons.length === 0) return;

  const EDU_LINKS_STORAGE_KEY = "np_education_links_v1";
  const defaults = {
    district: "https://www.npsd.k12.nj.us/",
    portal: "",
    lunch: "",
  };
  const labels = {
    district: "District site",
    portal: "Parent portal",
    lunch: "Lunch menus",
  };

  function loadLinks() {
    const raw = loadStorageJSON(EDU_LINKS_STORAGE_KEY, {});
    return raw && typeof raw === "object" ? raw : {};
  }

  function saveLinks(map) {
    saveStorageJSON(EDU_LINKS_STORAGE_KEY, map);
  }

  function coerceUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) return null;
    const withScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)
      ? raw
      : `https://${raw}`;
    try {
      const url = new URL(withScheme);
      if (url.protocol !== "http:" && url.protocol !== "https:") return null;
      return url.toString();
    } catch {
      return null;
    }
  }

  buttons.forEach((btn) => {
    const key = btn.dataset.eduLink;
    if (!key) return;

    btn.addEventListener("click", (event) => {
      const links = loadLinks();
      const existing = typeof links[key] === "string" ? links[key] : "";
      const url = existing || defaults[key] || "";

      if (url && !event.shiftKey) {
        window.open(url, "_blank", "noopener");
        return;
      }

      const modal = openModal({ title: `Set link: ${labels[key] || key}` });
      if (!modal.body) return;

      const form = document.createElement("form");

      const urlLabel = document.createElement("label");
      urlLabel.textContent = "URL";
      const urlInput = document.createElement("input");
      urlInput.type = "text";
      urlInput.placeholder = "https://...";
      urlInput.value = url;
      urlLabel.appendChild(urlInput);

      const note = document.createElement("p");
      note.className = "note";
      note.textContent =
        "Tip: Hold Shift while clicking the button to edit this link later.";

      const actions = document.createElement("div");
      actions.className = "np-modal-actions";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "ghost";
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", modal.close);

      const saveBtn = document.createElement("button");
      saveBtn.type = "submit";
      saveBtn.className = "primary";
      saveBtn.textContent = "Save link";

      actions.appendChild(cancelBtn);
      actions.appendChild(saveBtn);

      form.appendChild(urlLabel);
      form.appendChild(note);
      form.appendChild(actions);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const next = coerceUrl(urlInput.value);
        if (!next) {
          showToast("Please enter a valid http(s) URL.");
          return;
        }
        const nextLinks = loadLinks();
        nextLinks[key] = next;
        saveLinks(nextLinks);
        modal.close();
        showToast("Link saved.");
        window.open(next, "_blank", "noopener");
      });

      modal.body.appendChild(form);
      urlInput.focus();
      urlInput.select();
    });
  });
}

function initForumPosting() {
  const postButton = document.getElementById("forum-post-question");
  const titleInput = document.getElementById("forum-question-title");
  const detailsInput = document.getElementById("forum-question-details");
  const tabList = document.querySelector(".forum-tabs");
  const panelWrap = document.querySelector(".forum-panels");

  if (!postButton || !titleInput || !detailsInput || !tabList || !panelWrap) {
    return;
  }

  const FORUM_STORAGE_KEY = "np_forum_questions_v1";

  function loadQuestions() {
    const raw = loadStorageJSON(FORUM_STORAGE_KEY, []);
    return Array.isArray(raw) ? raw : [];
  }

  function saveQuestions(list) {
    saveStorageJSON(FORUM_STORAGE_KEY, list);
  }

  function activate(targetId) {
    tabList.querySelectorAll(".forum-tab").forEach((btn) => {
      btn.classList.remove("active");
    });
    panelWrap.querySelectorAll(".forum-panel").forEach((panel) => {
      panel.classList.remove("active");
    });

    const tab = tabList.querySelector(`.forum-tab[data-tab="${targetId}"]`);
    const panel = document.getElementById(targetId);
    if (tab) tab.classList.add("active");
    if (panel) panel.classList.add("active");
  }

  function addToDom(item, { activateNew = false } = {}) {
    const id = item.id;
    if (!id) return;
    if (document.getElementById(id)) return;

    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "forum-tab";
    tab.dataset.tab = id;
    tab.role = "tab";

    const label = String(item.title || "Question");
    tab.textContent = label.length > 20 ? `${label.slice(0, 17)}…` : label;
    tabList.appendChild(tab);

    const panel = document.createElement("div");
    panel.className = "forum-panel";
    panel.id = id;
    panel.role = "tabpanel";

    const post = document.createElement("div");
    post.className = "forum-post compact";

    const h3 = document.createElement("h3");
    h3.textContent = item.title || "Community question";

    const p = document.createElement("p");
    p.textContent = item.details || "Posted by a community member.";

    post.appendChild(h3);
    post.appendChild(p);
    panel.appendChild(post);
    panelWrap.appendChild(panel);

    if (activateNew) activate(id);
  }

  // Render saved posts.
  loadQuestions().forEach((q) => addToDom(q));

  postButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const details = detailsInput.value.trim();

    if (!title) {
      showToast("Add your question first.");
      titleInput.focus();
      return;
    }
    if (!details) {
      showToast("Add a short detail/description.");
      detailsInput.focus();
      return;
    }

    const entry = {
      id: `community-${Date.now().toString(36)}`,
      title,
      details,
      createdAt: new Date().toISOString(),
    };

    const list = loadQuestions();
    list.unshift(entry);
    saveQuestions(list);

    addToDom(entry, { activateNew: true });
    titleInput.value = "";
    detailsInput.value = "";
    showToast("Posted (saved locally).");
  });
}

function initSupportActions() {
  const signupBtn = document.getElementById("support-alerts-signup");
  const hotlinesBtn = document.getElementById("support-hotlines");
  const pickupBtn = document.getElementById("support-pickup");
  const lostPetBtn = document.getElementById("support-lostpet");
  const ticketBtn = document.getElementById("support-ticket");
  const contactsBtn = document.getElementById("support-contacts");

  if (
    !signupBtn &&
    !hotlinesBtn &&
    !pickupBtn &&
    !lostPetBtn &&
    !ticketBtn &&
    !contactsBtn
  ) {
    return;
  }

  const ALERTS_KEY = "np_alert_signups_v1";
  const PICKUPS_KEY = "np_food_pantry_pickups_v1";

  function pushRecord(key, record) {
    const list = loadStorageJSON(key, []);
    const next = Array.isArray(list) ? list : [];
    next.unshift(record);
    saveStorageJSON(key, next);
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const modal = openModal({ title: "Sign up for alerts" });
      if (!modal.body) return;

      const form = document.createElement("form");

      const nameLabel = document.createElement("label");
      nameLabel.textContent = "Name (optional)";
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = "Your name";
      nameLabel.appendChild(nameInput);

      const emailLabel = document.createElement("label");
      emailLabel.textContent = "Email (optional)";
      const emailInput = document.createElement("input");
      emailInput.type = "email";
      emailInput.placeholder = "you@example.com";
      emailLabel.appendChild(emailInput);

      const phoneLabel = document.createElement("label");
      phoneLabel.textContent = "Phone (optional)";
      const phoneInput = document.createElement("input");
      phoneInput.type = "tel";
      phoneInput.placeholder = "(555) 555-5555";
      phoneLabel.appendChild(phoneInput);

      const note = document.createElement("p");
      note.className = "note";
      note.textContent =
        "Demo mode: signups are stored locally on this device (no emails/texts are sent).";

      const actions = document.createElement("div");
      actions.className = "np-modal-actions";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "ghost";
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", modal.close);

      const saveBtn = document.createElement("button");
      saveBtn.type = "submit";
      saveBtn.className = "primary";
      saveBtn.textContent = "Save signup";

      actions.appendChild(cancelBtn);
      actions.appendChild(saveBtn);

      form.appendChild(nameLabel);
      form.appendChild(emailLabel);
      form.appendChild(phoneLabel);
      form.appendChild(note);
      form.appendChild(actions);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        if (!email && !phone) {
          showToast("Add an email or phone number.");
          return;
        }

        pushRecord(ALERTS_KEY, {
          id: `alert-${Date.now().toString(36)}`,
          name: nameInput.value.trim(),
          email,
          phone,
          createdAt: new Date().toISOString(),
        });

        modal.close();
        showToast("Alert signup saved locally.");
      });

      modal.body.appendChild(form);
      emailInput.focus();
    });
  }

  if (hotlinesBtn) {
    hotlinesBtn.addEventListener("click", () => {
      openModal({
        title: "Hotline list",
        content: `
          <p class="note">If you or someone else is in immediate danger, call <strong>911</strong>.</p>
          <ul>
            <li><strong>988</strong> — Suicide &amp; Crisis Lifeline (call/text in the U.S.)</li>
            <li><strong>211</strong> — Local resources and community services (many U.S. areas)</li>
          </ul>
          <p class="note">Replace these with local New Providence hotlines for your final build.</p>
        `,
      });
    });
  }

  if (pickupBtn) {
    pickupBtn.addEventListener("click", () => {
      const modal = openModal({ title: "Schedule a food pantry pickup" });
      if (!modal.body) return;

      const form = document.createElement("form");

      const nameLabel = document.createElement("label");
      nameLabel.textContent = "Name";
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.required = true;
      nameLabel.appendChild(nameInput);

      const contactLabel = document.createElement("label");
      contactLabel.textContent = "Contact (email or phone)";
      const contactInput = document.createElement("input");
      contactInput.type = "text";
      contactInput.placeholder = "you@example.com or (555) 555-5555";
      contactInput.required = true;
      contactLabel.appendChild(contactInput);

      const addressLabel = document.createElement("label");
      addressLabel.textContent = "Pickup location";
      const addressInput = document.createElement("input");
      addressInput.type = "text";
      addressInput.placeholder = "Street / cross-streets";
      addressInput.required = true;
      addressLabel.appendChild(addressInput);

      const dateLabel = document.createElement("label");
      dateLabel.textContent = "Preferred date (optional)";
      const dateInput = document.createElement("input");
      dateInput.type = "date";
      dateLabel.appendChild(dateInput);

      const notesLabel = document.createElement("label");
      notesLabel.textContent = "Notes (optional)";
      const notesInput = document.createElement("textarea");
      notesInput.rows = 3;
      notesInput.placeholder = "Dietary needs, drop-off instructions…";
      notesLabel.appendChild(notesInput);

      const actions = document.createElement("div");
      actions.className = "np-modal-actions";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "ghost";
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", modal.close);

      const saveBtn = document.createElement("button");
      saveBtn.type = "submit";
      saveBtn.className = "primary";
      saveBtn.textContent = "Submit request";

      actions.appendChild(cancelBtn);
      actions.appendChild(saveBtn);

      form.appendChild(nameLabel);
      form.appendChild(contactLabel);
      form.appendChild(addressLabel);
      form.appendChild(dateLabel);
      form.appendChild(notesLabel);
      form.appendChild(actions);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        pushRecord(PICKUPS_KEY, {
          id: `pickup-${Date.now().toString(36)}`,
          name: nameInput.value.trim(),
          contact: contactInput.value.trim(),
          location: addressInput.value.trim(),
          preferredDate: dateInput.value,
          notes: notesInput.value.trim(),
          createdAt: new Date().toISOString(),
        });
        modal.close();
        showToast("Pickup request saved locally.");
      });

      modal.body.appendChild(form);
      nameInput.focus();
    });
  }

  if (lostPetBtn) {
    lostPetBtn.addEventListener("click", () => {
      const modal = openModal({ title: "Report a lost pet" });
      if (!modal.body) return;

      const form = document.createElement("form");

      const petLabel = document.createElement("label");
      petLabel.textContent = "Pet name (optional)";
      const petInput = document.createElement("input");
      petInput.type = "text";
      petInput.placeholder = "Buddy";
      petLabel.appendChild(petInput);

      const descLabel = document.createElement("label");
      descLabel.textContent = "Description";
      const descInput = document.createElement("textarea");
      descInput.rows = 3;
      descInput.required = true;
      descInput.placeholder = "Breed/color, collar, temperament…";
      descLabel.appendChild(descInput);

      const lastSeenLabel = document.createElement("label");
      lastSeenLabel.textContent = "Last seen";
      const lastSeenInput = document.createElement("input");
      lastSeenInput.type = "text";
      lastSeenInput.required = true;
      lastSeenInput.placeholder = "Location + time";
      lastSeenLabel.appendChild(lastSeenInput);

      const contactLabel = document.createElement("label");
      contactLabel.textContent = "How can people reach you?";
      const contactInput = document.createElement("input");
      contactInput.type = "text";
      contactInput.required = true;
      contactInput.placeholder = "Email or phone";
      contactLabel.appendChild(contactInput);

      const actions = document.createElement("div");
      actions.className = "np-modal-actions";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "ghost";
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", modal.close);

      const saveBtn = document.createElement("button");
      saveBtn.type = "submit";
      saveBtn.className = "primary";
      saveBtn.textContent = "Save report";

      actions.appendChild(cancelBtn);
      actions.appendChild(saveBtn);

      form.appendChild(petLabel);
      form.appendChild(descLabel);
      form.appendChild(lastSeenLabel);
      form.appendChild(contactLabel);
      form.appendChild(actions);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        enqueueBulletinInbox({
          kind: "lost-pet",
          petName: petInput.value.trim(),
          description: descInput.value.trim(),
          lastSeen: lastSeenInput.value.trim(),
          contact: contactInput.value.trim(),
          createdAt: new Date().toISOString(),
        });
        modal.close();
        showToast("Lost pet report added to Bulletin (clears on refresh).");
      });

      modal.body.appendChild(form);
      descInput.focus();
    });
  }

  if (ticketBtn) {
    ticketBtn.addEventListener("click", () => {
      const modal = openModal({ title: "File a town improvement ticket" });
      if (!modal.body) return;

      const form = document.createElement("form");

      const categoryLabel = document.createElement("label");
      categoryLabel.textContent = "Category";
      const categorySelect = document.createElement("select");
      [
        "Pothole",
        "Streetlight",
        "Signage",
        "Sidewalk",
        "Drainage",
        "Other",
      ].forEach((label) => {
        const option = document.createElement("option");
        option.value = label;
        option.textContent = label;
        categorySelect.appendChild(option);
      });
      categoryLabel.appendChild(categorySelect);

      const locationLabel = document.createElement("label");
      locationLabel.textContent = "Location";
      const locationInput = document.createElement("input");
      locationInput.type = "text";
      locationInput.required = true;
      locationInput.placeholder = "Street / intersection";
      locationLabel.appendChild(locationInput);

      const descLabel = document.createElement("label");
      descLabel.textContent = "Description";
      const descInput = document.createElement("textarea");
      descInput.rows = 4;
      descInput.required = true;
      descInput.placeholder = "What’s happening, urgency, nearby landmarks…";
      descLabel.appendChild(descInput);

      const actions = document.createElement("div");
      actions.className = "np-modal-actions";

      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "ghost";
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", modal.close);

      const saveBtn = document.createElement("button");
      saveBtn.type = "submit";
      saveBtn.className = "primary";
      saveBtn.textContent = "Submit ticket";

      actions.appendChild(cancelBtn);
      actions.appendChild(saveBtn);

      form.appendChild(categoryLabel);
      form.appendChild(locationLabel);
      form.appendChild(descLabel);
      form.appendChild(actions);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const ticketId = `T-${Date.now().toString(36).toUpperCase()}`;
        enqueueBulletinInbox({
          kind: "town-ticket",
          id: ticketId,
          category: categorySelect.value,
          location: locationInput.value.trim(),
          description: descInput.value.trim(),
          createdAt: new Date().toISOString(),
          status: "received",
        });
        modal.close();
        showToast(`Ticket added to Bulletin: ${ticketId} (clears on refresh).`);
      });

      modal.body.appendChild(form);
      locationInput.focus();
    });
  }

  if (contactsBtn) {
    contactsBtn.addEventListener("click", () => {
      openModal({
        title: "Emergency contacts",
        content: `
          <p class="note">Replace placeholders with official New Providence contacts for your final build.</p>
          <ul>
            <li><strong>911</strong> — Emergency</li>
            <li><strong>988</strong> — Crisis support (U.S.)</li>
            <li>Town Hall — (###) ###-####</li>
            <li>Public Works — (###) ###-####</li>
            <li>Police (non-emergency) — (###) ###-####</li>
          </ul>
        `,
      });
    });
  }
}

function safeInit(fn) {
  try {
    fn();
  } catch (error) {
    console.error(error);
  }
}

safeInit(initTown3D);
safeInit(initAttractions);
safeInit(initSuggestionForm);
safeInit(initFundingChart);
safeInit(initCarousel);
safeInit(initBulletinInbox);
safeInit(initBulletinLoop);
safeInit(initHighlights);
safeInit(initForumTabs);
safeInit(initForumPosting);
safeInit(initHeroHighlights);
safeInit(initTypewriter);
safeInit(initHighlightsTypewriter);
safeInit(initTownAlertsButton);
safeInit(initBulletinCalendar);
safeInit(initEducationLinks);
safeInit(initSupportActions);

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
