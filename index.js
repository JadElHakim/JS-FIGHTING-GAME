const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({position:{x:0,y:0},imageSrc:'./Assets/background.png'});

const shop = new Sprite({position:{x:620,y:128},imageSrc:'./Assets/shop.png',scale: 2.75, framesMax: 6});

const player = new Fighter({position:{x: 0, y: 0}, velocity:{x: 0, y: 0}, 
    imageSrc:'./Assets/samuraiMack/idle.png', framesMax: 8, scale: 2.5, offset: {x:215,y:157},
    sprites: {
        idle: {
            imageSrc:'./Assets/samuraiMack/idle.png',
            framesMax: 8,
          },
          run: {
            imageSrc:'./Assets/samuraiMack/Run.png',
            framesMax: 8,
          },
          jump : {
            imageSrc:'./Assets/samuraiMack/Jump.png',
            framesMax: 2,
          },
          fall: {
            imageSrc:'./Assets/samuraiMack/Fall.png',
            framesMax: 2,
          },
        attack1: {
            imageSrc:'./Assets/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        hit: {
            imageSrc:'./Assets/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4,
        },
        dead : {
            imageSrc: './Assets/samuraiMack/Death.png',
            framesMax: 6,
        }
    },
    attackBox : {
        offset : {x:100,y:50},
        width: 170,
        height: 50,
    }
});

const enemy = new Fighter({position:{x: 400, y: 100}, velocity:{x: 0, y: 0},color:'blue',
    imageSrc:'./Assets/kenji/idle.png', framesMax: 4,scale: 2.5, offset: {x:215,y:170},
    sprites: {
        idle: {
            imageSrc:'./Assets/kenji/idle.png',
            framesMax: 4,
          },
          run: {
            imageSrc:'./Assets/kenji/Run.png',
            framesMax: 8,
          },
          jump : {
            imageSrc:'./Assets/kenji/Jump.png',
            framesMax: 2,
          },
          fall: {
            imageSrc:'./Assets/kenji/Fall.png',
            framesMax: 2,
          },
        attack1: {
            imageSrc:'./Assets/kenji/Attack1.png',
            framesMax: 4,
        },
        hit: {
            imageSrc:'./Assets/kenji/Take hit.png',
            framesMax: 3,
        },
        dead : {
            imageSrc: './Assets/kenji/Death.png',
            framesMax: 7,
        }
    },
    attackBox : {
        offset : {x:-170,y:50},
        width: 170,
        height: 50,
    }
});


console.log(player);

const keys = {
    a:{
        pressed: false,
    },
    d:{
        pressed: false,
    },
    w: {
        pressed: false,
    },
    arrowright: {
        pressed: false,
    },
    arrowleft: {
        pressed : false,
    }
};


timerFunct();

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    //Player 1 Controls
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5;
       player.switchSprite('run');
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5;
        player.switchSprite('run');
    }else{
        player.switchSprite('idle');
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump');
    } else if(player.velocity.y > 0){
        player.switchSprite('fall');
    }

    //Player 2 controls
    if(keys.arrowleft.pressed && enemy.lastKey === 'arrowleft'){
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    }
    else if(keys.arrowright.pressed && enemy.lastKey === 'arrowright'){
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }else{
        enemy.switchSprite('idle');
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump');s
    } else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall');
    }

    //detect collision

  

    //player is attacking
    if(rectangularCollision({rect1:player, rect2:enemy}) && player.isAttacking && player.currentframe === 4){
        
        player.isAttacking = false;
        enemy.takeHit();
        document.querySelector('#enemyHealth').style.width = enemy.health + "%";
    }
      //player misses
      if(player.isAttacking && player.currentframe === 4){
        player.isAttacking = false;
    }
    //enemy is attacking
    if(rectangularCollision({rect1:enemy, rect2:player}) && enemy.isAttacking && enemy.currentframe === 2){
        enemy.isAttacking = false;
        player.takeHit();
        document.querySelector('#playerHealth').style.width = player.health + "%"
    }
    //enemy misses
    if(enemy.isAttacking && enemy.currentframe === 2){
        enemy.isAttacking = false;
    }

    //end game based on health
    if(player.health <= 0 || enemy.health <=0){
        endGame({player,enemy,timerId});
    }
}


animate();

window.addEventListener('keydown', (event) => {
    if(!player.dead){    
  
        switch(event.key.toLowerCase()){
        //Player 1 movement
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            //keys.w.pressed = true;
            player.velocity.y = -20;
            break;
        case ' ':
            player.attack();
            break;    
        }
    }


    if(!enemy.dead){
    
        switch(event.key){
           //Player 2 movement
        case 'arrowright':
            keys.arrowright.pressed = true;
            enemy.lastKey = 'arrowright';
            break;
        case 'arrowleft':
            keys.arrowleft.pressed = true;
            enemy.lastKey = 'arrowleft';
            break;
        case 'arrowup':
            //keys.w.pressed = true;
            enemy.velocity.y = -20;
            break;
        case 'arrowdown':
            enemy.attack();
            break;
        }
    }
});
    
   


window.addEventListener('keyup', (event) => {
    
    switch(event.key.toLowerCase()){
        //Player 1 movement
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;    
        case 'w':
            keys.w.pressed = false;
            break;    
    }
    switch(event.key.toLowerCase()){
        //Player 2 movement
        case 'arrowright':
            keys.arrowright.pressed = false;
            break;
        case 'arrowleft':
            keys.arrowleft.pressed = false;
            break;    
        // case 'arrowup':
        //     keys.arrowup.pressed = false;
        //     break;
    }
})

