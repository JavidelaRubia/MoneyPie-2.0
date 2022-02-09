window.addEventListener('DOMContentLoaded',(event) =>{
    init();
    document.getElementById("crearCuenta").addEventListener("click",()=>{iniciarlizarDatos()})
    document.getElementById("guardarCuenta").addEventListener("click",(e)=>{
        let valido = true;
        if (confirm("¿Sustituiras esta cuenta,estas seguro? Si necesitas mas Slots, activa premium")){      
            if (validarNombreCuenta()) {
                addCuenta({                                                                      
                ingreso : 0,
                gastoFijo : 0,
                gastoVariable : 0,
                listaTrans : [],
                slot:document.getElementById("slotCuenta").value,
                nombreCuenta :document.getElementById("nombreCuenta").value});
            }else{
                valido = false;
                e.preventDefault();
            }
        }else{
            valido = false;
            e.preventDefault();
        }
        return valido;
    })
    document.getElementById("selectSlot").addEventListener("change",()=>{mostrarListaTransacciones()})
    
});
function init() {
    mostrarListaTransacciones();
}
let cuenta_DOM;
  function iniciarlizarDatos() {
      mostrarVentanaCuenta();
  };
 const cuenta={
      ingreso : 0,
      gastoFijo : 0,
      gastoVariable : 0,
      listaTrans : [],
      nombreCuenta :"CuentaPrueba",
      slot:""
  };

  function mostrarVentanaCuenta() {
    let ventana = document.getElementById("contenedorCreadorCuenta");
    ventana.classList.remove("ocultar");
    ventana.classList.add("contenedorCreadorCuenta");
  }
  function ocultarVentanaCuenta() {
    let ventana = document.getElementById("contenedorCreadorCuenta");
    ventana.classList.remove("contenedorCreadorCuenta");
    ventana.classList.add("ocultar");
    
  }
  function validarNombreCuenta() {
    let valido=true;
    if (document.getElementById("nombreCuenta").value==""||!(isNaN(document.getElementById("nombreCuenta").value))) {
      errores.nombre=" formato incompatible";
      valido=false;
    }else{
      errores.nombre="";
    }
    imprimeErrores();
    return valido;
}
let errores_DOM=document.getElementById("errores");
const errores={
  nombre:""
};

function imprimeErrores() {
  let text = '';
  Object.keys(errores).forEach((key)=>{
      if(errores[key]){
          text += `<p> ${key}: ${errores[key]}</p>`;
      }
  });
  errores_DOM.innerHTML="";
  errores_DOM.innerHTML=text;     
}

function addCuenta(cuenta) {
    localStorage.setItem(cuenta.slot, JSON.stringify(cuenta));
    ocultarVentanaCuenta();
    document.location.reload(true);
  }
function totalCuenta() {
    let slot= document.getElementById("selectSlot").value;
    const cuentaLocal = JSON.parse(localStorage.getItem(slot));
    let vIngreso= cuentaLocal.ingreso;
    let vGastoFijo=cuentaLocal.gastoFijo;
    let vGastoVar=cuentaLocal.gastoVariable;
    let total=0;
    total=vIngreso-vGastoFijo-vGastoVar;
    return total;
  }
function mostrarListaTransacciones() {
    let slot= document.getElementById("selectSlot").value;
    let cuenta = JSON.parse(localStorage.getItem(slot));
    let nombreCuenta_DOM = document.getElementById("tituloCuenta");
    let i = 0;
    if (cuenta=== null) {
        console.log("aqui");
        nombreCuenta="cuenta no registrada";
        nombreCuenta_DOM.innerHTML="";
        nombreCuenta_DOM.innerHTML="Cuenta: "+nombreCuenta;
        let text=`<tr>
        <th>Tipo Transaccion</th>
        <th>Categoria</th>
        <th>Nombre</th>
        <th>Fecha</th>
        <th>Cantidad</th>
        <th>Editar</th>
        </tr>`;
        let listaTransacciones_DOM = document.getElementById("datos");
        listaTransacciones_DOM.innerHTML="";
        listaTransacciones_DOM.innerHTML=text;
    }else{
        nombreCuenta=cuenta.nombreCuenta;
        nombreCuenta_DOM.innerHTML="";
        nombreCuenta_DOM.innerHTML="Cuenta: "+nombreCuenta+" "+totalCuenta()+"€";
        let text=`<tr>
                    <th>Tipo Transaccion</th>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                    <th>Editar</th>
                 </tr>`;
        (cuenta.listaTrans).forEach((key)=>{
          if (key.tipo=='Ingreso') {
            text +=`<tr> <td><p>${key.tipo}</p></td> <td><p>${key.categoria}</p></td> <td><p>${key.nombre}</p></td> <td><p>${key.fecha}</p></td> <td><p style="color: #74c355">${key.cantidad}</p></td><td><input type="button" id="eliminarTrans" value="Eliminar" onclick="eliminarTrans(${i})" class="guardar"></td> </tr>`;
            i=i+1;
        }else{
            text +=`<tr> <td><p>${key.tipo}</p></td> <td><p>${key.categoria}</p></td> <td><p>${key.nombre}</p></td> <td><p>${key.fecha}</p></td> <td><p style="color: #c03a3a">${key.cantidad}</p></td> <td><input type="button" id="eliminarTrans" value="Eliminar" onclick="eliminarTrans(${i})" class="guardar"></td></tr>`;
            i=i+1;
            };
        
        });
        let listaTransacciones_DOM = document.getElementById("datos");
        listaTransacciones_DOM.innerHTML="";
        listaTransacciones_DOM.innerHTML=text; 
    }
    
  }

  function eliminarTrans(indice) {
      if (confirm("¿Quieres eliminar esta transaccion?")){
        let slot= document.getElementById("selectSlot").value;
        let cuenta = JSON.parse(localStorage.getItem(slot));
        let dato = cuenta.listaTrans[indice].tipo;
        let cantidad = cuenta.listaTrans[indice].cantidad;
        console.log(dato);
        if (dato=='Ingreso') {
            cuenta.ingreso=cuenta.ingreso-(+cantidad);
          }else if (dato=='Gastos Fijos') {
            cuenta.gastoFijo=cuenta.gastoFijo-(+cantidad);
          } else {
            cuenta.gastoVariable=cuenta.gastoVariable-(+cantidad);
        }
        cuenta.listaTrans.splice(indice,1);
        localStorage.setItem(slot, JSON.stringify(cuenta));
        mostrarListaTransacciones();
      }
    }
  