import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "./store/authslice";
import { FaRegCircleUser } from "react-icons/fa6";
import Swal from "sweetalert2";


const Header = () => {
  const navigate = useNavigate()
  const handleswan=()=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You really wants to logout",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes,Logout!"
}).then((result) => {
  if (result.isConfirmed) {
      localStorage.removeItem('token');
  localStorage.removeItem('user');
    dispatch(logout());
    Swal.fire({
      
      text: "Logout successfully",
      icon: "success",
      
    });
    navigate ("/home")
  }
});
  }


   
  
   const dispatch = useDispatch()
   const {isLoggedIn,user,plan}= useSelector((state)=>state.auth)
   


   const handleLogout = () => {
  
      handleswan()
  
};

console.log(plan);




  return (
    <header className="shadow-sm" style={{
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
}}>
  <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-between py-3">
      
      {/* Navigation links */}
      <nav className="d-flex align-items-center gap-1">
        <NavLink 
          to="/home" 
          className={({ isActive }) =>
            `nav-link px-4 py-2 rounded-pill ${
              isActive 
                ? 'bg-white text-dark fw-semibold' 
                : 'text-light'
            }`
          }
          style={{
            transition: 'all 0.3s ease',
            fontSize: '0.95rem',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => {
            if (!e.target.classList.contains('bg-white')) {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.classList.contains('bg-white')) {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          Home
        </NavLink>
        <NavLink 
          to="/faq" 
          className={({ isActive }) =>
            `nav-link px-4 py-2 rounded-pill ${
              isActive 
                ? 'bg-white text-dark fw-semibold' 
                : 'text-light'
            }`
          }
          style={{
            transition: 'all 0.3s ease',
            fontSize: '0.95rem',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => {
            if (!e.target.classList.contains('bg-white')) {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.classList.contains('bg-white')) {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          FAQs
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) =>
            `nav-link px-4 py-2 rounded-pill ${
              isActive 
                ? 'bg-white text-dark fw-semibold' 
                : 'text-light'
            }`
          }
          style={{
            transition: 'all 0.3s ease',
            fontSize: '0.95rem',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => {
            if (!e.target.classList.contains('bg-white')) {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.classList.contains('bg-white')) {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          About
        </NavLink>
      </nav>

      <div className="d-flex align-items-center gap-3">
        {/* Search bar */}
        <div className="position-relative">
          <svg 
            className="position-absolute text-muted" 
            style={{
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              pointerEvents: 'none'
            }}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <input
            type="search"
            className="form-control ps-5"
            placeholder="Search..."
            aria-label="Search"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '25px',
              padding: '8px 20px 8px 38px',
              fontSize: '0.9rem',
              minWidth: '250px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              e.target.style.backgroundColor = '#ffffff';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }}
          />
        </div>

        {/* Auth section */}
        <div>
          {isLoggedIn ? (
            <div className="d-flex gap-3 align-items-center">
              <div
  className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill position-relative"
  style={{
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
  }}
>
  <FaRegCircleUser size={24} className="text-light" />

  <span className="text-capitalize text-light fw-medium" style={{ fontSize: "0.95rem" }}>
    {user?.name}
  </span>

  {plan === "Pro" && (
    <span
      className="ms-2 px-2 py-1 rounded-pill"
      style={{
        background: "linear-gradient(135deg,#facc15,#f59e0b)",
        color: "#000",
        fontSize: "0.6rem",
        fontWeight: "700",
        letterSpacing: "0.5px",
      }}
    >
      PRO
    </span>
  )}
</div>

              <button
                type="button"
                className="btn btn-light rounded-pill px-4 py-2 fw-medium"
                onClick={handleLogout}
                style={{
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <NavLink to="/login">
                {({ isActive }) => (
                  <button 
                    type="button" 
                    className={`btn rounded-pill px-4 py-2 fw-medium ${
                      isActive 
                        ? 'btn-light text-dark' 
                        : 'btn-outline-light'
                    }`}
                    style={{
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      letterSpacing: '0.3px',
                      border: isActive ? 'none' : '1.5px solid rgba(255, 255, 255, 0.8)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    Login
                  </button>
                )}
              </NavLink>
              <NavLink to="/signup">
                {({ isActive }) => (
                  <button 
                    type="button" 
                    className={`btn rounded-pill px-4 py-2 fw-medium ${
                      isActive 
                        ? 'btn-light text-dark' 
                        : 'btn-outline-light'
                    }`}
                    style={{
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      letterSpacing: '0.3px',
                      border: isActive ? 'none' : '1.5px solid rgba(255, 255, 255, 0.8)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    Sign Up
                  </button>
                )}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</header>
  );
};

export default Header;
