// src/routes/AdminRoute.jsx


import {
    Navigate
}
    from "react-router-dom";



export default function AdminRoute({

                                       children

                                   }){


    const user=

        JSON.parse(

            localStorage.getItem(

                "auth_user"

            )

        );



    const ADMINS=[

        "tuzelbajazamat361@gmail.com"

    ];



    if(!user){

        return(

            <Navigate

                to="/login"

            />

        );

    }



    const isAdmin=

        ADMINS.includes(

            user.email

        );



    if(!isAdmin){

        return(

            <Navigate

                to="/"

            />

        );

    }



    return children;


}