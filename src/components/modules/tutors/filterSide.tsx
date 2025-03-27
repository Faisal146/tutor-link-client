"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";

const FilterSide = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("rating");

  return (
    <div>
      <div className="w-full md:w-64 space-y-6">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range ($/hr)
              </label>
              <div className="pt-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={5}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input type="text" placeholder="Enter city or zip code" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSide;
