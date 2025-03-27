"use server";
import { revalidateBooking } from "@/app/actions/revalidate";
import { cookies } from "next/headers";

export const getTutorBooking = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/${id}`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["Booking"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getUserBookings = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/user/${id}`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["Bookings"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const createBooking = async (data: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/booking`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    if (res.ok) {
      console.log("revalinging...");

      await revalidateBooking();
    }
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBookingStatus = async (
  id: string,
  data: any
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/status-update/${id}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    console.log("revalinging...");
    // await revalidateBooking();
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteBooking = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/booking/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    if (res.ok) {
      console.log("revalinging...");
      await revalidateBooking();
    }
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
