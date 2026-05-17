import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./Account.css";
import Skeleton from "react-loading-skeleton";

export default function Account() {
    const { user ,setUser } = useContext(AuthContext);
    const [showAcc,setShowAcc] = useState(false);
    const [editInfo, setEditInfo] = useState(false);
    const [accInfo, setAccInfo] = useState(false);
    const [orderInfo, setOrderInfo] = useState(false);
    const [newAddress, setNewAddress] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [othersOptions, setOthersOptions] = useState(false);

    const [editNameState, setEditNameState] = useState(false);
    const[updatedRole ,setUpdateRole] = useState('');
    const navigate = useNavigate();
    const [showWishlist, setShowWishlist] = useState(false);
    const [wishList, setWishList] = useState([]);
    const token = localStorage.getItem("token");

    const [myProduct, setMyProduct] = useState([]);
    const [myOrder, setMyOrder] = useState([]);
    const [updateProduct, setUpdateProduct] = useState(false);
    const [updateProductName, setUpdateProductName] = useState('');
    const [updateProductPrice, setUpdateProductPrice] = useState(0);
    useEffect(() => {
        console.log("othersOptions:", othersOptions);
    }, [othersOptions]);
    async function deleteAcc(){
        alert('delete Account btn clicked ');
        const response = await fetch(`http://localhost:4500/api/del/user`,{
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`

            }
        });
        localStorage.removeItem("token");
        setUser(null);


        setOthersOptions(false);



        navigate('/signUp');
    }
    async function updateInfo() {
        const response = await fetch(`http://localhost:4500/api/updateInfo`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                updatedRole: updatedRole,
            })
        });

        const data = await response.json();

        setUser(prev => ({
            ...prev,
            role: data.updated.role
        }));

        alert('Change Saved Successfully!');
        setEditInfo(false);
    }


    async function updateProductFunction(pId) {

        try {

            const response = await fetch(`http://localhost:4500/api/updateProduct/${pId}`, {
                method: 'PATCH',
                headers: {
                    authorization: `bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    updateProductName,
                    updateProductPrice
                })
            });

            if (!response.ok) {
                alert("Update failed");
                return;
            }

            const data = await response.json();

            if (data.success) {
                setMyProduct(prev =>
                    prev.map(p =>
                        p._id === data.product._id ? data.product : p
                    )
                );

               setUpdateProduct(false);
            }
        } catch (err) {
            console.log(err);
            alert("Server error");
        }
    }

    async function removeWishList(id){
        const response = await  fetch (`http://localhost:4500/api/user/remove/wishlist/${id}`,{
            method: 'POST',
            headers: {
                authorization: `bearer ${token}`,

            }
        })

        alert('   Wishlist item  has been  Removed successfully !')


    }
    async function showWishList() {
        const response = await fetch('http://localhost:4500/api/user/wishlist',{
            headers: {
                authorization: `bearer ${token}`,
            }
        })
        const data = await response.json();
        setWishList(data.wishlist || []);
    }

    async function editName(){
        const response = await fetch('http://localhost:4500/api/user/updateName', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
                newUserName: newUserName,
            })
        })

        const data = await response.json();

        setUser(prev => ({
            ...prev,
            username: data.user?.username
        }));

        setEditNameState(false);
    }



    async function cancel(id) {
        try {
            const response = await fetch(`http://localhost:4500/api/cancel/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    newStatus: "cancelled",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.msg);
                return;
            }

            setMyOrder((prev) =>
                prev.filter((order) => order._id !== id)
            );
        } catch (err) {
            console.error(err);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    useEffect(() => {
        if (!token) return;

        async function fetchMyProducts() {
            const res = await fetch(`http://localhost:4500/myProducts/seller`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }


            );

            const r = await res.json();
            setMyProduct(r.userProduct || []);
        }

        fetchMyProducts();
    }, [token]);

    useEffect(() => {
        if (!token) return;

        async function fetchMyOrders() {
            const res = await fetch(`http://localhost:4500/myProducts/buyer`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const r = await res.json();

            setMyOrder(
                (r.buyerData || []).filter((order) => order.status === "confirmed")
            );
        }

        fetchMyOrders();
    }, [token]);

    if (!token) return <Navigate to="/login" />;
    if (!user) return <div className='text-center mt-12'>
        <Skeleton className='mb-4' width={60}/>
        <Skeleton className='mt-4' count={3} width={360} />
         <p className='text-center mt-28 font-thin font-mono'>User Data Fetching .....</p>

    </div>;

    const seller = user?.role === "seller";

    return (
        <div className="bg-[EFEFEF] min-h-screen">
            <button className='ml-2'
                onClick={() => {

                    setOthersOptions(prev => !prev);
                }}

            >
                ☰
            </button>

            {othersOptions && (
                <div className="fixed top-12 left-2 z-[9999] flex flex-col w-40  rounded-xl h-30 bg-gray-100 p-2 gap-2">
                    <button className="w-full text-left text-blue-400" onClick={()=>navigate('/home')}>
                        🏠︎ Home
                    </button>
                    <button className="w-full text-left text-red-400" onClick={logout}>
                        ➜ Log Out
                    </button>
                    <button className="w-full text-left text-red-400" onClick={deleteAcc}>
                        🗑 Delete Account
                    </button>
                </div>
            )}


            {seller ? (
                <div>
                    <div>

                        <h3 className=" flex   lg:text-5xl text-2xl  h-6 font-bold  mt-2  justify-center items-center text-orange-700"  onClick={() => {
                            setAccInfo((p) => !p);
                            setOrderInfo(false);
                        }}>
                                  Info Section

                        </h3>

                    </div>

                    {accInfo && (
                        <div className=" lg:w-1/3 w-1/2 p-4  rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.32)] gap-2 justify-center items-center lg:mt-20 mt-2 text-center lg:ml-[700px] ml-[112px] ">
                            {!editNameState ? (
                                <div>
                                    <h3 className='font-bold lg:text-4xl text-2xl '> {user.username} </h3>
                                {/*<button className='' onClick={() => setEditNameState(true)}>✎</button>*/}
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="text"
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                    />
                                    <button onClick={editName}>Update Name</button>
                                </div>
                            )}

                            <h3 className='font-bold lg:text-4xl text-xl '>{user.role}</h3>
                            <br/>
<hr/>
                            <br/>

                            <br/>
                        </div>

                    )}




                    <div>
                        <h3 className=" flex  lg:text-5xl text-2xl lg:mt-16 mt-4  font-bold justify-center items-center  " onClick={() => {
                            setOrderInfo((p) => !p);
                            setAccInfo(false);
                        }}>
                            My Products


                        </h3>
                        {/*<hr />*/}
                    </div>



                    {orderInfo && (
                        <div className="">
                            {myProduct?.length > 0 ? (
                                myProduct.map((p) => (
                                    <div key={p._id} className=" flex  rounded-xl  shadow-2xl  mt-8 lg:mt-20  ">

                                        {updateProduct  ? ( <div>{!p.IsSold &&<div className='update-product-div'>
                                            <button className='remove-btn' onClick={() => setUpdateProduct(false)}>
                                                ✖
                                            </button>

                                            <input className='inp-update' type="text" onChange={(e) => {setUpdateProductName(e.target.value)}} placeholder='Enter New Name' value={updateProductName} />
                                            <input className='inp-update' type='number' onChange={(e) => {setUpdateProductPrice(e.target.value)}} placeholder='Set New Price ' value={updateProductPrice} />
                                            <button className='save-change-btn' onClick={()=>updateProductFunction(p._id)}>Save Changes </button>

                                        </div>} </div> ): (
                                            <>
                                                <div className=' mt-4 '>
                                                    <img

                                                        className=' lg:w-4/4 w-40 ml-4 mb-1'
                                                        src={p.images?.[0]?.url}
                                                        alt={p.productName}
                                                    />
                                                </div>
                                                        <div className=' p-1 rounded-lg ml-20  '>
                                                <p className="font-bold lg:text-4xl text-xl ">{p.productName}</p>
                                                <p className='font-bold lg:text-2xl text-l '>₹ {p.productPrice}</p>
                                                <p className=' lg:text-2xl text-l '>{p.productCategory}</p>

                                                <p>
                                                    Listed On [
                                                    <b className="p3">
                                                        {new Date(p.createdAt).toLocaleDateString()}
                                                    </b>
                                                    ]
                                                    <div>{!p.IsSold&& <button className='font-bold  bg-[#06478d] mt-4 text-white hover:bg-sky-500  p-1 rounded w-36' onClick={()=>setUpdateProduct(prev=>!prev)} > Edit </button>}</div>
                                                </p>
                                                        </div>

                                                <p>
                                                    {p.IsSold ? (
                                                        "Sold"
                                                    ) : (
                                                        <p className='text-xs text-red-500 '>Not Sold </p>
                                                    )}
                                                </p>
                                            </>
                                        )}

                                    </div>


                                ))
                            ) : (
                                <p>No products found</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="mt-2">

                    <div className='shadow-lg border-t-2 border-gray-100 h-64'> <div className=' mt-2'>
                          <h1 className='text-center text-xl font-bold '>{user?.username}</h1>

                         <p className='font-sans text-bold p-1 '>Email ✉︎  </p>
                        <p className='bg-gray-100 p-2  text-blue-400'>{user?.email}  </p>
                        <p className='font-sans text-bold p-1'>User Address ⚲ </p>
                        <p className='bg-gray-100 p-2 text-blue-400'>Mumbai</p>
                        <p className='font-sans text-bold p-1'>Role  </p>
                        <p className='bg-gray-100 p-2 text-blue-400'>{user?.role}</p>
                    </div>
                    </div>
                    {/*<h2  className='text-center ml-4 font-sans  lg:text-5xl text-2xl font-bold ' style={{color:showAcc?'#C96442':'black'}} onClick={()=>setShowAcc(prev=>!prev)}> Account </h2>*/}

<br/>
                    <br/>
                    {/*<hr/>*/}





                    <div className="div-my-orders-wishlist">
                        <h2 className='font-bold ml-20 lg:ml-64 lg:text-2xl  '  onClick={()=>setShowWishlist(false)}>
                            My Orders
                            {!showWishlist && <div>
                                <hr className='lg:w-40 w-20 bg-black text-black h-1 lg:h-3'/>
                            </div>}


                        </h2>

                        <h2
                            className='font-bold ml-20 lg:ml-64 lg:text-2xl  '

                            onClick={async ()=>{
                                setShowWishlist(true);
                                await showWishList();
                            }}

                        >
                            My Wishlist
                            {showWishlist && <div>
                                <hr className='lg:w-40 w-20 bg-black text-black h-1 lg:h-3'/>
                            </div>}
                        </h2>
                    </div>
{/*<hr/>*/}
                    {showWishlist ? (
                        <div>
                            {wishList?.length > 0 ? (
                                <div>
                                    {wishList.map((wishListP) => (

                                        <div key={wishListP._id} className='user-wishlist'>

                                            <div className='remove'>
                                                <button className='remove-btn' onClick={() => removeWishList(wishListP._id)}>
                                                    ✖
                                                </button>
                                            </div>
                                            <div className="user-wishlist-img">
                                                <img width={140} src={`http://localhost:4500/${wishListP.images?.[0]}`} alt=""/>
                                            </div>

                                           <h2>{wishListP.productName}</h2>

                                           <p>{wishListP.productPrice}/-</p>
                                            {wishListP.IsSold ? (
                                                <p style={{color:"red"}}>Sold </p>
                                            ) : (
                                                <Link to = {`/product/${wishListP._id}`} className='wishlist-link' >  Buy Now  </Link>
                                            )}

                                        </div>

                                    ))}
                                </div>
                            ) : (
                                <p className='lg:mt-20 mt-12 text-center text-red-500'>No wishlist items</p>
                            )}

                            {/*<h3>Active Ord 🛒: {myOrder?.length || 0}</h3>*/}
                        </div>
                    ) : (
                        <div>
                            <hr className='mt-4'/>
                            {myOrder?.length > 0 ? (

                                myOrder.map((order) => (

                                    <div key={order._id} className=" flex  flex-wrap  bg-gray-100 ml-6 rounded-xl p-4 w-[90%]  font-bold lg:text-2xl  lg:mt-20 mt-12   ">
                                        <div className='text-left mt-4 w-1/3 text-lg lg:ml-[820px] lg:w-1/6'>
                                            <img
                                                src={order.product?.images?.[0].url}
                                                alt="Product IMG "
                                            />
                                        </div>
                                        <div className='ml-8 mt-4 p-2 '>
                                        <p className='w-full'>{order.product?.productName}</p>
                                      <p className='mt-2'>  Status : <b style={{color:"green"}}>{order.status}</b> </p>
                                        <p className='mt-2'>
                                            Date: {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                        </p>
                                            </div>

                                        <hr className='lg:w-40 w-full mt-4  bg-gray-100 h-1 lg:h-3'/>
                                <div className='mb-2 text-center  w-full'>
                                        <button

                                            className="font-bold  bg-red-800 mt-4 text-white hover:bg-red-400 w-48  p-2 rounded "
                                            onClick={() => cancel(order._id)}
                                            disabled={order.status !== "confirmed"}
                                        >
                                            Cancel
                                        </button>
                                </div>
                                    </div>
                                ))
                            ) : (
                                <p className='lg:mt-20 mt-12 text-center text-red-500' >No orders found</p>
                            )}

                            <h3 className='text-center mt-4 lg:mt-24'>Active Order 🛒: {myOrder?.length || 0}</h3>
                        </div>
                    )}

    <br/>
                </div>
            )}
        </div>
    );
}