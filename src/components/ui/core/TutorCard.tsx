import React from "react";
import { Card, CardContent, CardHeader } from "../card";
import Image from "next/image";
import { Clock, Eye, GraduationCap, MapPin, Star } from "lucide-react";
import { Button } from "../button";
import { ITutor } from "@/types";
import Link from "next/link";

const TutorCard = ({ tutor }: { tutor: ITutor }) => {
  return (
    <div>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="p-0">
          <Image
            src={
              tutor.profile ||
              "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?semt=ais_hybrid"
            }
            alt={tutor.firstName}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">
            {tutor.firstName} {tutor.lastName}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>{tutor.subjects.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{tutor.university}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{tutor.experienceYears} experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span> 5.0</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold">
              ${tutor.hourlyRate}/hr
            </span>
            <Link href={`/tutors/${tutor._id}`}>
              <Button variant="outline">
                {" "}
                <Eye></Eye>
              </Button>{" "}
            </Link>
            <Button>Book Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorCard;
