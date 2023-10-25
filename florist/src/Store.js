import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state,action){
    switch(action.type){
        case 'CART_ADD':
          const newItem = action.payload;
          const itemExist = state.cart.cartItems.find((x)=> x._id===newItem._id);
          const cartItems = itemExist ? state.cart.cartItems.map((x)=> x._id === itemExist._id ? newItem : x) :[...state.cart.cartItems, newItem];
          return {...state, cart:{...state.cart, cartItems}};
        default: return state;
    }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
