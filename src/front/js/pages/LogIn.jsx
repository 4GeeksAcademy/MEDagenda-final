import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";


const LogIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.logIn(name, email, password);
        if (!success) {
            setError("Credenciales incorrectas");
        }
    };

    useEffect(() => {
        if (store.user && store.user.role) {
            if (store.user.role === 'admin') {
                navigate("/panel/admin");
            } else if (store.user.role === 'user') {
                navigate("/");
            } else {
                navigate("/logIn");
            }
        }
    }, [store.user, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg,rgb(3, 3, 94), #2196F3)" }}>
            <div className="card p-4 shadow-lg" style={{ width: "22rem", borderRadius: "15px", backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
                <h1 className="text-center text-primary">Iniciar sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-control border-success"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control border-success"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control border-success"
                        />
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: "#2196F3", color: "white", border: "none" }}>Iniciar Sesión</button>
                    {error && <p className="text-danger text-center mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LogIn;
