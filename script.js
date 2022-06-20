var xhttp = new XMLHttpRequest();

// iframe document code

// document.getElement

// console.log(titulo, document.head,document.body)
// c_nombre = $('titulos').val();
// console.log("nombre", c_nombre)

      xhttp.onreadystatechange = function() {

        
        if (this.readyState == 4 && this.status == 200) {
          var respuesta = JSON.parse(xhttp.responseText);
          
          var personas = respuesta

          console.log("result ", respuesta[0].file_name)
          
          var salida = ' <option value=""> Seleccionar imagen 3d </option>';
           for(var i = 0; i < personas.length; i++) {
  
            var salida1="<td>Nombre imagen :   </td><td>"+personas[i].id+"</td>"+'<td><input type="text" id="name" name="name" style="display:none" value='+personas[i].file_name+'> </td><tr><button  type="button" class="btn btn-success" onclick="view3d()">Proyectar imagen</button> </tr>'
          }
          document.getElementById('im')
            .innerHTML = salida1;
        }
      };
      


       function view3d(){
         
         
           var s1=document.getElementById("name").value;
           console.log("s1 ", s1)
         console.log("storage/"+s1)

         
           var esena =" <a-scene"
          +" vr-mode-ui='enabled: false;'"
          +"  loading-screen='enabled: false;'"
          +"  renderer='logarithmicDepthBuffer: true;'"
          +"  arjs='trackingMethod: best; sourceType: webcam; debugUIEnabled: false;'"
          +" id='scene'"
          +" embedded"
          +"   gesture-detector"
          +"   >"
          +"  <a-assets>"
          +"   <a-asset-item"
          +"    id='animated-asset'"
          +"      src='storage/"+s1+"'"
          +"       ></a-asset-item>"
          +"  </a-assets>"

          +"  <a-marker"
          +"     id='animated-marker'"
          +"     type='pattern'"
          +"     preset='custom'"
          +"    url='marker.patt'"
          +"    raycaster='objects: .clickable'"
          +"    emitevents='true'"
          +"    cursor='fuse: false; rayOrigin: mouse;'"
          +"    id='markerA'"
          +"  >"
          +"     <a-entity"
          +"         id='bowser-model'"
          +"         scale='0.5 0.5 0.5'"
          +"        animation-mixer='loop: repeat'"
          +"         gltf-model='#animated-asset'"
          +"         class='clickable'"
          +"         gesture-handler"
          +"     ></a-entity>"
          +"  </a-marker>"

          +" <a-entity camera></a-entity>"
          +" </a-scene>";
          
       
           
        console.log("añadiendo ",esena)
          document.getElementById('3d')
            .innerHTML = esena;
          
       }


        
        xhttp.open("GET", "database.json", true);
      xhttp.send();