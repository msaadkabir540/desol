import { NextResponse } from "next/server";

import connectMongoDB from "@/app/libs/mongoDB";

import Vehicle from "@/app/models/vehicle";

export async function POST(request, { params }) {
  try {
    const resData = await request.json();
    await connectMongoDB();
    console.log({ resData });
    const vehicle = await Vehicle.create({ ...resData });

    if (vehicle) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
