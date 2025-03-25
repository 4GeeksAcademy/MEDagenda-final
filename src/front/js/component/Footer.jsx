import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-black text-white " style={{ bottom: 0, width: '100%', background: "linear-gradient(135deg,rgb(5, 3, 114), #2196F3)",  color: '#ffffff',
       position:'fixed'}}>

      <div className="container">
        <div className="d-flex" >
          
          <div className="" >
            <h5>NovaMed</h5>
            <p>
              Dirección: Calle Ejemplo 123, Ciudad, País
              <br />
              Teléfono: (123) 456-7890
              <br />
              Email: contacto@NovaMed.com
            </p>
          </div>
          <div className="text-md-right ms-auto" >
            <h5>Redes Sociales</h5>
            <a href="https://www.facebook.com" className="text-white mr-3" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a><br />
            <a href="https://www.twitter.com" className="text-white mr-3" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a><br />
            <a href="https://www.instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <br />
            <Link to="/preguntasfrecuentes" className="text-white" target="_blank"> PREGUNTAS</Link>
          </div>
        </div>
      </div>
      <div className="text-center">
        <small>&copy; {new Date().getFullYear()} NovaMed. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
};

export default Footer;