import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import authslice, { login } from "./store/authslice";
import api from "./api";
import Loader from "./Loader";
import { Toast } from "bootstrap";
const Login = () => {

const [forget, setForget] = useState(false);

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
   const [change, setchange] = useState(false)
  const [showOtp, setShowOtp] = useState(false);
const [otp, setOtp] = useState("");
   const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [setGmail, setsetGmail] = useState("")

const showCustomUserToast = (userName) => {
 toast.success(
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  }}>
    {/* Success Icon with Background */}
    <div style={{
      backgroundColor: '#10b981',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
          fill="white"
        />
      </svg>
    </div>
    
    {/* Content */}
    <div style={{ flex: 1 }}>
      <div style={{ 
        fontWeight: '600', 
        fontSize: '15px',
        marginBottom: '2px',
        letterSpacing: '-0.01em'
      }}>
        Welcome  {userName}!
      </div>
      <div style={{ 
        fontSize: '13px',
        opacity: 0.7,
        lineHeight: '1.4'
      }}>
        You're all set to continue
      </div>
    </div>
  </div>,
  {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    closeButton: true,
    
    style: {
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#ffffff',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      borderRadius: '12px',
      padding: '16px',
      minWidth: '380px',
      backdropFilter: 'blur(10px)',
    },
    
    // Progress bar styling
    progressStyle: {
      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
      height: '3px',
    },
    
    // Icon styling
    icon: false, // We're using custom icon
  }
);
};

const [form, setform] = useState({
   
    email:"",
    password:"",
  })
     const {  email, password } = form;

     const changeinput = (e)=>{
           const{id,value}=e.target
           setform((prev)=>({
            ...prev,
            [id]:value,

           }))
     }
  const navigate = useNavigate();


 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/api/auth/login", form);

    // ✅ check if login is actually successful
    if (res.data?.status === 1 || res.data?.message === "Login successful") {
      console.log(res.data.Plan);
      
     
   localStorage.setItem('token',res.data.token)
   localStorage.setItem('user',JSON.stringify(res.data.user))
   localStorage.setItem('Plan',res.data.Plan)
      dispatch(login({
  user: res.data.user,
  plan: res.data.Plan,
}));

      showCustomUserToast(res.data.user.name);
        navigate("/Resume")

    } else {
      toast.error(res.data?.message || "Login failed");
    }

  } catch (error) {
    // ✅ this runs when login fails (e.g. wrong password, server error)
    console.error("Login error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Login failed.");
  }
};
const FindGmail = async (e) => {
  e.preventDefault();
  setLoading(true);
 setShowOtp(true)
  try {
    const res = await api.post("/api/auth/findgmail",{
    email : setGmail,
    });

    if (res.data?.status === 1) {
      setchange(true)
      toast.success("opt generated succesfully")
    } else {
      toast.error("No account found");
    }
  } catch (err) {
    toast.error("No account found");
  }
  finally{
    setLoading(false)
  }
};
const handleSetPassword = async (e) => {
  e.preventDefault();
     console.log("newpasword",newPassword);
          console.log("confirmpasword",confirmPassword);

     
  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const res = await api.post("/api/auth/reset-password", {
      

      email: setGmail, // or userId / token
      password: newPassword,
    });
    console.log("Reset email:", setGmail);
    console.log("new pass:", newPassword);

    if (res.data?.status === 1) {
      toast.success("Password changed successfully");
      setForget(false)
    } else {
      toast.error("Failed to reset password");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Error");
  } finally {
    setLoading(false);
  }
};
const handleOtpSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await api.post("/api/auth/verify-otp", {
      otp,
      email,
    });

    if (res.data?.status === 1) {
      toast.success("OTP Verified Successfully");
      
      setShowOtp(false)
    } else {
      toast.error("Invalid OTP");
    }
  } catch (err) {
    toast.error("OTP verification failed");
  }
  finally{
    setLoading(false)
  }
};


  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>

      {/* LOGIN */}
      {!forget && (
        <>
          <h3 className="text-center mb-4">Login</h3>
<form onSubmit={handleSubmit} method="POST" autoComplete="on">
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input
      type="email"
      className="form-control"
      id="email"
      name="username"                // ✅ REQUIRED
      value={email}
      onChange={changeinput}
      autoComplete="username"        // ✅ REQUIRED
      required
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      name="password"                // ✅ REQUIRED
      value={password}
      onChange={changeinput}
      autoComplete="current-password" // ✅ REQUIRED
      required
    />
  </div>

  <button type="submit" className="btn btn-primary w-100">
    Login
  </button>
</form>


          <div className="text-center mt-3">
            <small onClick={() => setForget(true)} style={{ cursor: "pointer" }}>
              Forget Password? <span className="text-primary">Click</span>
            </small>
          </div>
          
          <div className="text-center mt-2">
                <small>
                  Don't have an account?{" "}
                  <a href="/signup" className="text-decoration-none">
                    Sign Up
                  </a>
                </small>
              </div>
        </>
      )}

      {/* FIND ACCOUNT */}
      {forget && !change && (
        <>
          <h3 className="text-center mb-4">Find Account</h3>

          <form onSubmit={FindGmail}>
            <input
              className="form-control mb-3"
              placeholder="Enter Gmail"
              onChange={(e) => setsetGmail(e.target.value)}
              required
            />

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Finding..." : "Find"}
            </button>

            {loading && <Loader />}
          </form>
        </>
      )}

      {/* RESET PASSWORD */}
      {forget && change && !showOtp && (
        <>
          <h3 className="text-center mb-4">Create New Password</h3>

          <form onSubmit={handleSetPassword}>
            <input
              className="form-control mb-3"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>

            {loading && <Loader />}
          </form>
        </>
      )}

      {/* OTP */}
      {forget && change && showOtp && (
        <>
          <h3 className="text-center mb-4">Verify OTP</h3>

          <form onSubmit={handleOtpSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {loading && <Loader />}
          </form>
        </>
      )}

    </div>
  </div>
);
}

export default Login;
