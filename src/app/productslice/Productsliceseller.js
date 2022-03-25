import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
let initialState = {
  products: [],
  selectedProduct: {},
  loading: true,
  errors: "",
};

const ProductsSliceseller = createSlice({
  name: "product",
  initialState,
  reducers: {
    populatesellerProducts(state, action) {
      state.products = action.payload;
    },
    deslecetsellerproducts(state){
      state.products=[];
    },
    //productdetail
    selectsellerProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    unselectProduct(state) {
      state.selectedProduct = null;
    },
    deletesellerProduct: (state, action) => {
      //payload :id
      const payload = action.payload;
      const index = state.products.findIndex((item) => item._id === payload);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    updatesellerProduct: (state, action) => {
      const payload = action.payload;
      const index = state.products.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.products[index] = payload;
      }
    },
    addProduct: (state, action) => {
      const payload = action.payload;
      state.products.push(payload);
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});
/*export const fetchProducts = () => (dispatch) => {
  //const [res, error] = await queryApi("products");
  axios
    .get("/products/filter")
    .then((res) => {
      dispatch(populateProducts(res));
    })
    .catch((err) => {
      dispatch(setErrors(err));
    });
  /*if (error) {
dispatch(setErrors(error));
} else {

dispatch(populateProducts(data));
}
};*/
export const selectProducts = (state) => {
  return [state.products.products, state.products.errors];
};
export const selectSelectedProduct = (state) => {
  return state.products.selectedProduct;
};
export const {
  populatesellerProducts,
  selectsellerProduct,
  unselectProduct,
  setErrors,
  deslecetsellerproducts,
  deletesellerProduct,
  updatesellerProduct,
  addProduct,
} = ProductsSliceseller.actions;
export default ProductsSliceseller.reducer;