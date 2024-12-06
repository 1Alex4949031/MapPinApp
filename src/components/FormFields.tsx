import React from 'react';

export const InputField: React.FC<{
    id: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
}> = ({id, value, onChange, placeholder}) => (
    <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            Наименование
        </label>
        <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

export const TextareaField: React.FC<{
    id: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    placeholder: string;
}> = ({id, value, onChange, placeholder}) => (
    <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            Описание
        </label>
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

export const ButtonField: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    icon?: React.ReactNode;
    children: React.ReactNode;
    primary?: boolean;
    danger?: boolean;
}> = ({onClick, icon, children, primary, danger}) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium 
            ${primary ? 'text-white bg-blue-600 hover:bg-blue-700' :
            danger ? 'text-white bg-red-600 hover:bg-red-700' :
                'text-gray-700 bg-white hover:bg-gray-50'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
        {icon}
        {children}
    </button>
);
