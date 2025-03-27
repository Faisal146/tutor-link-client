import TutorCard from "@/components/ui/core/TutorCard";
import React from "react";
import FilterSide from "./filterSide";
import { ITutor } from "@/types";

const AllTutors = ({ tutors }: { tutors: ITutor[] }) => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <FilterSide></FilterSide>

          {/* Tutors Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor: ITutor, index: number) => (
                <TutorCard key={index} tutor={tutor}></TutorCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTutors;
