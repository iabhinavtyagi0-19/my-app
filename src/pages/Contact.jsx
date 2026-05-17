import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
    const token = localStorage.getItem("token");
    const [issue, setIssue] = useState("");
    const [isSubmit, setSubmit] = useState(false);
    const navigate = useNavigate();

    async function IssueFunction() {
        const response = await fetch("http://localhost:4500/api/contact/issue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                issue: issue,
            }),
        });

        const data = await response.json();
        console.log(data);
        setSubmit(true);
    }

    return (
        <div>

            <div className="btndiv">
                <button className="btnlp"  style={{width:"50px"}} onClick={() => navigate("/home")}>
                    ❮
                </button>
            </div>

            {!isSubmit ? (

                <div className='text-center'>
                <h1 className='text-2xl font-bold font-mono text-center text-[#0a8ae6] hover:bg-text-black'>Contact Us </h1>
                <hr/>

                <div className='text-center'>
                        <p>
                            Use respectful and clear language only, avoid spam or repeated messages, provide correct contact details, do not send abusive or offensive content, use one request per issue, and note that responses may take time depending on volume.
                        </p>
                    </div>

                    <textarea className='w-64 h-32 border-2 border-black mt-8 rounded-xl'
                        placeholder="Address your issue — we respond quickly"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                    />

                    <div>
                        <button  className="font-bold  bg-[#06478d] mt-4 text-white hover:bg-sky-500  p-1 rounded "  onClick={IssueFunction}>
                            Submit ➤
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <p className='text-green-600 text-center mt-20 shadow-sm rounded p-2 '>Thanks for interacting with us 😊
                        We’ll respond as quickly as possible.</p>
                     <p></p>
                </div>
            )}
        </div>
    );
}