import { ADDAUTHENTICATE, ADDCATEGORY, ADDEMPLOYEE, ADDNEWORDER, ADDPRODUCT, ADDTABLE, CONFIRMORDER, DELETEPRODUCT, INIITIALISE, INITIALISEDORDERS } from "./types";



const initialState = {
    categories:[],
    auth:null,
    products:[],
    employees:[],
    tables:[],
    orders:[],
    items:[]
}

export default function mainReducer  (state=initialState,action){

    switch (action.type){
        case INIITIALISE:
            return {...state,orders:[...action?.payload?.orders],categories:action.payload?.categories,products:action?.payload?.products,employees:action.payload.employees,items:action.payload?.items}
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
        case ADDAUTHENTICATE:
            return {...state,auth:action.payload}
        case INITIALISEDORDERS:
            return {...state,orders:action.payload}
        case ADDNEWORDER:
            if(!state.orders.find(order=>order.id==action.payload.id))
            {
                return {...state,orders:[...state.orders,action.payload]}
            }
            return state
        case CONFIRMORDER:
            const newOrders = state.orders.filter(item=>item.id!=action.payload.id);
            return {...state,orders:[...newOrders,action.payload]}
            
    }
    return state;

}