

let canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 650;
let c = canvas.getContext('2d');
//text

    function showScore(text) {
        c.beginPath();
        c.font = "30px Arial";
        c.fillStyle = 'black'
        c.fillText(text,20,40);
        c.closePath();
    };


//class ball
function Ball(x,y,radius,color,dx,dy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.draw = function (){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

    }
    this.update = function (){
        if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }
        if(this.y - this.radius <= 0){
            this.dy = -this.dy;
        }
        // khi va cham thanh ngang
        if(this.x >= bar.x && this.x <= bar.x+bar.width){
            if(this.y + this.radius >= bar.y && this.y + this.radius <= bar.y + bar.height){
                this.dy = -this.dy;
                score++;
                //thay doi goc
                if(this.dx > 0){
                    if(mark === 1){
                        this.dx+=2;
                    }else{
                        if(this.dx >= 4) {
                            this.dx -= 2;

                        }
                    }
                }else if (this.dx < 0){
                    if(mark === -1){
                        this.dx-=2;
                    }else{
                        if(this.dx <= -4) {
                            this.dx += 2;

                        }
                    }
                }
                this.dy -= 1;
            }
        }
        if(this.y >= bar.y && this.y <= bar.y+bar.height){
            if(this.x+this.radius >= bar.x && this.x-this.radius<=bar.x){
                this.dx = -this.dx;
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
};
//class Bar
function Bar(x,y,width,height,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = function (){
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.x,this.y,this.width,this.height);
        c.fill();
        c.closePath();
    }
};
//addEventListener
let mark = 0;
window.addEventListener('keydown',function (event){
    switch (event.keyCode) {
        case 37:
            if(bar.x <= 0){}
            else {
                bar.x -= 10;
                mark = -1;
            }
            break;
        case 39:
            if(bar.x+bar.width >= canvas.width){}
            else {
                bar.x += 10;
                mark = 1;
            }
            break;
    }
});
//object
let b1 = new Ball(50,100,7,'blue',3,4);
let bar = new Bar(100,550,100,10,'red')
//draw
let score = 0;
function animate(){
    //khi thua
    if(b1.y > canvas.height){
        alert('you lose');
        let replay = confirm('ban co muon choi lai?');
        if(replay){
            b1.x = 50;
            b1.y = 100;
            b1.dx = 3;
            b1.dy = 4;
            bar.x = 100;
            bar.y = 550;
            score = 0;
            requestAnimationFrame(animate);
            c.clearRect(0,0,canvas.width,canvas.height);

            showScore('your score: '+score+'');
            b1.update();
            bar.draw();
        }

        return ;
    }
    //loop
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);

    showScore('your score: '+score+'');
    b1.update();
    bar.draw();

}
animate();
