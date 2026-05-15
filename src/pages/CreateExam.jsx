import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { createExam } from "../api/examApi";

export default function CreateExam() {

    const navigate = useNavigate();

    const [title, setTitle] =
        useState("");

    const [date, setDate] =
        useState("");

    const [tasks, setTasks] =
        useState([""]);



    function addTask() {

        setTasks(

            [

                ...tasks,

                ""

            ]

        );

    }




    function removeTask(index) {

        if (

            tasks.length === 1

        )

            return;



        setTasks(

            tasks.filter(

                (_, i) =>

                    i !== index

            )

        );

    }





    function changeTask(

        index,

        value

    ) {


        const copy =

            [...tasks];


        copy[index] =
            value;


        setTasks(

            copy

        );

    }







    async function save() {

        if (

            !title ||

            !date ||

            tasks.some(

                t =>

                    !t.trim()

            )

        ) {

            alert(

                "Заполни все поля"

            );

            return;

        }



        try {

            await createExam({

                title,

                date,

                tasks,

                createdAt:

                    new Date()

                        .toISOString()

            });



            alert(

                "Экзамен создан"

            );



            navigate(

                "/admin"

            );

        }

        catch (

            e

            ) {

            console.log(

                e

            );


            alert(

                "Ошибка"

            );

        }

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





            <div className="
            max-w-7xl
            mx-auto
            p-10
            ">



                <div className="
                flex
                justify-between
                items-center
                mb-10
                ">

                    <h1 className="
                    text-5xl
                    font-black
                    text-white
                    ">

                        Создать экзамен

                    </h1>


                    <button

                        onClick={save}

                        className="
                        bg-[#fca311]
                        px-8
                        py-4
                        rounded-2xl
                        text-black
                        font-bold
                        hover:scale-105
                        duration-300
                        "

                    >

                        Создать

                    </button>


                </div>








                <div className="
                bg-[#1b263b]
                p-8
                rounded-3xl
                border
                border-[#415a77]
                ">




                    <input

                        value={title}

                        onChange={(e)=>

                            setTitle(

                                e.target.value

                            )

                        }

                        placeholder="Название экзамена"

                        className="
                        w-full
                        bg-[#0d1b2a]
                        text-white
                        p-5
                        rounded-2xl
                        mb-5
                        outline-none
                        "

                    />








                    <input

                        type="date"

                        value={date}

                        onChange={(e)=>

                            setDate(

                                e.target.value

                            )

                        }

                        className="
                        w-full
                        bg-[#0d1b2a]
                        text-white
                        p-5
                        rounded-2xl
                        outline-none
                        "

                    />








                    <div className="
                    mt-10
                    grid
                    md:grid-cols-2
                    gap-6
                    ">



                        {

                            tasks.map(

                                (

                                    task,

                                    i

                                ) => (



                                    <div

                                        key={i}

                                        className="
                                        bg-[#0d1b2a]
                                        rounded-2xl
                                        p-5
                                        border
                                        border-[#415a77]
                                        "

                                    >




                                        <div className="
                                        flex
                                        justify-between
                                        mb-5
                                        ">


                                            <h2 className="
                                            text-[#fca311]
                                            font-bold
                                            ">

                                                Задание {i+1}

                                            </h2>





                                            {

                                                tasks.length >

                                                1 && (


                                                    <button

                                                        onClick={()=>

                                                            removeTask(

                                                                i

                                                            )

                                                        }

                                                        className="
                                                        text-red-500
                                                        text-xl
                                                        "

                                                    >

                                                        ✕

                                                    </button>


                                                )

                                            }



                                        </div>









                                        <textarea

                                            value={task}

                                            onChange={(e)=>

                                                changeTask(

                                                    i,

                                                    e.target.value

                                                )

                                            }

                                            placeholder="
                                            Напиши задание...
                                            "

                                            className="
                                            w-full
                                            h-[220px]
                                            bg-transparent
                                            text-white
                                            resize-none
                                            outline-none
                                            "

                                        />


                                    </div>

                                )

                            )

                        }





                    </div>










                    <button

                        onClick={addTask}

                        className="
                        mt-8
                        bg-green-500
                        px-8
                        py-4
                        rounded-2xl
                        font-bold
                        hover:scale-105
                        duration-300
                        "

                    >

                        + Добавить задание

                    </button>





                </div>




            </div>



        </div>

    );

}