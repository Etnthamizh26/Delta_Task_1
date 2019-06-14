var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var cx=canvas.width/2 - 120;
var cy=canvas.height - 60;
var img=document.getElementById('cannon');

var bx1=[],by1=[];
var xcord1=0,ycord1=0;
var bx2=[],by2=[];
var xcord2=0,ycord2=0;

var bax=30+(Math.round(Math.random()))*335;
var bay=100+(Math.random()*300);
var r=30;
var dbax=1.25,dbay=5;

var leftcorner,rightcorner,righttouch,lefttouch,toptouch;

var rockno=Math.round(Math.random()*3000);

var bultouch1;
var bultouch2;
var score=0;

var leftpressed=false;
var rightpressed=false;

document.addEventListener("keydown",press);
document.addEventListener("keyup",lift);

function rectangle(x,y,width,height,color)
{
  ctx.fillStyle=color;
  ctx.fillRect(x,y,width,height);
}

function bullet()
{ 
  xcord1=cx+10;
  ycord1=cy-15;
  bx1.push(xcord1);
  by1.push(ycord1);

  xcord2=cx+30;
  ycord2=cy-15;
  bx2.push(xcord2);
  by2.push(ycord2);
}

function bulmove()
{
  var i=0;
  
  for(i=0;i<bx1.length;i++)
  {
    ctx.beginPath();
    ctx.fillStyle="red";
    ctx.arc(bx1[i],by1[i],5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    by1[i]-=25;

  bultouch1=Math.sqrt(((bax-bx1[i])*(bax-bx1[i]))+((bay-by1[i])*(bay-by1[i])));
   if (bultouch1<=(r+5)) 
   {
    score+=1;
    rockno=rockno-1;
    bx1[i]=bx1[i]+canvas.width;
   }
  }

  var j=0;
  
  for(j=0;j<bx2.length;j++)
  {
    ctx.beginPath();
    ctx.fillStyle="red";
    ctx.arc(bx2[j],by2[j],5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    by2[j]-=25;

  bultouch2=Math.sqrt(((bax-bx2[j])*(bax-bx2[j]))+((bay-by2[j])*(bay-by2[j])));
   if (bultouch2<=(r+5)) 
   {
    score+=1;
    rockno=rockno-1;
    bx2[j]=bx2[j]+canvas.width;
   }
  }
}

function ball()
{
  ctx.beginPath();
  ctx.fillStyle="blue";
  ctx.arc(bax,bay,r,0,2*Math.PI);
  ctx.fill();
  ctx.closePath();
  bax=bax+dbax;
  bay=bay+dbay;
  if(bay>=(canvas.height-r))
  {
    dbay=-dbay;
  }
  if(bay<=(30))
  {
    dbay=-dbay;
  }
  if(bax>=(canvas.width-(r+200)))
  {
    dbax=-dbax;
  }
  if(bax<=r)
  {
    dbax=-dbax;
  }

}

function scoarea(){
  rectangle(400,0,200,canvas.height,"black");
  ctx.font="60px Cursive";
  ctx.fillStyle="white";
  ctx.fillText("Ball",450,70);
  ctx.fillText("Blast",430,130);
  rectangle(400,150,200,5,"white");
  rectangle(400,350,200,5,"white");
  ctx.fillText("Score",420,430);
  ctx.font="40px Cursive";
  ctx.fillText(score,420,500);
}

function number()
{
  ctx.font="20px Cursive";
  ctx.fillStyle="white";
  ctx.fillText(rockno,(bax-25),(bay+5));
  if (rockno<=0) 
  {
    bax=bax+canvas.width;
  }
}

function press(e)
{
  if (e.keyCode==37)
         leftpressed=true;
  else 
      if(e.keyCode==39)
             rightpressed=true;   
}
function lift(e)
{
  if (e.keyCode==37)
         leftpressed=false;
    else if(e.keyCode==39)
             rightpressed=false;
}

function over()
{
  leftcorner=Math.sqrt(((bax-cx)*(bax-cx))+((bay-cy)*(bay-cy)));
  rightcorner=Math.sqrt(((bax-(cx+40))*(bax-(cx+40)))+((bay-cy)*(bay-cy)));
  righttouch=bax-cx-40;
  lefttouch=cx-bax;
  toptouch=cy-bay;
  if (leftcorner<=(r-5) || rightcorner<=(r-5) || (righttouch<=(r-10) && bay>cy && righttouch>=0) || (lefttouch<=(r-10) && bay>cy && lefttouch>=0) || (toptouch<=5 && bax>cx && bax<(cx+40))) 
  {
    if (score==0) 
      {alert("Game Over--- Your Score is "+score);}
    else 
      { score=score-2;
        alert("Game Over--- Your Score is "+score);}
  }
}

function cannon()
{
  
  if (leftpressed)
  { 
    cx=cx-5;
    if (cx<0) 
      cx=0;
  }
  else
    if (rightpressed)
    { 
      cx=cx+5;
      if (cx>(canvas.width-240)) 
        cx=canvas.width-240;
    }
    rectangle(cx,cy,40,60,"yellow");
    ctx.drawImage(img,cx,cy,40,60);
}
function draw ()
       {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cannon();
        bullet();
        bulmove();
        ball();
        number();
        over();
        scoarea();
     }
setInterval(draw , 30);