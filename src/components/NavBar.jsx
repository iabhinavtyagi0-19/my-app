import {Link} from 'react-router-dom'
// import  './Nav.css'
import {useState} from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "./Header.jsx";
import logo from "../assets/hobo.jpeg";

import newlogo from "../assets/newlogo.jpeg"
import add from "../assets/add.jpeg"
import contact from "../assets/contact.jpeg";
import account from "../assets/account.jpeg";
import about from "../assets/about.jpeg";

export  default function NavBar(){

    const { user} = useContext(AuthContext);
    const seller  = user?.role === "seller";

    return ( <div>
        <nav className="bg-[#2C2C2C] text-white flex items-center justify-between px-4 py-2 w-full">

            {/* Logo */}
            <img src={newlogo} alt="logo" className="lg:w-[200px] w-[120px]" />

            {/* Links */}
            <div className="flex items-center gap-4 lg:gap-10">

                <Link to="/account" className="flex flex-col items-center text-sm">
                    <img src={account} className="w-6" alt="account" />
                    Account
                </Link>

                {seller && (
                    <Link to="/addProduct" className="flex flex-col items-center text-sm">
                        <img src={add} className="w-6" alt="add-product" />
                        Product
                    </Link>
                )}

                <Link to="/about" className="flex flex-col items-center text-sm">
                    <img src={about} className="w-6" alt="about" />
                    About
                </Link>

                <Link to="/contact" className="flex flex-col items-center text-sm">
                    <img src={contact} className="w-6" alt="contact" />
                    Contact
                </Link>

            </div>
        </nav>
    </div>)
}