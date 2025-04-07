"use client";
import { IUserBooking } from "@/types/booking";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { initPayment } from "@/services/payment";
import { toast } from "sonner";

const BookingCard = ({ booking }: { booking: IUserBooking }) => {
  const handlePayment = async (data: {
    total_amount: number;
    tran_id: string;
  }) => {
    const payment = await initPayment(data);
    if (payment.success) {
      // Redirect to payment gateway
      console.log("Payment successful", payment);
      // Handle success payment
      // Update booking status to paid
      // Send confirmation email to tutor and user
    } else {
      toast.error("Something went wrong");
    }
  };
  console.log(booking);

  return (
    <div>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow flex gap-4 my-4">
        <CardHeader className="p-0">
          <Image
            src={
              booking.tutorId.profile ||
              "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?semt=ais_hybrid"
            }
            alt={booking.tutorId.firstName}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-1 flex gap-4">
            {booking.tutorId.firstName} {booking.tutorId.lastName}{" "}
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span> 5.0</span>
            </div>
          </h3>
          <h3 className="text-lg font-semibold mb-1 flex gap-4">
            Total Amount :{" "}
            {booking.numberOfSession * booking.tutorId.hourlyRate}
          </h3>

          <div className="my-2 text-sm text-muted-foreground"></div>
          <div className="mt-4 flex items-center justify-between w-full gap-7 mb-7">
            <span className="text-lg font-semibold">
              status : {booking.status}
            </span>
            <span className="text-lg font-semibold">
              payment : {booking.paid ? "Paid" : "Not paid"}
            </span>

            {booking.status === "pending" && (
              <Button>Wating for confirmetion</Button>
            )}
            {booking.status === "confirmed" &&
              (booking.paid ? (
                <Button>Booked Successfully</Button>
              ) : (
                <Button
                  onClick={() =>
                    handlePayment({
                      total_amount: 300,
                      tran_id: booking._id,
                    })
                  }
                >
                  Pay Now
                </Button>
              ))}
            {booking.status === "cancelled" && (
              <Button>Booking is cancelled</Button>
            )}
          </div>
          <div>
            {booking.status === "pending" && (
              <span>You can pay after tutor confirms your booking</span>
            )}
            {booking.status === "confirmed" &&
              (booking.paid ? (
                <span>Booked Successfully !!</span>
              ) : (
                <span>Your booking request is confirmed you can pay now</span>
              ))}
            {booking.status === "cancelled" && (
              <span>Tutor cancelled your booking!!</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCard;
