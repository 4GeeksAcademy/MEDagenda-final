import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-black text-white py-4" style={{ bottom: 0, width: '100%', backgroundImage: 'linear-gradient(to right,rgb(18, 146, 116),rgb(30, 91, 148))', color: '#ffffff',
      padding: '2rem', marginTop:"450px"}}>
      <div className="container">
        <div className="d-flex" >
          
          <div className="" >
            <h5>MEDagenda</h5>
            <p>
              Dirección: Calle Ejemplo 123, Ciudad, País
              <br />
              Teléfono: (123) 456-7890
              <br />
              Email: contacto@medagenda.com
            </p>
          </div>
          <div className="text-md-right ms-auto" >
            <h5>Redes Sociales</h5>
            <a href="https://www.facebook.com/medagenda" className="text-white mr-3" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a><br />
            <a href="https://www.twitter.com" className="text-white mr-3" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a><br />
            <a href="https://www.instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <br />
            <Link to="/preguntasfrecuentes"> FAQ's</Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <small>&copy; {new Date().getFullYear()} MEDagenda. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
};

export default Footer;