import { NextRequest, NextResponse } from "next/server";
import prisma from "../../prisma/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: `Invalid name: ${name}` },
        { status: 400 },
      );
    }
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    return NextResponse.json({
      status: 200,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Category not found. ${error}` },
      { status: 404 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      status: 200,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Category not found. ${error}` },
      { status: 404 },
    );
  }
}
