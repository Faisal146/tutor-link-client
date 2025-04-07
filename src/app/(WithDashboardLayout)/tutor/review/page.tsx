"use client";

import ManangeReview from "@/components/modules/review/ManageBooking";
import { useUser } from "@/context/UserContext";
import { getTutorReview } from "@/services/review";
import { getTutorFromUser } from "@/services/tutor";
import React, { useEffect, useState } from "react";

const ReviewPage = () => {
  const { user } = useUser();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.userId) return;

      try {
        // Step 1: Fetch tutor info
        const tutorData = await getTutorFromUser(user.userId);
        if (tutorData) {
          console.log(tutorData);
          // Step 2: Fetch availability only after tutor data is available
          const bookingData = await getTutorReview(tutorData?.data._id);
          setBooking(bookingData?.data);

          console.log("Tutor Data:", tutorData?.data);
          console.log("review Data:", bookingData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (user?.userId) {
      fetchData();
    }
  }, [user?.userId]); // Only run when `user.userId` changes

  return <ManangeReview data={booking!}></ManangeReview>;
};

export default ReviewPage;
