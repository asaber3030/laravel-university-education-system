import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import StudentImage from '@/assets/images/student.svg'

export default function Guest({ children }) {
    return (
      <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
        <img src={StudentImage} alt="" style={{ width: 70, marginBottom: 10 }} />
        <h1 className="font-semibold fs-2">Login as Student!</h1>
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          {children}
        </div>
      </div>
    );
}
