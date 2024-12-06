import React from 'react';


const Loader: React.FC = () => {
    return (
        <div
            className="absolute right-10 inline-block h-6 w-6 top-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Загрузка...
            </span>
        </div>
    )
};

export default Loader;
