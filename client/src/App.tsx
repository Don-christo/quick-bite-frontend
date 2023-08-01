import Home from "./pages/Home/Home"
import { Routes, Route } from 'react-router-dom'
import SignUp from "./pages/Auth/signUp"
import SignIn from "./pages/Auth/signIn"
import FoodPage from "./pages/FoodPage"
import SingleVendor from "./pages/SingleVendor"
import VendorSignupForm from "./components/vendorSignUp"
import VendorLoginForm from "./components/vendorLogin"
import VendorRegNO from "./components/vendorVerifyForm"
import VendorPassword from "./components/vendorPassword"
import OtpVerificationPage from "./pages/OtpVerificationPage"
import Footer from "./components/Footer"

function App() {


  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='login' element={<SignIn />}></Route>
          <Route path='/register' element={<SignUp />}></Route>
          <Route path='/' element={<VendorPassword />}></Route>
          <Route path='/' element={<VendorLoginForm/>}></Route>
          <Route path='/' element={<VendorSignupForm/>}></Route>
          <Route path='/' element={<VendorRegNO />}></Route>
          <Route path='/' element={<SingleVendor/>}></Route>
          <Route path='/' element={<FoodPage />}></Route>
          <Route path='/otp' element={<OtpVerificationPage />}></Route>
        </Routes>
        <Footer/>
      </main>

    </>
  )
}

export default App
