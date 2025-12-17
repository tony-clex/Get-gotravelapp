const BASE_URL = "https://api.foursquare.com/v3/places";

const FOURSQUARE_API_KEY = "RAAXDRKB4WMKWEJGXSXPDUUFGKVUG021E3B3R2RG0PIRW210";

const getApiKey = () =>
  FOURSQUARE_API_KEY ?? import.meta.env?.VITE_FOURSQUARE_API_KEY;

const headers = () => ({
  Accept: "application/json",
  Authorization: getApiKey(),
});


export const searchAttractions = async (
  lat,
  lng,
  destination = "this location"
) => {
  if (!getApiKey()) return getMockAttractions(destination);

  try {
    const categories = "16000,10000,12000,13000";
    const url = `${BASE_URL}/search?ll=${lat},${lng}&categories=${categories}&limit=12&sort=RELEVANCE`;

    const response = await fetch(url, { headers: headers() });
    if (!response.ok)
      throw new Error(`Foursquare API error: ${response.status}`);

    const { results = [] } = await response.json();

    return results.map((place, index) => ({
      id: place.fsq_id,
      name: place.name,
      description:
        place.categories?.[0]?.name
          ? `A popular ${place.categories[0].name.toLowerCase()} in ${destination}.`
          : `Discover this amazing place in ${destination}.`,
      image:
        place.photos?.[0]
          ? `${place.photos[0].prefix}400x300${place.photos[0].suffix}`
          : getPlaceholderImage(index),
      rating: place.rating ? place.rating / 2 : 4 + Math.random(),
      reviewCount:
        place.stats?.total_ratings ??
        Math.floor(Math.random() * 1000) + 100,
      category: place.categories?.[0]?.short_name ?? "Attraction",
      address:
        place.location?.formatted_address ??
        place.location?.address ??
        destination,
      distance: place.distance,
    }));
  } catch (error) {
    console.error("Foursquare attractions error:", error);
    return getMockAttractions(destination);
  }
};


export const searchAirport = async (
  lat,
  lng,
  destination,
  countryCode
) => {
  if (!getApiKey()) return getMockAirport(destination, countryCode);

  try {
    const url = `${BASE_URL}/search?ll=${lat},${lng}&categories=19040&limit=1&sort=DISTANCE`;

    const response = await fetch(url, { headers: headers() });
    if (!response.ok)
      throw new Error(`Foursquare API error: ${response.status}`);

    const { results = [] } = await response.json();
    const airport = results[0];

    if (!airport) return getMockAirport(destination, countryCode);

    return {
      name: airport.name,
      code: extractAirportCode(airport.name) ?? "INT",
      city: destination,
      country: countryCode,
      distance: airport.distance
        ? Math.round(airport.distance / 1000)
        : 15,
      address: airport.location?.formatted_address,
    };
  } catch (error) {
    console.error("Foursquare airport error:", error);
    return getMockAirport(destination, countryCode);
  }
};


export const searchTours = async (lat, lng, destination) => {
  if (!getApiKey()) return getMockTours(destination);

  try {
    const url = `${BASE_URL}/search?ll=${lat},${lng}&categories=19009,19010&limit=6&sort=RELEVANCE`;

    const response = await fetch(url, { headers: headers() });
    if (!response.ok)
      throw new Error(`Foursquare API error: ${response.status}`);

    const { results = [] } = await response.json();
    if (results.length < 3) return getMockTours(destination);

    return results.map((place, index) => ({
      id: place.fsq_id,
      name: place.name ?? `${destination} Experience ${index + 1}`,
      description: `Experience ${destination} with ${place.name}.`,
      image:
        place.photos?.[0]
          ? `${place.photos[0].prefix}400x300${place.photos[0].suffix}`
          : getTourPlaceholderImage(index),
      price: 35 + Math.floor(Math.random() * 80),
      currency: "USD",
      duration: `${2 + Math.floor(Math.random() * 6)} hours`,
      rating: place.rating ? place.rating / 2 : 4.5,
      reviewCount:
        place.stats?.total_ratings ??
        Math.floor(Math.random() * 500) + 50,
      bookingUrl: "#",
    }));
  } catch (error) {
    console.error("Foursquare tours error:", error);
    return getMockTours(destination);
  }
};


const extractAirportCode = (name = "") =>
  name.match(/\(([A-Z]{3})\)/)?.[1] ?? null;

const getPlaceholderImage = (index) => {
  const images = [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80",
    "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800&q=80",
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    "https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  ];
  return images[index % images.length];
};

const getTourPlaceholderImage = getPlaceholderImage;


const getMockAttractions = (destination) =>
  ["Tower", "Museum", "Gardens", "Palace", "Market", "Beach"].map(
    (suffix, i) => ({
      id: `attr-${i}`,
      name: `${destination} ${suffix}`,
      description: `One of the most iconic places in ${destination}.`,
      image: getPlaceholderImage(i),
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 5000) + 500,
      category: "Attraction",
      address: destination,
    })
  );

const getMockTours = (destination) =>
  ["Walking Tour", "Food Tour", "Day Trip"].map((name, i) => ({
    id: `tour-${i}`,
    name: `${destination} ${name}`,
    description: `Experience ${destination} like a local.`,
    image: getTourPlaceholderImage(i),
    price: 50 + Math.floor(Math.random() * 50),
    currency: "USD",
    duration: "4 hours",
    rating: 4.5,
    reviewCount: 300 + i * 120,
    bookingUrl: "#",
  }));

const getMockAirport = (destination, countryCode) => ({
  name: `${destination} International Airport`,
  code: "INT",
  city: destination,
  country: countryCode,
  distance: 20,
});
