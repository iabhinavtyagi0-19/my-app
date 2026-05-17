import {useParams,useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './SellerInfo.css';
export default function SellerInfo() {
    const [seller, setSeller] = useState(null);
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const maskedEmail = seller?.email?.replace(/(.{3}).+(@.+)/, "$1***$2");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:4500/api/seller/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();
            console.log(data);

            setSeller(data.sellerInfo);


        }

        fetchData();

    }, [id]);

    if (!seller)
        return (
            <div className="border rounded-xl p-4 w-72 text-center mt-24 ml-16">
                <Skeleton height={30} width={200} />

                <div className="mt-3">
                    <Skeleton height={20} width={100} />
                </div>

                <div className="mt-4">
                    <Skeleton count={3} />
                </div>

                <div className="mt-5">
                    <Skeleton height={40} width={120} />
                </div>
            </div>
        );
    return (
        <div className="container1">
            <button className='btnlp'  onClick={()=>navigate(-1)}>Back </button>
            <div className="container2">
                <h1> Seller Information</h1>
                <p>UserName </p>
                <h2> {seller.username}</h2>
                <p>Contact Email </p>
                <h2> {maskedEmail}</h2>
                <p>Join Date </p>
                <h2>{new Date(seller?.createdAt).toLocaleDateString()}</h2>
            </div>

        </div>
    );
}