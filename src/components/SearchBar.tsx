import React, {useState, useEffect} from 'react';
import {PossibleLocation} from '../types/types';
import {fetchGeocode} from '../api/geocode';
import {debounce} from 'lodash';
import {Search, X} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import Loader from './Loader.tsx';
import SearchResultItem from './SearchResultItem.tsx';
import {toast} from "react-hot-toast";

const SearchBar: React.FC<{
    onSelectLocation: (selectedLocation: PossibleLocation) => void
}> = ({onSelectLocation}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<PossibleLocation[]>([]);

    const [loading, setLoading] = useState(false);

    const debouncedSearch = debounce(async (query: string) => {
        if (query.trim()) {
            setLoading(true);
            try {
                const searchResult = await fetchGeocode(query);
                setResults(searchResult.locations);
            } catch (error) {
                toast.error("Ошибка загрузки данных!");
                setResults([]);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
            setLoading(false);
        }
    }, 500);

    useEffect(() => {
        debouncedSearch(query);
        return () => debouncedSearch.cancel();
    }, [query]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSelectLocation = (selectedLocation: PossibleLocation) => {
        onSelectLocation(selectedLocation);
        setQuery('');
        setResults([]);
    };

    const handleClearSearch = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="text-center mb-1">
                <h2 className="text-4xl font-bold text-gray-800">Поиск адреса</h2>
                <p className="text-sm text-gray-500">Введите адрес для поиска местоположения</p>
            </div>
            <div className="relative">
                <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Введите адрес"
                    className="pl-12 pr-16 py-3 w-full border-2 border-gray-300 rounded-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out outline-none text-lg shadow-sm"
                />
                {query && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5"/>
                    </button>
                )}
                {loading && <Loader/>}
            </div>

            <AnimatePresence>
                {results.length > 0 && !loading && (
                    <motion.ul
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 10}}
                        className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-10 max-h-80 overflow-y-auto"
                    >
                        {results.map((result, index) => (
                            <SearchResultItem
                                key={index}
                                result={result}
                                onSelect={() => handleSelectLocation(result)}
                                index={index}
                            />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

            <div className="text-center">
                <p className="text-xs text-gray-400">
                    Поиск осуществляется по базе данных геокодирования
                </p>
            </div>
        </div>
    );
};

export default SearchBar;
