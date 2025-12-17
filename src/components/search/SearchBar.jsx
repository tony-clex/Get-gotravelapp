import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { searchLocations } from "../../services/geocodingApi";

export function SearchBar({ onSearch, variant = "hero" }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      const timer = setTimeout(async () => {
        try {
          const results = await searchLocations(query);
          setSuggestions(results);
          setIsOpen(results.length > 0);
        } catch (error) {
          console.error("Search error:", error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (destination) => {
    setQuery(destination.name);
    setIsOpen(false);
    onSearch(destination);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelect(suggestions[selectedIndex]);
    }
  };

  const isHero = variant === "hero";

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            placeholder="Where do you want to go?"
            className={`w-full pl-12 pr-4 bg-background border border-border rounded-2xl shadow-lg outline-none focus:ring-2 focus:ring-primary/50 ${
              isHero ? "h-14 text-lg" : "h-12 text-base"
            }`}
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
            </div>
          )}
        </div>
        
        <button
          onClick={() => suggestions[0] && handleSelect(suggestions[0])}
          disabled={suggestions.length === 0 && query.length > 0}
          className={`px-8 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
            isHero ? "h-14 text-lg" : "h-12 text-base"
          }`}
        >
          Explore
        </button>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 overflow-hidden z-50 bg-background rounded-2xl shadow-xl border border-border">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.name}-${suggestion.countryCode}`}
              onClick={() => handleSelect(suggestion)}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors text-left ${
                index === selectedIndex ? "bg-secondary" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{suggestion.name}</p>
                <p className="text-sm text-muted-foreground">{suggestion.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
