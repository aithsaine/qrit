import { ADDCATEGORY, ADDPRODUCT, DELETEPRODUCT, INIITIALISE } from "./types";



const initialState = {
    categories:[],
    auth:null,
    products:[]
}

export default function mainReducer  (state=initialState,action){

    switch (action.type){
        case INIITIALISE:
            return {...state,categories:action.payload?.categories,products:action?.payload?.products}
        case ADDCATEGORY:
            return {...state,categories:[...state.categories,action.payload]}
        case ADDPRODUCT:
            return {...state,products:[...state.products,action.payload]}
        case DELETEPRODUCT:
            return {...state,products:state.products.filter(item=>item.id != action.payload)}
    }
    return state;

}