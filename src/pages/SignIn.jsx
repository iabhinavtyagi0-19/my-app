import { useState } from 'react';
 // import './SignIn.css'
import {useNavigate,Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function SignIn() {
    const [email, setEmail] = useState('');
    const {setUser} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const  navigate = useNavigate();

    async  function goHome() {
         navigate('/home');
    }
    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:4500/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();
        console.log(data);
        if(!response.ok){
            setErrors(data.errors || []);
            return;

        }
        setUser(data.user);
        localStorage.setItem("token", data.token);
        await goHome();

    }
    return (
        <div className= "  justify-content-center text-center mt-[320px] lg:mt-[400px] w-[300px] ml-[60px] lg:ml-[800px] lg:w-[400px]  p-4 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="login-errors">
                    {errors.map((error, index) => (
                        <div key={index} className="text-red-500 font-bold ">
                            {error.msg} !
                        </div>
                    ))}
                </div>
                <div><h2 className='font-bold '>Welcome back 👋</h2></div>

                <input
                    className="border-2 border-black mt-[20px] "
                    type="email"
                    placeholder=" Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border-2 border-black mt-[20px]"
                    type="password"
                    placeholder=" Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="font-bold  bg-[#06478d] mt-4 text-white hover:bg-sky-500  p-1 rounded ">
                    Sign In
                </button>

            </form>
            <p className='mt-16'>Don’t have an account?  <Link className='text-blue-800 font-thin' to ='/signUp'>Sign Up </Link></p>
        </div>
    );

}