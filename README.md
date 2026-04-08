# Xcuse - Excuse Generator

Xcuse is a fun little web app that generates creative excuses for all those moments when you need a good story. Built with vanilla HTML, CSS, and JavaScript, it fetches excuses from an external API and lets you save your favorites for later.

## What It Does

When you need an excuse for skipping that meeting, bailing on plans, or explaining why your assignment is late - Xcuse has got you covered. Pick a category or go random, generate an excuse, copy it, or save it to your favorites collection.

## Features

- Generate random excuses with one click
- Filter by category: Family, Office, College, or Party
- Save excuses you like to your favorites
- Search through your saved favorites
- Sort favorites by date or alphabetically
- Delete saved excuses you no longer need
- Works smoothly on both mobile and desktop
- Your favorites are stored in your browser, so they persist between sessions

## Pages

**Home Page** - This is where you generate excuses. Choose a category, hit generate, and copy or save the result.

**Favorites Page** - All your saved excuses live here. Use the search box to find specific ones, or sort them to get organized. You can delete individual favorites when you no longer need them.

## API

The app uses the Excuser API to fetch real excuses. Here's how it works:

- Random excuse: `https://excuser-three.vercel.app/v1/excuse`
- Category-specific: `https://excuser-three.vercel.app/v1/excuse/{category}`

Categories available: family, office, college, party

## Tech Stack

- HTML for the page structure
- CSS for styling and responsiveness
- JavaScript for all the interactivity
- Fetch API to communicate with the excuse service
- LocalStorage to keep your favorites saved

## Getting Started

If you want to run this locally:

1. Clone the repository:
   ```
   git clone https://github.com/anaymaheshwari762/Xcuse.git
   ```

2. Go to the project folder:
   ```
   cd Xcuse
   ```

3. Open index.html in your browser. That's it - no build tools or server needed.

## Project Structure

```
Xcuse/
├── index.html          - The main home page
├── favorites.html      - Page for managing saved favorites
├── Css/
│   └── style.css       - All styling goes here
├── Js/
│   ├── script.js       - Logic for the home page
│   └── favorites.js     - Logic for the favorites page
└── README.md           - This file
```

## How It Works

The home page fetches excuses from the API based on your selected category. When you save a favorite, it gets stored in your browser's localStorage as a JSON array. The favorites page reads from localStorage, applies your search and sort preferences, and displays the results.

## Credits

Built by Anay Maheshwari
