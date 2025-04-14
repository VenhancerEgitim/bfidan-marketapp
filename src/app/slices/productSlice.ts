import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsBySearch = createAsyncThunk(
  'products/fetchProductsBySearch',
  async (filter: string) => {
    const url = `https://api.escuelajs.co/api/v1/products/?title=${encodeURIComponent(filter)}`;
    const response = await axios.get(url);
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ categoryId, filter }: { categoryId: number; filter?: string }) => {
    let url = `https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}`;
    if (filter && filter.trim() !== '') {
      url += `&title=${encodeURIComponent(filter)}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: any;
  images: string[];
}

interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error fetching products by category';
    });
    builder.addCase(fetchProductsBySearch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsBySearch.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchProductsBySearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error fetching search results';
    });
  },
});

export default productSlice.reducer;
