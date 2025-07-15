import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Check } from "lucide-react"

interface AnswerCardProps {
  answer: string
  userName: string
  isAccepted?: boolean
  upvotes: number
  downvotes: number
}
export default function AnswerCard({ answer, userName, isAccepted, upvotes, downvotes }: AnswerCardProps) {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-lg">{upvotes - downvotes}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowDown className="h-5 w-5" />
          </Button>
          {isAccepted && <Check className="h-6 w-6 text-green-500 mt-2" title="Accepted Answer" />}
        </div>
        <div className="flex-1">
          <CardContent className="p-0 text-base">
            <p>{answer}</p>
          </CardContent>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end pt-2">
        <span className="text-sm text-muted-foreground">
          Answered by <span className="font-medium text-foreground">{userName}</span>
        </span>
      </CardFooter>
    </Card>
  )
}
