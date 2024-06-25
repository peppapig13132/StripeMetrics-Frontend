import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center align-center px-4">
      <div className="relative">
        <img className="xl:w-[36px] w-[24px] xl:h-[36px] h-[24px] absolute xl:right-[-40px] right-[-30px] xl:top-[-20px] top-[-12px]" src="assets/img/stripe-round-logo.png" alt="Stripe" />
        <h1 className="xl:text-7xl text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 drop-shadow-lg shadow-slate-500">StripeMetrics</h1>
      </div>
      <div className='py-16 flex flex-row space-x-2'>
        <Link to="/signup">
          <button className='bg-white hover:bg-indigo-500 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-indigo-500 hover:text-white border border-indigo-500 hover:border-indigo-500 w-32'>
            Sign up
          </button>
        </Link>
        <Link to="/login">
          <button className='bg-indigo-500 hover:bg-indigo-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white border border-indigo-500 hover:border-indigo-700 w-32'>
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
}