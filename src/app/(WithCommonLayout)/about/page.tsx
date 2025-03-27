import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Target, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Our Mission
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Empowering students to achieve academic excellence through
            personalized tutoring and mentorship from expert educators.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<GraduationCap className="h-8 w-8" />}
              title="Excellence"
              description="We strive for academic excellence in every tutoring session."
            />
            <ValueCard
              icon={<Users className="h-8 w-8" />}
              title="Community"
              description="Building a supportive community of learners and educators."
            />
            <ValueCard
              icon={<Target className="h-8 w-8" />}
              title="Accessibility"
              description="Making quality education accessible to all students."
            />
            <ValueCard
              icon={<Award className="h-8 w-8" />}
              title="Quality"
              description="Ensuring the highest quality of education and support."
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Founded in 2025, TutorLink emerged from a simple yet powerful
                  idea: connecting passionate educators with eager learners in a
                  seamless, digital environment.
                </p>
                <p>
                  What started as a small platform has grown into a thriving
                  community of thousands of tutors and students, all united by
                  the goal of achieving academic excellence.
                </p>
                <p>
                  Today, we continue to innovate and expand our services, always
                  keeping our core mission at heart: making quality education
                  accessible to everyone.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/tutors">Find a Tutor</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=800&fit=crop"
                alt="Team collaboration"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&fit=crop"
              name="David Anderson"
              role="CEO & Founder"
            />
            <TeamMember
              image="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=200&h=200&fit=crop"
              name="Emily Chen"
              role="Head of Education"
            />
            <TeamMember
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop"
              name="Michael Roberts"
              role="Tech Director"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="flex justify-center items-center w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function TeamMember({
  image,
  name,
  role,
}: {
  image: string;
  name: string;
  role: string;
}) {
  return (
    <div className="text-center">
      <div className="relative w-40 h-40 mx-auto mb-4">
        <Image src={image} alt={name} className="rounded-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-muted-foreground">{role}</p>
    </div>
  );
}
