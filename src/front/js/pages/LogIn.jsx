import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LogIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const success = await actions.logIn(name, email, password);
        setLoading(false);

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
        <div className="d-flex justify-content-center  vh-100" style={{ background: "linear-gradient(135deg,rgb(3, 3, 94), #2196F3)" }}>
            <div className="card p-4 shadow mt-5" style={{ width: "30rem", height: "30rem", borderRadius: "15px", backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
                <h1 className="text-center text-primary mb-5">Iniciar sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-control border-success shadow"
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control border-success shadow"
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control border-success shadow"
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg w-100 shadow mt-3 mb-3 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: "#2196F3", color: "white", border: "none" }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </button>
                    {error && <p className="text-danger text-center mt-2">{error}</p>}
                    <Link to="/registroPacientes">
                        <button className="btn btn-lg w-100 shadow mt-3 btn-success" style={{ backgroundColor: "#2196F6", color: "white", border: "none" }} disabled={loading}>
                            Registrate
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LogIn;