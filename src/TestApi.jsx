import { useEffect, useState } from "react";

import { getCountryInfo } from "./services/countryApi.js";
import { getWeather } from "./services/weatherApi.js";
import { getAttractions, getTours, getAirport } from "./services/travelData.js";

export default function TestAPI() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      console.log("=====  API TESTING START =====");

      console.log("\nTesting getCountryInfo('FR'):");
      const country = await getCountryInfo("FR");
      console.log(country);

      console.log("\n Testing getWeather(48.8566, 2.3522):  (Paris)");
      const weather = await getWeather(48.8566, 2.3522);
      console.log(weather);

      console.log("\n Testing getAttractions('Paris'):");
      console.log(getAttractions("Paris"));

      console.log("\n Testing getTours('Paris'):");
      console.log(getTours("Paris"));

      console.log("\n Testing getAirport('Paris', 'FR'):");
      console.log(getAirport("Paris", "FR"));

      console.log("\n===== TESTING COMPLETE =====");
      setLoading(false);
    }

    run();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>API Testing Page</h1>
      <p>
        Open your <strong>browser console</strong> to view the API results.
      </p>

      {loading ? (
        <p>Running tests...</p>
      ) : (
        <p style={{ color: "green" }}>All tests finished! ✔</p>
      )}
    </div>
  );
}
