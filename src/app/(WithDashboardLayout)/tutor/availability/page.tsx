"use client";
import ManangeAvailability from "@/components/modules/availability/ManageAvailability";
import { useUser } from "@/context/UserContext";
import { getTutorAvailability } from "@/services/availability";
import { getTutorFromUser } from "@/services/tutor";
import React, { useEffect, useState } from "react";

const AvailabilityPage = () => {
  const { user } = useUser();
  const [availability, setAvailability] = useState(null);
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
          const availabilityData = await getTutorAvailability(
            tutorData?.data._id
          );
          setAvailability(availabilityData?.data);

          console.log("Tutor Data:", tutorData?.data);
          console.log("Availability Data:", availabilityData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (user?.userId) {
      fetchData();
    }
  }, [user?.userId]); // Only run when `user.userId` changes

  return (
    <ManangeAvailability
      data={availability!}
      tutor={tutor!}
    ></ManangeAvailability>
  );
};

export default AvailabilityPage;
