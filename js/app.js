// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];


//EventListeners
EventListeners();

function EventListeners(){
    // Cuando el usuario agrega un tweet
    formulario.addEventListener("submit", agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);

    crearHTML();
    });
}


//Funciones
function agregarTweet(e){
    e.preventDefault();
    const textArea = document.querySelector("#tweet").value;
    if(textArea=== ""){
       mostrarError("Tu tweet no puede ser enviado");
        return;
    }    
    const tweetObj= {
        id: Date.now(),
        textArea
    }
    //? Añadir al array los tweets
    tweets = [...tweets, tweetObj];

    // Crear el HTML
    crearHTML();
    
    //? Reiniciar el formmulario
    formulario.reset();
}
    

function mostrarError (error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");
    //Insertarlo al contenido 
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    //? Elimina el mensaje de error despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}

//? Muestra el listado de twwets
function crearHTML(){
    limpiarHTML ();
    if(tweets.length > 0){
        tweets.forEach( textArea => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.textContent = "X";

            //Eliminar del DOM
            btnEliminar.onclick = () => {
                borrarTweet(textArea.id);
            }


            //Crear el HTML
            const li = document.createElement("li");

            //Añadir el texto
            li.textContent = textArea.textArea;

            //Asignar boton
            li.appendChild(btnEliminar);

            //Insertarlo en HTML
            listaTweets.appendChild(li);
        });
    }
    sincronziarStorage();
}

//? Agrega los tweets actuales a localStorage
function sincronziarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

//? Eliminar tweet
function borrarTweet(id){
    tweets = tweets.filter(textArea => textArea.id !== id);
    crearHTML();
}


//? Limpiar HTML
function limpiarHTML () {
   while(listaTweets.firstChild) {
       listaTweets.removeChild(listaTweets.firstChild);
   }
}   



    
