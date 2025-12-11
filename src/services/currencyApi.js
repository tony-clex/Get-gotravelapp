export async function getExchangeRate(from, to) {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );
    
    if (!response.ok) throw new Error("Currency API error");
    
    const data = await response.json();
    
    return {
      from,
      to,
      rate: data.rates[to] || 1,
      lastUpdated: new Date(data.time_last_updated * 1000).toISOString(),
    };
  } catch (error) {
    console.error("Currency API error:", error);
    return {
      from,
      to,
      rate: from === "USD" ? 0.85 : 1.18,
      lastUpdated: new Date().toISOString(),
    };
  }
}
