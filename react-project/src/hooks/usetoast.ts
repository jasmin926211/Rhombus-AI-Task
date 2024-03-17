import { toast, ToastOptions } from "react-toastify";

export const useToast = () => {
  const showToast = (message: string, options?: ToastOptions) => {
    toast(message, options);
  };

  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warn(message, options);
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, options);
  };

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
