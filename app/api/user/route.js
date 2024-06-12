import { NextResponse } from "next/server";

import connectMongoDB from "@/app/libs/mongoDB";

import User from "@/app/models/user";

export async function POST(request, { params }) {
  try {
    const { email, password } = await request.json();
    await connectMongoDB();
    const user = await User.find({ email, password });

    if (user) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
