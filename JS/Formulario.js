// Debes poner tu User ID y Service ID reales aquí:
emailjs.init('TU_USER_ID'); // Reemplaza con tu user ID de EmailJS

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const archivoInput = document.getElementById('archivo');

  if (archivoInput.files.length === 0) {
    mostrarError('Debes seleccionar un archivo.');
    return;
  }

  const archivo = archivoInput.files[0];
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  if (!allowedTypes.includes(archivo.type)) {
    mostrarError('Tipo de archivo no válido. Debe ser jpg, png, jpeg, o pdf.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function() {
    // Envio a EmailJS como base64 en un attachment
    const formData = {
      nombre,
      correo,
      // 'archivo' debe coincidir con el template de EmailJS si mandas archivos
      archivo: reader.result,
      'archivo_nombre': archivo.name
    };

    emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', formData)
      .then(response => {
        mostrarExito('Mensaje enviado correctamente.');
        document.getElementById('contact-form').reset();
      }, error => {
        mostrarError('Error al enviar mensaje. Intenta de nuevo.');
      });
  };
  reader.readAsDataURL(archivo);

  function mostrarError(msg) {
    document.getElementById('respuesta').innerHTML = '<div class="alert alert-danger">' + msg + '</div>';
  }
  function mostrarExito(msg) {
    document.getElementById('respuesta').innerHTML = '<div class="alert alert-success">' + msg + '</div>';
  }
});
