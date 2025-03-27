"use client";
import { NMTable } from "@/components/ui/core/NMTable/index";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ITutor, ITutorAvailability } from "@/types";
import { deleteBrand } from "@/services/Brand";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";
import CreateAvailabilityModal from "./CreateAvailabilityModel";
import { deleteAvailability } from "@/services/availability";

const ManangeAvailability = ({
  data,
  tutor,
}: {
  data: ITutorAvailability[];
  tutor: ITutor;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  console.log(data);

  const handleDelete = (data: ITutorAvailability) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.startTime);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteAvailability(selectedId);
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

  const columns: ColumnDef<ITutorAvailability>[] = [
    {
      accessorKey: "Day",
      header: () => <div>Day</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.dayOfWeek}</span>
        </div>
      ),
    },
    {
      accessorKey: "startTime",
      header: () => <div>Start Time</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.startTime}</span>
        </div>
      ),
    },
    {
      accessorKey: "endTime",
      header: () => <div>End Time</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.endTime}</span>
        </div>
      ),
    },
    {
      accessorKey: "isRecurring",
      header: () => <div>Is Recurring</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isRecurring ? (
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
        <h1 className="text-xl font-bold">Manage Availability</h1>

        <CreateAvailabilityModal tutor={tutor} />
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

export default ManangeAvailability;
