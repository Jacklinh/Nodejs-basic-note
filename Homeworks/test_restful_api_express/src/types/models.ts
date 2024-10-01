import { ObjectId } from "mongoose";

export type TStudent = {
    _id?: ObjectId;
    fullName: string;
    age: number;
    email?: string;
    mobile?: string;
    class?: string;
}