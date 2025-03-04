import React from 'react';

const data = [
  { id: 1, name: 'Doctor 1' },
  { id: 2, name: 'Doctor 2' },
  { id: 3, name: 'Doctor 3' },
  { id: 4, name: 'Doctor 4', foto: "data:image/jpeg;base64,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" },
  { id: 5, name: 'Doctor 5' },
  { id: 6, name: 'Doctor 6' },
  { id: 7, name: 'Doctor 7' },
  { id: 8, name: 'Doctor 8' },
  { id: 9, name: 'Doctor 9' },
  { id: 10, name: 'Doctor 10', descripcion:"hola" },
];

const Doctores = () => {
  return (
    <div>
      <h1>Lista de Doctores</h1>
      <ul>
        {data.map((doctor) => (<h2 key={doctor.id}>
          <li >{doctor.name}</li>
          <img src={doctor.foto} alt="icon.img" /><li>{doctor.descripcion}</li></h2
          >
          
        ))}
      </ul>
    </div>
  );
};

export default Doctores;