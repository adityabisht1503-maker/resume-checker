import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  
  
   const{isLoggedIn,user}=useSelector((state)=>state.auth)
  return isLoggedIn ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
