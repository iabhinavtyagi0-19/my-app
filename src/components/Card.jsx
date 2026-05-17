import './Card.css';
import {Link} from "react-router-dom";

export default function  Card({id,productName,productPrice,image}) {

    return <div className="lg:w-[480px] lg:h-[440px] w-[160px] border-2 p-4 border-gray-200 hover: bg-gray-100   hover:border-green-400 hover:w-[165]   shadow-xl lg:rounded-xl rounded-lg">


       <Link className='link'  to={`/product/${id}`}>
             <div className='lg:w-[240px] lg:ml-28 lg:mt-6  w-28 ml-2 rounded-xl lg:rounded-lg'>
                 <img
                     className='w-full'
                    src={image}
                     alt={productName}


                 />
             </div>

             <div className='lg:mt-8 mt-2'>

           <p className='font-bold text-black font-sans text-center' >  {productName}
           </p>
                 <p className='font-thin text-black text-center'>  ₹ {productPrice} /-</p>
           </div>
       </Link>


    </div>

}
