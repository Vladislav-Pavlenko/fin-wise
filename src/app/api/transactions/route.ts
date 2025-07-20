import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma/prisma";
import { transactionSchema } from "../utils/validation";
import { transactionFilters } from "../utils/filters";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filterType = searchParams.get("filterType");
    const dateParam = searchParams.get("date");
    const typeParam = searchParams.get("type");
    const titleParam = searchParams.get("title");

    const where = transactionFilters(
      filterType,
      dateParam,
      typeParam,
      titleParam,
    );

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: "desc" },
    });

    const isEmpty = transactions.length === 0;

    return NextResponse.json({
      status: 200,
      message: isEmpty
        ? "No transactions found"
        : filterType
          ? `Filtered by ${filterType}`
          : "All transactions returned",
      data: transactions,
      isEmpty,
      foundCount: transactions.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch transactions: ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = transactionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.format() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: data.amount,
        title: data.title,
        message: data.message,
        date: data.date,
        categoryId: data.categoryId,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create transaction. ${error}` },
      { status: 500 },
    );
  }
}
