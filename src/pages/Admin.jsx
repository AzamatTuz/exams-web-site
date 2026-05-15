// src/pages/Admin.jsx

import {
    useEffect,
    useState
}
    from "react";


import {
    getExams,
    deleteExam
}
    from "../api/examApi";


import Navbar
    from "../components/Navbar";


import {
    useNavigate
}
    from "react-router-dom";



export default function Admin(){

    const navigate=
        useNavigate();


    const [

        exams,

        setExams

    ]

        =

        useState({});



    useEffect(()=>{

        load();

    },[]);



    async function load(){

        const res=

            await getExams();


        setExams(

            res.data || {}

        );

    }



    async function remove(id){

        const ok=

            window.confirm(

                "Удалить?"

            );


        if(!ok)return;



        await deleteExam(id);


        load();

    }



    return(

        <div className="min-h-screen bg-[#0d1b2a]">


            <Navbar/>


            <div className="max-w-7xl mx-auto p-8">


                <div className="flex justify-between">


                    <h1 className="text-5xl text-white font-black">

                        Панель учителя

                    </h1>



                    <button

                        onClick={()=>navigate(

                            "/admin/create"

                        )}

                        className="bg-[#fca311] px-6 py-3 rounded-xl"

                    >

                        Создать экзамен

                    </button>


                </div>





                <div className="grid gap-5 mt-10">


                    {

                        Object.entries(

                            exams

                        ).map(

                            ([id,exam])=>(


                                <div

                                    key={id}

                                    className="bg-[#1b263b] p-6 rounded-2xl flex justify-between"

                                >


                                    <div>

                                        <h2 className="text-2xl text-white">

                                            {

                                                exam.title

                                            }

                                        </h2>


                                        <p className="text-gray-400">

                                            {

                                                exam.date

                                            }

                                        </p>


                                    </div>




                                    <div className="flex gap-3">


                                        <button

                                            onClick={()=>navigate(

                                                `/admin/exam/${id}`

                                            )}

                                            className="bg-green-500 px-5 rounded"

                                        >

                                            Проверить

                                        </button>




                                        <button

                                            onClick={()=>remove(

                                                id

                                            )}

                                            className="bg-red-500 px-5 rounded"

                                        >

                                            Удалить

                                        </button>


                                    </div>




                                </div>

                            )

                        )

                    }



                </div>




            </div>


        </div>

    );

}