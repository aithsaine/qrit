import NewTableModal from 'components/table/addTable'
import NewEmployeeModal from '../../../components/employee/addEmployee'
import React from 'react'

export default function Employee() {
    return (
        <div className='flex w-full mt-4 flex-col'>
            <div className='flex space-x-2 my-4'>
                <NewEmployeeModal/>
                <NewTableModal/>
            </div>
        </div>
    )
}
