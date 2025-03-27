import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Shield, Clock, Users } from "lucide-react";
import { getAllTutor } from "@/services/tutor";
import TutorCard from "@/components/ui/core/TutorCard";
import { ITutor } from "@/types";

export default async function Home() {
  const tutors = await getAllTutor();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Find Your Perfect Tutor
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with expert tutors who can help you succeed in your
              studies. Book sessions easily and start learning today.
            </p>
            <div className="mt-10 max-w-xl mx-auto">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by subject, grade, or tutor name..."
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<Users className="h-8 w-8" />}
              title="Expert Tutors"
              description="Connect with qualified and experienced tutors in your subject area."
            />
            <Feature
              icon={<Shield className="h-8 w-8" />}
              title="Secure Platform"
              description="Your safety and security are our top priorities."
            />
            <Feature
              icon={<Clock className="h-8 w-8" />}
              title="Flexible Scheduling"
              description="Book sessions that fit your schedule and learning pace."
            />
            <Feature
              icon={<Star className="h-8 w-8" />}
              title="Quality Learning"
              description="Get personalized attention and achieve your academic goals."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold  sm:text-4xl">Find Best Tutors</h2>
          <p className="mt-4 mb-7 text-xl">
            Join thousands of students achieving their academic goals with
            TutorLink.
          </p>
          <div className="grid grid-cols-4 gap-6">
            {tutors?.data?.result.slice(0, 3).map((tutor: ITutor) => (
              <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
            ))}
          </div>{" "}
          <Button className="text-center mt-7">Browse All Tutors</Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to Start Learning?
          </h2>
          <p className="mt-4 text-xl text-primary-foreground/80">
            Join thousands of students achieving their academic goals with
            TutorLink.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/tutors">Browse Tutors</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/register">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center items-center w-12 h-12 mx-auto bg-primary/10 rounded-xl">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
