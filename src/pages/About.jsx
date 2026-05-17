import "./about.css";
import {useNavigate} from "react-router-dom";
import Footer from "../components/footer";
import NavBar from "../components/NavBar.jsx";
export default function About() {
    const navigate = useNavigate();
    return (
          <div>
              <div className="btndiv">
                  <button className="btnlp"  style={{width:"50px"}} onClick={() => navigate("/home")}>
                      ❮
                  </button>
              </div>
        <div className="about-container">


            <h1 className="about-title">About PeerKart</h1>

            {/* Platform */}
            <div className="about-section">
                <h2>Our Platform</h2>
                <p>
                    PeerKart is a modern, secure, and user-friendly marketplace designed for
                    buying and selling pre-owned products with ease. We connect real
                    people directly, eliminating unnecessary intermediaries to ensure
                    faster, transparent, and cost-effective transactions. Our platform is
                    built to make trading simple, reliable, and efficient for everyone.
                </p>
            </div>

            {/* Buyer */}
            <div className="about-section">
                <h2>For Buyers</h2>
                <p>
                    Explore a wide range of quality pre-owned products at affordable
                    prices. PeerKart helps you connect directly with sellers, compare deals,
                    and make informed purchases. Enjoy a seamless shopping experience
                    that saves money while promoting sustainable consumption and reducing
                    waste.
                </p>
            </div>

            {/* Seller */}
            <div className="about-section">
                <h2>For Sellers</h2>
                <p>
                    Turn your unused items into value within minutes. PeerKart allows you to
                    list products effortlessly, reach genuine buyers instantly, and
                    manage your sales with complete control. No middlemen, no complexity —
                    just a fast, direct, and effective way to earn from what you no
                    longer need.
                </p>
            </div>

        </div>
              </div>
    );
}