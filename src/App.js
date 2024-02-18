
import { useContextValue } from './Context/CustomContext';
import { createBrowserRouter , RouterProvider , Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
function App() {
  const {userData}=useContextValue();
  const router = createBrowserRouter([
    { path: '/', 
      element: <Navbar/>,
      children: [
        {index: true , element: userData ? <Home /> : <Navigate to="/signin" />,},
        {path: 'cart' , element: userData ? <Cart/> : <Navigate to='/'/>},
        {path: 'signin' , element: <Login/>},
      ]
    }
  ])

  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
