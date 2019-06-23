var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var cx=canvas.width/2 - 120;
var cy=canvas.height - 60;
var img=document.getElementById('cannon');

var bulletc="black";

var Bx=[],By=[],HP=[],VEL_x=[],VEL_y=[];
var r=30;

var bx1=[],by1=[];
var xcord1=0,ycord1=0;
var bx2=[],by2=[];
var xcord2=0,ycord2=0;

var leftcorner,rightcorner,righttouch,lefttouch,toptouch;

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

function ballentry_x()
{
  var ex=Math.floor(Math.random()*2);
  var xin;
  if (ex==1) 
    xin=30;
  else
    xin=365;
  return xin;
}

function ballentry_y()
{
  var ey=Math.floor(Math.random()*251)+100;
  return ey;
}

function initial_hp()
{
  var ranhp=Math.floor(Math.random()*701)+100;
  return ranhp;
}

function circle(bax,bay,hp)
{
  ctx.beginPath();
  ctx.fillStyle="blue";
  ctx.arc(bax,bay,r,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.font="20px Cursive";
  ctx.fillStyle = "white";
  ctx.fillText(hp, bax-20, bay+5);
}

function scoarea()
{
  rectangle(400,0,200,canvas.height,"black");
  ctx.font="60px Cursive";
  ctx.fillStyle="white";
  ctx.fillText("Ball",450,70);
  ctx.fillText("Blast",(canvas.width-170),130);
  rectangle(400,150,200,5,"white");
  rectangle(400,350,200,5,"white");
  ctx.fillText("Score",420,430);
  ctx.font="40px Cursive";
  ctx.fillText(score,420,500);
}

function ball()
{
  Bx.push(ballentry_x());
  By.push(ballentry_y());
  HP.push(initial_hp());
  VEL_x.push(1+(Math.floor(Math.random()*3))*0.25);
  VEL_y.push(3+(Math.floor(Math.random()*3)));
}

function ballmove()
{
  var k;
  for(k=0;k<Bx.length;k++)
  {
  Bx[k]=Bx[k]+VEL_x[k];
  By[k]=By[k]+VEL_y[k];
  if(By[k]>=(canvas.height-r))
  {
    VEL_y[k]=-VEL_y[k];
  }
  if(By[k]<=(30))
  {
    VEL_y[k]=-VEL_y[k];
  }
  if(Bx[k]>=(canvas.width-(r+200)))
  {
    VEL_x[k]=-VEL_x[k];
  }
  if(Bx[k]<=r)
  {
    VEL_x[k]=-VEL_x[k];
  }
  if(HP[k]<=0)
    Bx[k]+=canvas.width;
  circle(Bx[k],By[k],HP[k]);
  }
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

function bullmove()
{  
  for(var i=0;i<bx1.length;i++)
  {
    if (i%2==0) 
      bulletc="black";
    else
      bulletc="white";
    ctx.beginPath();
    ctx.fillStyle=bulletc;
    ctx.arc(bx1[i],by1[i],5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    by1[i]-=25;

  for (var k=0;k<Bx.length;k++)
  {
  bultouch1=Math.sqrt(((Bx[k]-bx1[i])*(Bx[k]-bx1[i]))+((By[k]-by1[i])*(By[k]-by1[i])));
   if (bultouch1<=(r+5)) 
   {
    score+=1;
    HP[k]-=1;
    bx1[i]+=canvas.width;
   }
  }
 }
  
  for(var j=0;j<bx2.length;j++)
  {
    if (j%2==0) 
      bulletc="black";
    else
      bulletc="white";
    ctx.beginPath();
    ctx.fillStyle=bulletc;
    ctx.arc(bx2[j],by2[j],5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    by2[j]-=25;

  for (var l=0;l<Bx.length;l++)
  {
  bultouch2=Math.sqrt(((Bx[l]-bx2[j])*(Bx[l]-bx2[j]))+((By[l]-by2[j])*(By[l]-by2[j])));
   if (bultouch2<=(r+5)) 
   {
    score+=1;
    HP[l]-=1;
    bx2[j]+=canvas.width;
   }
  }
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
  var t;
  for (var i=0;i<Bx.length;i++)
  {
  leftcorner=Math.sqrt(((Bx[i]-cx)*(Bx[i]-cx))+((By[i]-cy)*(By[i]-cy)));
  rightcorner=Math.sqrt(((Bx[i]-(cx+40))*(Bx[i]-(cx+40)))+((By[i]-cy)*(By[i]-cy)));
  righttouch=Bx[i]-cx-40;
  lefttouch=cx-Bx[i];
  toptouch=cy-By[i];
  if (leftcorner<=(r-10) || rightcorner<=(r-10) || (righttouch<=(r-10) && By[i]>cy && righttouch>=0) || (lefttouch<=(r-10) && By[i]>cy && lefttouch>=0) || (toptouch<=(r-5) && Bx[i]>cx && Bx[i]<(cx+40)))
  {
   t=confirm("Game Over\n"+"Click OK to Restart the Game\n"+"Click CANCEL to Exit");
   if (t==true) 
    location.reload();
   else
    window.close();
  }
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
        bullmove();
        ballmove();
        scoarea();
        over();
     }    
setInterval(draw , 30);
setInterval(ball , 9000);