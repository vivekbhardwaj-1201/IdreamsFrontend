import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import classes from  './Toast.module.css';

const Toast = () => {
	return (
		<>
			<ToastContainer position="top-right" 
				autoClose={2000} 
				hideProgressBar={false} 
				newestOnTop={false} 
				closeOnClick rtl={false} 
				theme = {'colored'}
				pauseOnFocusLoss draggable pauseOnHover 
			/>
		</>
	);
};
export default Toast;
