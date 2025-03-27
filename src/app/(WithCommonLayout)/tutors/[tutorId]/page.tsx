import TutorDetails from "@/components/modules/tutors/TutorDetails";
import { getTutorAvailability } from "@/services/availability";
import { getTutorReview } from "@/services/review";
import { getSingleTutor } from "@/services/tutor";

const TutorDetail = async ({
  params,
}: {
  params: Promise<{ tutorId: string }>;
}) => {
  const { tutorId } = await params;
  console.log(tutorId);

  const tutor = await getSingleTutor(tutorId);
  const reviews = await getTutorReview(tutorId);
  const availability = await getTutorAvailability(tutorId);

  return (
    <TutorDetails
      tutor={tutor?.data}
      reviews={reviews?.data}
      availability={availability?.data}
    ></TutorDetails>
  );
};

export default TutorDetail;
