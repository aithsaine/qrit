import { ADDCATEGORY, ADDPRODUCT, INIITIALISE } from "./types"

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