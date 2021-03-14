let bird;
let column;
const HEIGHT = 800
const WIDTH = 600
const GRAVITY = 0.8;
const FLY = -10
const RandomNumber = () => Math.floor(Math.random() *  700);
const fr = 45;
const HOLE = 150
const BIRD_SIZE = 50
let columns = [];
let score = 0;


function setup() {
    createCanvas(WIDTH, HEIGHT);
    bird = new Bird()
    column = new Column()
    frameRate(fr);
    bg = loadImage(`images/editedFlappyBirdBackground.png`)
    birdImage = loadImage(`images/flappybird-animation.gif`)
    columnTop = loadImage(`images/pipe-top.png`)
    columnBottom = loadImage(`images/pipe-bottom.png`)

    circleMask = createGraphics(128, 128);
}

function draw() {
    background(bg)
    bird.fall()
    bird.draw()


    if (frameCount % 50 === 0){
        columns.push(new Column())

    }


    columns.forEach(item => {
        item.draw()
        item.move()

        if (bird.endGame(item)){
           columns = []
            score = 0
        }
    })

    fill(100)
    textSize(20)
    text(`Score ${score}`, 50, 50);
}

function mousePressed() {
    bird.fly()
}


class Bird {
    constructor() {
        this.x = 50;
        this.y = height/2;
        this.size = 40;
        this.speedFall = 0


    }

    fall() {
        this.speedFall += GRAVITY
        this.y += this.speedFall

        if (this.y > 800 || this.y < 0) {
            this.y = 780
            columns = []

            if (columns.length === 0) {
                this.y = height/2
                this.speedFall = 0

            }
        }

    }

    fly() {
       this.speedFall += FLY
        if (this.speedFall > 10) {
            this.speedFall = 10
        }
        if (this.speedFall > -10) {
            this.speedFall = -10
        }
    }

    draw() {

        // circleMask.fill('rgba(0, 0, 0, 1)');
        //
        // circleMask.circle(64, 64, 128);
        //
        // birdImage.mask(circleMask);
        //
        // image(birdImage, this.x, this.y, this.size, this.size)
        let cYellow = color(255, 204, 0)
        fill(cYellow)
        circle(this.x, this.y, this.size)
    }

    endGame(opponent) {
        if (
            this.y - this.size / 2  < opponent.ySize ||
            this.y + this.size / 2 > opponent.yBottom
        ) {
            if (
                this.x + this.size /2 > opponent.x &&
                this.x - this.size /2 < opponent.x + opponent.xSize
            ){
                return true
            }

        }
        return false
    }
}


class Column {
    constructor() {
        this.x = 800;
        this.y = 0;
        this.xSize = 60;
        this.ySize = RandomNumber()
        this.yBottom = this.ySize + HOLE
    }

    draw() {
        let cGreen = color(61, 237, 7)
        fill(cGreen)
        // image(columnTop, this.x, this.y, this.xSize, this.ySize)
        // image(columnBottom, this.x, this.yBottom, this.xSize, height)
        rect(this.x, this.y, this.xSize, this.ySize)
        rect(this.x, this.yBottom, this.xSize, 800)

    }

    move() {
        this.x -= 5

        if (this.x + this.xSize/2 === BIRD_SIZE) {
            score++
        }
    }

}