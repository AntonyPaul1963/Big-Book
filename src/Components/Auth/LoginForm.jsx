import "../../tailwind.css"
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { auth } from "../../Firebase/firebase"
import {signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

export default function LoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const displayErrors = (errorCode) => {
    if (errorCode === "auth/invalid-email") {
      toast.error("Invalid Email!", {
        position: "top-right"
      });
    }
    else if (errorCode === "auth/invalid-password") {
      toast.error("Invalid Password!", {
        position: "top-right"
      });
    }
    else if (errorCode === "auth/invalid-login-credentials") {
      toast.error("Invalid Login Credentials!", {
        position: "top-right"
      });
    }
    else {
      toast.error(errorCode, {
        position: "top-left"
      });
    }
  }

  return (
    <div className="bg-white px-10 py-10 rounded-3xl border-2 border-gray-200">
      <h1 className="text-5xl font-semibold">Welcome Back..</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Welcome back !! Please enter your details</p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Password</label>
          <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="font-medium text-base text-violet-500">Forgot Password</button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-[.98] active:duration-75 hover:scale[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
            onClick={() => {
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  toast.success("Sign In Successful", {
                    position: "top-right"
                  });
                  navigate('/user');
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                  displayErrors(errorCode);
                });
            }}
          >Sign in</button>
          <div className="mt-4 flex justify-center items-center">
            <p className="font-medium text-base">Don{"'"}t have an account?</p>
            <Link to='/signup'><button className="text-violet-500 text-base font-medium ml-2">Sign Up</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}


