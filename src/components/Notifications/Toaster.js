import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}
