import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBarcodeStore = defineStore('barcode', () => {
  const baseCode = ref<string>('254181800000');
  const quantity = ref<number | null>(null);
  const barcodeValue = ref<string>('');

  const generateBarcode = () => {
    if (quantity.value === null || quantity.value <= 0) {
      alert('Introduce una cantidad válida.');
      return;
    }

    // Genera el código EAN-12 añadiendo la cantidad en kilos
    const kilos = String(quantity.value).padStart(3, '0');
    barcodeValue.value = `${baseCode.value}${kilos}`;

    return barcodeValue.value;
  };

  return {
    baseCode,
    quantity,
    barcodeValue,
    generateBarcode,
  };
});
