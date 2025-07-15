"use client"

import { Input } from "@/components/ui/input"
import { Search } from "@/components/ui/search"

import { useState } from "react"
import Header from "@/components/header"
import QuestionCard from "@/components/question-card"
import PaginationControls from "@/components/pagination-controls"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Plus, ChevronDown } from "lucide-react"
import Link from "next/link"

// Placeholder data
const questions = [
  {
    id: "1",
    title: "How to join 2 columns in a data set to make a separate column in SQL",
    description:
      "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First Name, and column 2 consists of last name I want to combine them to make a new column called Full Name.",
    tags: ["SQL", "Database", "Beginner"],
    userName: "User Name",
    answerCount: 3,
    upvotes: 15,
    downvotes: 2,
  },
  {
    id: "2",
    title: "Understanding React Hooks: useState vs. useReducer",
    description:
      "I'm new to React and trying to understand the best practices for state management. When should I use useState and when is useReducer a better choice? Are there specific scenarios where one is clearly superior?",
    tags: ["React", "Hooks", "Frontend"],
    userName: "ReactLearner",
    answerCount: 5,
    upvotes: 25,
    downvotes: 1,
  },
  {
    id: "3",
    title: "Best practices for securing a Node.js API",
    description:
      "I'm building a RESTful API with Node.js and Express. What are the essential security measures I should implement to protect against common vulnerabilities like XSS, CSRF, and SQL injection?",
    tags: ["Node.js", "Security", "API"],
    userName: "SecureDev",
    answerCount: 8,
    upvotes: 40,
    downvotes: 3,
  },
  {
    id: "4",
    title: "How to implement server-side rendering (SSR) with Next.js 14?",
    description:
      "I'm working on a Next.js 14 project and need to implement SSR for better SEO and initial page load performance. What's the recommended approach with the App Router, and how do I fetch data on the server?",
    tags: ["Next.js", "SSR", "React"],
    userName: "NextGenDev",
    answerCount: 2,
    upvotes: 10,
    downvotes: 0,
  },
  {
    id: "5",
    title: "Optimizing database queries in PostgreSQL for large datasets",
    description:
      "My PostgreSQL database is growing, and some queries are becoming slow. What strategies can I use to optimize query performance for large datasets? Indexing, query planning, or other techniques?",
    tags: ["PostgreSQL", "Database", "Optimization"],
    userName: "DataWizard",
    answerCount: 6,
    upvotes: 30,
    downvotes: 0,
  },
]

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 // Example total pages

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
              <QuestionCard key={question.id} {...question} />
            ))}
          </div>

          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </main>
    </div>
  )
}
