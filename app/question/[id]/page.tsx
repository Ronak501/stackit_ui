"use client"

import type React from "react"
import Header from "@/components/header"
import AnswerCard from "@/components/answer-card"
import RichTextEditor from "@/components/rich-text-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, MessageSquare } from "lucide-react"
import { useState } from "react" // Import useState
import { toast } from "@/hooks/use-toast" // Import toast

// Placeholder data for a single question and its answers
const questionData = {
  id: "1",
  title: "How to join 2 columns in a data set to make a separate column in SQL",
  description:
    "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First Name, and column 2 consists of last name I want to combine them to make a new column called Full Name. I'm looking for a simple and efficient SQL query to achieve this. Any help would be greatly appreciated!",
  tags: ["SQL", "Database", "Beginner", "Data Transformation"],
  userName: "User Name",
  upvotes: 15,
  downvotes: 2,
  answers: [
    {
      id: "a1",
      answer:
        "You can use the `CONCAT` function or the `||` operator to combine columns. For example:\n\n```sql\nSELECT CONCAT(FirstName, ' ', LastName) AS FullName\nFROM YourTable;\n```\n\nOr using the `||` operator:\n\n```sql\nSELECT FirstName || ' ' || LastName AS FullName\nFROM YourTable;\n```\n\nBoth will give you the desired 'FullName' column.",
      userName: "Zealous Ant",
      isAccepted: true,
      upvotes: 10,
      downvotes: 0,
    },
    {
      id: "a2",
      answer:
        "Another way is to use `CONCAT_WS` if you have multiple columns and want a specific separator:\n\n```sql\nSELECT CONCAT_WS(' ', FirstName, LastName) AS FullName\nFROM YourTable;\n```\n\nThis is particularly useful if you have nullable columns, as `CONCAT_WS` will skip null values.",
      userName: "SQLMaster",
      isAccepted: false,
      upvotes: 5,
      downvotes: 1,
    },
    {
      id: "a3",
      answer:
        "For SQL Server, you can also use the `+` operator:\n\n```sql\nSELECT FirstName + ' ' + LastName AS FullName\nFROM YourTable;\n```\n\nBe aware that `+` behaves differently with NULLs compared to `CONCAT`.",
      userName: "DBAPro",
      isAccepted: false,
      upvotes: 3,
      downvotes: 0,
    },
  ],
}

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch questionData based on params.id
  const question = questionData // Using placeholder for now

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container max-w-5xl mx-auto grid gap-8">
          {/* Question Section */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold leading-tight">{question.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none dark:prose-invert text-base">
              <p>{question.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span>{question.upvotes}</span>
                  <ArrowDown className="h-4 w-4 text-red-500" />
                  <span>{question.downvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{question.answers.length} answers</span>
                </div>
              </div>
              <span className="font-medium text-foreground">Asked by {question.userName}</span>
            </CardFooter>
          </Card>

          {/* Answers Section */}
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold">Answers ({question.answers.length})</h2>
            {question.answers.map((answer) => (
              <AnswerCard key={answer.id} {...answer} />
            ))}
          </div>

          {/* Submit Your Answer Section */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Submit Your Answer</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Using a client component for RichTextEditor as it needs state */}
              <ClientRichTextEditorWrapper />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Client component wrapper for RichTextEditor to manage its state
// In a real app, this state might be managed by a form library or server action
function ClientRichTextEditorWrapper() {
  const [answerContent, setAnswerContent] = useState("")

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted Answer:", answerContent)
    // In a real application, send this answer to the backend
    toast({
      title: "Answer Submitted!",
      description: "Your answer has been successfully posted.",
    })
    setAnswerContent("")
  }

  return (
    <form onSubmit={handleSubmitAnswer} className="grid gap-4">
      <RichTextEditor value={answerContent} onChange={setAnswerContent} placeholder="Type your answer here..." />
      <Button type="submit" className="w-full md:w-auto md:self-end">
        Submit Answer
      </Button>
    </form>
  )
}
