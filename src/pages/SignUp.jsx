// import './SignUP.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";

export default function SignUp() {
    const { user, setUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');

    async function goHome() {
        navigate('/home');
    }

    async function signUp(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:4500/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                role,
                address,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setErrors(data.errors);
            return;
        }

        localStorage.setItem("token", data.token);
        setUser(data.user);
        await goHome();
    }

    return (
        <div>
            <div className=" justify-content-center text-center mt-40">

                <div>
                    {errors && errors.map((error, index) => (
                        <div key={index} style={{ color: "red" }}>
                            {error.msg}
                        </div>
                    ))}
                </div>

                <form className=' w-3/4 md:w-1/2 lg:w-1/3 bg-white p-6 rounded-xl shadow-xl ml-[60px] lg:ml-[630px]' onSubmit={signUp}>

                    <input className='border-2 rounded mt-2 border-black  active:bg-sky-200  active:border-purple-400 active:text-purple-600 ' type="text" placeholder=" Enter Your Username"
                           onChange={(e) => setUsername(e.target.value)} />
                    <br />

                    <input className='border-2 rounded mt-2 border-black  active:bg-sky-200  active:border-purple-400 active:text-purple-600 ' type='email' placeholder=' Enter Your Email'
                           onChange={(e) => setEmail(e.target.value)} />
                    <br />

                    <input className='border-2 rounded mt-2 border-black  active:bg-sky-200  active:border-purple-400 active:text-purple-600  ' type="password" placeholder=" Create Your Password"
                           onChange={(e) => setPassword(e.target.value)} />
                    <br />

                    <input className='border-2 rounded mt-2 border-black  active:bg-sky-200  active:border-purple-400 active:text-purple-600 ' type="text" placeholder=" Give Your Address"
                           onChange={(e) => setAddress(e.target.value)} />
                    <br />

                    <label className='mr-2  '>
                        <input


                            type="radio"
                            name="role"
                            value="seller"
                            checked={role === 'seller'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Seller
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="Buyer"
                            checked={role === 'Buyer'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Buyer
                    </label>

                    <br />

                    <p>
                        Already Have Account then <Link className='text-purple-700' to={'/login'}>Login</Link>
                    </p>

                    <br />

                    <button className=' ml-4  hover:bg-sky-500 rounded bg-[#06478d] text-white font-bold p-1' type="submit">
                        Create Your Account
                    </button>

                </form>
            </div>

            <div className="terms">
                 <button onClick={()=>navigate('/test')}>Test</button>
                <p>
                    <input type="checkbox" /> By creating an account, you agree to our Terms and Conditions,
                    Privacy Policy, and acceptable use guidelines. Users are responsible for maintaining
                    account security and providing accurate information during registration and use.
                </p>
            </div>
        </div>
    );
}