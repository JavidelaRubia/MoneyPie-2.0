window.addEventListener('DOMContentLoaded',(event) =>{
    init();
    document.getElementById("selectSlot").addEventListener("change",()=>{mostrarListaTransacciones()})
    document.getElementById("guardarCuenta").addEventListener("click",(e)=>{
      let valido = true;
      var myModalEl = document.getElementById('exampleModal');
      var modal = bootstrap.Modal.getInstance(myModalEl)      
        if (validarNombreCuenta()) {
              addCuenta({                                                                      
              ingreso : 0,
              gastoFijo : 0,
              gastoVariable : 0,
              listaTrans : [],
              slot:document.getElementById("slotCuenta").value,
              nombreCuenta :document.getElementById("nombreCuenta").value});
              modal.hide();
          }else{
              valido = false;
              e.preventDefault();
          }
      return valido;
  })
    
});

function init() {
    mostrarListaTransacciones();
}

let errores1_DOM=document.getElementById("errores1");
const errores1={
  nombre:"",
};

function imprimeErroresCuenta() {
  let text = '';
  Object.keys(errores1).forEach((key)=>{
      if(errores1[key]){
          text += `<p class="bg-danger"> ${key}: ${errores1[key]}</p>`;
      }
  });
  errores1_DOM.innerHTML="";
  errores1_DOM.innerHTML=text;     
}

function addCuenta(cuenta) {
  localStorage.setItem(cuenta.slot, JSON.stringify(cuenta));
  // ocultarVentanaCuenta();
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
            text +=`<tr> <td><p>${key.tipo}</p></td> <td><p>${key.categoria}</p></td> <td><p>${key.nombre}</p></td> <td><p>${key.fecha}</p></td> <td><p style="color: #74c355; font-size: 20px; ">${key.cantidad}</p></td><td><input type="button" id="eliminarTrans" value="Eliminar" onclick="eliminarTrans(${i})" class="guardar"></td> </tr>`;
            i=i+1;
        }else{
            text +=`<tr> <td><p>${key.tipo}</p></td> <td><p>${key.categoria}</p></td> <td><p>${key.nombre}</p></td> <td><p>${key.fecha}</p></td> <td><p style="color: #c03a3a; font-size: 20px;">${key.cantidad}</p></td> <td><input type="button" id="eliminarTrans" value="Eliminar" onclick="eliminarTrans(${i})" class="guardar"></td></tr>`;
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

function validarNombreCuenta() {
  let valido=true;
  if (document.getElementById("nombreCuenta").value==""||!(isNaN(document.getElementById("nombreCuenta").value))) {
    errores1.nombre=" formato incompatible";
    valido=false;
  }else{
    errores1.nombre="";
  }
  imprimeErroresCuenta();
  return valido;
}