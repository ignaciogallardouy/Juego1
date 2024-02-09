var gameConfig = {
    type: Phaser.AUTO, // Phaser decidirá automáticamente usar WebGL o Canvas
    width: 800, // El ancho del área de juego
    height: 600, // La altura del área de juego
    parent: 'game-container', // El ID del elemento div en el que se insertará el juego
    physics: {
        default: 'arcade', // El sistema de físicas que se usará
        arcade: {
            gravity: { y: 10 }, // La gravedad en el eje Y (no necesaria si es un juego top-down)
            debug: false // Muestra los cuerpos de física para depuración
        }
    },
    scene: {
        preload: preload, // La función que cargará los recursos
        create: create, // La función que creará los objetos del juego
        update: update // La función que se ejecutará en cada frame para actualizar el juego
    }
};

//Metodos del ciclo de vida

//Precarga de items
function preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('gameover', 'images/gameover.png');
    this.load.image('object1', 'images/platform.png');
    this.load.image('object2', 'images/platform.png');
    this.load.image('ball', 'images/ball.png');
}

// var cursors;
var keysWASD;

//Crea la escena
function create() {

    // Crea controles alternativos para el segundo jugador
    keysWASD = this.input.keyboard.addKeys({
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    // //hace que los límites del mapa tengan colisión
    // //setBoundsCollision([left], [right], [up], [down])
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.add.image(400, 250, 'background');
    this.gameoverImage = this.add.image(400, 90, 'gameover');
    this.gameoverImage.visible = false;

    // // Permite colocar elementos los cuales seran afectados por las fisicas de elementos
    // //Hace a la plataforma inmovible
    this.object1 = this.physics.add.image(400, 460, 'object1').setImmovable();
    // //Deshabilita la gravedad para la plataforma
    this.object1.body.allowGravity = false;

    // /* PLataforma 2*/
    // //Hace a la plataforma inmovible
    this.object2 = this.physics.add.image(400, 460, 'object2').setImmovable();
    // //Deshabilita la gravedad para la plataforma
    this.object2.body.allowGravity = false;
    // //Permite colisiones con la bola y la plataforma
    
    this.object2.setCollideWorldBounds(true);
    // /* PLataforma 2*/

    // //Coloca la bola
    this.ball = this.physics.add.image(400, 30, 'ball');
    // //Permite colisiones con la bola y la plataforma
    this.physics.add.collider(this.ball, this.object1);
    this.physics.add.collider(this.ball, this.object2);
    // //Hace que la bola colisione con TODOS los bordes del mapa
    // //NECESARIO PARA QUE FUNCIONE EL setBoundsCollision
    this.ball.setCollideWorldBounds(true);
    this.object1.setCollideWorldBounds(true);
    // //Permite rebote de la bola y permite configurar la fuerza del rebote.
    this.ball.setBounce(1);

    let velocity = 100 * Phaser.Math.Between(1.3, 2);
    if (Phaser.Math.Between(0, 10) > 5) {
        velocity = 0 - velocity;
    }
    this.ball.setVelocity(velocity, 10);

    // //Permite crear cursores, informacion de alto nivel para la info de teclas pulsadas
    this.cursors = this.input.keyboard.createCursorKeys();

    //Permite indicar velocidades (x,y)
    // this.object1.setVelocity(10, 0);
}

//Permite ejecuciones constantes de formas repetititas dentro de la escena, siempre que la escena permanezca activa
function update() {
    if (this.cursors.left.isDown) {
        this.object1.setVelocityX(-500);
        // socket.emit('JugMovimiento');
    } else if (this.cursors.right.isDown) {
        this.object1.setVelocityX(500);
        // socket.emit('JugMovimiento');
    } else {
        this.object1.setVelocityX(0);
    }

    // // Controla el objeto2 con las teclas WASD
    if (keysWASD.left.isDown) {
        this.object2.setVelocityX(-500);
    } else if (keysWASD.right.isDown) {
        this.object2.setVelocityX(500);
    } else {
        this.object2.setVelocityX(0);
    }

    // //Pantalla de Game Over
    // //accede a la posicion y de la bola
    if (this.ball.y > 500) {
        console.log('fin');
        this.gameoverImage.visible = true;
        this.object1.visible = false;
        this.object2.visible = false;
        this.scene.pause();
    }
}

window.onload = function () {
    gameInstance = new Phaser.Game(gameConfig);
};

