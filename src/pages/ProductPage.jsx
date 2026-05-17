import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate,Link} from "react-router-dom";
import './ProductPage.css'
import {AuthContext} from "../context/AuthContext.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../components/Card.jsx";
export default function ProductPage({image}) {
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const { user} = useContext(AuthContext);
    const [reason,setReason] = useState('');
    const token = localStorage.getItem("token");
    const [sId,setSId] = useState('');
    const seller  = user?.role === "seller";
    const [options,setOptions] = useState(false);
    const { id } = useParams();
    async function reportProduct() {

        const response = await fetch(`http://localhost:4500/api/report/product/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
                reason:reason,
            })
        })
        alert('You Report Successfully!');
        setOptions(false);
    }
    async  function addToWishlist(){

        const response = await fetch(`http://localhost:4500/api/wishlist/product/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${token}`,
            }

        })
        const data = await response.json();
        if (!response.ok) {
            alert(data.msg || "Error");
            return;
        }

        alert('Product Added To Wishlist');
        setOptions(false);

    }
    async function f()  {
        const response = await fetch(`http://localhost:4500/product/${id}`, {

            method: "PATCH",
            headers: {
                authorization: `bearer ${token}`,
            },
            body: JSON.stringify({

            })
        })







        navigate('/home')
    }
    async function orderPlaced() {

        const yes = confirm("Do You Really want Buy this Product ?");

        if (yes) {
            alert("Order Placed !!");
            await f();
        }
    }
    useEffect(() => {
        async function getProducts() {
            const details = await fetch(`http://localhost:4500/product/${id}`);
            const data = await details.json();
            setProduct(data);
            if (data?.user) {
                setSId(data.user._id || data.user);
            }
        }

        getProducts();
    },[id])
    return <div>

        <div className="btn-div">
            <button  className=' bg-black w-12 text-white' onClick={()=>navigate('/home')}> ❮ </button>
        </div>
        {product?(     <div class="rounded-lg bg-white shadow-lg mt-[10%] h-[40%] w-[80%] ml-[10%] relative p-[5%] text-center">
                <div className='lg:text-left lg:font-bold lg:w-4 text-left'> <h4 onClick={()=>setOptions(prev=>!prev)}>⋮</h4></div>

                <div style={{marginLeft:"15%",display:"flex"}}>       Listed Date :   <p style={{color:"lightgreen",marginLeft:'8px'}}> {new Date(product?.createdAt).toLocaleDateString()}</p></div>
                <hr/>
                {options && (
                    <div className="wishlist">
                        <div className="opt-div">

                               <button className="wishlist-btn" onClick={addToWishlist}>
                                   <p className='p-wishlist'>❤ ADD TO WISHLIST</p>
                            </button>

                            <label>
                                <input
                                    type="radio"
                                    name="report"
                                    value="Fake Product"
                                    onChange={(e) => setReason(e.target.value)}
                                />
                                Fake Product
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="report"
                                    value="Inappropriate Content"
                                    onChange={(e) => setReason(e.target.value)}
                                />
                                Inappropriate Content
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="report"
                                    value="Scam"
                                    onChange={(e) => setReason(e.target.value)}
                                />
                                   Scam
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="report"
                                    value="Duplicate Listing"
                                    onChange={(e) => setReason(e.target.value)}
                                />
                                Duplicate Listing
                            </label>

                            <button className="report-btn" onClick={reportProduct}>
                                Report
                            </button>
                            <p>     <Link className='seller-profile-link' to={`/seller/${sId}`}  > See Seller's Profile </Link> </p>
                            <br/>

                        </div>
                    </div>
                )}
                <div className='lg:w-1/3 '>
                    <img src={product?.images?.[0]?.url} alt="product-img"/>
                </div>

                <hr/>
                <div className=' border-2 lg:mt-28 mt-8 rounded-xl p-2 border-gray-200'>
                    <h3 className=' font-bold '>Description</h3>
                    <div>
                        {product?.productDescription}
                    </div>




                </div>

                <br/>{seller?(<p>A seller  cant Buy Products In Order To Buy Please Continue As Buyer </p>):(  <button className='buy-btn' onClick={orderPlaced}> Place Order </button>)}
            </div>

        ):(<p className='text-center mt-20'> <div>
            <div className='w-2/3 ml-20' >
                <Skeleton height={360} />
            </div>

            {/* Text skeleton */}
            <div className='mt-12 gap-2'>
                <Skeleton height={30} width={120} />
                <Skeleton count={2} width={360} />
            </div>
        </div><img src="" style={{width:'20%'}} alt="loading"/></p>)}



    </div>
}