class Sprite {
    constructor({position,imageSrc,scale = 1,framesMax = 1, offset= {x: 0, y: 0}}){
        this.position = position;
        this.width = 50;
        this.height =150;  
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale
        this.framesMax = framesMax;
        this.currentframe = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;
    }

    draw(){
        ctx.drawImage(
            this.image, 
            this.currentframe * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
            );
    }

    animateFrames(){
        this.framesElapsed++;

        if(this.framesElapsed % this.framesHold === 0){
            if(this.currentframe < this.framesMax -1){
                this.currentframe++;
            }
            else{
            this.currentframe = 0;
            }
        }
    }
    
    update(){
        this.draw();
        this.animateFrames();
    }  

        
}
class Fighter extends Sprite {
    constructor({position, velocity, color= 'red', imageSrc ,scale = 1,framesMax = 1, offset = {x: 0, y: 0}, sprites,
    attackBox = {offset : {}, width: undefined, height: undefined}}){
    {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        });
        this.velocity = velocity;
        this.width = 50;
        this.height =150;
        this.lastKey = null;
        this.attackBox = {
            position: {
                x: this.position.x ,
                y: this.position.y
                },
            offset: attackBox.offset,    
            width: attackBox.width,
            height: attackBox.height,
        }
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
        this.currentframe = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.sprites = sprites;
        this.dead = false;

        for (const sprite in this.sprites){
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
       }
    }

    
    update(){
        this.draw();
        if(!this.dead){this.animateFrames();}

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        //draw attack box
        //ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);


        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //player position update
        if(this.position.y + this.height + this.velocity.y > canvas.height-95){
            this.velocity.y = 0;
            this.position.y =331.69999999999993;
        }else{
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.switchSprite('attack1');
        this.isAttacking = true;
        // setTimeout(() => {
        //     this.isAttacking = false;
        // }, 1000);
    }    
    takeHit(){
        this.health -= 10;
        if(this.health <= 0){
            this.switchSprite('dead');
        }else{
        this.switchSprite('hit');
        }
    }

    switchSprite(sprite){
         //ovveriding all other animations
         if(this.image === this.sprites.dead.image){
             if(this.currentframe === this.sprites.dead.framesMax-1){
                 this.dead = true;
             }
            return;
        }
        //overriding all other animations
        if(this.image === this.sprites.attack1.image && this.currentframe < this.sprites.attack1.framesMax -1){
            return;
        }
        //ovveriding all other animations
        if(this.image === this.sprites.hit.image && this.currentframe < this.sprites.hit.framesMax -1){
            return;
        }
        switch (sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image;
                this.framesMax = this.sprites.idle.framesMax;
                this.currentframe = 0;
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
                this.currentframe = 0;
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax;
                this.currentframe = 0;
                }
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax;
                this.currentframe = 0;
                }
                break;
        
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax;
                this.currentframe = 0;
                }
                break;
            case 'attack2':
                if(this.image !== this.sprites.attack2.image){
                this.image = this.sprites.attack2.image;
                this.framesMax = this.sprites.attack2.framesMax;
                this.currentframe = 0;
                }
                break;
            case 'block':
                if(this.image !== this.sprites.block.image){
                this.image = this.sprites.block.image;
                this.framesMax = this.sprites.block.framesMax;
                this.currentframe = 0;
                }
                break;
            case 'hit':
                if(this.image !== this.sprites.hit.image){
                this.image = this.sprites.hit.image;
                this.framesMax = this.sprites.hit.framesMax;
                this.currentframe = 0;
                }
                break;
            case 'dead':
                if(this.image !== this.sprites.dead.image){
                this.image = this.sprites.dead.image;
                this.framesMax = this.sprites.dead.framesMax;
                this.currentframe = 0;
                break;
                }
        }

    }
        
}