import './Home.css'
import Header from '../components/Header'
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import  {useNavigate} from "react-router-dom";
import Card from "../components/Card.jsx";

export default  function Home({user}){
    const token = localStorage.getItem("token");
    const nav = useNavigate();

    const [page, setPage] = useState(1);
        const [sort,setSort] = useState('');
        const [showSortOption, setShowSortOption] = useState(true);
        const [search, setSearch] = useState('');
     const [homeData, setHomeData] = useState([]);
        useEffect(()=>{

            async function fetchHomeData(){

                const data = await fetch(`http://localhost:4500/home?page=${page}&search=${search}&sort=${sort}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const d = await data.json();

                setHomeData(d.allProducts||[]);



            }
            fetchHomeData();
        },[page,sort,search]);





    return (

        <div className="home-div-body">

            {token && (
                <>
                    <NavBar user={user} />
                    <br/>
                    <hr/>

                    <div className=' lg:mt-20 mt-4 flex justify-center gap-3'>
                        <input
                            className='  w-[300px] lg:w-[780px] mb-2 border border-black rounded-md '
                            type="text"
                            placeholder='Looking for something? ..... '
                            onChange={(e)=>setSearch(e.target.value)}
                        />



                            <button className='  lg:w-20 h-10  w-20 border rounded  mb-2 text-white bg-[#06478d]  ' onClick={()=>setSearch(search)}>Search</button>




                    </div>

                    <hr/>

                    {search&&(<div className="">
                        <p onClick={()=>setShowSortOption(true)} className="font-bold text-center text-black">Sort By ⇅ </p>

                        {showSortOption && (


                            <div className="flex flex-wrap ml-2 items-center gap-2 border-2 bg-gray-100  shadow-xl ">
                                     <div className='w-8 '>
                                         <button className='mb-4' onClick={()=>setShowSortOption(prev=>!prev)}>⤫</button>
                                     </div>

                                <p className="ml-4 font-bold text-blue-400 text-center">Price</p>

                                <label className="ml-2 flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={sort === "inc"}
                                        onChange={() => setSort("inc")}
                                    />
                                    ↑
                                </label>

                                <label className="ml-2 flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={sort === "dec"}
                                        onChange={() => setSort("dec")}
                                    />
                                    ↓
                                </label>

                                <p className="ml-4 font-bold text-blue-400 ml-26">Listed</p>

                                <label className="ml-2 flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={sort === "latest"}
                                        onChange={() => setSort("latest")}
                                    />
                                    Latest
                                </label>

                                <label className="ml-2 flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={sort === "oldest"}
                                        onChange={() => setSort("oldest")}
                                    />
                                    Oldest
                                </label>
                            </div>
                        )}
                    </div>)}

                    <div className="product-display">

                        {homeData.length > 0 ? (
                            homeData.map((p) => (
                                <div key={p._id}>

                                    <Card
                                        id={p._id}
                                        productName={p.productName}
                                        productDescription={p.productDescription}
                                        productPrice={p.productPrice}
                                        image={p.images?.[0]?.url}


                                    />
                                </div>
                            ))

                          ) : (
                            <p>No Products Found</p>
                        )}
                    </div>

                    <div className='nav-btn-div'>
                        {page > 1 && (
                            <button className='btn' onClick={() => setPage(prev => prev - 1)}>
                                Prev
                            </button>


                        )}
                        {page > 1 && (
                            <button className='btn' onClick={() => setPage(prev => prev + 1)}>
                                Next
                            </button>


                        )}




                    </div>
                </>
            )}
<hr/>
            <button onClick={()=>nav('/t1')}>t1</button>
            <Footer/>


        </div>



    )



}
