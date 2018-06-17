var citysky = new Raster("images/citysky.png", [500, 350]);

var wonderwoman = new Object({
        skin: new Raster("images/wonderwoman.png", [500, 500]),
        speed: [3, 3],
        score: 100,
        alive: true,
        visible: true
    });

wonderwoman.skin.onFrame = function(event) {
    if (Key.isDown('w') && wonderwoman.skin.position.y > 0) { // up
        wonderwoman.skin.translate(0, -wonderwoman.speed[1]);
    }
    
    if (Key.isDown('s') && wonderwoman.skin.position.y < 700) { // down
        wonderwoman.skin.translate(0, wonderwoman.speed[1]);
    }
    
    if (Key.isDown('a') && wonderwoman.skin.position.x > 0) { // left
        wonderwoman.skin.translate(-wonderwoman.speed[1], 0);
    }
    
    if (Key.isDown('d') && wonderwoman.skin.position.x < 1000) { // right
        wonderwoman.skin.translate(wonderwoman.speed[1], 0);
    }
}

var scoreText = new PointText(new Point(10, 45));
scoreText.fillColor = 'white';
scoreText.fontSize = 48;
scoreText.content = "Score: " + wonderwoman.score;

var fireball = new Object({
        skin: new Raster("images/fire.png", [500, 1]),
        speed: 3
    });

function checkCollisions() {
    if (wonderwoman.skin.bounds.intersects(fireball.skin.bounds)) {
        wonderwoman.score = (wonderwoman.score + 50);
        fireball.skin.position.x = Math.ceil(Math.random() * 1000);
        fireball.skin.position.y = 10;
        fireball.speed = Math.ceil(Math.random() * 3);
    }
        
    if (fireball.skin.position.y > 700) {
        wonderwoman.score = (wonderwoman.score - 50);
        fireball.skin.position.x = Math.ceil(Math.random() * 1000);
        fireball.skin.position.y = 10;
        fireball.speed = Math.ceil(Math.random() * 3);
    }
}

function onFrame(event) {
    if (wonderwoman.alive == true) {
        fireball.skin.position.y += fireball.speed;
        
        checkCollisions();
        
        scoreText.content = "Score: " + wonderwoman.score;
        
        if (wonderwoman.score < 0) {
            wonderwoman.alive = false;
            gameOver();
        }
    }
}

function gameOver() {  
    // alert the player
    alert("GAME OVER");
}