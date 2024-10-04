import { useState, useRef } from "react";
import { JSEncrypt } from "jsencrypt";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { MySidebar } from '../components/MySidebar.jsx';
import '../css/cifradoRSA.css';

export const CifradoRSA = () => {
    const encryptor = new JSEncrypt();
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [plainText, setPlainText] = useState("");
    const [cipherText, setCipherText] = useState("");
    const [decryptedText, setDecryptedText] = useState("");
    const [visible, setVisible] = useState(false);
    const toastRef = useRef(null); // Referencia para el Toast

    // Generar claves RSA
    const generateKeys = () => {
        const generatedPublicKey = encryptor.getPublicKey();
        const generatedPrivateKey = encryptor.getPrivateKey();
        setPublicKey(generatedPublicKey);
        setPrivateKey(generatedPrivateKey);
        showToast("Claves RSA generadas con éxito."); // Notificación de éxito
    };

    // Cifrar el texto plano
    const encrypt = () => {
        if (!publicKey) {
            showToast("Por favor, genera las claves primero."); // Notificación de error
            return;
        }
        if (!plainText) {
            showToast("Por favor, ingresa el texto que deseas cifrar."); // Notificación de error
            return;
        }

        encryptor.setPublicKey(publicKey);
        const cipher = encryptor.encrypt(plainText);
        setCipherText(cipher || "Error en el cifrado");
        setDecryptedText("");
        showToast("Texto cifrado con éxito."); // Notificación de éxito
    };

    // Descifrar el texto cifrado
    const decrypt = () => {
        if (!privateKey) {
            showToast("Por favor, genera las claves primero."); // Notificación de error
            return;
        }
        if (!cipherText) {
            showToast("Por favor, cifra el texto primero."); // Notificación de error
            return;
        }

        encryptor.setPrivateKey(privateKey);
        const decrypted = encryptor.decrypt(cipherText);
        setDecryptedText(decrypted || "Error en el descifrado");
        showToast("Texto descifrado con éxito."); // Notificación de éxito
    };

    // Mostrar notificación
    const showToast = (message) => {
        toastRef.current.show({ severity: 'info', summary: 'Información', detail: message, life: 3000 });
    };

    return (
        <main className="app-container">
            <Toast ref={toastRef} />
            <div className="form-container">
                <MySidebar visible={visible} onHide={() => setVisible(false)} />
                <Button icon="pi pi-align-left" onClick={() => setVisible(true)} />

                <h2>Cifrado/Descifrado RSA</h2>

                <button className="generate-button" onClick={generateKeys}>
                    Generar Claves RSA
                </button>

                <div className="keys-section">
                    <h2>Claves RSA</h2>
                    <div className="key-container">
                        <div className="key-box">
                            <h3>Clave Pública:</h3>
                            <pre className="key-display">{publicKey || "No disponible"}</pre>
                        </div>
                        <div className="key-box">
                            <h3>Clave Privada:</h3>
                            <pre className="key-display">{privateKey || "No disponible"}</pre>
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
