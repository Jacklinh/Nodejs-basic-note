import { ObjectId } from "mongoose";

export type TypeStaff = {
    _id?: ObjectId;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    active?: boolean,
    role?: string;
}