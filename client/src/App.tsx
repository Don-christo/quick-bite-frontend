import Home from "./pages/Home/Home"
import {Routes, Route} from  'react-router-dom'
import SignUp from "./pages/Auth/signUp"
import SignIn from "./pages/Auth/signIn"

function App() {
  

  return (
    <>
     <main>
      <Routes>
      <Route path='/' element = {<Home/>}></Route>
      <Route path='login' element = {<SignIn/>}></Route>     
      <Route path='/register' element = {<SignUp/>}></Route>
           
     </Routes>
     </main>

    </>
  )
}

export default App
