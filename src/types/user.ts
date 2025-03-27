export interface IUser {
  userId: string;
  name: string;
  email: string;
  isActive?: boolean;
  role: "user" | "admin" | "tutor";
  iat?: number;
  exp?: number;
}
