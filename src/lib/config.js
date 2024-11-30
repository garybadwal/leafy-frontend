import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/custom/data-table-column-header";
import { DataTableRowActions } from "@/components/custom/data-table-row-actions";
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

/**
 * Converts an ISO date string from server time to a user's local time and formats it as "Mon DD, YYYY HH:MM:SS".
 * 
 * @param {string} isoString - The ISO date string in server time to format.
 * @returns {string} - The formatted date string in the user's local timezone.
 */
function formatServerTimeToLocal(isoString) {
    // Convert the ISO string to a Date object
    const serverDate = new Date(isoString);

    // Define formatting options for user's local timezone
    const options = {
        year: 'numeric',
        month: 'short', // "Jan", "Feb", etc.
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Set to true if you want 12-hour format with AM/PM
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's local timezone
    };

    // Format the server date according to the specified options for the local timezone
    return new Intl.DateTimeFormat('en-US', options).format(serverDate);
}

export const AllPlantsListColumns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "common_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Comman Name" />
        ),
        cell: ({ row }) => (<div className="w-[180px] text-sm">{row.getValue("common_name")}</div>),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        enableHiding: false,
    },
    {
        accessorKey: "scientific_name",
        header: "Scientific Name",
        cell: ({ row }) => <div className="w-[180px] text-sm">{row.getValue("scientific_name")}</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "health_status",
        header: "Health Status",
        cell: ({ row }) => {
            return (<div className="w-[180px] text-sm" > {row.getValue("health_status")}</div>)
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "updated_at",
        header: "Last Updated",
        cell: ({ row }) => <div className="w-[180px] text-sm">{formatServerTimeToLocal(row.getValue("updated_at"))}</div>,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]
