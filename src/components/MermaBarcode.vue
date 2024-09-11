<template>
  <div class="container mt-5 merma-container p-4 shadow rounded">
    <button
      @click="toggleModoOscuro"
      class="btn btn-toggle-mode float-end mb-3"
    >
      <i :class="oscuro ? 'fas fa-sun' : 'fas fa-moon'"></i>
    </button>

    <h1 class="text-center mb-4 display-6 text-primary">
      <img
        src="https://img.icons8.com/ios-glyphs/50/000000/barcode-scanner.png"
        alt="Barcode Icon"
        style="width: 50px"
      />
      Generador de Código de Barras EAN-12
    </h1>

    <div class="mb-4">
      <label for="baseCode" class="form-label text-muted">Código Base:</label>
      <input
        v-model="baseCode"
        type="text"
        class="form-control form-control-lg rounded-pill"
        readonly
      />
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label for="kilos" class="form-label text-muted">Kilos:</label>
        <input
          v-model.number="kilos"
          type="number"
          class="form-control form-control-lg rounded-pill"
          min="0"
          placeholder="Cantidad en kilos"
        />
      </div>

      <div class="col-md-6">
        <label for="gramos" class="form-label text-muted">Gramos:</label>
        <input
          v-model.number="gramos"
          type="number"
          class="form-control form-control-lg rounded-pill"
          min="0"
          max="999"
          placeholder="Cantidad en gramos"
        />
      </div>
    </div>

    <div
      v-if="codigoFinal"
      class="alert alert-success rounded-pill text-center mt-4 animate-fade-in"
    >
      <h3 class="fs-5">Código EAN-12 Generado:</h3>
      <p class="codigo-final fs-4 mb-0">{{ codigoFinal }}</p>
    </div>

    <button @click="limpiarCampos" class="btn btn-secondary btn-block mt-3">
      Limpiar
    </button>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const baseCode = ref("254181800000"); // Código base sin el dígito verificador
    const kilos = ref<number>(0);
    const gramos = ref<number>(0);
    const codigoFinal = ref<string>("");
    const oscuro = ref(false); // Control de modo oscuro/claro

    // Función para calcular el dígito verificador EAN-12
    const calcularChecksum = (codigo: string) => {
      let suma = 0;
      for (let i = 0; i < codigo.length; i++) {
        let numero = parseInt(codigo[i]);
        if (i % 2 === 0) {
          suma += numero * 1;
        } else {
          suma += numero * 3;
        }
      }
      const checksum = (10 - (suma % 10)) % 10;
      return checksum;
    };

    // Función para generar el código EAN-12
    const generarCodigo = () => {
      const cantidadAjustada = (kilos.value * 1000 + gramos.value)
        .toString()
        .padStart(5, "0");

      const codigoCompleto = baseCode.value.slice(0, 7) + cantidadAjustada;

      const checksum = calcularChecksum(codigoCompleto);

      codigoFinal.value = codigoCompleto + checksum;
    };

    // Función para limpiar campos
    const limpiarCampos = () => {
      kilos.value = 0;
      gramos.value = 0;
      codigoFinal.value = "";
    };

    // Función para alternar entre modo oscuro y claro
    const toggleModoOscuro = () => {
      oscuro.value = !oscuro.value;
      if (oscuro.value) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    };

    // Observar cambios en kilos y gramos para generar el código automáticamente
    watch([kilos, gramos], generarCodigo);

    return {
      baseCode,
      kilos,
      gramos,
      codigoFinal,
      limpiarCampos,
      oscuro,
      toggleModoOscuro,
    };
  },
});
</script>
  
  <style scoped>
/* Estructura base */
.merma-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fdf4f5; /* Color pastel */
  border-radius: 15px;
  padding: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button i {
  margin-right: 5px; /* Espaciado entre el ícono y el texto */
  font-size: 1.2em; /* Ajustar tamaño del ícono */
}

/* Fondo y color en modo oscuro para el contenedor */
.dark-mode-container {
  background-color: #333333 !important;
  color: #ffffff !important;
}

/* Transiciones suaves */
body.dark-mode {
  background-color: #1a1a1a; /* Fondo oscuro */
  color: #ffffff; /* Color de texto claro */
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode .form-control {
  background-color: #333333;
  color: #ffffff;
}

body.dark-mode .form-control:focus {
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.5);
  border-color: #28a745;
}

body.dark-mode .alert-success {
  background-color: #28a745;
  color: #ffffff;
}

body.dark-mode h1,
body.dark-mode p,
body.dark-mode label {
  color: #ffffff;
}

/* Adaptación responsiva */
@media (max-width: 576px) {
  .merma-container {
    padding: 15px;
  }

  h1 {
    font-size: 22px;
  }

  .form-control {
    font-size: 14px;
    padding: 8px;
  }

  .codigo-final {
    font-size: 20px;
  }

  .alert {
    padding: 10px;
  }
}
</style>
  