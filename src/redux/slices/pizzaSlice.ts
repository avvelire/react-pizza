import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type PizzaItem = {
  id: number;
  imageUrl: string;
  title:string;
  types: number[];
  sizes: number[];
  price: number;
}

type FetchPizzaParams = {
  category: string,
  sortBy: string,
  search: string
}
//     ^
//     |
// The same as
// Record<string, string>

export const fetchPizza = createAsyncThunk<PizzaItem[], FetchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
  const { category, sortBy, search } = params;
  const res = await axios.get<PizzaItem[]>(
    `https://63f73180e8a73b486af268df.mockapi.io/items?${category}&sortBy=${sortBy}${search}`,
  );
  return res.data;
});

enum Status{
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error'
}

interface PizzaSliceState {
  items:PizzaItem[];
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
      state.status = Status.SUCCES;
      state.items = action.payload;
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { addItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;
