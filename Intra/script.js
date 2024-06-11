document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('estudianteForm');
    const messageDiv = document.getElementById('message');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evita que el formulario se envíe de forma convencional
      const formData = new FormData(form);
     /* const http = new XMLHttpRequest();
      http.open('POST', 'http://localhost:3002/estudiantes');
      http.setRequestHeader('Content-Type', 'application/json');
      http.send(JSON.stringify({  FormData: formData }));
*/
      $.ajax({
        url: 'http://localhost:3002/estudiantes',
        type: 'POST',
        data: formData,
        success: function (response) {
          form.reset(); // Reinicia el formulario después de un envío exitoso
        },
        error: function (error) {

        }
      });

       // Obtiene los datos del formulario
      /*const response = await fetch('http://localhost:3002/estudiantes', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        messageDiv.textContent = 'Estudiante añadido correctamente';
        form.reset(); // Reinicia el formulario después de un envío exitoso
      } else {
        messageDiv.textContent = 'Hubo un error al añadir el estudiante';
      }*/
    });
  });
  