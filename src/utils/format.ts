import * as constants from "../constants";

const mapIndustries = Object.fromEntries(
  constants.industries.map(({ value, label }) => [value, label]),
);

const mapCompanySizes = Object.fromEntries(
  constants.companySizes.map(({ value, label }) => [value, label]),
);

const mapTimezones = Object.fromEntries(
  constants.timezones.map(({ value, label }) => [value, label]),
);

const mapLanguages = Object.fromEntries(
  constants.languages.map(({ value, label }) => [value, label]),
);

export function text(value: string): string {
  return value || "—";
}

export function industry(value: string): string {
  return mapIndustries[value] ?? "—";
}

export function companySize(value: string): string {
  return mapCompanySizes[value] ?? "—";
}

export function timezone(value: string): string {
  return mapTimezones[value] ?? "—";
}

export function language(value: string): string {
  return mapLanguages[value] ?? "—";
}
