

const initialState={
    cart:{},
    customer:{}
    
}

export default function RootReducer(state=initialState,action){
 switch(action.type)
 { 
    case "ADD_CUSTOMER":
        state.customer[action.payload[0]]=action.payload[1]
        console.log(state.cart)
        return {cart:state.cart,customer:state.customer}


   case "ADD_ITEM":
       state.cart[action.payload[0]]=action.payload[1]
       console.log(state.cart)
       return {cart:state.cart,customer:state.customer}

     case "REMOVE_ITEM":
         delete state.cart[action.payload[0]]
        console.log(state.cart)
        return {cart:state.cart,customer:state.customer}
            
    default:
       return state    
 }

}