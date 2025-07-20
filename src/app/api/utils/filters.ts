import { Prisma } from "@prisma/client";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

export const transactionFilters = (
  filterType: string | null,
  dateParam: string | null,
  typeParam: string | null,
  titleParam: string | null,
) => {
  const where: Prisma.TransactionWhereInput = {};

  if (filterType) {
    const now = dateParam ? new Date(dateParam) : new Date();

    const dateRange: { gte: Date; lte: Date } = (() => {
      switch (filterType) {
        case "day":
          return { gte: startOfDay(now), lte: endOfDay(now) };
        case "week":
          return {
            gte: startOfWeek(now, { weekStartsOn: 1 }),
            lte: endOfWeek(now, { weekStartsOn: 1 }),
          };
        case "month":
          return { gte: startOfMonth(now), lte: endOfMonth(now) };
        case "year":
          return { gte: startOfYear(now), lte: endOfYear(now) };
        default:
          return { gte: new Date(0), lte: new Date() };
      }
    })();

    where.date = dateRange;
  }

  if (titleParam) {
    where.title = {
      contains: titleParam,
      mode: "insensitive",
    };
  }

  if (typeParam === "income") {
    where.amount = { gt: 0 };
  } else if (typeParam === "expense") {
    where.amount = { lt: 0 };
  }

  return where;
};
