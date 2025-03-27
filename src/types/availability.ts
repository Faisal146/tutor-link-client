export interface ITutorAvailability {
  _id: string;
  tutorId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isRecurring?: boolean;
  maxSessions?: number;
}
