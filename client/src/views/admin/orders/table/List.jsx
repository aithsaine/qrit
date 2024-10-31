import React, { useState, useEffect } from 'react';
import employeeFakeImage from "../../../../assets/img/employee.png"
import { useSelector } from 'react-redux';

// Mock data with table numbers

export default function OrderTable() {
    const {orders,employees} = useSelector(state=>state)
    const [ordersData,setOrdersData] = useState([])
    useEffect(()=>{
        setOrdersData(orders.map((order,index)=>{return{id:index+1,order:`ref_${order.id}`,table:order.table,waiter:order?.confirmer?employees.find(item=>item.id==order.confirmer).name:"-",status:order.status,date:order.date,total:order.total}}))
    },[orders])

    return (
        <div className="p-6 bg-white dark:bg-navy-900 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Order Table</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-navy-700 text-gray-800 dark:text-gray-200">
                            <th className="px-4 py-2 border">No.</th>
                            <th className="px-4 py-2 border">Order</th>
                            <th className="px-4 py-2 border">N° Table</th>
                            <th className="px-4 py-2 border">Waiter</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Total Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.sort((a,b)=>a.id>b.id?-1:1).map((order, index) => (
                            <tr key={order.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="px-4 py-2 border text-center text-gray-700 dark:text-gray-300">
                                    {order.id}
                                </td>
                                <td className="px-4 py-2 border text-gray-700 dark:text-gray-300">
                                    {order.order}
                                </td>
                                <td className="px-4 py-2 border text-center text-gray-700 dark:text-gray-300">
                                    {order.table}
                                </td>
                                <td className="px-4 py-2 border text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                                    <img
                                        src= {employeeFakeImage}
                                        alt="emp"
                                        className="w-8 h-8 rounded-full border border-gray-300"
                                    />
                                    <span>{order.waiter}</span>
                                </td>
                                <td className="px-4 py-2 border text-center text-gray-700 dark:text-gray-300">
                                    <span
                                        className={`px-2 py-1 rounded ${
                                            order.status === 'confirmed'
                                                ? 'bg-green-700 text-white'
                                                : order.status === 'pending'
                                                ? 'bg-yellow-600 text-white'
                                                : 'bg-red-600 text-white'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border text-gray-700 dark:text-gray-300">
                                    {order.date}
                                </td>
                                <td className="px-4 py-2 border text-gray-700 dark:text-gray-300">
                                    {order.total.toFixed(2)} MAD
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}