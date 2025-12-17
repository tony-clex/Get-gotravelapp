 import { Header } from "../layout/Header.jsx";
import { DestinationHeader } from "./DestinationHeader.jsx";
import { WeatherCard } from "../weather/WeatherCard.jsx";
import { CurrencyConverter } from "../Currency/CurrencyConverter.jsx";
import { LanguageInfo } from "../language/LanguageInfo.jsx";
import { AirportInfo } from "../Airport/Airportinfo.jsx";
import { AttractionsList } from "../attractions/Attractionlist.jsx";
import { ToursList } from "../tours/ToursList.jsx";
export function DestinationView({ data, onBack }) {
  const { destination, weather, countryInfo, attractions, tours, airport, exchangeRate } = data;
  return (
    <div className="min-h-screen bg-background">
      <Header onLogoClick={onBack} />
      <DestinationHeader
        destination={destination}
        countryInfo={countryInfo}
        onBack={onBack}
      />
      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {weather && (
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} cityName={destination.name} />
            </div>
          )}
          {countryInfo && exchangeRate && (
            <CurrencyConverter
              exchangeRate={exchangeRate}
              countryInfo={countryInfo}
            />
          )}
          {countryInfo && countryInfo.languages.length > 0 && (
            <LanguageInfo
              languages={countryInfo.languages}
              countryName={countryInfo.name}
            />
          )}
        </div>
        {airport && (
          <div className="mb-12">
            <AirportInfo airport={airport} />
          </div>
        )}
        {attractions.length > 0 && (
          <div className="mb-12">
            <AttractionsList attractions={attractions} cityName={destination.name} />
          </div>
        )}
        {tours.length > 0 && (
          <ToursList tours={tours} cityName={destination.name} />
        )}
      </main>
    </div>
  );
} 