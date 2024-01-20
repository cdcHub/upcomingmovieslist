import { combineReducers } from "@reduxjs/toolkit";
import { movies } from "../storeSlices";

export const rootReducer = combineReducers({
    movies,
})