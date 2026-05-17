import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // ❌ No token → stop loading immediately
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        axios.get("http://localhost:4500/account", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUser(res.data); // ✅ set user from backend
            })
            .catch((err) => {
                console.log("Auth error:", err);
                setUser(null);
                localStorage.removeItem("token"); // safety cleanup
            })
            .finally(() => {
                setLoading(false); // always stop loader
            });

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}