import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Progress from "components/progress";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import employeeFakeImage from "../../../../assets/img/employee.png"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();



// const columns = columnsDataCheck;
export default function ComplexTable(props) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("worker", {
      id: "worker",
      header: () => (
        <p className="text-sm  font-bold text-gray-600 dark:text-white">Worker</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold flex items-center justify-start text-navy-700 dark:text-white">
           <img
                                        src= {employeeFakeImage}
                                        alt="emp"
                                        className="w-8 h-8 rounded-full border border-gray-300"
                                    />
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: () => (
        <p className="text-sm text-center  font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex  items-center justify-start w-full">
          {info.getValue() === "Online" ? (
            <MdCheckCircle className=" text-green-500 me-1 dark:text-green-300" />
          ) :(
            <MdOutlineError className="w-6 text-amber-500 me-1 dark:text-amber-300" />
          ) }
          <p className="text-xs  text-start font-bold text-justify text-navy-700 dark:text-white">
        {info.getValue()} 
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("last_order", {
      id: "last_order",
      header: () => (
        <p className="text-sm font-bold text-center text-gray-600 dark:text-white">Last Order</p>
      ),
      cell: (info) => (
        <p className="text-xs font-bold text-center text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("progress", {
      id: "progress",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PROGRESS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <Progress width="w-[108px]" value={info.getValue()} />
        </div>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Workers Recent Activities
        </div>
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
