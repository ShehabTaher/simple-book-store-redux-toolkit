import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await fetch("http://localhost:3009/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    try {
      bookData.userName = getState().auth.name;
      const res = await fetch("http://localhost:3009/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      dispatch(logInsert({ name: 'insertBook', status: "success" }))
      return data;
    } catch (error) {
      dispatch(logInsert({ name: 'insertBook', status: "Failed" }))
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await fetch(`http://localhost:3009/books/${book.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // console.log(res);
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async (book, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await fetch(`http://localhost:3009/books/${book.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // console.log(res);
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null, bookInfo: null },
  extraReducers: {
    // Get Books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Insert Book
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Delete Book
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((el) => el.id !== action.payload.id);

    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },


    // Get the book

    [getBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookInfo = action.payload
    },


  },
});

export default bookSlice.reducer;
