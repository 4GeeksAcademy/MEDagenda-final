import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext'; 
import { Link, useNavigate } from "react-router-dom";

const LogInAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions, store } = useContext(Context); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.logInAdmin(name, email, password); 
        if (store.admin) {
            navigate("/panel/admin");
    };
};
 useEffect(() => {
        if (store.admin && store.admin.role) {
            if (store.admin.role === 'admin') {
                navigate("/panel/admin");
            } else {
                navigate("/logInAdmin");
            }
        }
    }, [store.admin, navigate]);
    

    return (
        <div className="container">
            <h1>Iniciar sesion ADMINISTRADOR</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /> <br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> <br />


                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> <br />
                <button className='btn btn-primary mt-3' type="submit">Iniciar Sesión</button>
                {store.message && <p>{store.message}</p>}
            </form>
        </div>
    );
};

export default LogInAdmin;