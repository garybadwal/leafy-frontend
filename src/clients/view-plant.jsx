import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Droplets, Heart, Leaf, Pen, Scissors, Sprout, Sun, ThermometerSun, Trash2 } from "lucide-react";
import Image from "next/image";

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-gray-50">{icon}</div>
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">{value}</p>
            </div>
        </div>
    )
}

export default function Component() {
    return (
        <div className="flex flex-col gap-6 w-full h-full py-5">
            <div className="flex xs:flex-col flex-row xs:justify-start justify-between xs:items-start items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold mb-1">Holy Basil</h1>
                    <p className="text-muted-foreground">Ocimum tenuiflorum</p>
                </div>
                <div className="space-x-2">
                    <Button variant="ghost" size="icon">
                        <Pen className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4">
                <Card className="w-full lg:w-1/3 h-full">
                    <CardContent className="p-4">
                        <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                            <Image
                                src="/placeholder.svg"
                                alt="Holy Basil"
                                layout="fill"
                                objectFit="cover"
                                className="bg-muted"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Badge variant="outline">Mature Plant (6+ months)</Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Healthy
                                </Badge>
                            </div>
                            <Progress value={75} className="h-2" />
                            <p className="text-sm text-muted-foreground">Water level: Moist Soil</p>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex flex-col justify-center items-center w-full lg:w-2/3 h-full gap-4">
                    <Card className="w-full h-full">
                        <CardHeader>
                            <CardTitle>Care Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <InfoItem
                                    icon={<Sun className="h-4 w-4 text-yellow-500" />}
                                    label="Light Requirements"
                                    value="Bright Indirect Light"
                                />
                                <InfoItem
                                    icon={<Droplets className="h-4 w-4 text-blue-500" />}
                                    label="Watering Status"
                                    value="Moist Soil"
                                />
                                <InfoItem
                                    icon={<Sprout className="h-4 w-4 text-green-500" />}
                                    label="Growth Stage"
                                    value="Vegetative"
                                />
                                <InfoItem
                                    icon={<Calendar className="h-4 w-4 text-gray-500" />}
                                    label="Last Watered"
                                    value="November 30, 2024"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="w-full h-full">
                        <CardHeader>
                            <CardTitle>Growth Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium mb-1">Soil Type</p>
                                    <p className="text-sm text-muted-foreground">Well-draining potting mix</p>
                                </div>
                                <div>
                                    <p className="font-medium mb-1">Fertilizer Type</p>
                                    <p className="text-sm text-muted-foreground">Balanced Fertilizer (10-10-10)</p>
                                </div>
                                <div>
                                    <p className="font-medium mb-1">Fertilizer Schedule</p>
                                    <p className="text-sm text-muted-foreground">Monthly</p>
                                </div>
                                <div>
                                    <p className="font-medium mb-1">Age</p>
                                    <p className="text-sm text-muted-foreground">Mature Plant (6+ months)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4">
                <Card className="w-full lg:w-1/2 h-full">
                    <CardHeader>
                        <CardTitle>Care Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <Sun className="h-5 w-5 text-yellow-500 mt-0.5" />
                                <p className="text-sm">Ensure your Holy Basil receives at least 6 hours of sunlight daily.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                                <p className="text-sm">Water when the top inch of soil feels dry to the touch.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <Scissors className="h-5 w-5 text-gray-500 mt-0.5" />
                                <p className="text-sm">Regularly pinch off flower buds to encourage bushier growth.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <ThermometerSun className="h-5 w-5 text-red-500 mt-0.5" />
                                <p className="text-sm">Maintain temperatures between 65°F and 85°F (18°C - 29°C) for optimal growth.</p>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card className="w-full lg:w-1/2 h-full">
                    <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Droplets className="h-5 w-5 text-blue-500" />
                                    <span className="text-sm font-medium">Water plant</span>
                                </div>
                                <Badge variant="outline">Tomorrow</Badge>
                            </li>
                            <li className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Leaf className="h-5 w-5 text-green-500" />
                                    <span className="text-sm font-medium">Fertilize</span>
                                </div>
                                <Badge variant="outline">In 5 days</Badge>
                            </li>
                            <li className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Scissors className="h-5 w-5 text-gray-500" />
                                    <span className="text-sm font-medium">Prune</span>
                                </div>
                                <Badge variant="outline">In 2 weeks</Badge>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}