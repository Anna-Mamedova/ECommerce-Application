import { toast } from 'react-toastify';

export const errorNotify = (error: string) =>
  toast.error(`${error}`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
