import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Effective Study Techniques for Better Learning",
    excerpt:
      "Discover science-backed study methods that can help you retain information better and improve your academic performance.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&h=400&fit=crop",
    author: "Dr. Emily Chen",
    date: "April 15, 2025",
    category: "Study Tips",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Choose the Right Tutor for Your Needs",
    excerpt:
      "A comprehensive guide to finding and selecting a tutor who matches your learning style and academic goals.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&h=400&fit=crop",
    author: "Michael Roberts",
    date: "April 12, 2025",
    category: "Guidance",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The Future of Online Education: Trends to Watch",
    excerpt:
      "Explore emerging technologies and methodologies that are shaping the landscape of online education.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&h=400&fit=crop",
    author: "Sarah Johnson",
    date: "April 10, 2025",
    category: "Education",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Post */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[16/9] lg:aspect-auto">
                <Image
                  width={500}
                  height={500}
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{blogPosts[0].category}</Badge>
                <h1 className="text-3xl font-bold mb-4">
                  {blogPosts[0].title}
                </h1>
                <p className="text-muted-foreground mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-muted-foreground">
                    {blogPosts[0].date}
                  </span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <Button size="lg" className="w-fit">
                  Read More
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Posts */}
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="p-0">
                <Image
                  width={500}
                  height={500}
                  src={post.image}
                  alt={post.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <Badge className="mb-3">{post.category}</Badge>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm py-1 px-3">
              Study Tips
            </Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">
              Guidance
            </Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">
              Education
            </Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">
              Technology
            </Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">
              Success Stories
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
