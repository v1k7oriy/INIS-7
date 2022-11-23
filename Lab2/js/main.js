var isRect=true;
var isCircle=false;

const svgPoint = (elem, x, y) => {
    const p = svg.createSVGPoint();
    p.x = x;
    p.y = y;
    return p.matrixTransform(elem.getScreenCTM().inverse());
  };


  window.onload = () => {
      const svg = document.getElementById('svg');

      isRect=true;
      isCircle=false;

      svg.addEventListener('mousedown', (event) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const start = svgPoint(svg, event.clientX, event.clientY);

      if(isRect){
        const drawRect = (e) => {
            const p = svgPoint(svg, e.clientX, e.clientY);
            const w = Math.abs(p.x - start.x);
            const h = Math.abs(p.y - start.y);
            if (p.x > start.x) {
              p.x = start.x;
            }
            if (p.y > start.y) {
              p.y = start.y;
            }
            rect.setAttributeNS(null, 'x', p.x);
            rect.setAttributeNS(null, 'y', p.y);
            rect.setAttributeNS(null, 'width', w);
            rect.setAttributeNS(null, 'height', h);
            svg.appendChild(rect);
          };

          const endDraw = (e) => {
            svg.removeEventListener('mousemove', drawRect);
            svg.removeEventListener('mouseup', endDraw);
          };

          svg.addEventListener('mousemove', drawRect);
          svg.addEventListener('mouseup', endDraw);
        }
       else {
        const drawCircle = (e) => {
          const p = svgPoint(svg, e.clientX, e.clientY);
          const r = Math.abs(p.x - start.x);
          if (p.x > start.x) {
              p.x = start.x;
          }
          if (p.y > start.y) {
              p.y = start.y;
          }
          circle.setAttributeNS(null, "cx", start.x);
          circle.setAttributeNS(null, "cy", start.y);
          circle.setAttributeNS(null, 'r', r);
          svg.appendChild(circle);
        };

        const endDraw = (e) => {
          svg.removeEventListener('mousemove', drawCircle);
          svg.removeEventListener('mouseup', endDraw);
        };

        svg.addEventListener('mousemove', drawCircle);
        svg.addEventListener('mouseup', endDraw);
      }
  });
}

  function rect(){
    isRect=true;
    isCircle=false;
  }

  function circle(){
    isCircle=true;
    isRect=false;
  }

function clr(){
    while(svg.lastChild){
        svg.removeChild(svg.lastChild);
    }
}
