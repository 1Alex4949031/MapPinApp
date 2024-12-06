import {configureStore} from '@reduxjs/toolkit';
import markersSlice from './markersSlice';

export const store = configureStore({
    reducer: {
        markers: markersSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
