import 'server-only'

type Languages = 'en' | 'nl';

type Dictionary = {
  [key in Languages]: any;
}

const dictionaries: Dictionary = {
  en: () => import('./en.json').then((module) => module.default),
  nl: () => import('./nl.json').then((module) => module.default),
}

export const getDictionary = async (locale: Languages) => dictionaries[locale]