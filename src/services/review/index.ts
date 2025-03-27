"use server";
import { revalidateReview } from "@/app/actions/revalidate";
import { cookies } from "next/headers";

export const getTutorReview = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${id}`,
      {
        next: {
          tags: ["Review"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const createReview = async (data: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    console.log("revalinging...");
    await revalidateReview();

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteReview = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    console.log("revalinging...");
    await revalidateReview();
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
