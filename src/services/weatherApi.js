const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  throw new Error("Missing OpenWeatherMap API key! Set VITE_API_KEY in your .env file.");
}


async function getCurrentWeather(lat, lon) {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Current Weather API failed: ${res.status}`);
  return res.json();
}

async function getForecast(lat, lon) {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast API failed: ${res.status}`);
  return res.json();
}


function processForecast(forecastData) {
  const dailyMap = {};

  forecastData.list.forEach(entry => {
    const date = new Date(entry.dt * 1000).toISOString().split("T")[0]; 
    if (!dailyMap[date]) {
      dailyMap[date] = {
        tempMax: entry.main.temp_max,
        tempMin: entry.main.temp_min,
        icon: entry.weather[0].icon,
        condition: entry.weather[0].main,
      };
    } else {
      dailyMap[date].tempMax = Math.max(dailyMap[date].tempMax, entry.main.temp_max);
      dailyMap[date].tempMin = Math.min(dailyMap[date].tempMin, entry.main.temp_min);
    }
  });

  const forecastArray = Object.keys(dailyMap)
    .slice(1, 8) 
    .map(date => ({
      date,
      dayName: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      tempMax: Math.round(dailyMap[date].tempMax),
      tempMin: Math.round(dailyMap[date].tempMin),
      icon: dailyMap[date].icon,
      condition: dailyMap[date].condition,
    }));

  return forecastArray;
}


export async function getWeather(lat, lon) {
  try {
    const [currentData, forecastData] = await Promise.all([
      getCurrentWeather(lat, lon),
      getForecast(lat, lon),
    ]);

    const current = {
      temp: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6), 
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      condition: currentData.weather[0].main,
    };

    const forecast = processForecast(forecastData);

    return { current, forecast };
  } catch (error) {
    console.error("Weather API error:", error);
    return getMockWeather();
  }
}


function getMockWeather() {
  const conditions = ["Clear", "Clouds", "Rain", "Snow"];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const today = new Date();
  const forecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    return {
      date: date.toISOString(),
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      tempMax: Math.floor(Math.random() * 10) + 20,
      tempMin: Math.floor(Math.random() * 10) + 10,
      icon: randomCondition === "Clear" ? "01d" : "03d",
      condition: randomCondition,
    };
  });

  return {
    current: {
      temp: Math.floor(Math.random() * 20) + 15,
      feelsLike: Math.floor(Math.random() * 20) + 14,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      description: randomCondition.toLowerCase(),
      icon: randomCondition === "Clear" ? "01d" : "03d",
      condition: randomCondition,
    },
    forecast,
  };
}
