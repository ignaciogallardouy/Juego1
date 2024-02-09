import { Game } from './game.js';

const config = {
    type: Phaser.AUTO, //Permite al navegador usar WebGL o Canvas
    width: 800,
    height: 500,
    scene: [Game], //Son las pantallas de un videojuego (partes que son muy diferentes unas de otras)
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
}


//Instancia el juego
var game = new Phaser.Game(config);