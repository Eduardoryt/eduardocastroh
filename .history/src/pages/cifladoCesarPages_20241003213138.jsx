import { useState, useRef } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { MySidebar } from '../components/MySidebar.jsx';
import '../css/cifrado.css';

export const CifradoCesarPages = () => {
  const [mensaje, setMensaje] = useState('');
  const [desplazamiento, setDesplazamiento] = useState('');
  const [resultadoCifrado, setResultadoCifrado] = useState('');
  const [mensajeCifrado, setMensajeCifrado] = useState('');
  const [desplazamientoDelCifrado, setDesplazamientoDelCifrado] = useState('');
  const [resultadoDescifrado, setResultadoDescifrado] = useState('');
  const [visible, setVisible] = useState(false);
  const toastRef = useRef(null); // Referencia para el Toast

  // Función para cifrar el mensaje con el algoritmo de César
  const cifrarCesar = (texto, desplazamiento) => {
    let cifrado = '';
    for (let i = 0; i < texto.length; i++) {
      let charCode = texto.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        cifrado += String.fromCharCode(((charCode - 65 + desplazamiento) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        cifrado += String.fromCharCode(((charCode - 97 + desplazamiento) % 26) + 97);
      } else {
        cifrado += texto.charAt(i);
      }
    }
    return cifrado;
  };

  // Función para manejar el clic en el botón "cifrar"
  const manejarCifrado = () => {
    const despl = parseInt(desplazamiento);
    if (isNaN(despl) || mensaje.trim() === '') {
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Por favor, ingrese un mensaje y un desplazamiento válido.', life: 3000 });
      return;
    }
    const textoCifrado = cifrarCesar(mensaje, despl);
    setResultadoCifrado(textoCifrado);
    toastRef.current.show({ severity: 'success', summary: 'Cifrado Exitoso', detail: 'El mensaje ha sido cifrado.', life: 3000 });
  };

  // Función para manejar el clic en el botón "descifrar"
  const manejarDescifrado = () => {
    const despl = parseInt(desplazamientoDelCifrado);
    if (isNaN(despl) || mensajeCifrado.trim() === '') {
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Por favor, ingrese un mensaje cifrado y un desplazamiento válido.', life: 3000 });
      return;
    }
    const textoDescifrado = cifrarCesar(mensajeCifrado, -despl);
    setResultadoDescifrado(textoDescifrado);
    toastRef.current.show({ severity: 'success', summary: 'Descifrado Exitoso', detail: 'El mensaje ha sido descifrado.', life: 3000 });
  };

  // Función para copiar el resultado del cifrado al portapapeles
  const copiarCifradoAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto).then(() => {
      toastRef.current.show({ severity: 'info', summary: 'Copiado', detail: 'Texto copiado al portapapeles', life: 3000 });
    });
  };

  // Función para copiar el resultado del descifrado al portapapeles
  const copiarDescifradoAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto).then(() => {
      toastRef.current.show({ severity: 'info', summary: 'Copiado', detail: 'Texto copiado al portapapeles', life: 3000 });
    });
  };

  return (
    <div className="app-container">
      <Toast ref={toastRef} />

      <div className="form-container">
        <div className="form-container" style={{ display: 'flex', alignItems: 'flex-start' }}>
          <MySidebar visible={visible} onHide={() => setVisible(false)} />
          <Button icon="pi pi-align-left" onClick={() => setVisible(true)} />

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginLeft: '20px' }}>
            <h2 style={{ margin: '0' }}>Cifrado y Descifrado César</h2>
          </div>
        </div>

        <div className="columns-container">
          {/* Sección de Cifrado */}
          <div className="cifrado-container">
            <h3>Cifrado</h3>
            <div className="input-group">
              <FloatLabel>
                <InputText
                  id="mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
                <label htmlFor="mensaje">Mensaje a cifrar</label>
              </FloatLabel>
            </div>
            <div className="input-group">
              <FloatLabel>
                <InputText
                  id="desplazamiento"
                  value={desplazamiento}
                  onChange={(e) => setDesplazamiento(e.target.value)}
                />
                <label htmlFor="desplazamiento">Desplazamiento</label>
              </FloatLabel>
            </div>
            <button className="btn-cifrar" onClick={manejarCifrado}>Cifrar</button>

            <div className="result-container">
              <h4>Resultado del Cifrado:</h4>
              <div className="resultado-container">
                <span className="resultado">{resultadoCifrado}</span>
                <Button
                  className="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 btn-icon"
                  icon="pi pi-bookmark"
                  onClick={() => copiarCifradoAlPortapapeles(resultadoCifrado)}
                />
              </div>
            </div>
          </div>

          {/* Sección de Descifrado */}
          <div className="descifrado-container">
            <h3>Descifrado</h3>
            <div className="input-group">
              <FloatLabel>
                <InputText
                  id="mensajeCifrado"
                  value={mensajeCifrado}
                  onChange={(e) => setMensajeCifrado(e.target.value)}
                />
                <label htmlFor="mensajeCifrado">Mensaje a descifrar</label>
              </FloatLabel>
            </div>
            <div className="input-group">
              <FloatLabel>
                <InputText
                  id="desplazamientoDelCifrado"
                  value={desplazamientoDelCifrado}
                  onChange={(e) => setDesplazamientoDelCifrado(e.target.value)}
                />
                <label htmlFor="desplazamientoDelCifrado">Desplazamiento</label>
              </FloatLabel>
            </div>
            <button className="btn-descifrar" onClick={manejarDescifrado}>Descifrar</button>

            <div className="result-container">
              <h4>Resultado del Descifrado:</h4>
              <div className="resultado-container">
                <span className="resultado">{resultadoDescifrado}</span>
                <Button
                  className="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 btn-icon"
                  icon="pi pi-bookmark"
                  onClick={() => copiarDescifradoAlPortapapeles(resultadoDescifrado)}
                />
              </div>
            </div>
          </div>
        </div>
        <h4 style={{color:"#000"}}>Eduardo Castro Hernandez 7:A</h4>
      </div>
    </div>
  );
};