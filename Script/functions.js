function rectangularCollision({rect1, rect2}){
    return (rect1.position.x + rect1.attackBox.width > rect2.position.x && 
        rect1.position.x < rect2.position.x + rect2.attackBox.width &&
        rect1.position.y + rect1.attackBox.height > rect2.position.y && 
        rect1.position.y < rect2.position.y + rect2.attackBox.height);
}
let timer = 60;
let timerid = null;
let counter =1;
function endGame({player,enemy, timerId}){
    clearTimeout(timerId);
    document.querySelector('#winnerDialog').style.display = "flex";
    if(player.health === enemy.health) {
        document.querySelector('#winnerDialog').innerHTML = "Overtime " + counter + "!";
        setTimeout(() => {document.querySelector('#winnerDialog').style.display = "none";} , 3000);
        timer = 30;
        counter++;
        }
    else if(player.health > enemy.health){
        document.querySelector('#winnerDialog').innerHTML = "Player 1 Wins!";
        
    }else if(player.health < enemy.health){
        document.querySelector('#winnerDialog').innerHTML = "Player 2 Wins!";
    }
}

function timerFunct(){
    if(timer > 0){
        timerId = setTimeout(timerFunct,1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }
   if(timer === 0){ 
    endGame({player,enemy,timerId});
    }
}