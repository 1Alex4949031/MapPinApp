import React, {useState} from 'react';
import {Coordinates, PossibleLocation} from './types/types';
import MarkerFormModal from './components/modals/MarkerFormModal.tsx';
import SearchBar from './components/SearchBar';
import Map from './components/Map';
import {Toaster} from 'react-hot-toast';
import './App.css';
import {Pin} from "lucide-react";
import {MAP_CENTER} from "./constants/constants.ts";
import MarkerList from "./components/MarkerList.tsx";


const App: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<PossibleLocation | null>(null);
    const [mapCenter, setMapCenter] = useState<Coordinates>(MAP_CENTER);

    const handleLocationSelect = (location: PossibleLocation) => {
        setSelectedLocation(location);
    };

    const handleMarkerClick = (coordinates: Coordinates) => {
        setMapCenter([...coordinates]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="flex mx-auto px-4 py-3">
                    <h1 className="text-2xl font-semibold text-gray-800">MapPin</h1>
                    <Pin className="h-4 w-4"/>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <section className="search__bar bg-white rounded-lg shadow-md p-6 mb-6">
                    <SearchBar onSelectLocation={handleLocationSelect}/>
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                    <section className="map bg-white rounded-lg shadow-md overflow-hidden xl:col-span-2">
                        <Map center={mapCenter}/>
                    </section>

                    <section
                        className="marker-list w-full bg-white rounded-lg shadow-md p-6 max-h-[400px] overflow-y-auto">
                        <MarkerList onMarkerClick={handleMarkerClick}/>
                    </section>
                </div>

                {selectedLocation && (
                    <section className="marker-form">
                        <MarkerFormModal
                            isEditMode={false}
                            coordinates={selectedLocation.coordinates}
                            address={selectedLocation.address}
                            onClose={() => setSelectedLocation(null)}
                        />
                    </section>
                )}
            </main>
            <Toaster/>
        </div>
    );
};

export default App;
