import React from 'react';
import {PossibleLocation} from '../types/types';
import {MapPin} from 'lucide-react';
import {motion} from 'framer-motion';

interface SearchResultItemProps {
    result: PossibleLocation;
    onSelect: (result: PossibleLocation) => void;
    index: number;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({result, onSelect, index}) => {
    return (
        <motion.li
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.05}}
            onClick={() => onSelect(result)}
            className="cursor-pointer p-4 hover:bg-blue-50 transition duration-300 ease-in-out flex items-center border-b last:border-b-0"
        >
            <div className="flex items-center w-full">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <MapPin className="text-blue-500" size={20}/>
                </div>
                <div className="flex flex-col justify-start flex-grow">
                    <span className="font-medium text-gray-800">{result.address.title}</span>
                    {result.address.details &&
                        <span className="text-gray-600 text-sm mt-1">{result.address.details}</span>
                    }
                </div>
            </div>
        </motion.li>
    );
};

export default SearchResultItem;
