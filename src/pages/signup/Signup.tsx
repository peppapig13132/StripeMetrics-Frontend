import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { signup } from '../../services/authService';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passcheck, setPasscheck] = useState<string>('');

  const handleSignup = async () => {
    if(password !== passcheck) {
      toast("Password doesn't match!", {
        icon: '👀',
      });
      return;
    }
    const response = await signup(email, password);
    
    if(response.ok) {
      toast.success("Thank you!");
      setTimeout(()=>{navigate("/login")}, 1500);
    } else {
      toast.error("Creating new account failed!");
    }
  }

  return(
    <>
      <div className="flex flex-col items-center justify-center px-4 py-40">
        <h2 className="text-center text-gray-900 text-3xl md:text-4xl">Welcome!</h2>

        <div className="py-8 w-[280px]">
          <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full my-3 px-2 py-2 block bg-white border shadow-sm border-teal-500 placehoder-slate-400 focus:border-teal-500 focus:ring-offset-1 focus:rign-offset-slate-100 focus:ring-4 focus:ring-slate-200 rounded-md sm:text-sm" />
          
          <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full my-3 px-2 py-2 block bg-white border shadow-sm border-teal-500 placehoder-slate-400 focus:border-teal-500 focus:ring-offset-1 focus:rign-offset-slate-100 focus:ring-4 focus:ring-slate-200 rounded-md sm:text-sm" />
          
          <input name="passCheck" type="password" value={passcheck} onChange={(e) => setPasscheck(e.target.value)} onKeyUp={(e) => (e.key === "Enter" ? handleSignup() : null)} placeholder="Confirm password" className="w-full my-3 px-2 py-2 block bg-white border shadow-sm border-teal-500 placehoder-slate-400 focus:border-teal-500 focus:ring-offset-1 focus:rign-offset-slate-100 focus:ring-4 focus:ring-slate-200 rounded-md sm:text-sm" />
          
          <button className="bg-teal-500 hover:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white w-full" onClick={handleSignup}>Sign up</button>

          <p className="w-full mt-4 px-1 text-end">
            <Link to="/login">🔑 Log in</Link>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  )
}