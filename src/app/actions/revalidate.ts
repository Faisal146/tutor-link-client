"use server";

import { revalidateTag } from "next/cache";

export const revalidateAvailability = async () => {
  revalidateTag("Availability");
};

export const revalidateBooking = async () => {
  revalidateTag("Booking");
};

export const revalidateReview = async () => {
  revalidateTag("Review");
};
