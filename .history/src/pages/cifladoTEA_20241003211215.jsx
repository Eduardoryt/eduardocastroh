import  { useState } from 'react';
import TEA from 'tea-js';

const TEAForm = () => {
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');

    // Función para añadir padding al mensaje
    const padMessage = (message) => {
        const blockSize = 8; // Tamaño de bloque para TEA (8 bytes)
        const paddingLength = blockSize - (message.length % blockSize);
        const paddedMessage = message + String.fromCharCode(paddingLength).repeat(paddingLength);
        return paddedMessage;
    };

    // Función para quitar padding del mensaje
    const unpadMessage = (paddedMessage) => {
        const paddingLength = paddedMessage.charCodeAt(paddedMessage.length - 1);
        return paddedMessage.slice(0, -paddingLength);
    };

    // Función para cifrar el mensaje
    const encryptMessage = () => {
        if (key.length !== 16) {
            alert('La clave debe tener exactamente 16 caracteres.');
            return;
        }

        const paddedMessage = padMessage(message);
        const encrypted = [];

        for (let i = 0; i < paddedMessage.length; i += 8) {
            const block = paddedMessage.slice(i, i + 8);
            const encryptedBlock = TEA.encrypt(block, key);
            encrypted.push(encryptedBlock);
        }

        setEncryptedMessage(encrypted.join(', '));
        setDecryptedMessage(''); // Limpiar el mensaje descifrado
    };

    // Función para descifrar el mensaje
    const decryptMessage = () => {
        const encryptedBlocks = encryptedMessage.split(', ');

        let decrypted = '';
        for (const block of encryptedBlocks) {
            const decryptedBlock = TEA.decrypt(block, key);
            decrypted += decryptedBlock;
        }

        setDecryptedMessage(unpadMessage(decrypted));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Cifrado TEA</h2>
            <div>
                <label>
                    Mensaje:
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="4"
                        style={{ width: '100%', marginTop: '8px' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Clave (16 caracteres):
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        maxLength="16"
                        style={{ width: '100%', marginTop: '8px' }}
                    />
                </label>
            </div>
            <button onClick={encryptMessage} style={{ marginTop: '16px' }}>
                Cifrar
            </button>
            <div>
                <h3>Mensaje Cifrado:</h3>
                <p>{encryptedMessage}</p>
            </div>
            <button onClick={decryptMessage} style={{ marginTop: '16px' }}>
                Descifrar
            </button>
            <div>
                <h3>Mensaje Descifrado:</h3>
                <p>{decryptedMessage}</p>
            </div>
        </div>
    );
};

export default TEAForm;
