import { Star, MapPin } from "lucide-react";

export function AttractionCard({ attraction, index }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
      <div className="relative h-48 overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
            {attraction.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-2 line-clamp-1">
          {attraction.name}
        </h4>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {attraction.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground">{attraction.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({attraction.reviewCount})
            </span>
          </div>
          {attraction.distance && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{(attraction.distance / 1000).toFixed(1)} km</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
