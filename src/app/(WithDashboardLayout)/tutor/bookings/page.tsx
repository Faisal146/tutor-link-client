"use client";
import ManangeBooking from "@/components/modules/Booking/ManageBooking";
import { useUser } from "@/context/UserContext";
import { getTutorBooking } from "@/services/booking";
import { getTutorFromUser } from "@/services/tutor";
import React, { useEffect, useState } from "react";

const BookingPage = () => {
  const { user } = useUser();
  const [booking, setBooking] = useState(null);
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.userId) return;

      try {
        // Step 1: Fetch tutor info
        const tutorData = await getTutorFromUser(user.userId);
        if (tutorData) {
          setTutor(tutorData?.data);
          console.log(tutorData);
          // Step 2: Fetch availability only after tutor data is available
          const bookingData = await getTutorBooking(tutorData?.data._id);
          setBooking(bookingData?.data);

          console.log("Tutor Data:", tutorData?.data);
          console.log("booking Data:", bookingData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (user?.userId) {
      fetchData();
    }
  }, [user?.userId]); // Only run when `user.userId` changes

  return <ManangeBooking data={booking!} tutor={tutor!}></ManangeBooking>;
};

export default BookingPage;
