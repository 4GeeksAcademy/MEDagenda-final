import React from 'react';
import AddDoctor from './AddDoctor.jsx';

import { useNavigate } from 'react-router-dom';
const PanelAdmin = () => {  




    return (
        <div className='container'>
            <h1>Panel de Administración</h1>
            <p>Bienvenido al panel de administración.</p>
            <h2> < AddDoctor /> </h2> 
         
        </div>
    );
};

export default PanelAdmin;