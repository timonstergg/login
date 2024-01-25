import DefaultLayout from "../layout/DefaultLayout"
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
//import { AuthResponse } from "../types/types";
import { AuthResponseError } from "../types/types";
import { useNavigate } from "react-router-dom";

export default function Signub(){

    const [name, setName]= useState("");
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [errorResponse,setErrorResponse] = useState ("")


    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signub`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    username,
                    password
                })
            })

            if(response.ok){
                console.log("user created successfully")
                setErrorResponse("");

                goTo("/")
            }else{
                console.log("something went wrong")
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        }catch(error){
            console.log(error)
         
        }
    }

    if (auth.isAuthenticated){
        return <Navigate to ="/dashboard"/>
    }
         

    return(
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit}>
                 <h1>Signub</h1>
                 { !! errorResponse && <div className= "errorMessage">{errorResponse} </div>}
                 <label>name</label>
                 <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                 <label>Username</label>
                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        
                 <label>Password</label>
                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                 <button>
                   create user
                 </button>

             </form>

        </DefaultLayout>
    
    )
}