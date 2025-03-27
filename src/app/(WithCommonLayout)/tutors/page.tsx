import AllTutors from "@/components/modules/tutors";
import { getAllTutor } from "@/services/tutor";

// Mock data for demonstration

const TutorsPage = async () => {
  const tutors = await getAllTutor();
  return <AllTutors tutors={tutors?.data?.result}></AllTutors>;
};

export default TutorsPage;
