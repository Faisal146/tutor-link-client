"use server";

import { cookies } from "next/headers";

export const initPayment = async (paymentData: {
  total_amount: number;
  tran_id: string;
}): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/init`,
      {
        method: "POST",
        body: JSON.stringify(paymentData),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
