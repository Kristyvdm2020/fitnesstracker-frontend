import React, {useState} from "react";
import { loginUser } from "../api/fetch";

export const ViewLogin = ({setToken}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (

<div className="login">
    <h1>Login to WerkIT</h1>
    <form onSubmit={async(ev) => {
        
        try {
            ev.preventDefault();
            const token = await loginUser(username, password);
            setToken(token);
            console.log('login success');
        }
        catch (error){
            console.error(error);
        }
    }}>
        <input
            placeholder="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            />
        <input
            placeholder="password"
            type={'password'}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            />
            
        <button disabled ={!username || !password}>Log In</button> 
        {/* Grays out button if there is no input ^^^^ */}

    </form>
</div>
        )};