import { ADDAUTHENTICATE, ADDCATEGORY, ADDEMPLOYEE, ADDNEWORDER, ADDPRODUCT, ADDTABLE, CONFIRMORDER, DELETEPRODUCT, INIITIALISE, INITIALISEDORDERS } from "./types"

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