import React from 'react'
import { useSelector } from 'react-redux'
import List from '../employee/table/List'


export default function AdminOrders() {
    const employees = useSelector(state=>state.employees)
    return (
        <div className='flex w-full mt-4 flex-col'>
            <div className='flex space-x-2 my-4'>
            </div>
            <List />
        </div>
    )
}
