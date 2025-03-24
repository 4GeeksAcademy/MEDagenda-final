import React from 'react';
import AddDoctor from './AddDoctor.jsx';
import { useNavigate } from 'react-router-dom';

const PanelAdmin = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ background: "#dcdcdc" }}>
            <div className="container">
                <h1 className="text-center text-dark mb-4 mt-3"><strong>Panel de Administración</strong></h1>
                <p className="text-center text-secondary">Bienvenido al panel de administración.</p>
                <hr />
                <AddDoctor />
            </div>
        </div>
    );
};

export default PanelAdmin;
