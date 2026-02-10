const CITY_NAME_PATTERN = /^[a-zA-Z\s\-'.]+$/;

export function validateCity(value: string): string | null {
    if (!value) return "Please enter a city name";
    if (!CITY_NAME_PATTERN.test(value)) return "City name can only contain letters, spaces, hyphens and apostrophes";
    return null;
}
