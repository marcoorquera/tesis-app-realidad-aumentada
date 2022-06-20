(function () {

	'use strict'

 var inicio='<center> <img src="assets/images/camara.PNG"></img> </center> <h2>PASO 1</h2> <p > Descargar el marcador <a href="https://ar-js-org.github.io/studio/assets/default-marker.png"> (click) </a></p> <h2>PASO 2</h2> <p> Imprime o envía el marcador a otro dispositivo con pantalla</p> <h2>PASO 3</h2> <p>Coloca el maracador en el lugar donde quieres visualizar el producto.</p> <h2>PASO 4</h2> <p> Busca y selecciona la imagen del producto que descargaste en la tienda de muebles en el siguiente botón.</p> <div class="wrap-file input-group mb-3"> <input type="file" id="file" name="file[] "class="form-control" accept=".glb"  /> </div> <h2>PASO 5</h2> <p> Presione el botón <b>PROYECTAR</b> y al abrirse tu cámara enfoca el marcador antes descargado para visualizar su producto en realidad aumentada.</p> <span class="file-cta"> <div id="preview-images"> </div>  </span> <!--  <button id="publish" class="btn btn-primary">Subir imagen 3d</button> --> <div class="preload"> <img src="assets/images/preload.gif"         alt="preload" /> </div> <h4 id="success"></h4>'
document.getElementById('subir')
.innerHTML = inicio;
  

 

	var file = document.getElementById('file');
	var preload = document.querySelector('.preload');
	//var publish = document.getElementById('publish');
	var formData = new FormData();

	file.addEventListener('change', function (e) {

		for ( var i = 0; i < file.files.length; i++ ) {
			var thumbnail_id = Math.floor( Math.random() * 30000 ) + '_' + Date.now();
			createThumbnail(file, i, thumbnail_id);
			formData.append(thumbnail_id, file.files[i]);
      console.log(thumbnail_id, file.files[i])
		}
    console.log(formData)

		e.target.value = '';

    fetch('../server.php', {
			method: 'POST',
			body: formData
		})
		.then(function (response) {
      console.log(response)
			return response.json();
      
      
		})
		.then(function (data) {
			preload.classList.remove('activate-preload');
			clearFormDataAndThumbnails();
			document.getElementById('success').innerText = data.message;
      //location.reload();

      

      var f='<iframe class="wrap-file input-group mb-3" height="550px" src="realidad_aumentada.html" > </iframe>'
      console.log("añadiendo")

      
          document.getElementById('iframe')
            .innerHTML = f;
      document.getElementById('subir')
.innerHTML = " ";

      var atras='<button id="atras" type="button" class="btn btn-secondary" onclick="recargar()">Atras</button>'
       
      document.getElementById('atras')
.innerHTML = atras;

      

		})
		.catch(function (err) {
			console.log(err);
		});

	});

	// publish.addEventListener('click', function (e) {
	// 	e.preventDefault();
	// 	preload.classList.add('activate-preload');

	// 	fetch('../server.php', {
	// 		method: 'POST',
	// 		body: formData
	// 	})
	// 	.then(function (response) {
 //      console.log(response)
	// 		return response.json();
      
      
	// 	})
	// 	.then(function (data) {
	// 		preload.classList.remove('activate-preload');
	// 		clearFormDataAndThumbnails();
	// 		document.getElementById('success').innerText = data.message;
 //      //location.reload();

      

 //      var f='<iframe class="wrap-file input-group mb-3" height="650px" src="realidad_aumentada.html" > </iframe>'
 //      console.log("añadiendo")

      
 //          document.getElementById('iframe')
 //            .innerHTML = f;

	// 	})
	// 	.catch(function (err) {
	// 		console.log(err);
	// 	});

    
	// });




	var createThumbnail = function (file, iterator, thumbnail_id) {
		var thumbnail = document.createElement('div');
		thumbnail.classList.add('thumbnail', thumbnail_id);
		thumbnail.dataset.id = thumbnail_id;

		thumbnail.setAttribute('style', `background-image: url(${ URL.createObjectURL( file.files[iterator] ) })`);
		document.getElementById('preview-images').appendChild(thumbnail);
		createCloseButton(thumbnail_id);
	}

	var createCloseButton = function (thumbnail_id) {
		var closeButton = document.createElement('div');
		closeButton.classList.add('close-button');
		closeButton.innerText = 'x';
		document.getElementsByClassName(thumbnail_id)[0].appendChild(closeButton);
	}

	var clearFormDataAndThumbnails = function () {
		for ( var key of formData.keys() ) {
			formData.delete(key);
		}

		document.querySelectorAll('.thumbnail').forEach(function (thumbnail) {
			thumbnail.remove();
		});
	}

	document.body.addEventListener('click', function (e) {
		if ( e.target.classList.contains('close-button') ) {
			e.target.parentNode.remove();
			formData.delete(e.target.parentNode.dataset.id);
		}
	});

})();


// function hola(){
         
         
//            var s1=document.getElementById("name").value;
//            console.log("s1 ", s1)
//          console.log("storage/"+s1)

         
//            var esena =" <a-scene"
//           +" vr-mode-ui='enabled: false;'"
//           +"  loading-screen='enabled: false;'"
//           +"  renderer='logarithmicDepthBuffer: true;'"
//           +"  arjs='trackingMethod: best; sourceType: webcam; debugUIEnabled: false;'"
//           +" id='scene'"
//           +" embedded"
//           +"   gesture-detector"
//           +"   >"
//           +"  <a-assets>"
//           +"   <a-asset-item"
//           +"    id='animated-asset'"
//           +"      src='storage/"+s1+"'"
//           +"       ></a-asset-item>"
//           +"  </a-assets>"

//           +"  <a-marker"
//           +"     id='animated-marker'"
//           +"     type='pattern'"
//           +"     preset='custom'"
//           +"    url='marker.patt'"
//           +"    raycaster='objects: .clickable'"
//           +"    emitevents='true'"
//           +"    cursor='fuse: false; rayOrigin: mouse;'"
//           +"    id='markerA'"
//           +"  >"
//           +"     <a-entity"
//           +"         id='bowser-model'"
//           +"         scale='0.5 0.5 0.5'"
//           +"        animation-mixer='loop: repeat'"
//           +"         gltf-model='#animated-asset'"
//           +"         class='clickable'"
//           +"         gesture-handler"
//           +"     ></a-entity>"
//           +"  </a-marker>"

//           +" <a-entity camera></a-entity>"
//           +" </a-scene>";
          
//        document.getElementById('home')
//             .innerHTML = " ";
          
        
          
//        }

function recargar() {
  location.reload()
  
}