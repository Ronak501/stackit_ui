"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import RichTextEditor from "@/components/rich-text-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast" // Assuming use-toast is available
import { useRouter } from "next/navigation"

export default function AskQuestionPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast({
        title: "Error",
        description: "Title and description are required.",
        variant: "destructive",
      })
      return
    }

    console.log("Submitting question with title:", title, "description:", description, "tags:", tags);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          tags: tags.split(",").map(tag => tag.trim()), // Split tags by comma and trim whitespace
        }),
      });
                
      const data = await res.json();
    
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
    
      router.push("/");
      toast({
        title: "Question Submitted!",
        description: "Your question has been successfully posted.",
      });
    } catch (error) {
        console.error("Submit error: ", error);
        toast({
          title: "Submission Failed",
          description: "Submission failed. Please try again.",
          variant: "destructive",
        });
    }
  
    setTitle("")
    setDescription("")
    setTags("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Ask a New Question</CardTitle>
              <CardDescription>Share your problem with the community and get help.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., How to center a div in CSS?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Describe your problem in detail..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., react, javascript, css (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Question
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
