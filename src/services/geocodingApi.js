const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

export async function searchLocations(query) {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=10`,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Geocoding request failed");
    }

    const data = await response.json();

    return data
      .filter((item) => {
        const validTypes = ["city", "town", "village", "municipality", "administrative", "suburb", "borough"];
        return validTypes.includes(item.type) || item.class === "place" || item.class === "boundary";
      })
      .map((item) => {
        const cityName = item.address?.city || item.address?.town || item.address?.village || 
              item.address?.municipality || item.address?.state || item.name || item.display_name.split(",")[0];
        const countryCode = (item.address?.country_code || "").toUpperCase();
        
        return {
          name: cityName,
          country: item.address?.country || "",
          countryCode: countryCode,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          displayName: item.display_name,
        };
      })
      .filter((item) => item.countryCode && item.countryCode.length === 2) 
      .filter((item, index, self) => 
        index === self.findIndex((t) => t.name === item.name && t.countryCode === item.countryCode)
      )
      .slice(0, 6);
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
}
