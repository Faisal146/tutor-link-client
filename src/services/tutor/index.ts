export const getAllTutor = async (page?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutors?page=${page}`,
      {
        next: {
          tags: ["TUTOR"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleTutor = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutors/${id}`
      // {
      //   next: {
      //     tags: ["TUTOR"],
      //   },
      // }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getTutorFromUser = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutors/from-user/${id}`
      // {
      //   next: {
      //     tags: ["TUTOR"],
      //   },
      // }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
