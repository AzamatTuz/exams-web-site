import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskSidebar from "../components/TaskSidebar";
import CodeEditor from "../components/CodeEditor";
import Modal from "../components/Modal";

import {
    getExam,
    submitExam
} from "../api/examApi";


export default function EditorFile() {

    const { id } =
        useParams();


    const user =
        JSON.parse(
            localStorage.getItem(
                "auth_user"
            )
        );


    const [exam, setExam] =
        useState(null);


    const [codes, setCodes] =
        useState([]);


    const [outputs, setOutputs] =
        useState([]);


    const [submitted, setSubmitted] =
        useState(false);


    const [showConfirm, setShowConfirm] =
        useState(false);


    const [message, setMessage] =
        useState("");



    useEffect(() => {

        loadExam();

    }, []);





    async function loadExam() {

        try {

            const res =
                await getExam(id);


            setExam(

                res.data

            );


            const count =

                res.data?.tasks?.length ||

                0;



            setCodes(

                new Array(

                    count

                ).fill("")

            );



            setOutputs(

                new Array(

                    count

                ).fill("")

            );


        }

        catch (

            e

            ) {

            console.log(

                e

            );

        }

    }







    function handleChange(

        index,

        value

    ) {

        const copy =
            [...codes];


        copy[index] =
            value;


        setCodes(copy);

    }







    function runCode(

        index

    ) {

        let logs =
            [];


        try {

            const old =
                console.log;



            console.log =
                (...args) => {

                    logs.push(

                        args.join(

                            " "

                        )

                    );

                };



            new Function(

                codes[index]

            )();



            console.log =
                old;



            const out =
                [...outputs];


            out[index] =

                logs.join(

                    "\n"

                )

                ||

                "Пусто";



            setOutputs(

                out

            );

        }


        catch (

            e

            ) {


            const out =
                [...outputs];


            out[index] =

                "❌ " +

                e.message;


            setOutputs(

                out

            );

        }

    }








    async function confirmSubmit() {

        try {

            await submitExam(

                id,

                user.uid,

                {

                    name:

                    user.name,

                    email:

                    user.email,

                    codes,

                    score:

                        0,

                    checked:

                        false

                }

            );



            setSubmitted(

                true

            );


            setShowConfirm(

                false

            );


            setMessage(

                "Отправлено"

            );


        }

        catch (

            e

            ) {

            console.log(

                e

            );

        }

    }








    if (

        !exam

    )

        return (

            <div>

                Загрузка

            </div>

        );









    return (

        <div className="
        min-h-screen
        bg-[#0d1b2a]
        ">


            <Navbar />


            <TaskSidebar

                tasks={

                    exam.tasks

                }

            />






            <div className="
            p-10
            ">



                <div

                    className={`

                    grid

                    gap-8


                    ${

                        exam.tasks.length === 1

                            ?

                            "grid-cols-1"

                            :

                            exam.tasks.length === 2

                                ?

                                "grid-cols-2"

                                :

                                "grid-cols-1 md:grid-cols-2"

                    }

                    `}


                >



                    {

                        codes.map(

                            (

                                code,

                                index

                            ) => (



                                <CodeEditor

                                    key={index}

                                    index={index}

                                    code={code}

                                    output={

                                        outputs[index]

                                    }

                                    handleChange={

                                        handleChange

                                    }

                                    runCode={

                                        runCode

                                    }

                                />


                            )

                        )

                    }



                </div>






                <button

                    onClick={()=>

                        setShowConfirm(

                            true

                        )

                    }

                    className="
                    fixed
                    bottom-10
                    right-10
                    bg-green-500
                    px-10
                    py-4
                    rounded-2xl
                    font-bold
                    "

                >

                    Отправить

                </button>





            </div>







            <Modal

                open={

                    showConfirm

                }

                title="
                Подтверждение
                "

                text="
                Реально отправить?
                "

                confirmText="
                Да
                "

                onClose={()=>

                    setShowConfirm(

                        false

                    )

                }

                onConfirm={

                    confirmSubmit

                }

            />






            <Modal

                open={

                    message

                }

                title=""

                text={message}

                onClose={()=>

                    setMessage(

                        ""

                    )

                }

            />


        </div>

    );

}