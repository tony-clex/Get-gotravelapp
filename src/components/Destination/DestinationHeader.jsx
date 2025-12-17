 import { MapPin, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
export function DestinationHeader({ destination, countryInfo, onBack }) {
  return (
    <div className="relative py-8 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {countryInfo?.flag && (
            <img
              src={countryInfo.flag}
              alt={destination.country}
              className="w-16 h-12 rounded-lg object-cover shadow-md"
            />
          )}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {destination.name}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{destination.country}</span>
              {countryInfo && (
                <>
                  <span>•</span>
                  <span>{countryInfo.region}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}