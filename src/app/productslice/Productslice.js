import { createSlice} from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
products: [],
selectedProduct: {},
loading:true,
errors: "",
};

const ProductsSlice = createSlice({
name: "products",
initialState,
reducers: {
populateProducts(state, action) {
state.products = action.payload;
},
//productdetail
selectProduct(state, action) {
state.selectedProduct = action.payload;

},
unselectProduct(state) {
state.selectedProduct = null;
},
deleteProduct: (state, action) => {
    //payload :id
const payload = action.payload;
const index = state.products.findIndex((item) => item._id === payload);
if (index !== -1) {
state.products.splice(index, 1);
}
},
updateProduct: (state, action) => {
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
export const fetchProducts = () =>(dispatch) => {
//const [res, error] = await queryApi("products");
 axios.get("/products/filter").then((res)=>{
    dispatch(populateProducts(res));
}).catch((err)=>{
    dispatch(setErrors(err))
});
/*if (error) {
dispatch(setErrors(error));
} else {

dispatch(populateProducts(data));
}*/
};
export const selectProducts = (state) => {
return [state.products.products, state.products.errors];
};
export const selectSelectedProduct = (state) => {
return state.products.selectedProduct;
};
export const {
populateProducts,
selectProduct,
unselectProduct,
setErrors,
deleteProduct,
updateProduct,
addProduct,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;