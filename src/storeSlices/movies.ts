import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import MyServer from '../backend/AxiosInstances'
import { API_KEY } from "@env"
import { Urls } from '../backend/Urls'
import { MovieDetailsResponse, Result, UpcomingMoviesResponse } from '../types/movies@Interfaces.ds'
import { RootState, store } from '../store/configure'

export interface MoviesState {
    movies_list_loader: boolean;
    movies_list: Result[];
    isMoviesSearchBoxOPened: boolean;
    LastPage: number;
    movie_details_list_loader: boolean;
    movieDetails: MovieDetailsResponse | null
}

const initialState: MoviesState = {
    movies_list_loader: false,
    movies_list: [],
    isMoviesSearchBoxOPened: false,
    LastPage: 1,

    movie_details_list_loader: false,
    movieDetails: null

}

interface Actions {
    page: number;
    onSuccess?: () => void;
    onFail?: () => void;
}

export const fetchMoviesList = createAsyncThunk<UpcomingMoviesResponse, Actions, { rejectValue: string }>(
    'movies/fetchMoviesList',
    async (params: Actions, { rejectWithValue, getState }) => {
        try {
            const { page = 1, onFail, onSuccess } = params
            const response = await MyServer.get<UpcomingMoviesResponse>(`${Urls.upcoming}${API_KEY}&&page=${page}`);
            let results = [...store.getState().movies.movies_list, ...response?.data?.results]
            let mergeData = page == 1 ? response?.data : { ...response?.data, results }
            console.log('mergeData', mergeData.results.length);

            onSuccess && onSuccess()
            return mergeData;
        } catch (error) {
            params?.onFail && params?.onFail()
            return rejectWithValue('Error fetching upcoming movies');
        }
    }
);
interface MovieDetailsActions {
    id: number;
    onSuccess?: () => void;
    onFail?: () => void;
}
export const fetchMovieDetailsById = createAsyncThunk<MovieDetailsResponse, MovieDetailsActions, { rejectValue: string }>(
    'movies/fetchMovieDetailsById',
    async (params: MovieDetailsActions, { rejectWithValue, getState }) => {
        try {
            const { id, onFail, onSuccess } = params
            const response = await MyServer.get<MovieDetailsResponse>(`${id}?api_key=${API_KEY}}`);

            onSuccess && onSuccess()
            return response.data
        } catch (error) {
            params?.onFail && params?.onFail()
            return rejectWithValue('Error fetching upcoming movies');
        }
    }
);
export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        isSearchBoxOpen: (state, action: PayloadAction<boolean>) => {
            state.isMoviesSearchBoxOPened = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchMoviesList.pending, (state, action) => {
            state.movies_list_loader = true;

        }),
            builder.addCase(fetchMoviesList.fulfilled, (state, action) => {

                state.movies_list_loader = false;
                state.movies_list = action.payload.results || []
                state.LastPage = action.payload.total_pages;
            }),
            builder.addCase(fetchMoviesList.rejected, (state, action) => {

                state.movies_list_loader = false;
                state.movies_list = [];
            }),
            //movie details
            builder.addCase(fetchMovieDetailsById.pending, (state, action) => {
                state.movie_details_list_loader = true;

            }),
            builder.addCase(fetchMovieDetailsById.fulfilled, (state, action) => {
                state.movie_details_list_loader = false;
                state.movieDetails = action.payload

            }),
            builder.addCase(fetchMovieDetailsById.rejected, (state, action) => {

                state.movie_details_list_loader = false;
                state.movieDetails = null;
            })
    },
})

// Action creators are generated for each case reducer function
export const { isSearchBoxOpen } = moviesSlice.actions

export const useMoviesState = (state: RootState) => state.movies

export default moviesSlice.reducer