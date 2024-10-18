import { ADDCATEGORY, INIITIALISE } from "./types"

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