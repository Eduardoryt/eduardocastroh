import React, { useState } from 'react';
import NodeRSA from 'node-rsa'; // Importa la librería node-rsa

const CifradoRSA = () => {
  const [mensaje, setMensaje] = useState('');
  const [clavePrivada, setClavePrivada] = useState('');
  const [clavePublica, setClavePublica] = useState('');
  const [mensajeCifrado, setMensajeCifrado] = useState('');
  const [mensajeDescifrado, setMensajeDescifrado] = useState('');

  // Genera claves RSA (pública y privada)
  const generarClaves = () => {
    const rsa = new NodeRSA({ b: 512 }); // Longitud de clave de 512 bits
    setClavePrivada(rsa.exportKey('private'));
    setClavePublica(rsa.exportKey('public'));
  };

  // Cifra el mensaje con la clave pública
  const cifrarMensaje = () => {
    if (mensaje && clavePublica) {
      const rsa = new NodeRSA();
      rsa.importKey(clavePublica, 'public');
      const cifrado = rsa.encrypt(mensaje, 'base64');
      setMensajeCifrado(cifrado);
    }
  };

  // Descifra el mensaje con la clave privada
  const descifrarMensaje = () => {
    if (mensajeCifrado && clavePrivada) {
      const rsa = new NodeRSA();
      rsa.importKey(clavePrivada, 'private');
      const descifrado = rsa.decrypt(mensajeCifrado, 'utf8');
      setMensajeDescifrado(descifrado);
    }
  };

  return (
    <div className="app-container">
      <h2>Cifrado RSA (Rivest-Shamir-Adleman)</h2>

      <div className="form-container">
        <button onClick={generarClaves}>Generar Claves RSA</button>

        <div className="input-group">
          <label>Clave Pública:</label>
          <textarea readOnly value={clavePublica} rows="4" />
        </div>
        <div className="input-group">
          <label>Clave Privada:</label>
          <textarea readOnly value={clavePrivada} rows="4" />
        </div>

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
            <textarea readOnly value={mensajeCifrado} rows="4" />
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

export default CifradoRSA;
