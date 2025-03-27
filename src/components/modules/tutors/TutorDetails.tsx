"use client";
import { IReview, ITutor, ITutorAvailability } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import Reviews from "../review/Reviews";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import CreateReviewModel from "../review/CreateReviewModel";
import { createBooking } from "@/services/booking";

const TutorDetails = ({
  tutor,
  availability,
  reviews,
}: {
  tutor: ITutor;
  availability: ITutorAvailability[];
  reviews: IReview[];
}) => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [numberOfSession, setNumberOfSession] = useState<string>("1");
  const [date, setDate] = useState<Date | any>(null);

  // Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.warning("Please log in first !");
      router.push(`/login?redirectPath=${pathname}`);
    }

    const bookingData = {
      userId: user?.userId,
      tutorId: tutor._id,
      availability: selectedAvailability,
      numberOfSession: Number(numberOfSession),
      paid: false,
      date: date,
      status: "pending",
    };
    console.log(bookingData);
    try {
      const res = await createBooking(bookingData);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        router.push(`/dashboard`);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-12">
      {/* Tutor Info */}
      <div className="flex items-center space-x-4">
        <Image
          src={
            tutor.profile ||
            "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?semt=ais_hybrid"
          }
          alt={tutor.firstName}
          width={100}
          height={100}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {tutor.firstName} {tutor.lastName}
          </h1>
          <p className="text-gray-600">{tutor.bio}</p>
          <p className="text-gray-500">
            <strong>Subjects:</strong> {tutor.subjects.join(", ")}
          </p>
          <p className="text-gray-500">
            <strong>Hourly Rate:</strong> ${tutor.hourlyRate}
          </p>
        </div>
      </div>

      {/* Availability Dropdown */}
      <div className="mt-16">
        <label className="block text-sm font-medium text-gray-700">
          Select Availability
        </label>
        <select
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg"
        >
          <option value="">Select a time slot</option>
          {availability.map((slot) => (
            <option key={slot._id} value={slot._id}>
              {slot.dayOfWeek} ({slot.startTime} - {slot.endTime})
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="numberOfSession">Number Of Session</Label>
          <Input
            className="w-full"
            type="number"
            id="numberOfSession"
            value={numberOfSession}
            onChange={(event) => setNumberOfSession(event.target.value)}
            placeholder="How many sessions you want to book"
          />
        </div>
      </div>
      <div className="mt-3">
        <p>Date</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {date ? format(date, "PPP") : "Pick the start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-gray-100">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Book Button */}
      <Button
        onClick={handleBooking}
        className="mt-3"
        disabled={
          selectedAvailability && numberOfSession && date ? false : true
        }
      >
        Book Session
      </Button>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <Reviews reviews={reviews} />
        <CreateReviewModel tutor={tutor}></CreateReviewModel>
      </div>
    </div>
  );
};

export default TutorDetails;
