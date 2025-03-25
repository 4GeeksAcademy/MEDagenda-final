import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [password, setPassword] = useState('');
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.AddDoctor(name, email, specialty, password);
        if (store.doctor) {
            navigate("/");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg,rgb(3, 3, 94), #2196F3)" }}>
            <div className="card p-4 shadow" style={{ width: "30rem", height: "35rem", borderRadius: "15px", backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
                <h1 className="text-center"> <strong>REGISTRO DE DOCTOR</strong></h1><br />
                <h3 className="text-center">AGREGAR UN DOCTOR</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-control border-success shadow"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control border-success shadow"
                        />
                    </div>
                    <div className="mb-3">
                        <select 
                            value={specialty} 
                            onChange={(e) => setSpecialty(e.target.value)} 
                            required
                            className="form-control border-success shadow"
                        >
                            <option value="">Selecciona una especialidad</option>
                            <option value="Medicina General">Medicina General</option>
                            <option value="Pediatría">Pediatría</option>
                            <option value="Ginecología y Obstetricia">Ginecología y Obstetricia</option>
                            <option value="Cardiología">Cardiología</option>
                            <option value="Dermatología">Dermatología</option>
                            <option value="Ortopedia y Traumatología">Ortopedia y Traumatología</option>
                            <option value="Neurología">Neurología</option>
                            <option value="Oftalmología">Oftalmología</option>
                            <option value="Otorrinolaringología">Otorrinolaringología</option>
                            <option value="Endocrinología">Endocrinología</option>
                        </select>
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
                    <button type="submit" className="btn btn-lg w-100 mt-3 shadow" style={{ backgroundColor: "#2196F3", color: "white", border: "none" }}>REGISTRAR</button>
                </form>
            </div>
        </div>
    );
}

export default AddDoctor;