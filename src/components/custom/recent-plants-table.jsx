"use client";

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTableFacetedFilter, statuses } from "@/components/custom/plants-table";
import { ChevronDown, Loader2, Plus, X } from "lucide-react";
import { TableResponsive } from "@/components/custom/table-responsive"
import { navigate } from "@/hooks/navigate";


export default function RecentPlantsTable({ columns, data, retriving }) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="w-full h-full">
            <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-3">
                <div className="flex flex-row gap-2">
                    <Input
                        placeholder="Filter names..."
                        value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DataTableFacetedFilter
                        column={table.getColumn("health_status")}
                        title="Health Status"
                        options={statuses}
                    />
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-auto px-2 lg:px-3"
                        >
                            Reset
                            <X className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div className="flex flex-wrap justify-start items-center gap-2 w-full lg:w-fit">
                    {/* <Button variant="ghost" onClick={fetchFiles}>
                        <RotateCw className="h-4 w-4" />
                    </Button> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <TableResponsive className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-sm text-muted-foreground"
                                >
                                    {retriving ? (
                                        <div className="flex flex-row italic justify-center items-center w-full h-full">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Fetching...
                                        </div>
                                    ) : (
                                        <div className="flex flex-col justify-center items-center w-full h-full gap-4 p-8">
                                            <div className="rounded-full bg-primary/10 p-3">
                                                <Plus className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="max-w-sm space-y-2">
                                                <h3 className="text-lg font-medium">No plants added yet</h3>
                                                <p className="text-sm text-gray-500">
                                                    Get started by adding your first plant to track its growth and
                                                    care needs.
                                                </p>
                                            </div>
                                            <Button onClick={() => { navigate('/garden/plants/add-plants') }}>Add Your First Plant</Button>
                                        </div>
                                    )}

                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableResponsive>
        </div>
    )
}