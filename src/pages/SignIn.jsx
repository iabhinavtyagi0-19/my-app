import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4500/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors(data.errors || []);
                return;
            }

            setUser(data.user);
            localStorage.setItem("token", data.token);

            navigate('/home');

        } catch (err) {
            setErrors([{ msg: "Something went wrong. Try again." }]);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="w-[320px] lg:w-[400px] p-6 shadow-xl bg-white rounded-lg text-center">

                <form onSubmit={handleSubmit} className="flex flex-col">

                    {/* Errors */}
                    <div>
                        {errors.map((error, index) => (
                            <div key={index} className="text-red-500 font-bold mb-2">
                                {error.msg} !
                            </div>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="font-bold text-xl mb-4">
                        Welcome back 👋
                    </h2>

                    {/* Email */}
                    <input
                        className="border-2 border-black mt-3 p-2 rounded"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password */}
                    <input
                        className="border-2 border-black mt-3 p-2 rounded"
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="font-bold bg-[#06478d] mt-4 text-white hover:bg-sky-500 p-2 rounded"
                    >
                        Sign In
                    </button>

                </form>

                {/* Sign up link */}
                <p className="mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link className="text-blue-800 font-medium" to="/signUp">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}