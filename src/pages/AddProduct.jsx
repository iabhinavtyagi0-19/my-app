import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddProduct.css';

export default function AddProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();

        formData.append("productName", productName);
        formData.append("productPrice", productPrice);
        formData.append("productDescription", productDescription);
        formData.append("productCategory", productCategory);

        // IMPORTANT FIX: images must be appended properly
        Array.from(images).forEach((img) => {
            formData.append("images", img);
        });

        const response = await fetch("http://localhost:4500/addProduct", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${(token)}`
            },
            body: formData
        });
        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            setLoading(false);
            // handle both validation + other errors
            if (data.errors) {
                setErrors(data.errors);
            } else {
                alert(data.message || "Something went wrong");
            }
            return ;
        }

        alert(data.message || "Product added successfully!");
        setLoading(false);
        navigate("/home");
    }

    return (
        <div>


            <div className="product-body">


                <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">

                    <div className="product-errors">
                        {errors.map((err, i) => (
                            <div key={i} className="error-msg">
                                {err.msg}
                            </div>
                        ))}
                    </div>
                    <div className="container-btn">
                    <button className='btnlp7' onClick={() => navigate('/home')}> く </button>
                 </div>


            <input
                        type="text"
                        placeholder="Enter Product Name "
                        onChange={(e) => setProductName(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Enter Product Price"
                        onChange={(e) => setProductPrice(e.target.value)}
                    />


                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                    />

                    <textarea
                        placeholder="Describe Your Product"
                        onChange={(e) => setProductDescription(e.target.value)}
                    />

                    <select
                        name="category"
                        id="category"
                        onChange={(e) => setProductCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Books">Books</option>
                        <option value="Essential">Essential</option>
                        <option value="Equipments">Equipment</option>
                        <option value="Others">Others</option>
                        <option value="Food">Snack</option>
                    </select>
                    <button type="submit" disabled={loading}>
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>
                </form>

            </div>:(<div>

        </div>)

        </div>
    );
}