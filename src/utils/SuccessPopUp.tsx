import { toast } from 'react-toastify';

export const successNotify = (message: string) =>
  toast.success(`${message}`, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
