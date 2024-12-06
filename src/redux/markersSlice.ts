import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Marker} from '../types/types';

interface MarkersState {
    markers: Marker[];
}

const initialState: MarkersState = {
    markers: [],
};

const markersSlice = createSlice({
    name: 'markers',
    initialState,
    reducers: {
        addMarker: (state, action: PayloadAction<Marker>) => {
            state.markers.push(action.payload);
        },
        deleteMarker: (state, action: PayloadAction<number>) => {
            state.markers = state.markers.filter(marker => marker.id !== action.payload);
        },
        updateMarker: (state, action: PayloadAction<Marker>) => {
            const index = state.markers.findIndex(marker => marker.id === action.payload.id);
            if (index !== -1) {
                state.markers[index] = action.payload;
            }
        },
    },
});

export const {addMarker, deleteMarker, updateMarker} = markersSlice.actions;
export default markersSlice.reducer;
