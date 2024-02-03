import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout"
import { useState } from "react";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";
import { useNavigate } from "react-router-dom";
import type { AuthResponse } from "../types/types";

export default function Login(){
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [errorResponse,setErrorResponse] = useState ("")
    const auth = useAuth();
    const goTo = useNavigate();


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if(response.ok){
                console.log("login successful")
                setErrorResponse("");
                const json = (await response.json()) as AuthResponse;
               
                if(json.body.accessToken && json.body.refreshToken ){
                    auth.saveUser(json)
                    goTo("/dashboard")
                }

                
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
                 <h1>Login</h1>
                 { !! errorResponse && <div className= "errorMessage">{errorResponse} </div>}

                 <label>Username</label>
                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        
                 <label>Password</label>
                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                 <button>
                   login
                 </button>

             </form>

        </DefaultLayout>
    
    )
}