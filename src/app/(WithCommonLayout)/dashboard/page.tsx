"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BookingCard from "@/components/ui/core/BookingCard";
import { useUser } from "@/context/UserContext";
import { getUserBookings } from "@/services/booking";
import { getTutorFromUser } from "@/services/tutor";
import { IUserBooking } from "@/types/booking";
import { Eye, GraduationCap, Link, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const { user } = useUser();
  const [bookings, setBooking] = useState<IUserBooking[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.userId) return;

      try {
        const BookingsData = await getUserBookings(user?.userId);
        setBooking(BookingsData?.data);

        console.log("booking Data:", BookingsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (user?.userId) {
      fetchData();
    }
  }, [user?.userId]); // Only run when `user.userId` changes

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl my-10">My Booking</h1>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => <BookingCard booking={booking}></BookingCard>)
      ) : (
        <div className="text-center py-12">
          <p>No upcoming bookings found.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
