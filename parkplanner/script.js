document.addEventListener("DOMContentLoaded", () => {
  const parks = [
    {
      name: "Zion National Park",
      region: "West",
      difficulty: "Moderate",
      activities: ["Hiking", "Scenic Views", "Photography"],
      image: "images/zion.jpg",
      description: "Zion is known for towering canyon walls, scenic overlooks, and popular hiking trails.",
      details: "Best season: Spring and fall. Great for hikers and photographers. Popular spots include Angels Landing, The Narrows, and Canyon Overlook Trail."
    },
    {
      name: "Yellowstone National Park",
      region: "Mountain",
      difficulty: "Easy",
      activities: ["Wildlife", "Camping", "Scenic Views"],
      image: "images/yellowstone.jpg",
      description: "Yellowstone offers geysers, wildlife viewing, and large scenic areas that work well for families.",
      details: "Best season: Late spring through early fall. Great for wildlife watching and road trips. Popular spots include Old Faithful, Grand Prismatic Spring, and Lamar Valley."
    },
    {
      name: "Yosemite National Park",
      region: "West",
      difficulty: "Hard",
      activities: ["Waterfalls", "Photography", "Hiking"],
      image: "images/yosemite.jpg",
      description: "Yosemite is famous for granite cliffs, waterfalls, and dramatic views throughout the park.",
      details: "Best season: Spring and summer. Great for hiking and photography. Popular spots include Yosemite Falls, Half Dome, and Tunnel View."
    },
    {
      name: "Grand Canyon National Park",
      region: "West",
      difficulty: "Moderate",
      activities: ["Scenic Views", "Photography", "Camping"],
      image: "images/grandcanyon.jpg",
      description: "The Grand Canyon is one of the most iconic national parks, known for its massive canyon views.",
      details: "Best season: Spring and fall. Great for sightseeing and scenic drives. Popular spots include South Rim viewpoints, Bright Angel Trail, and Desert View."
    },
    {
      name: "Rocky Mountain National Park",
      region: "Mountain",
      difficulty: "Hard",
      activities: ["Hiking", "Wildlife", "Scenic Views"],
      image: "images/rockymountain.jpg",
      description: "Rocky Mountain features alpine lakes, mountain peaks, and high-elevation hiking trails.",
      details: "Best season: Summer and early fall. Great for active travelers. Popular spots include Bear Lake, Trail Ridge Road, and Emerald Lake."
    }
  ];

  const menuButton = document.querySelector("#menu-button");
  const nav = document.querySelector("#primary-nav");
  const featuredParks = document.querySelector("#featured-parks");
  const parksGrid = document.querySelector("#parks-grid");
  const plannerGrid = document.querySelector("#planner-grid");
  const activityFilter = document.querySelector("#activity-filter");
  const regionFilter = document.querySelector("#region-filter");
  const difficultyFilter = document.querySelector("#difficulty-filter");
  const searchFilter = document.querySelector("#search-filter");
  const searchButton = document.querySelector("#search-button");
  const resetButton = document.querySelector("#reset-filters");
  const resultsCount = document.querySelector("#results-count");
  const yearSpan = document.querySelector("#year");

  function createTags(activities) {
    return activities.map(activity => `<span class="tag">${activity}</span>`).join("");
  }

  function createParkCard(park, includeDetailsButton = false) {
    return `
      <article class="card">
        <img src="${park.image}" alt="${park.name}">
        <div class="card-content">
          <h3>${park.name}</h3>
          <p>${park.description}</p>
          <p><strong>Region:</strong> ${park.region}</p>
          <p><strong>Difficulty:</strong> ${park.difficulty}</p>
          <p><strong>Best for:</strong> ${park.activities.join(", ")}</p>
          <div class="tag-row">${createTags(park.activities)}</div>
          ${
            includeDetailsButton
              ? `<button type="button" class="button details-button" data-name="${park.name}">View Details</button>
                 <div class="detail-box hidden"></div>`
              : ""
          }
        </div>
      </article>
    `;
  }

  function displayFeaturedParks() {
    if (!featuredParks) return;
    featuredParks.innerHTML = parks.slice(0, 3).map(park => createParkCard(park)).join("");
  }

  function displayParks(list) {
    if (!parksGrid || !resultsCount) return;

    if (list.length === 0) {
      parksGrid.innerHTML = `
        <article class="card">
          <div class="card-content">
            <h3>No parks found</h3>
            <p>Try changing your filters or search for a different park name.</p>
          </div>
        </article>
      `;
      resultsCount.textContent = "Showing 0 parks";
      return;
    }

    parksGrid.innerHTML = list.map(park => createParkCard(park, true)).join("");
    resultsCount.textContent = `Showing ${list.length} park${list.length === 1 ? "" : "s"}`;
    attachDetailButtonEvents();
  }

  function displayPlannerTips() {
    if (!plannerGrid) return;
    plannerGrid.innerHTML = parks.map(park => `
      <article class="card">
        <div class="card-content">
          <h3>${park.name}</h3>
          <p>${park.details}</p>
        </div>
      </article>
    `).join("");
  }

  function getFilteredParks() {
    const activity = activityFilter ? activityFilter.value : "all";
    const region = regionFilter ? regionFilter.value : "all";
    const difficulty = difficultyFilter ? difficultyFilter.value : "all";
    const searchText = searchFilter ? searchFilter.value.trim().toLowerCase() : "";

    return parks.filter(park => {
      const matchesActivity = activity === "all" || park.activities.includes(activity);
      const matchesRegion = region === "all" || park.region === region;
      const matchesDifficulty = difficulty === "all" || park.difficulty === difficulty;
      const matchesSearch = park.name.toLowerCase().includes(searchText);

      return matchesActivity && matchesRegion && matchesDifficulty && matchesSearch;
    });
  }

  function searchParks() {
    displayParks(getFilteredParks());
  }

  function resetFilters() {
    if (activityFilter) activityFilter.value = "all";
    if (regionFilter) regionFilter.value = "all";
    if (difficultyFilter) difficultyFilter.value = "all";
    if (searchFilter) searchFilter.value = "";
    displayParks(parks);
  }

  function attachDetailButtonEvents() {
    const detailButtons = document.querySelectorAll(".details-button");

    detailButtons.forEach(button => {
      button.addEventListener("click", () => {
        const parkName = button.dataset.name;
        const selectedPark = parks.find(park => park.name === parkName);
        const detailBox = button.nextElementSibling;

        if (!detailBox || !selectedPark) return;

        if (detailBox.classList.contains("hidden")) {
          detailBox.textContent = selectedPark.details;
          detailBox.classList.remove("hidden");
          button.textContent = "Hide Details";
        } else {
          detailBox.classList.add("hidden");
          button.textContent = "View Details";
        }
      });
    });
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", searchParks);
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetFilters);
  }

  if (searchFilter) {
    searchFilter.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        searchParks();
      }
    });
  }

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  displayFeaturedParks();
  displayParks(parks);
  displayPlannerTips();
});