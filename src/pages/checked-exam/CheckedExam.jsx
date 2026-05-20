import {
    useEffect,
    useState
}
    from "react";

import {
    useParams
}
    from "react-router-dom";

import Navbar
    from "../widgets/navbar/Navbar.jsx";

import {
    getSubmits,
    updateScore
}
    from "../features/exam/api/examApi.js";


export default function CheckedExam(){

    const { id } =
        useParams();


    const [

        students,

        setStudents

    ] =
        useState({});



    useEffect(()=>{

        load();

    },[]);



    async function load(){

        const res =
            await getSubmits(
                id
            );


        const checked =
            Object.fromEntries(

                Object.entries(

                    res.data || {}

                ).filter(

                    ([,student])=>

                        student.checked

                )

            );


        setStudents(
            checked
        );

    }



    async function save(

        studentId,

        score

    ){

        try{

            await updateScore(

                id,

                studentId,

                score

            );


            load();

        }

        catch(e){

            console.log(e);

        }

    }



    function change(

        studentId,

        value

    ){

        setStudents(

            prev=>({

                ...prev,

                [studentId]:{

                    ...prev[studentId],

                    totalScore:
                    value

                }

            })

        );

    }



    return(

        <div className="
min-h-screen
bg-gradient-to-br
from-[#0d1b2a]
via-[#1b263b]
to-[#415a77]
">

            <Navbar/>


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

                    Архив проверенных

                </h1>



                {

                    Object.entries(

                        students

                    )

                        .sort(

                            (a,b)=>

                                b[1].totalScore -

                                a[1].totalScore

                        )

                        .map(

                            ([studentId,student])=>(


                                <div

                                    key={studentId}

                                    className="
bg-[#1b263b]
rounded-3xl
p-8
mb-8
flex
justify-between
items-center
"

                                >


                                    <div>

                                        <h2 className="
text-white
text-2xl
font-bold
">

                                            {student.name}

                                        </h2>

                                    </div>



                                    <div className="
flex
gap-4
items-center
">

                                        <input

                                            type="number"

                                            value={

                                                student.totalScore ||

                                                student.score ||

                                                0

                                            }

                                            onChange={e=>

                                                change(

                                                    studentId,

                                                    e.target.value

                                                )

                                            }

                                            className="
w-24
bg-[#0d1b2a]
text-white
rounded-xl
p-3
outline-none
"
                                        />



                                        <button

                                            onClick={()=>

                                                save(

                                                    studentId,

                                                    student.totalScore

                                                )

                                            }

                                            className="
bg-[#fca311]
px-5
py-3
rounded-xl
font-bold
hover:bg-[#ffb703]
transition
"

                                        >

                                            Сохранить

                                        </button>


                                    </div>


                                </div>

                            )

                        )

                }


            </div>


        </div>

    );

}