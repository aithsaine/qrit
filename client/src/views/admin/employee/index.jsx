import NewTableModal from "components/table/addTable";
import NewEmployeeModal from "../../../components/employee/addEmployee";
import React from "react";
import { useSelector } from "react-redux";
import TableCard from "../../../components/card/TableCard";
import EmployeeCard from "../../../components/card/EmployeCard";

export default function Employee() {
  const employees = useSelector((state) => state.employees);
  const tables = useSelector((state) => state.tables);
  console.log(tables)
  return (
    <div className="mt-4 gap-4 flex w-full flex-col">
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <NewEmployeeModal />
        <NewTableModal />
      </div>
      <fieldset className="grid grid-cols-2 border p-4 border-gray-700 dark:border-white  gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <legend className="text-2xl px-4 font-bold text-gray-800 dark:text-white">Employees:</legend>
        {employees.map((emp) => (
          <EmployeeCard employee={emp} />
        ))}
      </fieldset>

      <fieldset className="grid grid-cols-2 border p-4 border-gray-700 dark:border-white  gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <legend className="text-2xl px-4 font-bold text-gray-800 dark:text-white">Tables:</legend>
      {tables.map((table, index) => (
        <TableCard
          key={index}
          tableNumber={table.num_table}
          waiterName={table.employee}
        />
      ))}
    </fieldset>

    </div>
  );
}
