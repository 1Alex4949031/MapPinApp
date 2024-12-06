import React from "react";
import {Marker} from "../types/types.ts";
import {Edit2, FileText, MapPin, Move3d, Navigation, Trash2} from "lucide-react";

const MarkerListItem: React.FC<{
    marker: Marker;
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
}> = ({marker, onEdit, onDelete}) => (
    <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <MapPin className="flex-shrink-0  h-6 w-6 text-blue-500"/>
                <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{marker.name}</h3>
                    <p className="text-sm text-gray-500">{marker.address.title}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={onEdit}
                    className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800"
                >
                    <Edit2 className="h-4 w-4"/>
                </button>
                <button
                    onClick={onDelete}
                    className="inline-flex items-center p-2 text-red-600 hover:text-red-800"
                >
                    <Trash2 className="h-4 w-4"/>
                </button>
            </div>
        </div>
        <div className="mt-2">
            <div className="flex items-center text-sm text-gray-500">
                <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"/>
                {marker.description}
            </div>
            <div className="flex items-center text-sm text-gray-500">
                <Navigation className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"/>
                {marker.address.details}
            </div>
            <div className="flex items-center text-sm text-gray-500">
                <Move3d className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"/>
                Координаты: {marker.coordinates[0]}, {marker.coordinates[1]}
            </div>
        </div>
    </div>
);

export default MarkerListItem;
