import {
    useEffect,
    useState
}
from "react";

import {
    useParams
}
from "react-router-dom";

import Navbar from "../components/Navbar";
import Student from "../components/Student";

import {
    getSubmits,
    checkStudent
}
from "../api/examApi";


export default function CheckExam() {

    const { id } =
        useParams();


    const [

        students,

        setStudents

    ]

    = useState({});


    const [

        loading,

        setLoading

    ]

    = useState(true);



    useEffect(() => {

        load();

    }, []);





    async function load() {

        try {

            const res =

                await getSubmits(

                    id

                );



            setStudents(

                res.data || {}

            );



            setLoading(

                false

            );

        }

        catch (

            e

        ) {

            console.log(

                e

            );


            setLoading(

                false

            );

        }

    }










    async function save(

        studentId,

        scores

    ) {


        const total =

            scores.reduce(

                (

                    a,

                    b

                ) =>

                    a +

                    Number(

                        b || 0

                    ),

                0

            );




        try {


            await checkStudent(

                id,

                studentId,

                {

                    checked:

                        true,



                    totalScore:

                        total,



                    scores:

                        scores

                }

            );



            alert(

                `Оценка сохранена:

${total} баллов`

            );



            load();


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
            max-w-6xl
            mx-auto
            p-10
            ">



                <h1 className="
                text-5xl
                text-white
                font-black
                mb-10
                ">

                    Проверка экзамена

                </h1>








                {

                    loading && (

                        <p className="
                        text-white
                        text-xl
                        ">

                            Загрузка...

                        </p>

                    )

                }









                {

                    !loading &&

                    Object.keys(

                        students

                    ).length === 0 && (

                        <div className="
                        bg-[#1b263b]
                        p-10
                        rounded-3xl
                        text-center
                        ">


                            <h2 className="
                            text-white
                            text-2xl
                            ">

                                Нет отправленных работ

                            </h2>


                        </div>

                    )

                }










                {

                    Object.entries(

                        students

                    ).map(

                        (

                            [

                                studentId,

                                student

                            ]

                        ) => (



                            <Student

                                key={

                                    studentId

                                }


                                student={

                                    student

                                }



                                save={

                                    (

                                        scores

                                    ) =>

                                        save(

                                            studentId,

                                            scores

                                        )

                                }

                            />


                        )

                    )

                }




            </div>




        </div>

    );

}