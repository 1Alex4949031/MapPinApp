import React, {useState, useEffect} from 'react';
import {X, Save, MapPin, ArrowLeft} from 'lucide-react';
import {useDispatch} from 'react-redux';
import {updateMarker, addMarker} from '../../redux/markersSlice.ts';
import {toast} from 'react-hot-toast';
import {InputField, TextareaField, ButtonField} from '../FormFields.tsx';
import {Marker, Address, Coordinates} from '../../types/types.ts';
import {AnimatePresence, motion} from 'framer-motion';

interface MarkerFormModalProps {
    isEditMode: boolean;
    marker?: Marker;
    address: Address;
    coordinates: Coordinates;
    onClose: () => void;
}

const MarkerFormModal: React.FC<MarkerFormModalProps> = ({
                                                             isEditMode, marker, address,
                                                             coordinates, onClose,
                                                         }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (isEditMode && marker) {
            setName(marker.name);
            setDescription(marker.description);
        }
    }, [isEditMode, marker]);

    const handleSubmit = () => {
        if (name.trim() && description.trim()) {
            const newMarker = {
                id: isEditMode && marker ? marker.id : new Date().getTime(),
                name,
                description,
                coordinates,
                address,
            };

            if (isEditMode && marker) {
                dispatch(updateMarker(newMarker));
                toast.success('Маркер обновлен!');
            } else {
                dispatch(addMarker(newMarker));
                toast.success('Гео маркер успешно добавлен!');
            }

            onClose();
        } else {
            toast.error('Все поля обязательны для заполнения!');
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
                <div className="w-full max-w-lg">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {isEditMode ? 'Изменить гео маркер' : 'Добавить гео маркер'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <X className="h-6 w-6"/>
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-3 text-gray-500">
                                    <MapPin className="flex-shrink-0 h-5 w-5 mt-0.5"/>
                                    <div>
                                        <p className="font-medium">{address.title}</p>
                                        <p className="text-sm">{address.details}</p>
                                    </div>
                                </div>
                                <InputField
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Введите наименование гео маркера"
                                />
                                <TextareaField
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Введите описание гео маркера"
                                />
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex justify-between">
                            <ButtonField onClick={onClose} icon={<ArrowLeft className="mr-2 h-4 w-4"/>}>
                                Отмена
                            </ButtonField>
                            <ButtonField onClick={handleSubmit} icon={<Save className="mr-2 h-4 w-4"/>} primary>
                                Сохранить
                            </ButtonField>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MarkerFormModal;
