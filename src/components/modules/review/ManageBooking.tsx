"use client";
import { NMTable } from "@/components/ui/core/NMTable/index";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IReview } from "@/types";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";

import { deleteReview } from "@/services/review";

const ManangeReview = ({ data }: { data: IReview[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  console.log("review data from manage", data);

  const handleDelete = (data: IReview) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.user.email);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteReview(selectedId);
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

  const columns: ColumnDef<IReview>[] = [
    {
      accessorKey: "user",
      header: () => <div>User</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.user.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: () => <div>Rating</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.rating}</span>
        </div>
      ),
    },
    {
      accessorKey: "review",
      header: () => <div>Review</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.review}</span>
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
        <h1 className="text-xl font-bold">Manage Your Reviews</h1>
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

export default ManangeReview;
