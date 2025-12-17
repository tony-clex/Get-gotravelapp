import { useState } from "react";
import { ArrowRightLeft, TrendingUp } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export function CurrencyConverter({ exchangeRate, countryInfo }) {
  const [amount, setAmount] = useState("100");
  const [isReversed, setIsReversed] = useState(false);
  const rate = isReversed ? 1 / exchangeRate.rate : exchangeRate.rate;
  const fromCurrency = isReversed ? countryInfo.currency.code : "USD";
  const toCurrency = isReversed ? "USD" : countryInfo.currency.code;
  const result = (parseFloat(amount) || 0) * rate;
  return (
    <div className="bg-card rounded-3xl p-6 shadow-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Currency</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>Live rates</span>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-6 p-3 bg-secondary rounded-xl">
        {countryInfo.flag && (
          <img src={countryInfo.flag} alt={countryInfo.name} className="w-8 h-8 rounded object-cover" />
        )}
        <div>
          <p className="font-medium text-foreground">{countryInfo.currency.name}</p>
          <p className="text-sm text-muted-foreground">
            {countryInfo.currency.code} ({countryInfo.currency.symbol})
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            {fromCurrency}
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg font-medium"
          />
        </div>
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsReversed(!isReversed)}
            className="rounded-full hover:bg-primary/10"
          >
            <ArrowRightLeft className="w-5 h-5 text-primary" />
          </Button>
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">
            {toCurrency}
          </label>
          <div className="h-12 px-4 py-2 bg-secondary rounded-xl flex items-center">
            <span className="text-lg font-medium text-foreground">
              {result.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
      </p>
    </div>
  );
}