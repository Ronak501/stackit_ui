import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, MessageSquare } from "lucide-react"

interface QuestionCardProps {
  id: string
  title: string
  description: string
  tags: string[]
  userName: string
  answerCount: number
  upvotes: number
  downvotes: number
}
export default function QuestionCard({
  id,
  title,
  description,
  tags,
  userName,
  answerCount,
  upvotes,
  downvotes,
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold leading-tight">
          <Link href={`/question/${id}`} className="hover:underline" prefetch={false}>
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm line-clamp-3">{description}</CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 pt-2">
        <div className="flex items-center gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span>{upvotes}</span>
            <ArrowDown className="h-4 w-4 text-red-500" />
            <span>{downvotes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{answerCount} answers</span>
          </div>
          <span className="font-medium text-foreground">{userName}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
