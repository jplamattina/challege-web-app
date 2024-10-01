// features/itemsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Item {
    id: number;
    title: string;
}

interface ItemsState {
    items: Item[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
   },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch items';
            });
    },
});

export const selectItems = (state: { items: ItemsState }) => state.items.items;
export default itemsSlice.reducer;
