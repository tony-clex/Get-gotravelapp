export function getAttractions(destination) {
  const attractionTemplates = [
    { category: "Landmark", suffix: "Tower" },
    { category: "Museum", suffix: "Museum" },
    { category: "Park", suffix: "Gardens" },
    { category: "Historic", suffix: "Palace" },
    { category: "Cultural", suffix: "Market" },
    { category: "Nature", suffix: "Beach" },
  ];

  return attractionTemplates.map((template, index) => ({
    id: `attr-${index}`,
    name: `${destination} ${template.suffix}`,
    description: `One of the most iconic ${template.category.toLowerCase()}s in ${destination}. A must-visit destination for travelers seeking authentic local experiences and breathtaking views.`,
    image: getAttractionImage(template.category, index),
    rating: 4 + Math.random(),
    reviewCount: Math.floor(Math.random() * 5000) + 500,
    category: template.category,
    address: `123 Main Street, ${destination}`,
  }));
}

export function getTours(destination) {
  const tourTemplates = [
    { name: "Walking Tour", duration: "3 hours", basePrice: 35 },
    { name: "Food & Culture Tour", duration: "4 hours", basePrice: 65 },
    { name: "Day Trip Adventure", duration: "8 hours", basePrice: 120 },
    { name: "Night Life Experience", duration: "5 hours", basePrice: 85 },
    { name: "Historical Landmarks", duration: "6 hours", basePrice: 75 },
    { name: "Photography Tour", duration: "4 hours", basePrice: 55 },
  ];

  return tourTemplates.map((template, index) => ({
    id: `tour-${index}`,
    name: `${destination} ${template.name}`,
    description: `Experience the best of ${destination} with our expert local guides. This ${template.duration} tour covers all the highlights and hidden gems.`,
    image: getTourImage(index),
    price: template.basePrice + Math.floor(Math.random() * 30),
    currency: "USD",
    duration: template.duration,
    rating: 4.2 + Math.random() * 0.8,
    reviewCount: Math.floor(Math.random() * 2000) + 200,
    bookingUrl: "#",
  }));
}

export function getAirport(destination, countryCode) {
  const airportCodes = {
    FR: "CDG",
    GB: "LHR",
    US: "JFK",
    JP: "NRT",
    AU: "SYD",
    IT: "FCO",
    ES: "MAD",
    DE: "FRA",
    TH: "BKK",
    AE: "DXB",
  };

  const code = airportCodes[countryCode] || "INT";
  
  return {
    name: `${destination} International Airport`,
    code,
    city: destination,
    country: countryCode,
    distance: Math.floor(Math.random() * 30) + 10,
  };
}

function getAttractionImage(category, index) {
  const images = {
    Landmark: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    ],
    Museum: [
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    ],
    Park: [
      "https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800&q=80",
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
    ],
    Historic: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    ],
    Cultural: [
      "https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    ],
    Nature: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    ],
  };

  const categoryImages = images[category] || images.Landmark;
  return categoryImages[index % categoryImages.length];
}

function getTourImage(index) {
  const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  ];
  return images[index % images.length];
}
