import React, { useState } from "react";
import { JSEncrypt } from "jsencrypt";

const RSACipher = () => {
    const encryptor = new JSEncrypt();
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [plainText, setPlainText] = useState("");
    const [cipherText, setCipherText] = useState("");
    const [decryptedText, setDecryptedText] = useState("");

    const generateKeys = () => {
        const publicKey = encryptor.getPublicKey();
        const privateKey = encryptor.getPrivateKey();
        setPublicKey(publicKey);
        setPrivateKey(privateKey);
    };

    const encrypt = () => {
        if (!publicKey) {
            alert("Por favor, genera las claves primero.");
            return;
        }
        if (!plainText) {
            alert("Por favor, ingresa el texto que deseas cifrar.");
            return;
        }

        encryptor.setPublicKey(publicKey);
        const cipher = encryptor.encrypt(plainText);
        setCipherText(cipher);
        setDecryptedText("");
    };

    const decrypt = () => {
        if (!privateKey) {
            alert("Por favor, genera las claves primero.");
            return;
        }

        encryptor.setPrivateKey(privateKey);
        const decrypted = encryptor.decrypt(cipherText);
        setDecryptedText(decrypted);
    };

    return (
        <main>
            <h1>Cifrado/Descifrado RSA</h1>
            <div className="container">
                <button className="generate-button" onClick={generateKeys}>Generar Claves RSA</button>

                <div className="keys-section">
                    <h2>Claves RSA</h2>
                    <div className="key-container">
                        <div>
                            <h3>Clave Pública:</h3>
                            <pre>{publicKey || "No disponible"}</pre>
                        </div>
                        <div>
                            <h3>Clave Privada:</h3>
                            <pre>{privateKey || "No disponible"}</pre>
                        </div>
                    </div>
                </div>

                <div className="text-section">
                    <h2>Texto Plano:</h2>
                    <textarea
                        value={plainText}
                        onChange={(e) => setPlainText(e.target.value)}
                        placeholder="Ingresa el texto aquí..."
                    ></textarea>

                    <button className="action-button" onClick={encrypt}>Cifrar</button>
                    <h2>Cifrado:</h2>
                    <p className="cipher-text">{cipherText || "No cifrado aún."}</p>

                    <button className="action-button" onClick={decrypt}>Descifrar</button>
                    <h2>Texto Descifrado:</h2>
                    <p className="decrypted-text">{decryptedText || "No descifrado aún."}</p>
                </div>
            </div>

            <style jsx>{`
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    background-color: #e9f9e9; /* Fondo verde claro */
                    color: #333;
                    margin: 0;
                    padding: 20px;
                }

                h1 {
                    text-align: center;
                    color: #28a745; /* Color verde */
                    margin-bottom: 17px;
                }

                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .generate-button, .action-button {
                    background-color: #28a745; /* Color verde */
                    color: white;
                    border: none;
                    padding: 8px 12px; /* Reducido el tamaño */
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.3s;
                    font-size: 14px; /* Tamaño de fuente */
                    width: 150px; /* Ancho fijo */
                    margin: 10px auto; /* Centrarlos */
                    display: block; /* Para centrar el botón */
                }

                .generate-button:hover, .action-button:hover {
                    background-color: #218838; /* Verde más oscuro en hover */
                }

                .keys-section {
                    margin-top: 20px;
                    padding: 15px;
                    border: 1px solid #28a745; /* Borde verde */
                    border-radius: 8px;
                    background-color: #d4edda; /* Fondo verde claro */
                }

                .key-container {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                }

                pre {
                    background-color: #f0f0f0;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 10px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    max-height: 150px;
                    overflow-y: auto;
                    margin-top: 5px; /* Margen superior */
                }

                .text-section {
                    margin-top: 20px;
                }

                textarea {
                    width: 100%;
                    height: 80px; /* Aumento de altura */
                    margin-bottom: 10px;
                    padding: 10px;
                    border: 1px solid #28a745; /* Borde verde */
                    border-radius: 5px;
                    resize: none;
                    font-size: 14px; /* Tamaño de fuente */
                }

                .cipher-text, .decrypted-text {
                    background-color: #d4edda; /* Fondo verde claro */
                    padding: 10px;
                    border: 1px solid #28a745; /* Borde verde */
                    border-radius: 5px;
                    word-wrap: break-word;
                    margin-top: 5px; /* Margen superior */
                }
            `}</style>
        </main>
    );
};

export default RSACipher;
