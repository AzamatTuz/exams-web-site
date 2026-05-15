import { useState } from "react";

export default function TaskSidebar({ tasks }) {

    const [open, setOpen] =
        useState(false);


    return (

        <>

            {/* Кнопка открытия */}

            <button

                onClick={()=>

                    setOpen(

                        true

                    )

                }

                className="
                fixed
                top-1/2
                right-5
                -translate-y-1/2

                z-50

                bg-[#fca311]
                text-black
                font-bold

                px-5
                py-4

                rounded-2xl

                shadow-xl

                hover:scale-105

                transition
                "

            >

                📋 Задания

            </button>





            {/* Фон */}

            {

                open && (

                    <div

                        onClick={()=>

                            setOpen(

                                false

                            )

                        }

                        className="
                        fixed
                        inset-0

                        bg-black/50

                        z-50
                        "

                    />

                )

            }





            {/* SIDEBAR */}

            <div

                className={`

                fixed

                top-0

                right-0

                h-full

                w-[420px]

                bg-[#1b263b]

                border-l

                border-[#415a77]

                shadow-2xl

                z-[100]

                transition-all

                duration-300


                ${

                    open

                        ?

                        "translate-x-0"

                        :

                        "translate-x-full"

                }


                `}

            >




                {/* HEADER */}

                <div className="
                flex
                justify-between
                items-center

                p-6

                border-b

                border-[#415a77]
                ">


                    <h2 className="
                    text-3xl
                    font-black
                    text-[#fca311]
                    ">

                        Задания

                    </h2>




                    <button

                        onClick={()=>

                            setOpen(

                                false

                            )

                        }

                        className="
                        text-white
                        text-3xl
                        "

                    >

                        ✕

                    </button>



                </div>







                <div className="
                p-6

                overflow-auto

                h-full

                pb-40
                ">


                    {

                        tasks?.map(

                            (

                                task,

                                i

                            ) => (


                                <div

                                    key={i}

                                    className="
                                    bg-[#0d1b2a]

                                    p-5

                                    rounded-2xl

                                    mb-5

                                    border

                                    border-[#415a77]
                                    "

                                >



                                    <h3 className="
                                    text-[#fca311]

                                    font-bold

                                    mb-3
                                    ">

                                        Задание {i+1}

                                    </h3>



                                    <p className="
                                    text-gray-300

                                    whitespace-pre-wrap
                                    ">

                                        {

                                            task

                                        }

                                    </p>



                                </div>

                            )

                        )

                    }



                </div>




            </div>


        </>

    );

}