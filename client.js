// import { Game } from './game.js';

// const config = {
//     type: Phaser.AUTO, //Permite al navegador usar WebGL o Canvas
//     width: 800,
//     height: 500,
//     scene: [Game], //Son las pantallas de un videojuego (partes que son muy diferentes unas de otras)
//     // scene: {
//     //     preload: preload, // La función que cargará los recursos
//     //     create: create, // La función que creará los objetos del juego
//     //     update: update // La función que se ejecutará en cada frame para actualizar el juego
//     // },
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 400 },
//             debug: false
//         }
//     }
// }



// ACA

// Se define la configuración de Phaser al inicio.
var gameInstance;
var gameConfig = {
  // Configuración de Phaser...
};

// Este es el manejador único para window.onload.
window.onload = function() {
  // Establece la conexión con el servidor de socket.
  var socket = io.connect('http://localhost:3000');

  // Inicializa el juego de Phaser.
  gameInstance = new Phaser.Game(gameConfig);

  // Eventos relacionados con el estado del juego y los jugadores.
  socket.on('connect', function() {
    socket.emit('nuevo jugador', { id: socket.id });
  });

  socket.on('estado del juego', function(estadoDelJuego) {
    // Actualizar los objetos en el juego con el estado proporcionado por el servidor
    if (gameInstance && gameInstance.scene.keys.yourSceneKey) { // Asegúrate de reemplazar 'yourSceneKey' con la clave de tu escena de Phaser.
      var scene = gameInstance.scene.keys.yourSceneKey;
      scene.object1.x = estadoDelJuego.object1.x;
      scene.object1.y = estadoDelJuego.object1.y;
      scene.object2.x = estadoDelJuego.object2.x;
      scene.object2.y = estadoDelJuego.object2.y;
    }
  });
};


// FIN

// window.onload = function() {
//     gameInstance = new Phaser.Game(config);
// };