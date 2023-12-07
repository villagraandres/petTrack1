// Agrega un evento al botón de impresión
document.querySelector('#printButton').addEventListener('click', function() {
    // Selecciona el contenedor de la tarjeta que quieres imprimir
    const element = document.querySelector('.containerPetInfo');
  
    // Opciones para el PDF
    const opt = {
      margin: 1,
      filename: 'pet_card.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
  
    // Usa html2pdf para generar el PDF
    html2pdf().from(element).set(opt).save();
  });