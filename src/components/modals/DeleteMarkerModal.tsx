import React from 'react';
import {ButtonField} from "../FormFields.tsx";
import {motion} from 'framer-motion'
import {ArrowLeft, Delete} from "lucide-react";
import {Marker} from "../../types/types.ts";

interface DeleteMarkerModalProps {
    marker: Marker;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteMarkerModal: React.FC<DeleteMarkerModalProps> = ({marker, onConfirm, onCancel}) => {
        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-2xl font-bold text-gray-900">Подтверждение удаления</h2>
                        </div>
                        <p className="text-gray-700">Вы действительно хотите удалить маркер - <strong>{marker.name}</strong>?
                        </p>
                        <div className="mt-4 flex justify-between">
                            <ButtonField onClick={onCancel} icon={<ArrowLeft className="mr-2 h-4 w-4"/>}>
                                Отмена
                            </ButtonField>

                            <ButtonField onClick={onConfirm} icon={<Delete className="mr-2 h-4 w-4"/>} danger>
                                Удалить
                            </ButtonField>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }
;

export default DeleteMarkerModal;
