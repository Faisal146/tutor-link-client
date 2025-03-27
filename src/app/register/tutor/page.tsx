"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ImagePreviewer from "@/components/ui/core/TLImageUploader/ImagePreviewer";
import TLImageUploader from "@/components/ui/core/TLImageUploader";

// Form Schema
const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  university: z.string().min(1, "University is required"),
  major: z.string().min(1, "Major is required"),
  experienceYears: z.coerce
    .number()
    .min(0, "Experience must be a positive number"),
  hourlyRate: z.coerce.number().min(0, "Rate must be a positive number"),
  bio: z.string().min(1, "Bio is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  // password: z.string().min(6, "Password must be at least 6 characters"),
  // confirmPassword: z.string().min(6, "Confirm password is required"),
});
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Literature",
  "History",
  "Computer Science",
  "Economics",
];

const educationLevels = [
  "Bachelor's Degree",
  "Master's Degree",
  "Ph.D.",
  "Professional Certification",
];

export default function TutorRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  // React-Hook-Form Setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "siam",
      lastName: "",
      email: "",
      phoneNumber: "",
      educationLevel: "",
      university: "",
      major: "",
      experienceYears: 0,
      hourlyRate: 0,
      bio: "",
      subjects: [],
    },
  });

  // Form Submit Handler
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("hello world");
    console.log("Form Data:", data);
    console.log("image Data:", imageFiles);

    setIsLoading(true);

    setTimeout(() => {
      console.log("Form submitted successfully");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-4">
                  <GraduationCap className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl text-center">
                  Become a Tutor
                </CardTitle>
                <CardDescription className="text-center">
                  Fill out the form below to create your tutor profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="+880000000000"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="major"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Major</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="major subject"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="your university"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experienceYears"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="years of experience"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Hour Rate"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="john.doe@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="write about yourself..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Educational Background
                  </h3>
                  <FormField
                    control={form.control}
                    name="educationLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Subjects You Can Teach
                  </h3>
                  <Controller
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {subjects.map((subject) => (
                          <Button
                            key={subject}
                            variant={
                              field.value.includes(subject)
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              const updatedSubjects = field.value.includes(
                                subject
                              )
                                ? field.value.filter((s) => s !== subject)
                                : [...field.value, subject];
                              field.onChange(updatedSubjects);
                            }}
                          >
                            {subject}
                          </Button>
                        ))}
                      </div>
                    )}
                  />
                  <FormMessage />
                </div>
                {imagePreview.length > 0 ? (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="mt-8"
                  />
                ) : (
                  <div className="mt-8">
                    <TLImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Profile Photo"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? "Creating your profile..."
                    : "Create Tutor Profile"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
