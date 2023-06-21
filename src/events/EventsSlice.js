import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventsService from "./EventsService";

const initialState = {
  normalEvents: [],
  recursiveEvents: [],
  eventId: null,
  currentEvent: null,
  currentRecursiveEvent: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (event, thunkAPI) => {
    try {
      return await eventsService.createEvent(event);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (thunkAPI) => {
    try {
      return await eventsService.getEvents();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEventById = createAsyncThunk(
  "events/getEventById",
  async (eventId, thunkAPI) => {
    try {
      return await eventsService.getEventById(eventId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async (eventData, thunkAPI) => {
    try {
      return await eventsService.editEvent(eventData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEventsByInterval = createAsyncThunk(
  "events/getEventsByInterval",
  async (eventData, thunkAPI) => {
    try {
      return await eventsService.getEventsByInterval(eventData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createRecursiveEvent = createAsyncThunk(
  "recursiveEvents/createRecursiveEvent",
  async (event, thunkAPI) => {
    try {
      return await eventsService.createRecursiveEvent(event);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRecursiveEvents = createAsyncThunk(
  "recursiveEvents/getRecursiveEvents",
  async (thunkAPI) => {
    try {
      return await eventsService.getRecursiveEvents();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRecursiveEventById = createAsyncThunk(
  "recursiveEvents/getRecursiveEventById",
  async (eventId, thunkAPI) => {
    try {
      return await eventsService.getRecursiveEventById(eventId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editRecursiveEvent = createAsyncThunk(
  "recursiveEvents/editRecursiveEvent",
  async (eventData, thunkAPI) => {
    try {
      return await eventsService.editRecursiveEvent(eventData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteRecursiveEvent = createAsyncThunk(
  "recursiveEvents/deleteRecursiveEvents",
  async (data, thunkAPI) => {
    try {
      return await eventsService.deleteUserTrainerLike(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    clearCurrentRecursiveEvent: (state) => {
      state.currentRecursiveEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("here", action.payload)
        state.normalEvents = [...state.normalEvents, action.payload];
        state.trainersId = [action.payload.trainers];
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.normalEvents = null;
      })
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.normalEvents = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.normalEvents = [];
      })
      .addCase(getEventById.pending, (state) => {
        state.isLoading = true;
        state.currentEvent = null;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const startDate = action.payload.startDate;
        const endDate = action.payload.endDate;
        const startHour = action.payload.startHour;
        const endHour = action.payload.endHour;
        const recursive = action.payload.recursive;
        state.currentEvent = {
          ...action.payload,
          startDate,
          endDate,
          startHour,
          endHour,
          recursive
        };
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentEvent = null;
      })
      .addCase(editEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const responeEvent = action.payload;
        state.normalEvents = state.normalEvents.map((event) =>
          event.id !== responeEvent.id ? event : responeEvent
        );
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEventsByInterval.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventsByInterval.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.normalEvents = action.payload;
      })
      .addCase(getEventsByInterval.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createRecursiveEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecursiveEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recursiveEvents = [...state.recursiveEvents, action.payload];
        state.trainersId = [action.payload.trainers];
      })
      .addCase(createRecursiveEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recursiveEvents = null;
      })
      .addCase(getRecursiveEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecursiveEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recursiveEvents = action.payload;
      })
      .addCase(getRecursiveEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recursiveEvents = [];
      })
      .addCase(getRecursiveEventById.pending, (state) => {
        state.isLoading = true;
        state.currentRecursiveEvent = null;
      })
      .addCase(getRecursiveEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const startDate = action.payload.startDate;
        const endDate = action.payload.endDate;
        const startHour = action.payload.startHour;
        const endHour = action.payload.endHour;
        state.currentRecursiveEvent = {
          ...action.payload,
          startDate,
          endDate,
          startHour,
          endHour,
        };
      })
      .addCase(getRecursiveEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentRecursiveEvent = null;
      })
      .addCase(editRecursiveEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editRecursiveEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const responeEvent = action.payload;
        state.recursiveEvents = state.recursiveEvents.map((event) =>
          event.id !== responeEvent.id ? event : responeEvent
        );
      })
      .addCase(editRecursiveEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRecursiveEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecursiveEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteRecursiveEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default eventsSlice.reducer;
export const { clearCurrentEvent } = eventsSlice.actions;
export const { clearCurrentRecursiveEvent } = eventsSlice.actions;
export const eventsActions = eventsSlice.actions;
