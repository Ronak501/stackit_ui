"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Code,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  // This is a simplified placeholder. In a real application, you would integrate a library
  // like TipTap, Quill, or Slate.js here for full rich text editing capabilities.
  const handleFormat = (format: string) => {
    // Placeholder for applying formatting
    console.log(`Applying format: ${format}`)
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/20">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("bold")}>
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("italic")}>
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("underline")}>
          <Underline className="h-4 w-4" />
          <span className="sr-only">Underline</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("ul")}>
          <List className="h-4 w-4" />
          <span className="sr-only">Unordered List</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("ol")}>
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Ordered List</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("code")}>
          <Code className="h-4 w-4" />
          <span className="sr-only">Code</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("link")}>
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("image")}>
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">Image</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("align-left")}>
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align Left</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("align-center")}>
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align Center</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("align-right")}>
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align Right</span>
        </Button>
      </div>
      <Textarea
        className="min-h-[150px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-y"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
