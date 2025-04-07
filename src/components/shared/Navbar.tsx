"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, LogOut } from "lucide-react";
import { protectedRoutes } from "@/constants";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Browse Tutors", href: "/tutors" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">
                TutorLink
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary hover:border-b-2 hover:border-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button className="rounded-full">My Dashboard</Button>
                </Link>

                {user?.role === "tutor" ? (
                  <Link href="/tutor/dashboard">
                    <Button className="rounded-full">Tutor Dashboard</Button>{" "}
                  </Link>
                ) : (
                  <Link href="/register/tutor">
                    <Button className="rounded-full">Become Tutor</Button>{" "}
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard">My Dashboard</Link>
                    </DropdownMenuItem>
                    {user?.role === "tutor" && (
                      <DropdownMenuItem>
                        <Link href="/tutor/dashboard">Tutor Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="bg-red-500 cursor-pointer"
                      onClick={handleLogOut}
                    >
                      <LogOut />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Learning
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
