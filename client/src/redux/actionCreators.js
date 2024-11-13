import { ADDAUTHENTICATE, ADDCATEGORY, ADDEMPLOYEE, ADDNEWORDER, ADDPRODUCT, ADDTABLE, CONFIRMORDER, DELETECATEGORY, DELETEPRODUCT, INIITIALISE, INITIALISEDORDERS, UPDATECATEGORY, UPDATEEMPLOYEESTATUS } from "./types"

export const initialiseData = (data)=>{
    return{
        type:INIITIALISE,
        payload:data
    }
}
export const addCategory = (data)=>{
    return {
        type:ADDCATEGORY,
        payload:data
    }
}

export const addProduct = (data)=>{
    return {
        type:ADDPRODUCT,
        payload:data
    }
}
export const deleteProduct = (id)=>{
    return{
        type:DELETEPRODUCT,
        payload:id
    }
}
export const addEmployee = (employee)=>{
    return {
        type:ADDEMPLOYEE,
        payload:employee
    }
}

export const addTable = (table)=>{
    return {
        type:ADDTABLE,
        payload:table
    }
}

export const addAuthUser = (user)=>{
    return{
        type:ADDAUTHENTICATE,
        payload:user
    }
}
export const initialisedOrders = (orders) =>{
    return {
        type:INITIALISEDORDERS,
        payload:orders
    }
}

export const addNewOrder = (order)=>{
    return {
        type:ADDNEWORDER,
        payload:order
    }
}

export const confirmOrder = (order)=>{
    return {
        type:CONFIRMORDER,
        payload:order
        
    }
}

export const deleteCategory = (id)=>{
    return {
        type:DELETECATEGORY,
        payload:id
    }

}
export const updateCategory = (category)=>{
    return {
        type:UPDATECATEGORY,
        payload:category
    }
}

export const updateEmployeeStatus = (employee)=>{
    return {
        type:UPDATEEMPLOYEESTATUS,
        payload:employee
    }
}