import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../Firebase/firebase'
import { doc, setDoc } from "firebase/firestore"
import "../../tailwind.css"


export default function SignUpForm() {

  const [name, setName] = useState("")
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();

  const displayErrors = (name, username, email, password, confirmpassword) => {
    let status = false;
    let emailRegex = /^\S+@\S+\.\S+$/;
    if (name == '') {
      toast.error(" Name is a Mandatory Field !", {
        position: "top-right"
      });
      status = true;
    }
    if (username == '') {
      toast.error(" Username is a Mandatory Field !", {
        position: "top-right"
      });
      status = true;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid mail !", {
        position: "top-right"
      });
      status = true;
    }
    if (password == '') {
      toast.error(" Password is a Mandatory Field !", {
        position: "top-right"
      });
      status = true;
    }
    if (confirmpassword == '') {
      toast.error("Confirm Password is a Mandatory Field !", {
        position: "top-right"
      });
      status = true;
    }
    if (password != confirmpassword) {
      toast.error("Password Mismatch !", {
        position: "top-right"
      });
      status = true;
    }
    return status;
  }

  const SigningUp = async (auth, email, password) => {
    if (!displayErrors(name, username, email, password, confirmpassword)) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username : {username},
          email: {email},
          id: userCredential.user.uid,
          blocked: [],
        });
        await setDoc(doc(db, "userchats", userCredential.user.uid), {
          chats: [],
        });
        toast.success("Account created successfully..", {
          position: "top-right"
        });
        navigate('/login');

      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          toast.error("Weak Password", {
            position: "top-right"
          });
        } else {
          toast.error(errorMessage, {
            position: "top-right"
          });
        }
      }
    }
  }

  return (
    <div className="bg-white px-10 py-4 rounded-3xl border-2 border-gray-200">
      <h1 className="text-5xl font-semibold">Sign Up</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Create your new account to get more out of BigBook</p>
      <div className="mt-4">
        <div>
          <label className="text-lg font-medium">Name</label>
          <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div>
          <label className="text-lg font-medium">Username</label>
          <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => { setUserName(e.target.value) }} />
        </div>
        <div>
          <label className="text-lg font-medium">Email ID</label>
          <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your Email ID"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div>
          <label className="text-lg font-medium">Password</label>
          <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div>
          <label className="text-lg font-medium">Confirm Password</label>
          <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
            value={confirmpassword}
            onChange={(e) => { setConfirmPassword(e.target.value) }} />
        </div>
        <div className="mt-4 flex flex-col gap-y-4">
          <button className="active:scale-[.98] active:duration-75 hover:scale[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
            onClick={() => { SigningUp(auth, email, password) }}>SignUp</button>
        </div>
        <div className="mt-3 flex justify-center items-center">
          <p className="font-medium text-base">Already have an account?</p>
          <Link to='/login'><button className="text-violet-500 text-base font-medium ml-2">Sign In</button></Link>
        </div>
      </div>
    </div>
  )
}
