import React from 'react';

export default function InputLabel({ forInput, value, className, children, required = true }) {
    return (
        <label htmlFor={forInput} className={required ? className + 'block font-medium text-sm text-gray-700 required-label' : className + 'block font-medium text-sm text-gray-700'}>
            {value ? value : children}
        </label>
    );
}
