"use client";

import PlantsTable from "@/components/custom/plants-table";
import { Button } from "@/components/ui/button";
import { navigate } from "@/hooks/navigate";
import { AllPlantsListColumns } from "@/lib/config";
import { Plus } from "lucide-react";

import { useEffect, useState } from 'react';

export default function Component() {
    const [plantsData, setPlantsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch('/api/plants/list');
                const data = await response.json();
                setPlantsData(data?.data);
            } catch (error) {
                console.error('Error fetching plants:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoading) {
            fetchPlants();
        }
    }, [isLoading]);

    return (
        <div className='space-y-8'>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
                <div>
                    <h1 className="text-2xl font-bold">Plants</h1>
                    <p className="text-muted-foreground text-sm">List of all plants in your virtual garden.</p>
                </div>
                <Button
                    onClick={() => {
                        navigate('/garden/plants/add-plants/')
                    }}
                >
                    <Plus className="h-5 w-5" />
                    Add New Plant
                </Button>
            </div>
            <PlantsTable columns={AllPlantsListColumns} data={plantsData} isFetching={isLoading} />
        </div>
    )
}