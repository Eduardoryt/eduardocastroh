import  { useState } from 'react';

export const CifradoTEA = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div>
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Enviar</button>
      </form>

      {submittedData && (
        <div>
          <h3>Datos enviados:</h3>
          <p><strong>Nombre:</strong> {submittedData.nombre}</p>
          <p><strong>Correo:</strong> {submittedData.correo}</p>
          <p><strong>Contraseña:</strong> {submittedData.contraseña}</p>
        </div>
      )}
    </div>
  );
};
