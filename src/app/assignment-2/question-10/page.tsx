"use client";

import React, { useContext } from "react";
import {
  LanguageProvider,
  LanguageContext,
} from "@/context/LanguageProvider";
import "@/app/styles/lang.css";
import translations from "./traslation";

// Define a type for supported languages
type Language = "en" | "es";

// Define the structure of translation text
interface TranslationText {
  title: string;
  paragraph: string;
}



const PageContent: React.FC = () => {
  const { language, switchLanguage } = useContext(LanguageContext);
  const text = translations[language];

  return (
    <div>
      <p style={{ textAlign: "center", margin: "2rem 2rem 6rem 2rem" }}>
        10. Develop a language switcher application using the useContext hook.
        Create a context to manage the current language (e.g., English or
        Spanish). Provide buttons to switch between languages. Use the
        useContext hook to access the current language value. Display different
        language versions of the application's content.
      </p>
      <p className="text-center margin-2rem">{text.paragraph}</p>

      <div className="button-group">
        <button
          onClick={() => switchLanguage("en")}
          disabled={language === "en"}
        >
          English
        </button>
        <button
          onClick={() => switchLanguage("es")}
          disabled={language === "es"}
        >
          Español
        </button>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
};

export default Page;
