export class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'game' });
    }

    //Metodos del ciclo de vida

    //Precarga de items
    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('gameover', 'images/gameover.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('balldos', 'images/ball.png');
    }

    //Crea la escena
    create() {
        //hace que los límites del mapa tengan colisión
        //setBoundsCollision([left], [right], [up], [down])
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(400, 250, 'background');
        this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.gameoverImage.visible = false;

        // Permite colocar elementos los cuales seran afectados por las fisicas de elementos
        //Hace a la plataforma inmovible
        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
        //Deshabilita la gravedad para la plataforma
        this.platform.body.allowGravity = false;

        socket.on('movimiento', () => {
            //Coloca la bola
            this.balldos = this.physics.add.image(400, 30, 'balldos');
            //Permite colisiones con la bola y la plataforma
            this.physics.add.collider(this.balldos, this.platform);
            //Hace que la bola colisione con TODOS los bordes del mapa
            //NECESARIO PARA QUE FUNCIONE EL setBoundsCollision
            this.balldos.setCollideWorldBounds(true);
            //Permite rebote de la bola y permite configurar la fuerza del rebote.
            this.balldos.setBounce(1);
        });

        //Coloca la bola
        this.ball = this.physics.add.image(400, 30, 'ball');
        //Permite colisiones con la bola y la plataforma
        this.physics.add.collider(this.ball, this.platform);
        //Hace que la bola colisione con TODOS los bordes del mapa
        //NECESARIO PARA QUE FUNCIONE EL setBoundsCollision
        this.ball.setCollideWorldBounds(true);
        this.platform.setCollideWorldBounds(true);
        //Permite rebote de la bola y permite configurar la fuerza del rebote.
        this.ball.setBounce(1);

        let velocity = 100 * Phaser.Math.Between(1.3, 2);
        if (Phaser.Math.Between(0, 10) > 5) {
            velocity = 0 - velocity;
        }
        this.ball.setVelocity(velocity, 10);

        //Permite crear cursores, informacion de alto nivel para la info de teclas pulsadas
        this.cursors = this.input.keyboard.createCursorKeys();

        //Permite indicar velocidades (x,y)
        //this.platform.setVelocity(10, 0);
    }

    //Permite ejecuciones constantes de formas repetititas dentro de la escena, siempre que la escena permanezca activa
    update() {
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);
            socket.emit("JugMovimiento");
        } else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
            socket.emit("JugMovimiento");
        } else {
            this.platform.setVelocityX(0);
        }

        //Pantalla de Game Over
        //accede a la posicion y de la bola
        if (this.ball.y > 500) {
            console.log('fin');
            this.gameoverImage.visible = true;
            this.platform.visible = false;
            this.scene.pause();
        }
    }
}