import React, { useState, useEffect } from 'react';
import employeeFakeImage from "../../../../assets/img/employee.png";
import { useSelector } from 'react-redux';

export default function OrderTable() {
    const { orders, employees } = useSelector(state => state);
    const [ordersData, setOrdersData] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dayName = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date);
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${dayName} ${day} ${month} ${year} at ${hours}:${minutes}`;
    };

    useEffect(() => {
        setOrdersData(orders.map((order, index) => {
            return {
                id: index + 1,
                order: `ref_${order.id}`,
                table: order.table,
                waiter: order?.confirmer ? employees.find(item => item.id == order.confirmer).name : "-",
                status: order.status,
                date: formatDate(order.date),
                total: order.total
            }
        }));
    }, [orders]);

    return (
        <div className="p-6 bg-white dark:bg-navy-900 rounded-lg shadow-lg transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Order Table</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-300 dark:bg-navy-600 text-gray-800 dark:text-gray-200">
                            <th className="px-6 py-3 border-b border-gray-300">No.</th>
                            <th className="px-6 py-3 border-b border-gray-300">Order</th>
                            <th className="px-6 py-3 border-b border-gray-300">N° Table</th>
                            <th className="px-6 py-3 border-b border-gray-300">Waiter</th>
                            <th className="px-6 py-3 border-b border-gray-300">Status</th>
                            <th className="px-6 py-3 border-b border-gray-300">Date</th>
                            <th className="px-6 py-3 border-b border-gray-300">Total Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.sort((a, b) => b.id - a.id).map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
                                <td className="px-6 py-4 border-b border-gray-200 text-center text-gray-700 dark:text-gray-300">{order.id}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700 dark:text-gray-300">{order.order}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-center text-gray-700 dark:text-gray-300">{order.table}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                                    <img
                                        src={employeeFakeImage}
                                        alt="Employee"
                                        className="w-10 h-10 rounded-full border border-gray-300"
                                    />
                                    <span>{order.waiter}</span>
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        order.status === 'confirmed' ? 'bg-green-500 text-white' :
                                        order.status === 'pending' ? 'bg-yellow-500 text-white' :
                                        'bg-red-500 text-white'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700 dark:text-gray-300">{order.date}</td>
                                <td className="px-6 py-4 border-b border-gray-200 text-gray-700 dark:text-gray-300">{order.total.toFixed(2)} MAD</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
