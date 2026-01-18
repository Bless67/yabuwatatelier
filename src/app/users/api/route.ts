import { createUser, getUsers } from "@/lib/prismaQuery";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, email } = await request.json();
  const newUser = await createUser(name, email);
  return NextResponse.json(newUser);
}
