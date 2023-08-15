import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Input from './reusableComponents/input';
import { useAppDispatch } from "../store/hooks";
import { showErrorToast } from "../utility/toast";
import { vendorLogin } from '../slices/vendorSlice';

const VendorLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogin = async () => {
       try{
        setLoading(true);

			// if (formValid && email.trim() !== "" && password.trim() !== "") {
			// 	showErrorToast("Please enter your details correctly.");
			// 	return;
			// }
			const payload = {
				email,
				password,
			};

            await dispatch(vendorLogin(payload)).unwrap()

            setEmail("");
			setPassword("");
			setPasswordValidation(false);
			setFormValid(false);
			setLoading(false);

            // setTimeout(() => {
            //     navigate("/vendordashboard");
            //   }, 2000)            
        navigate('/vendorsFood');
       }catch (error: any) {
        setLoading(false);
        if (error.response) {
            showErrorToast(error.response.data.message);
        } else if (error.request) {
            showErrorToast("Internal Server Error");
        } else {
            showErrorToast(`Error, ${error.message}`);
        }
    }
    };

    return (
        <>
        {/* <Header/> */}
         <div className="flex justify-center items-center h-screen bg-edf0eb px-4"> 
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Vendor Login</h2>
                <div className="mb-4">
                    {/* <label htmlFor="email" className="block font-medium">
                        Email
                    </label> */}
                    <Input
                        type="text"
                        name = "email"
                        placeholder="Enter email"
                        id="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    {/* <label htmlFor="password" className="block font-medium">
                        Password
                    </label> */}
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        id="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="w-full p-2 bg-deepBlue text-white rounded-xl"
                    onClick={handleLogin}
                    // disabled={!formValid || loading}
                >
                    {loading ? 'loading...' : "Vendor Login"}
                    {/* {loading ? "Loading" : "Vendor Login"} */}
                </button>
                <p className="text-black text-center mt-4">
                    Don't have an account?{' '}
                    <RouterLink to="/verifyVendor" className="text-green-800 font-bold">
                      Sign up as a Vendor
                    </RouterLink>
                </p>
            </div>
        </div>
        </>
       
    );
};

export default VendorLoginForm;
