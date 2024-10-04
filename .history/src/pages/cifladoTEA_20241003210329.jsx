import React, { useState } from 'react';

// Implementación básica del cifrado TEA
const teaEncrypt = (plaintext, key) => {
  // Convertir el texto plano en un array de enteros (pares de enteros)
  let v0 = plaintext.charCodeAt(0) << 16 | plaintext.charCodeAt(1);
  let v1 = plaintext.charCodeAt(2) << 16 | plaintext.charCodeAt(3);
  let sum = 0;
  const delta = 0x9e3779b9;
  const k0 = key.charCodeAt(0) << 24 | key.charCodeAt(1) << 16 | key.charCodeAt(2) << 8 | key.charCodeAt(3);
  const k1 = key.charCodeAt(4) << 24 | key.charCodeAt(5) << 16 | key.charCodeAt(6) << 8 | key.charCodeAt(7);
  const k2 = key.charCodeAt(8) << 24 | key.charCodeAt(9) << 16 | key.charCodeAt(10) << 8 | key.charCodeAt(11);
  const k3 = key.charCodeAt(12) << 24 | key.charCodeAt(13) << 16 | key.charCodeAt(14) << 8 | key.charCodeAt(15);

  for (let i = 0; i < 32; i++) {
    sum = (sum + delta) >>> 0;
    v0 = (v0 + ((v1 << 4) ^ (v1 >>> 5)) + (k0 ^ sum)) >>> 0;
    v1 = (v1 + ((v0 << 4) ^ (v0 >>> 5)) + (k1 ^ sum)) >>> 0;
  }

  return [v0, v1];
};

export const CifradoTEA = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const encryptionKey = '1234567890abcdef'; // Clave de 128 bits (16 caracteres)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Encriptar los datos del formulario
    const encryptedNombre = teaEncrypt(formData.nombre, encryptionKey).join(',');
    const encryptedCorreo = teaEncrypt(formData.correo, encryptionKey).join(',');
    const encryptedContraseña = teaEncrypt(formData.contraseña, encryptionKey).join(',');

    setSubmittedData({
      nombre: encryptedNombre,
      correo: encryptedCorreo,
      contraseña: encryptedContraseña,
    });
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
          <h3>Datos Encriptados:</h3>
          <p><strong>Nombre:</strong> {submittedData.nombre}</p>
          <p><strong>Correo:</strong> {submittedData.correo}</p>
          <p><strong>Contraseña:</strong> {submittedData.contraseña}</p>
        </div>
      )}
    </div>
  );
};
