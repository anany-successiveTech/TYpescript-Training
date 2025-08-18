// src/translations/lang.ts

export type Language = "en" | "es";

export interface TranslationText {
  title: string;
  paragraph: string;
}

const translations: Record<Language, TranslationText> = {
  en: {
    title: "Enter Something",
    paragraph:
      "Develop a language switcher application using the useContext hook. Use the buttons below to switch languages.",
  },
  es: {
    title: "Ingresa algo",
    paragraph:
      "Desarrolla una aplicación de cambio de idioma usando el hook useContext. Usa los botones abajo para cambiar el idioma.",
  },
};

export default translations;
