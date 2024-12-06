import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMarker} from '../redux/markersSlice';
import {Coordinates, Marker} from "../types/types";
import {motion} from 'framer-motion';
import {RootState} from "../redux/store.ts";
import MarkerFormModal from './modals/MarkerFormModal.tsx';
import DeleteMarkerModal from "./modals/DeleteMarkerModal.tsx";
import MarkerListItem from "./MarkerListItem.tsx";

interface MarkerListProps {
    onMarkerClick: (coordinates: Coordinates) => void;
}

const MarkerList: React.FC<MarkerListProps> = ({onMarkerClick}) => {
    const dispatch = useDispatch();
    const markers = useSelector((state: RootState) => state.markers.markers);

    const [markerToEdit, setMarkerToEdit] = useState<Marker | null>(null);
    const [markerToDelete, setMarkerToDelete] = useState<Marker | null>(null);


    const handleAction = (action: 'edit' | 'delete', marker: Marker, e: React.MouseEvent) => {
        e.stopPropagation();
        if (action === 'edit') {
            setMarkerToEdit(marker);
        } else if (action === 'delete') {
            setMarkerToDelete(marker);
        }
    };

    const handleDeleteConfirm = () => {
        if (markerToDelete) {
            dispatch(deleteMarker(markerToDelete.id));
            setMarkerToDelete(null);
        }
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Список гео маркеров</h2>
            </div>

            {markers.length === 0 ? (
                <div className="px-4 py-3 text-left text-gray-500">
                    Нет маркеров для отображения.
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {markers.map((marker) => (
                        <motion.li
                            key={marker.id}
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 20}}
                            transition={{type: 'spring', stiffness: 200}}
                            className="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer"
                            onClick={() => onMarkerClick(marker.coordinates)}
                        >
                            <MarkerListItem
                                marker={marker}
                                onEdit={(e) => handleAction('edit', marker, e)}
                                onDelete={(e) => handleAction('delete', marker, e)}
                            />
                        </motion.li>
                    ))}
                </ul>
            )}


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
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setMarkerToDelete(null)}
                />
            )}
        </div>
    );
};

export default MarkerList;
