import { connectToDatabase } from "@/lib/db";
import Question from "@/models/Question";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {

    await connectToDatabase();

const questions = await Question.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { questions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Question error", error);
    return NextResponse.json(
      { error: "Failed to get questions" },
      { status: 400 }
    );
  }
}
