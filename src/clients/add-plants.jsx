'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2, Pencil } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function Component() {
    const [plantImage, setPlantImage] = useState(null)
    const [plantImageUrl, setPlantImageUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [plantInfo, setPlantInfo] = useState({
        commonName: '',
        scientificName: '',
        dateAdded: format(new Date(), 'yyyy-MM-dd'),
        age: '',
        healthStatus: '',
        wateringStatus: '',
        lightRequirements: '',
        soilType: '',
        fertilizerType: '',
        fertilizerSchedule: '',
        growthStage: '',
        lastWateredDate: format(new Date(), 'yyyy-MM-dd'),
    })

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPlantImage(e.target.files[0])
            setPlantImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleDetectPlant = async () => {
        if (!plantImage) return

        setIsLoading(true)

        const formData = new FormData()
        formData.append('image', plantImage)

        try {
            const response = await fetch('/api/plants/identify', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error('API request failed')
            }
            setPlantInfo(prevInfo => ({ ...prevInfo, ...data }))
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (name, value) => {
        setPlantInfo(prevInfo => ({ ...prevInfo, [name]: value }))
    }

    const handleSubmit = async () => {
        const plantData = {
            ...plantInfo,
            image: plantImage
        }

        try {
            const response = await fetch('/api/plants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(plantData),
            })

            if (!response.ok) {
                throw new Error('Failed to save plant information')
            }

            const result = await response.json()
            console.log('Plant information saved:', result)
        } catch (error) {
            console.error('Error saving plant information:', error)
        }
    }

    return (
        <div className='space-y-8'>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
                <div>
                    <h1 className="text-2xl font-bold">Add Plant Details</h1>
                    <p className="text-muted-foreground">Enter information about your plant</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Detect Plant</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Detect Plant</DialogTitle>
                            <DialogDescription>
                                Upload an image to automatically detect and fill plant details.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="plant-image-detect" className="text-right">
                                    Plant Image
                                </Label>
                                <Input
                                    id="plant-image-detect"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <Button onClick={handleDetectPlant} disabled={!plantImage || isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing
                                </>
                            ) : (
                                'Analyze Image'
                            )}
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex justify-between items-start w-full">
                <div className="flex items-start gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={plantImageUrl || undefined} alt="Plant" />
                        <AvatarFallback>🌿</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="space-y-8 w-full">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Basic Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="commonName">Common Name</Label>
                            <Input
                                id="commonName"
                                value={plantInfo.commonName}
                                onChange={(e) => handleInputChange('commonName', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="scientificName">Scientific Name</Label>
                            <Input
                                id="scientificName"
                                value={plantInfo.scientificName}
                                onChange={(e) => handleInputChange('scientificName', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateAdded">Date Added</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !plantInfo.dateAdded && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {plantInfo.dateAdded ? format(new Date(plantInfo.dateAdded), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={plantInfo.dateAdded ? new Date(plantInfo.dateAdded) : undefined}
                                        onSelect={(date) => handleInputChange('dateAdded', date ? format(date, 'yyyy-MM-dd') : '')}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="age">Age of Plant</Label>
                            <Select
                                value={plantInfo.age}
                                onValueChange={(value) => handleInputChange('age', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select age of plant" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Seedling">Seedling</SelectItem>
                                    <SelectItem value="Young Plant (1–6 months)">Young Plant (1–6 months)</SelectItem>
                                    <SelectItem value="Mature Plant (6+ months)">Mature Plant (6+ months)</SelectItem>
                                    <SelectItem value="Established (1+ year)">Established (1+ year)</SelectItem>
                                    <SelectItem value="Unknown">Unknown</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Care Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="healthStatus">Health Status</Label>
                            <Select
                                value={plantInfo.healthStatus}
                                onValueChange={(value) => handleInputChange('healthStatus', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select health status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Healthy">Healthy</SelectItem>
                                    <SelectItem value="Sick">Sick</SelectItem>
                                    <SelectItem value="Recovering">Recovering</SelectItem>
                                    <SelectItem value="Wilting">Wilting</SelectItem>
                                    <SelectItem value="Pest/Disease Affected">Pest/Disease Affected</SelectItem>
                                    <SelectItem value="Dormant">Dormant</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="wateringStatus">Watering Status</Label>
                            <Select
                                value={plantInfo.wateringStatus}
                                onValueChange={(value) => handleInputChange('wateringStatus', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select watering status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Just Watered">Just Watered</SelectItem>
                                    <SelectItem value="Needs Water">Needs Water</SelectItem>
                                    <SelectItem value="Overwatered">Overwatered</SelectItem>
                                    <SelectItem value="Dry Soil">Dry Soil</SelectItem>
                                    <SelectItem value="Moist Soil">Moist Soil</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastWateredDate">Last Watered Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !plantInfo.lastWateredDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {plantInfo.lastWateredDate ? format(new Date(plantInfo.lastWateredDate), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={plantInfo.lastWateredDate ? new Date(plantInfo.lastWateredDate) : undefined}
                                        onSelect={(date) => handleInputChange('lastWateredDate', date ? format(date, 'yyyy-MM-dd') : '')}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lightRequirements">Light Requirements</Label>
                            <Select
                                value={plantInfo.lightRequirements}
                                onValueChange={(value) => handleInputChange('lightRequirements', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select light requirements" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full Sun (6+ hours of direct sunlight)">Full Sun (6+ hours of direct sunlight)</SelectItem>
                                    <SelectItem value="Partial Sun (4–6 hours of sunlight)">Partial Sun (4–6 hours of sunlight)</SelectItem>
                                    <SelectItem value="Shade (2–4 hours of indirect sunlight)">Shade (2–4 hours of indirect sunlight)</SelectItem>
                                    <SelectItem value="Low Light (indoor/artificial light)">Low Light (indoor/artificial light)</SelectItem>
                                    <SelectItem value="Bright Indirect Light">Bright Indirect Light</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Growth Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="soilType">Soil Type</Label>
                            <Select
                                value={plantInfo.soilType}
                                onValueChange={(value) => handleInputChange('soilType', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select soil type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Sandy Soil">Sandy Soil</SelectItem>
                                    <SelectItem value="Loamy Soil">Loamy Soil</SelectItem>
                                    <SelectItem value="Clay Soil">Clay Soil</SelectItem>
                                    <SelectItem value="Peaty Soil">Peaty Soil</SelectItem>
                                    <SelectItem value="Chalky Soil">Chalky Soil</SelectItem>
                                    <SelectItem value="Silty Soil">Silty Soil</SelectItem>
                                    <SelectItem value="Hydroponic Medium">Hydroponic Medium</SelectItem>
                                    <SelectItem value="Mixed/Custom Blend">Mixed/Custom Blend</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fertilizerType">Fertilizer Type</Label>
                            <Select
                                value={plantInfo.fertilizerType}
                                onValueChange={(value) => handleInputChange('fertilizerType', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select fertilizer type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Organic Compost">Organic Compost</SelectItem>
                                    <SelectItem value="Liquid Fertilizer">Liquid Fertilizer</SelectItem>
                                    <SelectItem value="Granular Fertilizer">Granular Fertilizer</SelectItem>
                                    <SelectItem value="Slow-Release Fertilizer">Slow-Release Fertilizer</SelectItem>
                                    <SelectItem value="Balanced Fertilizer (e.g., 10-10-10)">Balanced Fertilizer (e.g., 10-10-10)</SelectItem>
                                    <SelectItem value="Nitrogen-Rich Fertilizer">Nitrogen-Rich Fertilizer</SelectItem>
                                    <SelectItem value="Phosphorus-Rich Fertilizer">Phosphorus-Rich Fertilizer</SelectItem>
                                    <SelectItem value="Potassium-Rich Fertilizer">Potassium-Rich Fertilizer</SelectItem>
                                    <SelectItem value="Specialized Plant Fertilizer">Specialized Plant Fertilizer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fertilizerSchedule">Fertilizer Schedule</Label>
                            <Select
                                value={plantInfo.fertilizerSchedule}
                                onValueChange={(value) => handleInputChange('fertilizerSchedule', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select fertilizer schedule" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Weekly">Weekly</SelectItem>
                                    <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                    <SelectItem value="Every 2–3 Months">Every 2–3 Months</SelectItem>
                                    <SelectItem value="Seasonal">Seasonal</SelectItem>
                                    <SelectItem value="As Needed">As Needed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="growthStage">Growth Stage</Label>
                            <Select
                                value={plantInfo.growthStage}
                                onValueChange={(value) => handleInputChange('growthStage', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select growth stage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Seedling">Seedling</SelectItem>
                                    <SelectItem value="Vegetative">Vegetative</SelectItem>
                                    <SelectItem value="Budding">Budding</SelectItem>
                                    <SelectItem value="Flowering">Flowering</SelectItem>
                                    <SelectItem value="Fruiting">Fruiting</SelectItem>
                                    <SelectItem value="Dormant">Dormant</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSubmit}>Save Plant Information</Button>
                </div>
            </div>
        </div>
    )
}

