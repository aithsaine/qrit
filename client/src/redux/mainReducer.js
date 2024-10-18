import { ADDCATEGORY, INIITIALISE } from "./types";



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
    }
    return state;

}