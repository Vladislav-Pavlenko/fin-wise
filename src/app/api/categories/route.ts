import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({
      status: 200,
      message: "Categories found successfully ",
      data: categories,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch categories. ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: `Invalid name: ${name}` },
        { status: 400 },
      );
    }

    const newCategory = await prisma.category.create({ data: { name } });
    return NextResponse.json({
      status: 201,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create category. ${error}` },
      { status: 500 },
    );
  }
}
