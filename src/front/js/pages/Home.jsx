import React from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container my-5">
            {/* Sección principal */}
            <div className="card border-white shadow-lg">
                <div className="row g-0 d-flex align-items-center">
                    
                    {/* Texto a la izquierda */}
                    <div className="col-md-6 p-4">
                        <h1 className="fw-bold text-primary">Cuidamos tu salud con profesionalismo</h1>
                        <p className="text-muted">Agenda tu cita médica de forma rápida y sencilla con los mejores especialistas.</p>
                        <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate("/registroPacientes")}>
                            Agendar Cita
                        </button>
                    </div>

                    {/* Imagen a la derecha */}
                    <div className="col-md-6">
                        <img 
                            src="https://growmedical.org/wp-content/uploads/2019/01/Paginas-web-para-medicos.jpg"
                            className="img-fluid rounded-end"
                            alt="Consulta médica"
                        />
                    </div>
                </div>
            </div>
            
            {/* Sección de Beneficios */}
            <div className="mt-5 text-center">
                <h2 className="text-secondary">¿Por qué elegirnos?</h2>
                <div className="row mt-4">
                    <div className="col-md-6 d-flex align-items-stretch shadow">
                        <div className="card border-white shadow-sm p-4 w-100">
                            <img src="https://img.freepik.com/foto-gratis/medico-enfermeras-equipos-especiales_23-2148980721.jpg?semt=ais_hybrid" alt="Especialistas" className="img-fluid rounded" />
                            <h5 className="mt-3">Médicos Especializados</h5>
                            <p className="text-muted">Contamos con los mejores profesionales en cada área de la salud, precios accesibles pensando en tu bienestar y en el de tu familia.</p>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch shadow">
                        <div className="card border-white shadow-sm p-4 w-100">
                            <img src="https://www.shutterstock.com/image-vector/calendar-icon-abstract-month-calender-600nw-2508794073.jpg" alt="Citas Rápidas" className="img-fluid rounded" />
                            <h5 className="mt-3">Citas Rápidas y Seguras</h5>
                            <p className="text-muted">Agenda tu cita en sencillos pasos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
