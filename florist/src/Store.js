import { createContext, useReducer } from "react";

export const Store = createContext();

const localItems = localStorage.getItem('cart.cartItems');
const parsedItems = localItems ? JSON.parse(localItems) : [];


const initialState = {
  cart: {
    cartItems: parsedItems,
  },
};

function reducer(state,action){
    switch(action.type){
        case 'CART_ADD':
          const newItem = action.payload;
          const itemExist = state.cart.cartItems.find((x)=> x._id===newItem._id);
          const cartItems = itemExist ? state.cart.cartItems.map((x)=> x._id === itemExist._id ? newItem : x) :[...state.cart.cartItems, newItem];
          localStorage.setItem('cart.cartItems',JSON.stringify(cartItems));
          return {...state, cart:{...state.cart, cartItems}};
        case 'CART_DELETE':
          const items = state.cart.cartItems.filter((item)=>item._id!==action.payload._id)
          localStorage.setItem('cart.cartItems',JSON.stringify(items));
          return{...state, cart:{...state.cart, cartItems:items}};
        default: return state;
    }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
