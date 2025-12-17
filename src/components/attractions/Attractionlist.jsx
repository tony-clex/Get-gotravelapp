import { useState } from "react";
import { Compass, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { AttractionCard } from "./Attractioncard.jsx";

export function AttractionsList({ attractions, cityName }) {
  const [visibleCount, setVisibleCount] = useState(6);
  
  const visibleAttractions = attractions.slice(0, visibleCount);
  const hasMore = visibleCount < attractions.length;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Top Attractions in {cityName}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleAttractions.map((attraction, index) => (
          <AttractionCard 
            key={attraction.id} 
            attraction={attraction} 
            index={index}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="gap-2"
          >
            Load More
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
