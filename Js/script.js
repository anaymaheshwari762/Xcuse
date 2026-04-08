const btn = document.getElementById("generateBtn");
const text = document.getElementById("excuseText");
const category = document.getElementById("category");
const copyBtn = document.getElementById("copyBtn");
const favBtn = document.getElementById("favBtn");

const API_URL = "https://excuser-three.vercel.app/v1/excuse";

let currentExcuse = "";
let currentExcuseCategory = "";

const fetchExcuse = async () => {
  try {
    text.innerText = "⏳ Generating excuse...";
    favBtn.innerText = "❤️ Save";
    favBtn.classList.remove("saved");
    
    let url = API_URL;

    if (category.value !== "") {
      url += "/" + category.value;
      currentExcuseCategory = category.value;
    } else {
      currentExcuseCategory = "random";
    }

    const res = await fetch(url);
    const data = await res.json();

    currentExcuse = data[0].excuse;
    text.innerText = currentExcuse;
    
    updateFavButtonState();

  } catch (error) {
    text.innerText = "❌ Failed to fetch excuse. Try again!";
  }
};

const updateFavButtonState = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const exists = favorites.some(fav => fav.excuse === currentExcuse);
  
  if (exists) {
    favBtn.innerText = "✅ Saved";
    favBtn.classList.add("saved");
  } else {
    favBtn.innerText = "❤️ Save";
    favBtn.classList.remove("saved");
  }
};

const addToFavorites = () => {
  if (!currentExcuse || currentExcuse.includes("Generating") || currentExcuse.includes("Click the button")) {
    return;
  }
  
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  const exists = favorites.some(fav => fav.excuse === currentExcuse);
  
  if (!exists) {
    const newFav = {
      id: Date.now(),
      excuse: currentExcuse,
      category: currentExcuseCategory,
      savedAt: new Date().toISOString()
    };
    
    favorites.push(newFav);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    favBtn.innerText = "✅ Saved";
    favBtn.classList.add("saved");
  }
};

copyBtn.addEventListener("click", () => {
  const excuse = text.innerText;

  navigator.clipboard.writeText(excuse);
  copyBtn.innerText = "✅ Copied!";

  setTimeout(() => {
    copyBtn.innerText = "📋 Copy";
  }, 1500);
});

favBtn.addEventListener("click", addToFavorites);

btn.addEventListener("click", fetchExcuse);

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}
