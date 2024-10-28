import NewTableModal from "components/table/addTable";
import NewEmployeeModal from "../../../components/employee/addEmployee";
import React from "react";
import { useSelector } from "react-redux";
import EmployeCard from "components/card/EmployeCard";

export default function Employee() {
  const employees = useSelector((state) => state.employees);
  return (
    <div className="mt-4 flex w-full flex-col">
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <NewEmployeeModal />
        <NewTableModal />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {employees.map((emp) => (
          <EmployeCard employee={emp} />
        ))}
      </div>
    </div>
  );
}
