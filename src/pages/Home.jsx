import {
    useEffect,
    useState
}
from "react";

import Navbar from "../components/Navbar";
import ExamCard from "../components/ExamCard";

import {
    getExams,
    getStudentResult
}
from "../api/examApi";

import {
    useNavigate
}
from "react-router-dom";



export default function Home() {

    const navigate =
        useNavigate();


    const [
        exams,
        setExams
    ]

    = useState({});



    const user =

        JSON.parse(

            localStorage.getItem(

                "auth_user"

            )

        );



    const admins = [

        "tuzelbajazamat361@gmail.com",
        "Erdauitakhmetov06@gmail.com"

    ];



    const isAdmin =

        user &&

        admins.includes(

            user.email

        );




    useEffect(() => {

        load();

    }, []);




    async function load() {

        const res =

            await getExams();



        const examData =

            res.data ||

            {};




        const loaded =

            {};




        for (

            const id in

            examData

        ) {

            let result =

                null;



            try {

                const score =

                    await getStudentResult(

                        id,

                        user?.uid

                    );



                result =

                    score.data;

            }

            catch (

                e

            ) {

                console.log(

                    e

                );

            }




            loaded[id] = {

                ...examData[id],

                result

            };

        }




        setExams(

            loaded

        );

    }








    return (

        <div className="
        min-h-screen
        bg-gradient-to-br
        from-[#0d1b2a]
        via-[#1b263b]
        to-[#415a77]
        ">


            <Navbar />





            <div className="max-w-7xl mx-auto p-8">



                {/* HERO */}


                <div className="
                bg-white/5
                backdrop-blur-md
                rounded-3xl
                border border-white/10
                p-10
                flex
                justify-between
                items-center
                ">



                    <div>


                        <h1 className="
                        text-6xl
                        font-black
                        text-white
                        ">

                            Exam Platform

                        </h1>



                        <p className="
                        text-gray-300
                        mt-4
                        text-lg
                        ">

                            Онлайн экзамены,
                            кодинг и проверка

                        </p>




                        <div className="
                        flex
                        gap-4
                        mt-8
                        ">


                            {

                                !user && (

                                    <button

                                        onClick={() =>

                                            navigate(

                                                "/login"

                                            )

                                        }

                                        className="
                                        bg-[#fca311]
                                        px-8
                                        py-4
                                        rounded-2xl
                                        font-bold
                                        "

                                    >

                                        Войти

                                    </button>

                                )

                            }




                            {

                                isAdmin && (

                                    <>

                                        <button

                                            onClick={() =>

                                                navigate(

                                                    "/admin"

                                                )

                                            }

                                            className="
                                            bg-green-500
                                            px-8
                                            py-4
                                            rounded-2xl
                                            font-bold
                                            "

                                        >

                                            Админ

                                        </button>




                                        <button

                                            onClick={() =>

                                                navigate(

                                                    "/admin/create"

                                                )

                                            }

                                            className="
                                            bg-[#fca311]
                                            px-8
                                            py-4
                                            rounded-2xl
                                            "

                                        >

                                            Создать экзамен

                                        </button>


                                    </>

                                )

                            }


                        </div>



                    </div>






                    {

                        user && (

                            <div className="
                            bg-[#0d1b2a]
                            p-6
                            rounded-3xl
                            text-center
                            ">


                                <img

                                    src={user.photo}

                                    className="
                                    w-24
                                    h-24
                                    rounded-full
                                    mx-auto
                                    "

                                />



                                <h2 className="
                                text-white
                                mt-4
                                font-bold
                                ">

                                    {

                                        user.name

                                    }

                                </h2>



                                <p className="
                                text-gray-400
                                text-sm
                                ">

                                    {

                                        user.email

                                    }

                                </p>


                            </div>

                        )

                    }



                </div>









                <div className="mt-16">


                    <h2 className="
                    text-4xl
                    text-white
                    font-black
                    ">

                        Доступные экзамены

                    </h2>




                    <div className="
                    grid
                    md:grid-cols-3
                    gap-8
                    mt-8
                    ">


                        {

                            Object.entries(

                                exams

                            ).map(

                                (

                                    [id,

                                        exam]

                                ) => (


                                    <ExamCard

                                        key={id}

                                        id={id}

                                        title={

                                            exam.title

                                        }

                                        date={

                                            exam.date

                                        }

                                        result={

                                            exam.result

                                        }

                                    />


                                )

                            )

                        }



                    </div>



                </div>



            </div>




        </div>

    );

}