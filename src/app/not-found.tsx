import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className='error-page'>
            <div className="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
            <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" />
            <p className="title">Oh no!!</p>
            <p className="subtitle">
                You're either misspelling the URL <br /> or requesting a page that's no longer here.
            </p>
            <div className='text-center'>
                <Link href="/" className='text-xl py-3 px-8 bg-[#884DEE] hover:bg-[#673ab5] rounded-md text-white'>Back to Home</Link>
            </div>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" />
            <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" />
        </div>
    );
};

export default NotFoundPage;
