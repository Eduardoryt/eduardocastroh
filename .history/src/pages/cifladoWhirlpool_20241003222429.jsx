import { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { MySidebar } from '../components/MySidebar.jsx';
import { whirlpool } from 'js-sha512'; // Importar la función de hash Whirlpool
import '../css/.css'; // Asegúrate de crear este archivo CSS

export const CifradoWhirlpool = () => {
    const [inputText, setInputText] = useState("");
    const [hashedText, setHashedText] = useState("");
    const [visible, setVisible] = useState(false);
    const toastRef = useRef(null); // Referencia para el Toast

    // Función para calcular el hash
    const hashInput = () => {
        if (!inputText) {
            showToast("Por favor, ingresa el texto que deseas hashear."); // Notificación de error
            return;
        }

        const hash = whirlpool(inputText);
        setHashedText(hash);
        showToast("Texto hasheado con éxito."); // Notificación de éxito
    };

    // Copiar hash al portapapeles
    const copyToClipboard = () => {
        if (hashedText) {
            navigator.clipboard.writeText(hashedText)
                .then(() => showToast("Texto hasheado copiado al portapapeles."))
                .catch(() => showToast("Error al copiar el texto."));
        } else {
            showToast("No hay hash para copiar.");
        }
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

                <h2>Hashing con Whirlpool</h2>

                <div className="text-section">
                    <h2>Texto a Hashear:</h2>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ingresa el texto aquí..."
                    ></textarea>

                    <button className="action-button" onClick={hashInput}>
                        Hashear
                    </button>
                    <h2>Hash:</h2>
                    <div className="hash-container">
                        <p className="hash-text">{hashedText || "No hasheado aún."}</p>
                        <button className="action-button" onClick={copyToClipboard} disabled={!hashedText}>
                            Copiar
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
