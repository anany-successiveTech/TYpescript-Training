"use client";
import { createContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  switchLanguage: (lang: Language) => void;
}

interface LanguageContextProps {
  children: ReactNode;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  switchLanguage: () => {},
});

export const LanguageProvider = ({ children }: LanguageContextProps) => {
  // use Language type instead of string
  const [language, setLanguage] = useState<Language>("en");

  // accept only Language type
  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
