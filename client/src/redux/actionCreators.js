import { ADDCATEGORY, ADDEMPLOYEE, ADDPRODUCT, DELETEPRODUCT, INIITIALISE } from "./types"

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