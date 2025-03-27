import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ITutor } from "@/types";
import { toast } from "sonner";
import { createAvailability } from "@/services/availability";

const CreateAvailabilityModal = ({ tutor }: { tutor: ITutor }) => {
  const availabilitySchema = z.object({
    dayOfWeek: z.enum(
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      {
        required_error: "Day of the week is required",
      }
    ),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    isRecurring: z.boolean().optional(),
    maxSessions: z
      .number()
      .int()
      .positive("Max sessions should be greater than 0")
      .optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      dayOfWeek: "Monday",
      startTime: "",
      endTime: "",
      isRecurring: true,
      maxSessions: 1,
    },
  });

  // const {
  //   formState: { isSubmitting },
  // } = form || {};

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      data.tutorId = tutor._id;
      console.log(data);
      data.tutotId = tutor._id;

      const res = await createAvailability(data);

      console.log(res);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Create Availability</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Availability</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="space-y-4 border border-gray-200 p-6 rounded-lg shadow-sm"
        >
          {/* Day of Week */}
          <div>
            <label className="block font-medium mb-1">Day of the Week</label>
            <Select
              onValueChange={(
                value:
                  | "Monday"
                  | "Tuesday"
                  | "Wednesday"
                  | "Thursday"
                  | "Friday"
                  | "Saturday"
                  | "Sunday"
              ) => setValue("dayOfWeek", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.dayOfWeek && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dayOfWeek.message}
              </p>
            )}
          </div>

          {/* Start Time */}
          <div>
            <label className="block font-medium mb-1">Start Time</label>
            <Input type="time" {...register("startTime")} />
            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startTime.message}
              </p>
            )}
          </div>

          {/* End Time */}
          <div>
            <label className="block font-medium mb-1">End Time</label>
            <Input type="time" {...register("endTime")} />
            {errors.endTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endTime.message}
              </p>
            )}
          </div>

          {/* Is Recurring */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="isRecurring"
              onCheckedChange={(checked) => setValue("isRecurring", !!checked)}
            />
            <label htmlFor="isRecurring" className="text-sm">
              Is Recurring
            </label>
          </div>

          {/* Max Sessions */}
          <div>
            <label className="block font-medium mb-1">Max Sessions</label>
            <Input
              type="number"
              {...register("maxSessions", { valueAsNumber: true })}
            />
            {errors.maxSessions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxSessions.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Save Availability
          </Button>
        </form>

        {/* Submit Button */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateAvailabilityModal;

// <Button type="submit" className="w-full rounded-sm">
// {isSubmitting ? "Creating...." : "Create"}
// </Button>
