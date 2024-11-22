import localFont from "next/font/local";

export const lugife = localFont({
  src: "../app/fonts/lugife.otf",
  variable: "--font-lugife",
  weight: "100",
});

export const API_URL = "http://127.0.0.1:8000";

/**
 * Converts the given data into an array of strings.
 *
 * @param {any} data - The input data to convert to an array.
 * @returns {string[]} - An array of strings.
 */
export function convertToArray(data) {
  // Check if the data is already an array
  if (Array.isArray(data)) {
    // Convert each element to a string if it's not already a string
    return data.map((item) => String(item));
  }

  // If the data is not an array, wrap it in an array and convert to string
  return [String(data)];
}
