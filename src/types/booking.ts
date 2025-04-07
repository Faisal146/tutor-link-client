export interface IBooking {
  _id: string;
  id?: string;
  userId: {
    name: string;
    email: string;
  };
  tutorId: string;
  availability: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  };
  paid: boolean;
  date: Date;
  status: "pending" | "confirmed" | "cancelled";
}

export interface IUserBooking {
  _id: string;
  id?: string;
  userId: {
    name: string;
    email: string;
  };
  tutorId: {
    firstName: string;
    lastName: string;
    email: string;
    profile: string;
    hourlyRate: number;
  };
  availability: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  };
  numberOfSession: number;
  paid: boolean;
  date: Date;
  status: "pending" | "confirmed" | "cancelled";
}
