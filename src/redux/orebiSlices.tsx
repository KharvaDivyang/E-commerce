import {createSlice} from '@reduxjs/toolkit';
import {ProductsrProps} from '../../type';

interface StoreState {
  productData: ProductsrProps[];
}

const initialState: StoreState = {
  productData: [],
};

export const orebiSlice = createSlice({
  name: 'orebi',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductsrProps) => item._id === action.payload._id,
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductsrProps) => item._id === action.payload._id,
      );
      if (existingProduct) {
        existingProduct.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductsrProps) => item._id === action.payload._id,
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
    },
    // ✅ FIXED HERE
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        item => item._id !== action.payload,
      );
    },
    resetCart: state => {
      state.productData = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = orebiSlice.actions;

export default orebiSlice.reducer;
