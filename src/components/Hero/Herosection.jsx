import { MapPin, Search, Loader2 } from "lucide-react";
import { SearchBar } from "../search/SearchBar.jsx";
import { Header } from "../layout/Header.jsx";

const heroImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=80",
];

export function HeroSection({ onSearch }) {
  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear hover:scale-105"
        style={{ backgroundImage: `url(${randomImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <Header minimal onLogoClick={() => {}} />

      <div className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-primary-foreground mb-6 leading-tight animate-fade-in">
            Discover Your
            <br />
            <span class="text-sky-500">
  Perfect Escape
</span>


          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/75 mb-10 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "150ms" }}>
            Search any destination worldwide and get instant access to weather, attractions, 
            currency rates, local phrases, and everything you need to plan your trip.
          </p>

          <div className="mb-12" style={{ animationDelay: "250ms" }}>
            <SearchBar onSearch={onSearch} variant="hero" />
          </div>
        </div>
      </div>
    </div>
  );
}
