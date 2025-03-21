import React from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
const navigate = useNavigate ()
    return (
        <div className="container">
            <div className="card w-50 text-bg-white border-white">
                <div><img style={{paddingTop:"20px", marginLeft:"647px"}} src ="https://growmedical.org/wp-content/uploads/2019/01/Paginas-web-para-medicos.jpg" 
                className="card-img" alt="imagen"/></div>
                    <div className="card-img-overlay" style={{paddingTop:"60PX"}}>
                    <h1> Cuidamos tu salud con profesionalismo</h1>
                    <h5>Agenda tu cita médica de forma rápida y sencilla con los mejores especialistas.</h5>
                    <button className="btn btn-primary btn-lg" onClick={()=> navigate("/registroPacientes")}>Agendar</button>
                    </div>
                   
            </div>

        </div>
    );
};

export default Home;



