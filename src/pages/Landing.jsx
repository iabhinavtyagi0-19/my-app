 import {useState,useEffect} from "react";
 import {Link,useNavigate} from "react-router-dom";
 import './Landing.css';
 import l1 from "../assets/landinglogo.jpeg";
 export default function Landing(){

   const navigate = useNavigate();
     useEffect(() => {
         const timer = setTimeout(() => {
             navigate("/signup");
         }, 2500);

         return () => clearTimeout(timer);
     }, [navigate]);

     return (
        <div className="min-h-full bg-white">


            <div className='text-center bg-white justify-center lg:ml-[700px] items-center mt-36 ml-24'>
                <img className='mix-blend-multiply w-52 lg:w-[500px]' src={l1}  alt=""/>
            </div>


        </div>
    )
}

