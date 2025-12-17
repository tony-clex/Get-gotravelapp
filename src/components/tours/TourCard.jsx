import { Star, Clock } from "lucide-react";

export function TourCard({ tour, index }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1 p-4 flex flex-col">
          <h4 className="font-semibold text-foreground mb-2 line-clamp-1">
            {tour.name}
          </h4>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
            {tour.description}
          </p>
          
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{tour.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({tour.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{tour.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-foreground">
                ${tour.price}
              </span>
              <span className="text-sm text-muted-foreground"> /person</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
