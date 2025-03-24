import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const RegistroPacientes = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { actions, store } = useContext(Context); // Obtener acciones y store del contexto
  const navigate = useNavigate(); // Hook para la navegación programática

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.RegistroPacientes(name, email, password);
    // Si la acción de registro actualiza store.user o alguna otra propiedad que indique éxito,
    // redirige a la ruta deseada. Por ejemplo, a la página de inicio:
    if (store.user) {
      navigate("/logIn");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg,rgb(3, 3, 94), #2196F3)" }}>
        <div className="card p-4 shadow" style={{ width: "30rem", height:"30rem", borderRadius: "15px", backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
            <h1 className="text-center"> <strong>REGISTRATE</strong></h1><br />
            <h3 className="text-center">CREA TU CUENTA</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control border-success shadow"
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control border-success shadow"
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
                    />
                </div>
                <button type="submit" className="btn btn-lg w-100 mt-3 shadow" style={{ backgroundColor: "#2196F3", color: "white", border: "none" }}>REGISTRARSE</button>
                {error && <p className="text-danger text-center mt-2">{error}</p>}
            </form>
        </div>
    </div>
);
}

export default RegistroPacientes;
