import { Cloud, Sun, CloudRain, Snowflake, Wind, Droplets } from "lucide-react";

const weatherIcons = {
  Clear: <Sun className="w-16 h-16 text-amber-400" />,
  Clouds: <Cloud className="w-16 h-16 text-slate-400" />,
  Rain: <CloudRain className="w-16 h-16 text-blue-400" />,
  Snow: <Snowflake className="w-16 h-16 text-sky-300" />,
};

const smallWeatherIcons = {
  Clear: <Sun className="w-6 h-6 text-amber-400" />,
  Clouds: <Cloud className="w-6 h-6 text-slate-400" />,
  Rain: <CloudRain className="w-6 h-6 text-blue-400" />,
  Snow: <Snowflake className="w-6 h-6 text-sky-300" />,
};

export function WeatherCard({ weather, cityName }) {
  return (
    <div className="glass-card rounded-3xl p-6 card-hover">
      <h3 className="text-lg font-semibold text-foreground mb-4">Weather in {cityName}</h3>
      
      <div className="flex items-center gap-6 mb-6">
        <div className="animate-float">
          {weatherIcons[weather.current.condition] || weatherIcons.Clear}
        </div>
        <div>
          <p className="text-5xl font-display font-bold text-foreground">
            {weather.current.temp}°
          </p>
          <p className="text-muted-foreground capitalize">
            {weather.current.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <Droplets className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Humidity</span>
          <span className="ml-auto font-medium">{weather.current.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Wind className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Wind</span>
          <span className="ml-auto font-medium">{weather.current.windSpeed} km/h</span>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-sm font-medium text-foreground mb-3">7-Day Forecast</p>
        <div className="grid grid-cols-7 gap-2">
          {weather.forecast.map((day, index) => (
            <div 
              key={day.date} 
              className="text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
            >
              <p className="text-xs text-muted-foreground mb-1">{day.dayName}</p>
              <div className="flex justify-center mb-1">
                {smallWeatherIcons[day.condition] || smallWeatherIcons.Clear}
              </div>
              <p className="text-xs font-medium">{day.tempMax}°</p>
              <p className="text-xs text-muted-foreground">{day.tempMin}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
