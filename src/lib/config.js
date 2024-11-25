import { Fence, LayoutPanelLeft, Leaf, UserRound } from "lucide-react";
import localFont from "next/font/local";

export const lugife = localFont({
    src: "../app/fonts/lugife.otf",
    variable: "--font-lugife",
    weight: "100",
});

export const navigations = {
    branding: {
        name: "Leafy",
        logo: Leaf,
        plan: "Seedling",
    },
    navMain: [
        {
            title: "DashBoard",
            url: "/dashboard",
            icon: LayoutPanelLeft,
            hidden: false,
            items: [],
        },
        {
            title: "Garden",
            url: "#",
            icon: Fence,
            hidden: false,
            items: [
                {
                    title: "All Plants",
                    url: "/garden/plants",
                    hidden: false,
                    items: [
                        {
                            title: "Add Plants",
                            url: "/garden/plants/add-plants",
                            hidden: false,
                        },
                    ]
                },
            ],
        },
        {
            title: "Profile",
            url: "/profile",
            icon: UserRound,
            hidden: true,
            items: [],
        },
    ],
}

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

export function createAPIResponse({ status, message, data = {} }) {
    return {
        status,
        message,
        data,
    };
}