'use client';

import RecentPlantsTable from "@/components/custom/recent-plants-table";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AllPlantsListColumns } from "@/lib/config";
import { useState, useEffect } from 'react';

export default function Component() {
    const [plants, setPlants] = useState([]);
    const [totalPlants, setTotalPlants] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch('/api/plants/list');
                const data = await response.json();
                if (data?.data) {
                    data.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                    setPlants(data.data.slice(0, 5));
                    setTotalPlants(data?.data?.length || 0);
                }
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
        <div className="flex flex-col gap-6 w-full h-full py-5">
            {/* Subscription Card */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Free Plan</CardTitle>
                    <CardDescription>Welcome to PlantCare!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500">
                        Upgrade to Pro for unlimited plants and premium features
                    </p>
                </CardContent>
                <CardFooter>
                    <Button>Upgrade to Pro</Button>
                </CardFooter>
            </Card>

            {/* Stats Grid */}
            <div className="flex flex-col lg:flex-row w-full h-fit gap-6">
                <Card className="w-full lg:w-1/3 h-full">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Total Plants
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{totalPlants}</span>
                            <span className="text-sm text-muted-foreground">/5</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Add your first plant to get started
                        </p>
                    </CardContent>
                </Card>
                <Card className="w-full lg:w-1/3 h-full">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Monthly Appointments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">0</span>
                            <span className="text-sm text-muted-foreground">/35</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                            No appointments scheduled
                        </p>
                    </CardContent>
                </Card>
                <Card className="w-full lg:w-1/3 h-full">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Plant Care Tip
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">
                            Add your first plant to receive personalized care tips!
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Plants Table */}
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle>Recent Plants</CardTitle>
                    <CardDescription>Your 5 most recently added plants</CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentPlantsTable data={plants} columns={AllPlantsListColumns} retriving={isLoading} />
                </CardContent>
            </Card>
        </div>
    );
}