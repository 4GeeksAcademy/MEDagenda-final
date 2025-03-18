import React, {useState, useContext} from 'react'
import { Context } from '../store/appContext';


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'



const Pagos = () => {
    const {store, actions} = useContext(Context);
    // const {preferenceId, setPreferenceId} = useState(null)
    const { preferenceId } = store;
    
    initMercadoPago('APP_USR-d8201b68-3e98-413d-a445-fd07919fe2c6', { locale: 'es-AR' });

    const handlePayment = async () => {
        const id =  await actions.createPreference();
        if (id) {
          actions.setPreferenceId(id);
        }   
        console.log("ID de la preferencia de pago:", store.paymentPreferenceId);
      };


  return (
    <div className='container'>
        <div className='card'>
        <h1>Pagos</h1>

        <h3>Consulta medica</h3>
        <p>$50</p>
        
      <button className='btn btn-primary' onClick={handlePayment}>Mercado Pago</button>
      {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
      
      </div>
    </div>
  )
}

export default Pagos