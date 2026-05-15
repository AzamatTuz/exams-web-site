// src/components/Navbar.jsx

import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar(){

    const navigate=
        useNavigate();


    const user=

        JSON.parse(

            localStorage.getItem(

                "auth_user"

            )

        );



    async function handleLogout(){

        await logout();

        navigate("/");

    }



    return(

        <nav className="bg-[#0d1b2a] border-b border-[#415a77]">

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">


                <h1
                    onClick={()=>navigate("/")}

                    className="text-3xl font-black text-[#fca311] cursor-pointer"
                >

                    ExamJS

                </h1>



                <div className="flex gap-5 items-center">

                    <button
                        onClick={()=>navigate("/")}

                        className="text-white"
                    >

                        Home

                    </button>



                    {

                        user && (

                            <>

                                <img

                                    src={user.photo}

                                    className="w-10 h-10 rounded-full"

                                />


                                <button

                                    onClick={handleLogout}

                                    className="bg-red-500 px-4 py-2 rounded-xl"

                                >

                                    Выйти

                                </button>

                            </>

                        )

                    }


                </div>


            </div>

        </nav>

    );

}