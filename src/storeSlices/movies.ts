import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import MyServer from '../backend/AxiosInstances'
import { API_KEY } from "@env"
import { Urls } from '../backend/Urls'
import { MovieDetailsResponse, MovieVideosResponse, Result, UpcomingMoviesResponse } from '../types/movies@Interfaces.ds'
import { RootState, store } from '../store/configure'
import { CinemaHallSettingType } from '../constants/Dummydata'

export interface MoviesState {
    movies_list_loader: boolean;
    movies_list: Result[];
    isMoviesSearchBoxOPened: boolean;
    LastPage: number;
    movie_details_list_loader: boolean;
    movieDetails: MovieDetailsResponse | null;

    confirmationData: null | {
        date: string,
        hall: CinemaHallSettingType
    };
    movie_videos_loader: boolean;
    isOpenVideoPlayer: boolean;
    videoUrl: string | null
}

const initialState: MoviesState = {
    movies_list_loader: false,
    movies_list: [],
    isMoviesSearchBoxOPened: false,
    LastPage: 1,

    movie_details_list_loader: false,
    movieDetails: null,
    confirmationData: null,


    movie_videos_loader: false,
    isOpenVideoPlayer: false,
    videoUrl: null

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
    async (params: MovieDetailsActions, { rejectWithValue, getState, dispatch }) => {
        try {
            const { id, onFail, onSuccess } = params


            const response = await MyServer.get<MovieDetailsResponse>(`${id}?api_key=${API_KEY}`);
            dispatch(fetchMovieVideosById({
                id
            }))
            onSuccess && onSuccess()
            return response.data
        } catch (error) {
            params?.onFail && params?.onFail()
            return rejectWithValue('Error fetching upcoming movies');
        }
    }
);
export const fetchMovieVideosById = createAsyncThunk<MovieVideosResponse, MovieDetailsActions, { rejectValue: string }>(
    'movies/fetchMovieVideosById',
    async (params: MovieDetailsActions, { rejectWithValue, getState }) => {
        try {
            const { id, onFail, onSuccess } = params


            const response = await MyServer.get<MovieVideosResponse>(`${id}/videos?api_key=${API_KEY}`);

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
        },
        setConfirmationData: (state, action: PayloadAction<null | { date: string, hall: CinemaHallSettingType }>) => {
            state.confirmationData = action.payload
        },
        openVideoPlayer: (state, action: PayloadAction<{ status: boolean }>) => {
            state.isOpenVideoPlayer = action.payload.status;
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
            }),

            //videos
            builder.addCase(fetchMovieVideosById.pending, (state, action) => {
                state.movie_videos_loader = true;
                state.videoUrl = null;

            }),
            builder.addCase(fetchMovieVideosById.fulfilled, (state, action) => {
                state.movie_videos_loader = false;
                let videoKey = action.payload.results?.length > 0 ? action.payload.results[0].key : ''
                if (!!videoKey) {
                    let url = `https://www.youtube.com/watch?v=${videoKey}`
                    //set this url here, for now i am using static url
                    // state.videoUrl = url
                    // 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
                    state.videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-children-playing-with-a-dancing-fountain-3469-large.mp4'
                }

            }),
            builder.addCase(fetchMovieVideosById.rejected, (state, action) => {

                state.movie_videos_loader = false;
                state.videoUrl = null;
            })

    },
})

// Action creators are generated for each case reducer function
export const { isSearchBoxOpen, setConfirmationData, openVideoPlayer } = moviesSlice.actions

export const useMoviesState = (state: RootState) => state.movies

export default moviesSlice.reducer