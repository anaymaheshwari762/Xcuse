const darkModeToggle = document.getElementById("darkModeToggle");

const savedDarkMode = localStorage.getItem("darkMode");
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedDarkMode === "enabled" || (!savedDarkMode && prefersDarkMode)) {
  document.body.classList.add("dark-mode");
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

const favoritesList = document.getElementById("favoritesList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

const categoryNames = {
  family: "👨‍👩‍👧 Family",
  office: "💼 Office",
  college: "🎓 College",
  party: "🎉 Party",
  random: "🎲 Random"
};

const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <div class="empty-state">
        <div class="icon">💔</div>
        <p>No favorites yet!</p>
        <p><a href="index.html">Go back to generate some excuses</a></p>
      </div>
    `;
    return;
  }
  
  renderFavorites(favorites);
};

const filterAndSortFavorites = () => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const searchTerm = searchInput.value.toLowerCase().trim();
  const sortBy = sortSelect.value;
  
  if (searchTerm) {
    favorites = favorites.filter(fav => 
      fav.excuse.toLowerCase().includes(searchTerm) ||
      fav.category.toLowerCase().includes(searchTerm)
    );
  }
  
  switch (sortBy) {
    case "newest":
      favorites.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
      break;
    case "oldest":
      favorites.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt));
      break;
    case "az":
      favorites.sort((a, b) => a.excuse.localeCompare(b.excuse));
      break;
    case "za":
      favorites.sort((a, b) => b.excuse.localeCompare(a.excuse));
      break;
    case "category":
      favorites.sort((a, b) => {
        const catA = categoryNames[a.category] || a.category;
        const catB = categoryNames[b.category] || b.category;
        return catA.localeCompare(catB);
      });
      break;
  }
  
  renderFavorites(favorites, searchTerm);
};

const renderFavorites = (favorites, searchTerm = "") => {
  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <div class="empty-state">
        <div class="icon">🔍</div>
        <p>No matches found</p>
        <p>Try a different search term</p>
      </div>
    `;
    return;
  }
  
  favoritesList.innerHTML = favorites.map(fav => {
    let displayText = fav.excuse;
    if (searchTerm) {
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      displayText = fav.excuse.replace(regex, '<mark>$1</mark>');
    }
    
    return `
      <div class="favorite-item">
        <div class="excuse-content">
          <p class="excuse-text">${displayText}</p>
          <span class="excuse-category">${categoryNames[fav.category] || fav.category}</span>
        </div>
        <button class="delete-btn" onclick="deleteFavorite(${fav.id})">🗑️ Delete</button>
      </div>
    `;
  }).join("");
};

const deleteFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const updatedFavorites = favorites.filter(fav => fav.id !== id);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  
  filterAndSortFavorites();
  
  const deleteBtn = event.target;
  const originalText = deleteBtn.innerText;
  deleteBtn.innerText = "✅ Deleted";
  deleteBtn.style.background = "#00c853";
  
  setTimeout(() => {
    deleteBtn.innerText = originalText;
    deleteBtn.style.background = "";
  }, 1000);
};

const copyExcuse = (excuse) => {
  navigator.clipboard.writeText(excuse);
};

searchInput.addEventListener("input", filterAndSortFavorites);
sortSelect.addEventListener("change", filterAndSortFavorites);

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

loadFavorites();
