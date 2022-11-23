var isRect=false;
var isCircle=true;
let figures = [];

window.onload = () => {

  const canvas = document.getElementById('canvas'); 
  const context = canvas.getContext('2d');

  canvas.setAttribute('width', window.innerWidth); 
  canvas.setAttribute('height', window.innerHeight); 

  context.lineWidth = 7; //толщина линии
  context.lineJoin = 'round'; //определяет форму вершин в которых линии сходятся
  context.lineCap = 'round'; //определяет, как будут выглядеть концы нарисованных линий
  context.strokeStyle = 'pink'; //цвет или стиль, используемый при выполнении обводки фигур
  context.fillStyle = 'pink'; //цвет или стиль, используемый при заливке фигур

  let isDrawStart = false;
  let startPosition = {x: 0, y: 0};
  let endPosition = {x: 0, y: 0};
  let figureWidth=0;
  let figureHeight=0;
  let figureRadius=0;

  canvas.addEventListener('mousedown', mouseDownListener);
  canvas.addEventListener('mousemove', mouseMoveListener);
  canvas.addEventListener('mouseup', mouseUpListener);

  function getClientOffset(event){
    const x = event.offsetX;
    const y = event.offsetY;
    return {x,y}
  }

  function mouseDownListener(event){
   startPosition = getClientOffset(event);
   isDrawStart = true;
 }

  function mouseMoveListener(event){
    if(!isDrawStart) return;

    endPosition = getClientOffset(event);
    figureWidth = endPosition.x - startPosition.x;
    figureHeight = endPosition.y - startPosition.y;
    figureRadius = Math.abs(endPosition.x - startPosition.x);
    clearCanvas();
    if(isRect) 
      drawRectangle(startPosition.x, startPosition.y, figureWidth, figureHeight);
    else 
      drawCircle(startPosition.x, startPosition.y, figureRadius);
  }

  function drawRectangle(x, y, width, height){
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();
    context.fill();
  }

  function drawCircle(x, y, radius){
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.stroke();
    context.fill();
  }

  function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    figures.forEach((item, i) => {
      if(item.isRect){
        drawRectangle(item.x, item.y, item.width, item.height);
      }else{
        drawCircle(item.x, item.y, item.radius);
      }
    });
  }

  function mouseUpListener(event){
    if(isRect){
      figures.push({isRect: true, x: startPosition.x, y: startPosition.y, width: figureWidth, height: figureHeight, radius:0});
    } else {
      figures.push({isRect: false, x:startPosition.x, y:startPosition.y, width:0, height:0, radius:figureRadius});
    }
    isDrawStart = false;
  }

}

function rectFun(){
  isRect=true;
  isCircle=false;
}

function circFun(){
  isCircle=true;
  isRect=false;
}

function clr(){
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  figures = [];
}
