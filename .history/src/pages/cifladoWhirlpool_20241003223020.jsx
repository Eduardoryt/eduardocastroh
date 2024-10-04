import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { MySidebar } from '../components/MySidebar.jsx';
import { Whirlpool, encoders } from 'whirlpool-hash'; // Asegúrate de tener whirlpool-hash instalado
import '../css/cifradoWhirlpool.css'; // Asegúrate de crear este archivo CSS

const whirlpool = new Whirlpool(); 

export const Cifradohash = () => {
    const [plaintextHash, setPlaintextHash] = useState("");
    const [hashedData, setHashedData] = useState("");
    const [hashResultText, setHashResultText] = useState("");
    const [visible, setVisible] = useState(false);
    const toastRef = useRef(null); // Referencia para el Toast

    // Función para calcular el hash
    const hashData = () => {
        if (plaintextHash) {
            const hash = whirlpool.getHash(plaintextHash); // Generar el hash
            setHashedData(hash);
            setHashResultText(`Hash generado (Whirlpool): ${encoders.toHex(hash)}`);
            showToast("Hash generado con éxito."); // Notificación de éxito
        } else {
            setHashResultText("Por favor, introduce un texto plano.");
        }
    };

    // Copiar hash al portapapeles
    const copyHashToClipboard = () => {
        navigator.clipboard.writeText(encoders.toHex(hashedData));
        showToast("Hash copiado al portapapeles.");
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

                <h1>Generador de Hash (Whirlpool)</h1>

                <div className="text-section">
                    <label htmlFor="plaintextHash">Texto Plano:</label>
                    <textarea
                        id="plaintextHash"
                        rows="4"
                        value={plaintextHash}
                        onChange={(e) => setPlaintextHash(e.target.value)}
                        placeholder="Introduce el texto aquí..."
                    ></textarea>

                    <button className="action-button" onClick={hashData}>
                        Generar Hash
                    </button>

                    <p className="result">{hashResultText}</p>

                    {hashedData && (
                        <div className="hashed-section">
                            <input
                                type="text"
                                value={encoders.toHex(hashedData)}
                                readOnly
                            />
                            <button className="copy-button" onClick={copyHashToClipboard}>
                                Copiar Hash
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

