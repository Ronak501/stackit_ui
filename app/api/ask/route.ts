import { connectToDatabase } from "@/lib/db";
import Question from "@/models/Question";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, description, tags } = await request.json();

    if (!title || !description || !tags) {
      return NextResponse.json(
        { error: "Title, description, and tags are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    await Question.create({
      title,
      description,
      tags,
    });

    return NextResponse.json(
      { message: "Question posted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Question posting error", error);
    return NextResponse.json(
      { error: "Failed to post question" },
      { status: 400 }
    );
  }
}
