import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { MySidebar } from '../components/MySidebar.jsx';
import { Button } from 'primereact/button';
import '../css/cifradoTEA.css'; // Asegúrate de importar el archivo CSS

const DELTA = 0x9e3779b9;
const NUM_ROUNDS = 32;
let globalKey = null;

export const CifradoTEA = () => {
    const [userName, setUserName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [encryptedUserName, setEncryptedUserName] = useState('');
    const [encryptedAccount, setEncryptedAccount] = useState('');
    const [encryptedSecurityCode, setEncryptedSecurityCode] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [visible, setVisible] = useState(false);
    const toastRef = useRef(null); // Referencia para el Toast

    const teaEncrypt = (v, key) => {
        let [v0, v1] = v;
        let sum = 0;
        for (let i = 0; i < NUM_ROUNDS; i++) {
            sum = (sum + DELTA) >>> 0;
            v0 = (v0 + (((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]))) >>> 0;
            v1 = (v1 + (((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]))) >>> 0;
        }
        return [v0, v1];
    };

    const teaDecrypt = (v, key) => {
        let [v0, v1] = v;
        let sum = (DELTA * NUM_ROUNDS) >>> 0;
        for (let i = 0; i < NUM_ROUNDS; i++) {
            v1 = (v1 - (((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + key[3]))) >>> 0;
            v0 = (v0 - (((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + key[1]))) >>> 0;
            sum = (sum - DELTA) >>> 0;
        }
        return [v0, v1];
    };

    const strToUint32Array = (str) => {
        const blocks = [];
        for (let i = 0; i < str.length; i += 4) {
            let block = str.substr(i, 4).padEnd(4, " ");
            const v0 = block.charCodeAt(0) | (block.charCodeAt(1) << 16);
            const v1 = block.charCodeAt(2) | (block.charCodeAt(3) << 16);
            blocks.push([v0, v1]);
        }
        return blocks;
    };

    const generateTeaKey = () => {
        if (!globalKey) {
            globalKey = new Uint32Array([
                (Math.random() * 0xffffffff) >>> 0,
                (Math.random() * 0xffffffff) >>> 0,
                (Math.random() * 0xffffffff) >>> 0,
                (Math.random() * 0xffffffff) >>> 0,
            ]);
        }
        return globalKey;
    };

    const encryptData = () => {
        const key = generateTeaKey();
        const userNameBlocks = strToUint32Array(userName);
        const accountBlocks = strToUint32Array(accountNumber);
        const securityCodeBlocks = strToUint32Array(securityCode);

        setEncryptedUserName(userNameBlocks.map(block => bufferToHex(teaEncrypt(block, key))).join(","));
        setEncryptedAccount(accountBlocks.map(block => bufferToHex(teaEncrypt(block, key))).join(","));
        setEncryptedSecurityCode(securityCodeBlocks.map(block => bufferToHex(teaEncrypt(block, key))).join(","));
    };

    const decryptCustomData = (input) => {
        const key = globalKey;
        const inputBlocks = input.split(",").map(hexToBuffer);
        const decryptedBlocks = inputBlocks.map(block => teaDecrypt(block, key));
        setDecryptedText(decryptedBlocks.map(decryptedArray =>
            String.fromCharCode(
                decryptedArray[0] & 0xffff,
                (decryptedArray[0] >> 16) & 0xffff,
                decryptedArray[1] & 0xffff,
                (decryptedArray[1] >> 16) & 0xffff
            ).trim()
        ).join(""));
    };

    const hexToBuffer = (hex) => {
        const buffer = new Uint32Array(2);
        buffer[0] = parseInt(hex.substring(0, 8), 16) || 0;
        buffer[1] = parseInt(hex.substring(8, 16), 16) || 0;
        return buffer;
    };

    const bufferToHex = (buffer) => {
        return buffer.map(v => v.toString(16).padStart(8, "0")).join("");
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toastRef.current.show({ severity: 'success', summary: 'Éxito', detail: 'Texto copiado al portapapeles', life: 3000 });
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <div className="header-container">
                    <Toast ref={toastRef} />
                    <MySidebar visible={visible} onHide={() => setVisible(false)} />
                    <Button icon="pi pi-align-left" onClick={() => setVisible(true)} />
                    <h2 className="title">Cifrado y Descifrado TEA</h2>
                </div>

                <h2 className="text-black">Formulario de Seguridad - TEA -</h2>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="input-group">
                        <label htmlFor="userName" className="text-black">Nombre del Usuario:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            className="p-inputtext"
                            required
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="accountNumber" className="text-black">Número de Cuenta:</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            className="p-inputtext"
                            maxLength="16"
                            required
                            value={accountNumber}
                            onChange={e => setAccountNumber(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="securityCode" className="text-black">Código de Seguridad:</label>
                        <input
                            type="text"
                            id="securityCode"
                            name="securityCode"
                            className="p-inputtext"
                            maxLength="4"
                            required
                            value={securityCode}
                            onChange={e => setSecurityCode(e.target.value)}
                        />
                    </div>

                    <div className="button-group">
                        <Button type="button" className="btn-cifrar" onClick={encryptData}>Cifrar Datos</Button>
                        <Button type="button" className="btn-descifrar" onClick={() => decryptCustomData(decryptedText)}>
                            Desencriptar Datos
                        </Button>
                    </div>

                    <div className="result-container">
                        {[
                            { label: 'Nombre Cifrado:', value: encryptedUserName },
                            { label: 'Número de Cuenta Cifrado:', value: encryptedAccount },
                            { label: 'Código de Seguridad Cifrado:', value: encryptedSecurityCode },
                        ].map(({ label, value }, index) =>
                            value && (
                                <div key={index} className="resultado-container">
                                    <h4 className="text-black">{label}</h4>
                                    <div className="resultado">
                                        <span>{value}</span>
                                        <Button
                                            className="btn-icon"
                                            onClick={() => copyToClipboard(value)}
                                        >
                                            Copiar
                                        </Button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="input-group" style={{ marginTop: '20px' }}>
                        <label htmlFor="inputToDecrypt" className="text-black">Texto a desencriptar:</label>
                        <textarea
                            id="inputToDecrypt"
                            className="p-inputtext"
                            rows="4"
                            value={decryptedText}
                            onChange={e => setDecryptedText(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
