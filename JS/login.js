window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("login").addEventListener("click", () => {
    let usuario = document.getElementById("usuario").value;
    let pass = document.getElementById("password").value;
    let valido = true;

    let errores_DOM = document.getElementById("erroresLogin");
    const errores = {
        nombre:"",
        pass:"",
        credencial:""
    };

    function imprimeErrores() {
        let text = "";
        Object.keys(errores).forEach((key) => {
          if (errores[key]) {
            text += `<p class="bg-danger" style="box-shadow: 0px 2px 10px 1px red;">${errores[key]}</p>`;
          }
        });
        errores_DOM.innerHTML = "";
        errores_DOM.innerHTML = text;
        $(document).ready(function(){
          $("#erroresLogin").hide();
          $("#erroresLogin").fadeIn(1500);
        });
    }

    console.log("Hola");
    console.log("Usuario: "+usuario);
    console.log("Pass: "+pass);


    if (usuario == "") {
      errores.nombre += "Usuario vacio";
      valido = false;
    }
    if (pass == "") {
      errores.pass += "Contraseña vacia";
      valido = false;
    }
    if (valido) {
      if (usuario != pass) {
        errores.credencial += "Login errorneo";
        
      } else {
        window.location.href = "PAGES/inicio.html";
      }
    }
    imprimeErrores();

    
  });
  

});


    
