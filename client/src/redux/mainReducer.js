import { ADDCATEGORY, ADDEMPLOYEE, ADDPRODUCT, ADDTABLE, DELETEPRODUCT, INIITIALISE } from "./types";



const initialState = {
    categories:[],
    auth:null,
    products:[],
    employees:[],
    tables:[]
}

export default function mainReducer  (state=initialState,action){

    switch (action.type){
        case INIITIALISE:
            return {...state,categories:action.payload?.categories,products:action?.payload?.products,employees:action.payload.employees}
        case ADDCATEGORY:
            return {...state,categories:[...state.categories,action.payload]}
        case ADDPRODUCT:
            return {...state,products:[...state.products,action.payload]}
        case DELETEPRODUCT:
            return {...state,products:state.products.filter(item=>item.id != action.payload)}
        case ADDEMPLOYEE:
            return{ ...state,employees:[...state.employees,action.payload]}
        case ADDTABLE:
            return{...state,tables:[...state.tables,action.payload]}
    }
    return state;

}