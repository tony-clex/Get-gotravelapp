import { useState } from "react";
import { TourCard } from "./TourCard.jsx";

export function ToursList({ tours, cityName }) {
  const [visibleCount, setVisibleCount] = useState(3);
  
  const visibleTours = tours.slice(0, visibleCount);
  const hasMore = visibleCount < tours.length;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Tours and Activities in {cityName}
        </h2>
      </div>

      <div className="space-y-4">
        {visibleTours.map((tour, index) => (
          <TourCard key={tour.id} tour={tour} index={index} />
        ))}
      </div>

      
    </section>
  );
}
