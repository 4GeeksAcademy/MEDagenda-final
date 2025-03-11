import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { actions, store } = useContext(Context);
    const user = store.user?.role, doctor = store.doctor?.role, admin = store.admin?.role;
    const role = admin || doctor || user;

    const navigate = useNavigate();

    const handleLogout = () => {
       
        actions.logOut();
        navigate("/");
    };
   

    return (
        <nav className="navbar navbar-expand-lg bg-black navbar-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-decoration-none">MEDagenda</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        
                        {/* Mostrar opciones de inicio de sesión si no hay usuario autenticado */}
                        {!role && (
                            <>
                                <li className="nav-item">
                                    <Link to="/logInDoc" className="nav-link">LogIn Doctor</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logInAdmin" className="nav-link">LogIn Admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">LogIn</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registroPacientes" className="nav-link">Registrate</Link>
                                </li>
                            </>
                        )}

                        {/* Opciones específicas para cada rol */}
                        {role === "doctor" && (
                            <li className="nav-item">
                                <Link to="/editdoc" className="nav-link">Mi Perfil</Link> 
                               <li> 

                               <Link to="/pacientes" className="nav-link">Mis Pacientes</Link>

                               </li>
                            </li>  
                           
                        )}

                        {role === "admin" && (
                            <li className="nav-item">
                                <Link to="/panel/admin" className="nav-link">Panel Admin</Link>
                            </li>
                        )}

                        {role === "user" && (
                            <>
                                <li className="nav-item">
                                    <Link to="/edituser" className="nav-link">Mi Perfil</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="specialtiesDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Especialidades
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="specialtiesDropdown">
                                        {[
                                            { name: "Medicina General", path: "/medicina-general" },
                                            { name: "Pediatría", path: "/pediatria" },
                                            { name: "Ginecología y Obstetricia", path: "/ginecologia" },
                                            { name: "Cardiología", path: "/cardiologia" },
                                            { name: "Dermatología", path: "/dermatologia" },
                                            { name: "Ortopedia y Traumatología", path: "/ortopedia" },
                                            { name: "Neurología", path: "/neurologia" },
                                            { name: "Oftalmología", path: "/oftalmologia" },
                                            { name: "Otorrinolaringología", path: "/otorrinolaringologia" },
                                            { name: "Endocrinología", path: "/endocrinologia" }
                                        ].map((item, index) => (
                                            <li key={index}>
                                                <Link className="dropdown-item" to={item.path}>{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </>
                        )}

                        {/* Botón de cerrar sesión (visible solo si hay usuario autenticado) */}
                        {role && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Cerrar Sesión</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
