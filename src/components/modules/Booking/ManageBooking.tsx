"use client";
import { NMTable } from "@/components/ui/core/NMTable/index";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ITutor } from "@/types";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";

import { IBooking } from "@/types/booking";
import { deleteBooking, updateBookingStatus } from "@/services/booking";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManangeBooking = ({ data }: { data: IBooking[]; tutor: ITutor }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  console.log("booking data from manage", data);

  const handleDelete = (data: IBooking) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.userId.email);
    setModalOpen(true);
  };
  const handleStatus = async (value: string, data: IBooking) => {
    console.log("updating status of", data._id, value);
    try {
      const res = await updateBookingStatus(data._id, { value });
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        setModalOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteBooking(selectedId);
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IBooking>[] = [
    {
      accessorKey: "userId",
      header: () => <div>Student</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.userId.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "availability",
      header: () => <div>Time Slot</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">
            {row.original.availability.dayOfWeek},{" "}
            {row.original.availability.startTime} -{" "}
            {row.original.availability.endTime}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: () => <div>Date</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">
            {new Date(row.original.date).toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "Status",
      header: () => <div>Status</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Select onValueChange={(value) => handleStatus(value, row.original)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={row.original.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      accessorKey: "paid",
      header: () => <div>Is paid</div>,
      cell: ({ row }) => (
        <div>
          {row.original.paid ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              Yes
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              No
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Bookings</h1>
      </div>
      <NMTable columns={columns} data={data || []} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManangeBooking;
