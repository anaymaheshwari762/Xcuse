const btn = document.getElementById("generateBtn");
const text = document.getElementById("excuseText");
const category = document.getElementById("category");
const copyBtn = document.getElementById("copyBtn");

const API_URL = "https://excuser-three.vercel.app/v1/excuse";


const fetchExcuse = async () => {
  try {
    text.innerText = "⏳ Generating excuse...";
    
    let url = API_URL;

    if (category.value !== "") {
      url += "/" + category.value;
    }

    const res = await fetch(url);
    const data = await res.json();

    text.innerText = data[0].excuse;

  } catch (error) {
    text.innerText = "❌ Failed to fetch excuse. Try again!";
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

btn.addEventListener("click", fetchExcuse);