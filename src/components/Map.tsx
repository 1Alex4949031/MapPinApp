import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {YMaps, Map as YMap, Placemark} from '@pbe/react-yandex-maps';
import {RootState} from '../redux/store';
import {Coordinates, Marker} from '../types/types.ts';
import {API_KEY} from '../api/api.ts';
import MarkerFormModal from './modals/MarkerFormModal.tsx';
import {deleteMarker} from '../redux/markersSlice.ts';
import DeleteMarkerModal from './modals/DeleteMarkerModal.tsx';
import {toast} from "react-hot-toast";

interface MapProps {
    center: Coordinates;
}

const Map: React.FC<MapProps> = ({center}) => {
    const markers = useSelector((state: RootState) => state.markers.markers);
    const [markerToEdit, setMarkerToEdit] = useState<Marker | null>(null);
    const [markerToDelete, setMarkerToDelete] = useState<Marker | null>(null);

    const mapRef = useRef<any>(null);
    const dispatch = useDispatch();
    const [clickTimeout, setClickTimeout] = useState<number | null>(null);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setCenter(center);
        }
    }, [center]);

    const handleMarkerClick = (marker: Marker) => {
        if (clickTimeout) clearTimeout(clickTimeout);

        const timeout = setTimeout(() => {
            setMarkerToEdit(marker);
        }, 200);
        setClickTimeout(timeout);
    };

    const handleMarkerDoubleClick = (marker: Marker) => {
        if (clickTimeout) clearTimeout(clickTimeout);

        setMarkerToDelete(marker);
    };

    const handleDeleteMarker = () => {
        if (markerToDelete) {
            dispatch(deleteMarker(markerToDelete.id));
            toast.success('Маркер удален!');
            setMarkerToDelete(null);
        }
    };

    return (
        <div>
            <YMaps query={{apikey: API_KEY}}>
                <YMap
                    instanceRef={mapRef}
                    defaultState={{center, zoom: 12}}
                    width="100%" height="400px"
                >
                    {markers.map((marker) => (
                        <Placemark
                            key={marker.id}
                            geometry={marker.coordinates}
                            properties={{
                                balloonContent: `<strong>${marker.name}</strong><br/>${marker.description}`,
                            }}
                            onClick={() => handleMarkerClick(marker)}
                            onDblClick={() => handleMarkerDoubleClick(marker)}
                        />
                    ))}
                </YMap>
            </YMaps>

            {markerToEdit && (
                <MarkerFormModal
                    isEditMode={true}
                    marker={markerToEdit}
                    address={markerToEdit.address}
                    coordinates={markerToEdit.coordinates}
                    onClose={() => setMarkerToEdit(null)}
                />
            )}

            {markerToDelete && (
                <DeleteMarkerModal
                    marker={markerToDelete}
                    onConfirm={handleDeleteMarker}
                    onCancel={() => setMarkerToDelete(null)}
                />
            )}
        </div>
    );
};

export default Map;
