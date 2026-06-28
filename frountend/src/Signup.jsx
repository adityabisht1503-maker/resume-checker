import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import api from "./api";
import Loader from "./Loader";


const Signup = () => {

  const [showOtp, setShowOtp] = useState(false);
const [otp, setOtp] = useState("");
const [loading, setLoading] = useState(false);

  const swan = ()=>{
    Swal.fire({
  title: "Sign up Successfull",
  icon: "success",
  draggable: true
});
  }
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  setLoading(true);

    try {
      const res = await api.post("/api/auth/signup", form);

      // Assuming API returns success with status or message
      if (res.data?.status === 1 || res.data?.message === "Signup successful") {
        toast.success("otp sent successfully")
         
        setShowOtp(true); //
      } else {
        toast.error(res.data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);

      // Check for duplicate email or other API errors
      if (error.response?.status === 409) {
        toast.error("Email already exists. Please use another email or login.");
      } else {
        toast.error(error.response?.data?.message || "Signup failed.");
      }
    }
    finally{
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
      swan()
      navigate("/login");
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

      {!showOtp ? (
        <>
          <h3 className="text-center mb-4">Create Account</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={handleChange}
                required
              />
            </div>

           <button className="btn btn-success w-100" disabled={loading}>
  {loading ? "Creating account..." : "Sign Up"}
</button>

{loading && <Loader />}


          </form>
        </>
      ) : (
        <>
          <h3 className="text-center mb-4">Verify OTP</h3>

          <form onSubmit={handleOtpSubmit}>
            <div className="mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                required
              />
            </div>

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

};

export default Signup;
