import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cartItems: [],
    total: 0,
}

const carteSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    removeitem: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productid !== action.payload
        ),
      };
    },
    additem: (state, action) => {
      //state.quantity+=1;
      let item = {
        label: action.payload.label,
        price: action.payload.price,
        productImage: action.payload.productImage,
        remise: action.payload.discountPercent,
        productid: action.payload._id,
        qte: action.payload.qte,
      };
      const existItem = state.cartItems.find(
        (x) => x.productid === item.productid
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productid === existItem.productid ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    },

    getTotal: (state) => {
      let result = 0;
      return {
        ...state,
       // cartItems: state.cartItems.map(item => result += item.price * item.qte
          //result === 0 ? {...state, total: result} : console.log("error");
        //),
        total: state.total, result
      }
    }, 
  },
});
export const { additem, removeitem, getTotal } = carteSlice.actions;
export default carteSlice.reducer;
