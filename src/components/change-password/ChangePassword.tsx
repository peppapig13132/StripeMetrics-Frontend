import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { changePassword } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { setAuthToken } from '../../utils/setAuthToken';

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: (arg: boolean) => void;
}
export const ChangePassword: React.FC<ChangePasswordProps> = ({isOpen, onClose}) => {
  const [isOpend, setIsOpened] = useState(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passCheck, setPassCheck] = useState<string>('');

  const { token, user } = useAuth();

  useEffect(() => {
    setAuthToken(token);
    setIsOpened(isOpen);
  }, [token, isOpen]);

  const handleCloseModal = () => {
    setIsOpened(false);
    onClose(false);
  }

  const handleUpdate = async () => {
    if(password !== passCheck) {
      toast("New password doesn't match!", {
        icon: '👀',
      });
      return;
    }

    const response = await changePassword(user?.email ? user.email : '', oldPassword, password);
    
    if(response.ok) {
      console.log(response);
      switch(response.msg) {
        case 'updated':
          toast.success("Password updated!");
          handleCloseModal();
          break;
        case 'incorrect old password':
          toast.error("Invalid current password");
          break;
        default:
          toast.error("Invalid current password");
          break;
      }
    } else {
      toast.error("Update password failed!");
    }
  }

  return(
    <>
      <div className={`fixed z-50 inset-0 overflow-y-auto duration-500 ${
        isOpend ? "" : "hidden"
      }`}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" onClick={handleCloseModal}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-3">
                  Update password
                </h3>
                
                <label htmlFor="currentPassword" className="text-sm mt-3 mb-0">Current password</label>
                <input name="currPassword" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full mb-3 px-2 py-2 block bg-white border shadow-sm border-teal-500 placehoder-slate-400 focus:border-teal-500 focus:ring-offset-1 focus:rign-offset-slate-100 focus:ring-4 focus:ring-slate-200 rounded-md sm:text-sm" />
                
                <label htmlFor="password" className="text-sm mt-3 mb-0">New password</label>
                <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-3 px-2 py-2 block bg-white border shadow-sm border-teal-500 placehoder-slate-400 focus:border-teal-500 focus:ring-offset-1 focus:rign-offset-slate-100 focus:ring-4 focus:ring-slate-200 rounded-md sm:text-sm" />
                
                <label htmlFor="passCheck" className="text-sm mt-3 mb-0">Type new password again</label>
                <input name="passCheck" type="password" value={passCheck} onChange={(e) => setPassCheck(e.target.value)} onKeyUp={(e) => (e.key === "Enter" ? handleUpdate() : null)} className="w-full mb-3 px-2 py-2 block bg-white border shadow-sm border-teal-500 placehoder-slate-400 focus:border-teal-500 focus:ring-offset-1 focus:rign-offset-slate-100 focus:ring-4 focus:ring-slate-200 rounded-md sm:text-sm" />
              </div>
            </div>
            <div className="mt-6 sm:mt-4 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  className="bg-teal-500 hover:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white w-full"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}