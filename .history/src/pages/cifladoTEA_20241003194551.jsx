import React, { useState } from 'react';

// Implementación de TEA (Tiny Encryption Algorithm)
const teaEncrypt = (plaintext, key) => {
  const delta = 0x9e3779b9;
  let v0 = plaintext.charCodeAt(0), v1 = plaintext.charCodeAt(1);
  let sum = 0;

  for (let i = 0; i < 32; i++) {
    v0 += ((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]);
    v1 += ((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]);
    sum += delta;
  }
  return [v0, v1];
};

const teaDecrypt = (ciphertext, key) => {
  const delta = 0x9e3779b9;
  let v0 = ciphertext[0], v1 = ciphertext[1];
  let sum = delta * 32;

  for (let i = 0; i < 32; i++) {
    v1 -= ((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]);
    v0 -= ((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]);
    sum -= delta;
  }
  return String.fromCharCode(v0, v1);
};

export const CifradoTEA = () => {
  const [mensaje, setMensaje] = useState('');
  const [mensajeCifrado, setMensajeCifrado] = useState('');
  const [mensajeDescifrado, setMensajeDescifrado] = useState('');

  const cifrarMensaje = () => {
    const key = [0xA56BABCD, 0x00000000, 0x01234567, 0x89ABCDEF]; // Ejemplo de clave fija
    const cifrado = teaEncrypt(mensaje, key);
    setMensajeCifrado(cifrado.join(', '));
  };

  const descifrarMensaje = () => {
    const key = [0xA56BABCD, 0x00000000, 0x01234567, 0x89ABCDEF]; // Misma clave
    const cifrado = mensajeCifrado.split(',').map(Number);
    const descifrado = teaDecrypt(cifrado, key);
    setMensajeDescifrado(descifrado);
  };

  return (
    <div className="app-container">
      <h2>Cifrado TEA (Tiny Encryption Algorithm)</h2>

      <div className="form-container">
        <div className="input-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <input
            id="mensaje"
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Introduce el mensaje a cifrar"
          />
        </div>

        <button onClick={cifrarMensaje}>Cifrar</button>

        {mensajeCifrado && (
          <div className="result-container">
            <h4>Mensaje Cifrado:</h4>
            <textarea readOnly value={mensajeCifrado} rows="2" />
            <button onClick={descifrarMensaje}>Descifrar</button>
          </div>
        )}

        {mensajeDescifrado && (
          <div className="result-container">
            <h4>Mensaje Descifrado:</h4>
            <p>{mensajeDescifrado}</p>
          </div>
        )}
      </div>
    </div>
  );
};
