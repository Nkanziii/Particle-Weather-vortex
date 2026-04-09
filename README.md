# Particle Weather

A live weather visualisation built with vanilla JavaScript and p5.js. Real-time atmospheric data from the Open-Meteo API is mapped to a generative particle system — 800 particles orbit the canvas, their speed and colour palette shifting based on current conditions in London.

---

## Preview

[Click here to view project](https://nkanziii.github.io/Particle-Weather-vortex/)

---

## How it works

Weather data is fetched from the [Open-Meteo API](https://open-meteo.com/) on page load and refreshes every 10 minutes. The p5.js sketch reads the live values and responds to them:

| Data point | Effect on the sketch |
|---|---|
| Wind speed | Sets the frame rate and orbital speed of particles |
| Temperature | Determines the colour palette |
| Weather code | Overrides palette for rain conditions |

### Colour palettes

| Condition | Palette |
|---|---|
| Rain / showers | Cool greys and blue-greens |
| Windy (> 30 km/h) | Sandy yellows and deep navy |
| Below 0°C | Icy whites and pale blues |
| Cold (≤ 12°C) | Steel blues |
| Mild (≤ 18°C) | Earthy greens and terracotta |
| Hot (> 18°C) | Deep reds and burnt oranges |

---

## Tech stack

- **Vanilla JavaScript** — API fetch, DOM updates, data formatting
- **p5.js** — generative particle system, Perlin noise, additive blend mode
- **Open-Meteo API** — free, no API key required
- **HTML / CSS** — glassmorphism UI, CSS custom properties, responsive layout

---

## Files

```
weather-app/
├── index.html        # Portfolio presentation page
├── style.css         # Dark pink theme, glassmorphism cards
├── script.js         # Fetches weather data, updates DOM
├── sketch.js         # p5.js particle system
└── original/
    ├── index.html    # Original project build
    └── script.js     # Original fetch script
```

---

## Run locally

No build step or dependencies needed. Just open `index.html` in a browser.

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
open index.html
```

The Open-Meteo API is called client-side so it works straight from the file system.

---

## What I learned

- How to use the `fetch` API and handle async data with `async/await`
- How to read and parse a JSON response to update the DOM with `.textContent`
- How to use p5.js `preload()` to load data before the sketch starts
- Mapping real-world data (wind speed, temperature, weather codes) to visual properties in a generative system
- Layering a p5.js canvas behind HTML elements using `position: fixed` and `z-index`
- Using `blendMode(ADD)` in p5.js for a glowing additive light effect
