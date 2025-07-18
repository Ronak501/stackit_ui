import mongoose, { Schema, model, models } from "mongoose";

export interface IQuestion {
    title: string;
    description: string;
    tags: string[];
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const questionSchema = new Schema<IQuestion>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        tags: { type: [String], required: true },
    },
    {
        timestamps: true,
    }
);

const Question = models?.Question || model<IQuestion>("Question", questionSchema);

export default Question;
