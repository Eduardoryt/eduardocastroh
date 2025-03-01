import React, { useState } from "react";
import { JSEncrypt } from "jsencrypt";

const CifradoRSA = () => {
    const encryptor = new JSEncrypt();
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [plainText, setPlainText] = useState("");
    const [cipherText, setCipherText] = useState("");
    const [decryptedText, setDecryptedText] = useState("");

    const generateKeys = () => {
        const generatedPublicKey = encryptor.getPublicKey();
        const generatedPrivateKey = encryptor.getPrivateKey();
        setPublicKey(generatedPublicKey);
        setPrivateKey(generatedPrivateKey);
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
        setCipherText(cipher || "Error en el cifrado");
        setDecryptedText("");
    };

    const decrypt = () => {
        if (!privateKey) {
            alert("Por favor, genera las claves primero.");
            return;
        }
        if (!cipherText) {
            alert("Por favor, cifra el texto primero.");
            return;
        }

        encryptor.setPrivateKey(privateKey);
        const decrypted = encryptor.decrypt(cipherText);
        setDecryptedText(decrypted || "Error en el descifrado");
    };

    return (
        <main>
            <h1>Cifrado/Descifrado RSA</h1>
            <div className="container">
                <button className="generate-button" onClick={generateKeys}>
                    Generar Claves RSA
                </button>

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

                    <button className="action-button" onClick={encrypt}>
                        Cifrar
                    </button>
                    <h2>Cifrado:</h2>
                    <p className="cipher-text">{cipherText || "No cifrado aún."}</p>

                    <button className="action-button" onClick={decrypt}>
                        Descifrar
                    </button>
                    <h2>Texto Descifrado:</h2>
                    <p className="decrypted-text">{decryptedText || "No descifrado aún."}</p>
                </div>
            </div>
        </main>
    );
};
