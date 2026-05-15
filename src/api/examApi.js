import axios from "axios";


const DB =
"https://exam-4d98a-default-rtdb.europe-west1.firebasedatabase.app";






/*
======================
EXAMS
======================
*/


export const getExams = () =>

axios.get(

`${DB}/exams.json`

);





export const getExam = (

id

)=>

axios.get(

`${DB}/exams/${id}.json`

);






export const createExam = (

data

)=>

axios.post(

`${DB}/exams.json`,

data

);






export const deleteExam = (

id

)=>

axios.delete(

`${DB}/exams/${id}.json`

);









/*
======================
SUBMITS
======================
*/




export const submitExam=(

examId,

userId,

data

)=>

axios.put(

`${DB}/submits/${examId}/${userId}.json`,

data

);






export const getStudentResult=(

examId,

uid

)=>

axios.get(

`${DB}/submits/${examId}/${uid}.json`

);








export const checkStudent=(

examId,

userId,

data

)=>

axios.patch(

`${DB}/submits/${examId}/${userId}.json`,

data

);








export const getStudents=(

examId

)=>

axios.get(

`${DB}/submits/${examId}.json`

);










/*
======================
AUTH
======================
*/


export const saveUser=(

uid,

data

)=>

axios.put(

`${DB}/users/${uid}.json`,

data

);






export const getUser=(

uid

)=>

axios.get(

`${DB}/users/${uid}.json`

);









/*
======================
RESULTS / SCORES
======================
*/


export const saveScore=(

examId,

uid,

score

)=>

axios.patch(

`${DB}/submits/${examId}/${uid}.json`,

{

totalScore:

score,

checked:

true

}

);







export const getScores=(

examId

)=>

axios.get(

`${DB}/submits/${examId}.json`

);



export const getSubmits = (

examId

)=>

axios.get(

`${DB}/submits/${examId}.json`

);