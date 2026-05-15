// src/pages/Login.jsx


import {

    loginGoogle

}

    from "../firebase";


import {

    useNavigate

}

    from "react-router-dom";



export default function Login(){


    const navigate=
        useNavigate();



    async function login(){

        try{


            await loginGoogle();


            navigate("/");


        }

        catch(e){

            console.log(e);

        }


    }



    return(

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77]">



            <div className="bg-[#1b263b] p-10 rounded-3xl shadow-xl">


                <h1

                    className="text-4xl text-white font-black"

                >

                    Вход

                </h1>



                <button

                    onClick={login}

                    className="mt-8 bg-[#fca311] text-black px-8 py-4 rounded-2xl font-bold"

                >

                    Войти через Google

                </button>


            </div>



        </div>

    );

}