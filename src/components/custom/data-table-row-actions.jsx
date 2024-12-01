import { Eye, MoreHorizontal, Pen, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { navigate } from "@/hooks/navigate"

export function DataTableRowActions({
    row,
}) {
    const data = row.original

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => {navigate(`/garden/plants/${data.id}`)}}>
                    <Eye className="h-6 w-6" />
                    View
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Pen className="h-6 w-6" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Star className="h-6 w-6" />
                    Favorite
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Trash2 className="h-6 w-6" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
