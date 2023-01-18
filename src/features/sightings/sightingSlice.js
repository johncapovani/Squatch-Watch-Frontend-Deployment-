import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import sightingService from './sightingService'

const initialState = {
  sightings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Get all sightings
export const getSightings = createAsyncThunk(
  'sightings/getAll',
  async (thunkAPI) => {
    try {
      return await sightingService.getSightings()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Create new Sighting

export const createSighting = createAsyncThunk(
  'sightings/create',

  async (sightingData, thunkAPI) => {

    try {
      //Get JSON Token user must be authenticated
      const token = thunkAPI.getState().auth.user.token
      return await sightingService.createSighting(sightingData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get user specific sightings
export const getMySightings = createAsyncThunk('sightings/getMine',
  async (_, thunkAPI) => {

    try {
      //Get JSON Token user must be authenticated
      const token = thunkAPI.getState().auth.user.token
      return await sightingService.getMySightings(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  })

//Delete user sighting
export const deleteSighting = createAsyncThunk(
  'sightings/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await sightingService.deleteSighting(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  }
)


export const sightingsSlice = createSlice({
  name: 'sightings',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(createSighting.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSighting.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sightings = action.payload
      })
      .addCase(createSighting.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Get user specifc sightings for sightings dashboard
      .addCase(getMySightings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMySightings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sightings = action.payload
      })
      .addCase(getMySightings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //End User Specific slice settings

      .addCase(getSightings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSightings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sightings = action.payload
      })
      .addCase(getSightings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteSighting.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSighting.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sightings = state.sightings.filter(
          (sighting) => sighting._id !== action.payload.id
        )
      })
      .addCase(deleteSighting.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = sightingsSlice.actions
export default sightingsSlice.reducer
