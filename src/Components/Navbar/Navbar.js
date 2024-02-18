import React from 'react';
import { Link , Outlet , useNavigate , useLocation } from 'react-router-dom';
import { useContextValue } from '../../Context/CustomContext';
import Loader from '../Loader/Loader';
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
function Navbar() {
    const { userData , loading , setFilterQuery,signout} = useContextValue();
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor : '#e3f2fd'}}>
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 me-auto mb-lg-0">
                    {
                    userData && <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/"><FaHome style={{verticalAlign: 'initial'}}/> Home</Link>
                    </li>
                    }
                    {userData && <li className="nav-item">
                        <Link className="nav-link" to='/cart'><FaShoppingCart style={{verticalAlign: 'initial'}}/> Cart</Link>
                    </li>}
                </ul>
                {location.pathname === '/' && <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search by Name"
                        onChange={(e)=>{setFilterQuery(e.target.value)}}
                    />
                </form>}
                <button type="button" className="btn btn-sm btn-outline-success"
                onClick={()=> {
                    userData ? signout() : navigate('/signin')
                }}>
                    {userData ? 'Sign Out' : "Sign In"}
                </button>
            </div>
        </div>
    </nav>
    {loading ? <Loader/> : <Outlet/>}
    </>
  )
}

export default Navbar