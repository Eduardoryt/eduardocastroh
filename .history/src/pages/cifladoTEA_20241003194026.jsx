import { useState } from 'react';
import CryptoJS from 'crypto-js';

export const CifradoTES = () => {
    const [mensaje, setMensaje] = useState('');
    const [clave, setClave] = useState('');
    const [resultadoCifrado, setResultadoCifrado] = useState('');
    const [resultadoDescifrado, setResultadoDescifrado] = useState('');

    // Función para cifrar el mensaje
    const cifrarMensaje = () => {
        if (mensaje && clave) {
            const cifrado = CryptoJS.AES.encrypt(mensaje, clave).toString();
            setResultadoCifrado(cifrado);
        }
    };

    // Función para descifrar el mensaje
    const descifrarMensaje = () => {
        if (resultadoCifrado && clave) {
            const bytes = CryptoJS.AES.decrypt(resultadoCifrado, clave);
            const descifrado = bytes.toString(CryptoJS.enc.Utf8);
            setResultadoDescifrado(descifrado);
        }
    };

    return (
        <div className="app-container">
            <h2>Cifrado AES con CryptoJS</h2>
            <div className="form-container">
                <div className="input-group">
                    <label htmlFor="mensaje">Mensaje:</label>
                    <input
                        id="mensaje"
                        type="text"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder="Introduce el mensaje"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="clave">Clave:</label>
                    <input
                        id="clave"
                        type="password"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        placeholder="Introduce la clave"
                    />
                </div>
                <button className="btn-cifrar" onClick={cifrarMensaje}>
                    Cifrar
                </button>

                {resultadoCifrado && (
                    <div className="result-container">
                        <h4>Mensaje Cifrado:</h4>
                        <p>{resultadoCifrado}</p>
                        <button className="btn-descifrar" onClick={descifrarMensaje}>
                            Descifrar
                        </button>
                    </div>
                )}

                {resultadoDescifrado && (
                    <div className="result-container">
                        <h4>Mensaje Descifrado:</h4>
                        <p>{resultadoDescifrado}</p>
                    </div>
                )}
            </div>
        </div>
    );
};