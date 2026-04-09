const temperatureEl = document.querySelector('.temperature');
const windSpeedEl   = document.querySelector('.windspeed');
const conditionEl   = document.querySelector('.condition');
const timeEl        = document.querySelector('.time');
const cardsGrid     = document.querySelector('.cards-grid');
const statusDot     = document.getElementById('status-dot');
const statusText    = document.getElementById('status-text');

// WMO weather code → human label + particle system type
const CONDITIONS = {
    0:  { label: 'Clear Sky',           type: 'clear'  },
    1:  { label: 'Mainly Clear',         type: 'clear'  },
    2:  { label: 'Partly Cloudy',        type: 'cloudy' },
    3:  { label: 'Overcast',             type: 'cloudy' },
    45: { label: 'Foggy',                type: 'cloudy' },
    48: { label: 'Icy Fog',              type: 'cloudy' },
    51: { label: 'Light Drizzle',        type: 'rain'   },
    53: { label: 'Drizzle',              type: 'rain'   },
    55: { label: 'Heavy Drizzle',        type: 'rain'   },
    61: { label: 'Light Rain',           type: 'rain'   },
    63: { label: 'Rain',                 type: 'rain'   },
    65: { label: 'Heavy Rain',           type: 'rain'   },
    71: { label: 'Light Snow',           type: 'snow'   },
    73: { label: 'Snow',                 type: 'snow'   },
    75: { label: 'Heavy Snow',           type: 'snow'   },
    77: { label: 'Snow Grains',          type: 'snow'   },
    80: { label: 'Rain Showers',         type: 'rain'   },
    81: { label: 'Rain Showers',         type: 'rain'   },
    82: { label: 'Heavy Showers',        type: 'rain'   },
    85: { label: 'Snow Showers',         type: 'snow'   },
    86: { label: 'Heavy Snow Showers',   type: 'snow'   },
    95: { label: 'Thunderstorm',         type: 'storm'  },
    96: { label: 'Thunderstorm + Hail',  type: 'storm'  },
    99: { label: 'Thunderstorm + Hail',  type: 'storm'  },
};

// Initialise shared state (sketch.js reads this every frame)
window.weatherState = {
    temperature:   null,
    windSpeed:     null,
    conditionType: null,
    loaded:        false,
};

async function fetchData() {
    const url = 'https://api.open-meteo.com/v1/forecast'
        + '?latitude=51.5074&longitude=-0.1278'
        + '&current=temperature_2m,weathercode,windspeed_10m'
        + '&timezone=Europe%2FLondon';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('HTTP ' + response.status);

        const data = await response.json();
        const c    = data.current;
        const cond = CONDITIONS[c.weathercode] ?? { label: 'Unknown', type: 'cloudy' };

        // Update the DOM
        temperatureEl.textContent = c.temperature_2m;
        windSpeedEl.textContent   = c.windspeed_10m;
        conditionEl.textContent   = cond.label;
        timeEl.textContent        = new Date(c.time).toLocaleTimeString('en-GB', {
            hour: '2-digit', minute: '2-digit'
        });

        // Pass live data to the p5 sketch
        window.weatherState = {
            temperature:   c.temperature_2m,
            windSpeed:     c.windspeed_10m,
            conditionType: cond.type,
            loaded:        true,
        };

        // Update status indicator
        cardsGrid.classList.remove('loading');
        statusDot.classList.add('live');
        statusText.textContent = 'Live';

    } catch (err) {
        console.error('Weather fetch failed:', err);
        statusText.textContent = 'Offline';
    }
}

// Refresh when tab regains visibility (handles backgrounded tab staleness)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') fetchData();
});

// Initial load + refresh every 10 minutes
cardsGrid.classList.add('loading');
fetchData();
setInterval(fetchData, 10 * 60 * 1000);
