'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { navigate } from "@/hooks/navigate";
import { Plus } from "lucide-react"

export default function Component() {
    return (
        <div className="grid gap-6 w-full h-full py-5">
            {/* Subscription Card */}
            <Card>
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Total Plants
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">0</span>
                            <span className="text-sm text-muted-foreground">/5</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Add your first plant to get started
                        </p>
                    </CardContent>
                </Card>
                <Card>
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
                <Card>
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
            <Card>
                <CardHeader>
                    <CardTitle>Recent Plants</CardTitle>
                    <CardDescription>Your 5 most recently added plants</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
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
                </CardContent>
            </Card>
        </div>
    );
}