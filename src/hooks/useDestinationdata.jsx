import { useState, useCallback } from "react";
import { getWeather } from "../services/weatherApi.js";
import { getCountryInfo } from "../services/countryApi.js";
import { getExchangeRate } from "../services/currencyApi.js";
import { searchAttractions, searchTours, searchAirport } from "../services/foursquareApi.js";

export function useDestinationData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchDestinationData = useCallback(async (destination) => {
    setLoading(true);
    setError(null);

    try {
      const [weather, countryInfo] = await Promise.all([
        getWeather(destination.lat, destination.lng),
        destination.countryCode ? getCountryInfo(destination.countryCode) : Promise.resolve(null),
      ]);

      const [attractions, tours, airport] = await Promise.all([
        searchAttractions(destination.lat, destination.lng, destination.name),
        searchTours(destination.lat, destination.lng, destination.name),
        searchAirport(destination.lat, destination.lng, destination.name, destination.countryCode || ""),
      ]);

      let exchangeRate = null;
      if (countryInfo?.currency?.code) {
        try {
          exchangeRate = await getExchangeRate("USD", countryInfo.currency.code);
        } catch (e) {
          console.warn("Could not fetch exchange rate:", e);
        }
      }

      setData({
        destination,
        weather,
        countryInfo,
        attractions,
        tours,
        airport,
        exchangeRate,
      });
    } catch (err) {
      setError("Failed to load destination data. Please try again.");
      console.error("Error fetching destination data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    loading,
    error,
    data,
    fetchDestinationData,
    clearData,
  };
}
