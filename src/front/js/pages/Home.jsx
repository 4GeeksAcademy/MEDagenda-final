import React from "react";
import "../../styles/home.css";

import { useNavigate } from "react-router-dom";





const Home = () => {
    const navigate = useNavigate()
    return (
            <div className="container my-5">
              <div className="card border-white">
                <div className="row g-0 d-flex align-items-center">
                  
                  {/* Texto a la izquierda */}
                  <div className="col-md-6 p-4">
                    <h1>Cuidamos tu salud con profesionalismo</h1>
                    <h5>Agenda tu cita médica de forma rápida y sencilla con los mejores especialistas.</h5>
                    <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate("/registroPacientes")}>
                      Agendar
                    </button>
                  </div>
        
                  {/* Imagen a la derecha */}
                  <div className="col-md-6">
                    <img 
                      src="https://growmedical.org/wp-content/uploads/2019/01/Paginas-web-para-medicos.jpg"
                      className="img-fluid rounded-end"
                      alt="Imagen Médica"
                    />
                  </div>
        
                </div>
              </div>
            </div>
          );
};

export default Home;



