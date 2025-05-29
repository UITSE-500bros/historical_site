import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MyPagination } from "@/src/components/section/MyPagination";

export type Column<T> = {
  header: string;
  width?: string;
  render: (row: T, index: number) => React.ReactNode;
};
export type Props<T> = {
  columns: Column<T>[];
  data: T[];
  totalItems?: number;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
};

export default function PostTable<T>({
  columns,
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}: Props<T>) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index} className="text-left">
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className="w-48">
                      {column.render(row, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>{" "}
        </CardContent>
        {totalItems && totalItems > 0 && (
          <CardFooter>
            <MyPagination />
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
