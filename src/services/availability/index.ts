"use server";
import { revalidateAvailability } from "@/app/actions/revalidate";
import { cookies } from "next/headers";

export const getTutorAvailability = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/availability/${id}`,
      {
        next: {
          tags: ["Availability"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const createAvailability = async (data: any): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/availability`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    if (res.ok) {
      console.log("revalinging...");

      await revalidateAvailability();
    }
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteAvailability = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/availability/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    if (res.ok) {
      console.log("revalinging...");
      await revalidateAvailability();
    }
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
