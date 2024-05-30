import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center align-center px-4">
      <div>
        <img src="assets/img/CommenterAiLogo.png" alt="Commenter.ai Logo" />
      </div>
      <div className='py-16 flex flex-row space-x-2'>
        <Link to="/signup">
          <button className='bg-white hover:bg-teal-500 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-teal-500 hover:text-white border border-teal-500 hover:border-teal-500 w-32'>
            Sign up
          </button>
        </Link>
        <Link to="/login">
          <button className='bg-teal-500 hover:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white border border-teal-500 hover:border-teal-700 w-32'>
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
}