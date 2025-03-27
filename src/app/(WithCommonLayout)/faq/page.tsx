"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I find a tutor?",
        answer: "You can search for tutors using our search bar or browse through our tutor listings. Filter by subject, price range, and availability to find the perfect match for your needs."
      },
      {
        question: "What qualifications do tutors have?",
        answer: "All our tutors go through a rigorous verification process. They must have relevant academic credentials, teaching experience, and pass our screening process."
      },
      {
        question: "How do I book a session?",
        answer: "Once you find a tutor you like, click the 'Book Now' button on their profile. You can then select available time slots and complete the booking process."
      }
    ]
  },
  {
    category: "Payments & Pricing",
    questions: [
      {
        question: "How much do tutoring sessions cost?",
        answer: "Tutoring rates vary by tutor and subject. Each tutor sets their own hourly rate, which is clearly displayed on their profile. You can use our filters to find tutors within your budget."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit cards, PayPal, and bank transfers. Payments are processed securely through our platform."
      },
      {
        question: "What is the cancellation policy?",
        answer: "Cancellations made 24 hours before the scheduled session are eligible for a full refund. Late cancellations may be subject to a fee."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "What if I have technical issues during a session?",
        answer: "Our support team is available 24/7 to help with technical issues. You can contact us through the help center or live chat for immediate assistance."
      },
      {
        question: "How do online sessions work?",
        answer: "Online sessions are conducted through our integrated video platform. You'll receive a link to join the session before your scheduled time."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        
        {/* Search */}
        <div className="mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          {filteredFaqs.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 p-6 bg-muted rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help you 24/7
          </p>
          <Button size="lg">Contact Support</Button>
        </div>
      </div>
    </div>
  );
}