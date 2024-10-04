<script>
  import { onMount } from 'svelte';
  import { Toast } from 'primereact/toast';
  import { InputText } from 'primereact/inputtext';
  import { Button } from 'primereact/button';
  import FloatLabel from './FloatLabel.svelte'; // Asegúrate de tener este componente
  import MySidebar from './MySidebar.svelte'; // Asegúrate de tener este componente
  let mensaje = '';
  let desplazamiento = '';
  let resultadoCifrado = '';
  let mensajeCifrado = '';
  let desplazamientoDelCifrado = '';
  let resultadoDescifrado = '';
  let visible = false;
  let toastRef;

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
      toastRef.show({ severity: 'error', summary: 'Error', detail: 'Por favor, ingrese un mensaje y un desplazamiento válido.', life: 3000 });
      return;
    }
    const textoCifrado = cifrarCesar(mensaje, despl);
    resultadoCifrado = textoCifrado;
    toastRef.show({ severity: 'success', summary: 'Cifrado Exitoso', detail: 'El mensaje ha sido cifrado.', life: 3000 });
  };

  // Función para manejar el clic en el botón "descifrar"
  const manejarDescifrado = () => {
    const despl = parseInt(desplazamientoDelCifrado);
    if (isNaN(despl) || mensajeCifrado.trim() === '') {
      toastRef.show({ severity: 'error', summary: 'Error', detail: 'Por favor, ingrese un mensaje cifrado y un desplazamiento válido.', life: 3000 });
      return;
    }
    const textoDescifrado = cifrarCesar(mensajeCifrado, -despl);
    resultadoDescifrado = textoDescifrado;
    toastRef.show({ severity: 'success', summary: 'Descifrado Exitoso', detail: 'El mensaje ha sido descifrado.', life: 3000 });
  };

  // Función para copiar el resultado al portapapeles
  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto).then(() => {
      toastRef.show({ severity: 'info', summary: 'Copiado', detail: 'Texto copiado al portapapeles', life: 3000 });
    });
  };
</script>

<div class="app-container">
  <Toast bind:this={toastRef} />

  <div class="form-container">
    <div class="form-container" style="display: flex; align-items: flex-start;">
      <MySidebar visible={visible} onHide={() => (visible = false)} />
      <Button icon="pi pi-align-left" onClick={() => (visible = true)} />

      <div style="flex: 1; display: flex; justify-content: center; margin-left: 20px;">
        <h2 style="margin: 0;">Cifrado y Descifrado César</h2>
      </div>
    </div>

    <div class="columns-container">
      <!-- Sección de Cifrado -->
      <div class="cifrado-container">
        <h3>Cifrado</h3>
        <div class="input-group">
          <FloatLabel>
            <InputText
              id="mensaje"
              bind:value={mensaje}
            />
            <label for="mensaje">Mensaje a cifrar</label>
          </FloatLabel>
        </div>
        <div class="input-group">
          <FloatLabel>
            <InputText
              id="desplazamiento"
              bind:value={desplazamiento}
            />
            <label for="desplazamiento">Desplazamiento</label>
          </FloatLabel>
        </div>
        <button class="btn-cifrar" on:click={manejarCifrado}>Cifrar</button>

        <div class="result-container">
          <h4>Resultado del Cifrado:</h4>
          <div class="resultado-container">
            <span class="resultado">{resultadoCifrado}</span>
            <Button
              class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 btn-icon"
              icon="pi pi-bookmark"
              on:click={() => copiarAlPortapapeles(resultadoCifrado)}
            />
          </div>
        </div>
      </div>

      <!-- Sección de Descifrado -->
      <div class="descifrado-container">
        <h3>Descifrado</h3>
        <div class="input-group">
          <FloatLabel>
            <InputText
              id="mensajeCifrado"
              bind:value={mensajeCifrado}
            />
            <label for="mensajeCifrado">Mensaje a descifrar</label>
          </FloatLabel>
        </div>
        <div class="input-group">
          <FloatLabel>
            <InputText
              id="desplazamientoDelCifrado"
              bind:value={desplazamientoDelCifrado}
            />
            <label for="desplazamientoDelCifrado">Desplazamiento</label>
          </FloatLabel>
        </div>
        <button class="btn-descifrar" on:click={manejarDescifrado}>Descifrar</button>

        <div class="result-container">
          <h4>Resultado del Descifrado:</h4>
          <div class="resultado-container">
            <span class="resultado">{resultadoDescifrado}</span>
            <Button
              class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 btn-icon"
              icon="pi pi-bookmark"
              on:click={() => copiarAlPortapapeles(resultadoDescifrado)}
            />
          </div>
        </div>
      </div>
    </div>
    <h4 style="color:#000;">Eduardo Castro Hernandez 7:A</h4>
  </div>
</div>

<style>
  /* Añade tus estilos aquí */
</style>
