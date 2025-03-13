import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from "react-router-dom";

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [password, setPassword] = useState('');
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();


    // Verificar si el usuario es admin
    // const isAdmin = store.admin?.role === "admin";

    // useEffect(() => {
    //     if (!isAdmin) {
    //         navigate("/"); // Redirigir a la página de inicio si no es admin
    //     }
    // }, [isAdmin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.AddDoctor(name, email, specialty, password);
        if (store.doctor) {
            navigate("/");
        }
    };

    // Si no es admin, no renderiza nada mientras redirige
    // if (!isAdmin) return null;

    return (
        <div className='container col-md-6 card card-body mt-3'>
            <h2>Registro de Doctores</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label><br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Especialidad:</label><br />
                    <select 
                        value={specialty} 
                        onChange={(e) => setSpecialty(e.target.value)} 
                        required
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

                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='btn btn-primary mt-3'>Registrar</button>
            </form>
        </div>
    );
}

export default AddDoctor;