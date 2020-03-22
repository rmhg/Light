//CREATED JS BY RAHUL MISHRA
var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var pen = canvas.getContext("2d");
var side = 10;
function rand(low,high)
{
    return Math.floor(Math.random()*high + low);
}
function distance(x1,x2,y1,y2)
{
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}
class light{
    constructor(x,y)
    {
    
        this.x = x;
        this.y = y;
        this.intensity = 100;
    }
    netint(x,y)
    {
       var t = distance(this.x,x,this.y,y);
        var neti;
        neti = t/(this.intensity);

      return neti;
    }
}
class Square
{
    constructor(x,y,color = "black",alpha = 1)
    {
        this.x = x;
        this.y = y;
        this.side = side;
        this.color = color;
        this.alpha = alpha;
        this.draw();
    }
    draw()
    {
        pen.save();
        pen.beginPath()
        pen.rect(this.x,this.y,this.side,this.side);
        pen.fillStyle = this.color;
        pen.globalAlpha = this.alpha; 
        pen.fill();
        pen.closePath();
        pen.restore();
    }
}

function drawall(l)
{
    
    for(var i = 0;i <= canvas.width;i+=side)
    {
        for(var j = 0;j <= canvas.height;j+=side)
        {
            var c = l.netint(i,j);
            new Square(i,j,"black",c);
        }
    }
}

function loop(x,y)
{
    pen.clearRect(0,0,canvas.width,canvas.height);
    drawall(new light(x,y));
}
window.onmousemove = ()=>{
    loop(event.clientX,event.clientY);  
}
window.addEventListener("touchmove",()=>{
    loop(event.touches[0].clientX,event.touches[0].clientY);
});