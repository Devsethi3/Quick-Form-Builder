import Image from 'next/image';
import React from 'react';

const NotFound = () => {
    return (
        <div className='w-screen bg-[#fff] overflow-hidden text-black h-screen flex items-center flex-col justify-center gap-2'>
            <Image src="/images/404error.gif" width={800} height={800} alt='error' />
            {/* <p className='text-2xl font-semibold text-gray-500'>Sorry, the page you are looking for does not exist.</p> */}
        </div>
    );
};

export default NotFound;
