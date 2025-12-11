export async function getCountryInfo(countryCode) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    
    if (!response.ok) throw new Error("Country API error");
    
    const [data] = await response.json();
    
    const currencies = data.currencies ? Object.entries(data.currencies)[0] : null;
    const languages = data.languages ? Object.values(data.languages) : [];
    
    return {
      name: data.name.common,
      capital: data.capital?.[0] || "N/A",
      population: data.population,
      region: data.region,
      languages: languages,
      currency: currencies ? {
        code: currencies[0],
        name: currencies[1].name,
        symbol: currencies[1].symbol,
      } : { code: "USD", name: "US Dollar", symbol: "$" },
      flag: data.flags.svg,
      timezone: data.timezones?.[0] || "UTC",
    };
  } catch (error) {
    console.error("Country API error:", error);
    return null;
  }
}
