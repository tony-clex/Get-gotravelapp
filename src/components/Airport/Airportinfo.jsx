import { Plane, MapPin } from "lucide-react";

export function AirportInfo({ airport }) {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Plane className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Nearest Airport</h3>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{airport.code}</span>
          </div>
          <div>
            <p className="font-medium text-foreground">{airport.name}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{airport.city}, {airport.country}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">{airport.distance}</p>
          <p className="text-sm text-muted-foreground">km from center</p>
        </div>
      </div>
    </div>
  );
}
