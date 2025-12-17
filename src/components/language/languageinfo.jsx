  import { Languages, Volume2 } from "lucide-react";
export function LanguageInfo({ languages, countryName }) {
  const primaryLanguage = languages[0];
  const secondaryLanguages = languages.slice(1);
  const commonPhrases = [
    { english: "Hello", translation: getTranslation(primaryLanguage, "hello") },
    { english: "Thank you", translation: getTranslation(primaryLanguage, "thanks") },
    { english: "Please", translation: getTranslation(primaryLanguage, "please") },
    { english: "Goodbye", translation: getTranslation(primaryLanguage, "goodbye") },
  ];
  return (
    <div className="bg-card rounded-3xl p-6 shadow-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-foreground">Languages in {countryName}</h3>
      </div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">Primary Language</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
          <span className="font-medium text-primary">{primaryLanguage}</span>
        </div>
      </div>
      {secondaryLanguages.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Also Spoken</p>
          <div className="flex flex-wrap gap-2">
            {secondaryLanguages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-secondary rounded-lg text-sm text-secondary-foreground"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="border-t border-border pt-4">
        <p className="text-sm font-medium text-foreground mb-3">Common Phrases</p>
        <div className="space-y-2">
          {commonPhrases.map((phrase) => (
            <div
              key={phrase.english}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <div>
                <p className="text-sm text-muted-foreground">{phrase.english}</p>
                <p className="font-medium text-foreground">{phrase.translation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function getTranslation(language, phrase) {
  const translations = {
    French: { hello: "Bonjour", thanks: "Merci", please: "S'il vous plaît", goodbye: "Au revoir" },
    Japanese: { hello: "こんにちは", thanks: "ありがとう", please: "お願いします", goodbye: "さようなら" },
    Spanish: { hello: "Hola", thanks: "Gracias", please: "Por favor", goodbye: "Adiós" },
    Italian: { hello: "Ciao", thanks: "Grazie", please: "Per favore", goodbye: "Arrivederci" },
    German: { hello: "Hallo", thanks: "Danke", please: "Bitte", goodbye: "Auf Wiedersehen" },
    Thai: { hello: "สวัสดี", thanks: "ขอบคุณ", please: "กรุณา", goodbye: "ลาก่อน" },
    Arabic: { hello: "مرحبا", thanks: "شكرا", please: "من فضلك", goodbye: "مع السلامة" },
    English: { hello: "Hello", thanks: "Thank you", please: "Please", goodbye: "Goodbye" },
  };
  return translations[language]?.[phrase] || translations.English[phrase];
}


