import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CustomPageParams {
  title: string | '';
  description: string | '';
  time: number | 3000;
  redirectPath: string | '/';
  redirectPageTitle: string | 'Home';
}

export const CustomPage:React.FC<CustomPageParams> = ({title, description, time, redirectPath, redirectPageTitle}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if(prevTimeLeft < 1000) {
          clearInterval(intervalId);
          navigate(redirectPath);
          return 0;
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate, redirectPath]);

  return(
    <div className="w-full h-screen flex flex-col items-center justify-center align-center px-4">
      <h2 className="text-center text-gray-200 text-8xl md:text-12xl font-bold">{title}</h2>
      <p className="text-center text-gray-500 text-3xl md:text-4xl">{description}</p>
      <p className="text-center text-gray-500 text-md">You'll be redirected to {redirectPageTitle} after {Math.floor(timeLeft / 1000)} seconds.</p>
    </div>
  );
}