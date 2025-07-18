"use client"

import { Input } from "@/components/ui/input"
import { Search } from "@/components/ui/search"
import type { IQuestion as Question } from "@/models/Question"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import QuestionCard from "@/components/question-card"
import PaginationControls from "@/components/pagination-controls"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Plus, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [questions, setQuestions] = useState<Question[]>([])
  const totalPages = 5 // Example total pages

  useEffect(() => {
    // Fetch questions from the API when the component mounts
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/question");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handlePageChange = (page: number) => setCurrentPage(page)
  // In a real app, you'd fetch data for the new page here

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container max-w-5xl mx-auto grid gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative md:hidden">
                {/* Search bar for mobile, already in header for desktop */}
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search questions..." className="pl-9 w-full" />
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <Link href="/ask">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Ask New Question
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    Newest
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                  <DropdownMenuItem>Most Voted</DropdownMenuItem>
                  <DropdownMenuItem>Oldest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    Unanswered
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Questions</DropdownMenuItem>
                  <DropdownMenuItem>Unanswered</DropdownMenuItem>
                  <DropdownMenuItem>Answered</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-6">
            {questions.map((question) => (
              <QuestionCard 
                key={question._id?.toString()}
                id={question._id?.toString() || ''}
                title={question.title}
                description={question.description}
                tags={question.tags}
                userName="Anonymous" // Add proper user name when available
                answerCount={0} // Add proper answer count when available
                upvotes={0} // Add proper upvotes when available
                downvotes={0} // Add proper downvotes when available
              />
            ))}
          </div>

          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </main>
    </div>
  )
}
