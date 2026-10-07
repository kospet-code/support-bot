/* Per-slide katakana matrix rain — subtle, cyan with rare magenta. */
(function(){
  const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノﾊﾋﾌﾍﾎマミムメモ0123456789".split("");
  const stages = [];

  function makeRain(canvas){
    const ctx = canvas.getContext("2d");
    let w,h,cols,drops,font=18,step=22;
    function resize(){
      w = canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      step = 22 * devicePixelRatio; font = 16 * devicePixelRatio;
      cols = Math.floor(w/step);
      drops = new Array(cols).fill(0).map(()=> Math.random()*-50);
    }
    resize();
    return {
      resize,
      tick(){
        ctx.fillStyle = "rgba(5,8,12,0.10)";
        ctx.fillRect(0,0,w,h);
        ctx.font = font+"px monospace";
        for(let i=0;i<cols;i++){
          const x = i*step, y = drops[i]*step;
          const g = GLYPHS[(Math.random()*GLYPHS.length)|0];
          const head = Math.random() > 0.985;
          ctx.fillStyle = head ? "rgba(255,46,196,0.55)"
                               : (Math.random()>0.5 ? "rgba(45,226,230,0.30)" : "rgba(45,226,230,0.14)");
          ctx.fillText(g, x, y);
          if(y > h && Math.random() > 0.975) drops[i] = Math.random()*-20;
          drops[i] += 0.45;
        }
      }
    };
  }

  function boot(){
    document.querySelectorAll("canvas.matrix").forEach(c=>{
      stages.push(makeRain(c));
    });
    let last=0;
    function loop(t){
      if(t-last > 55){ stages.forEach(s=>s.tick()); last=t; }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    window.addEventListener("resize",()=>stages.forEach(s=>s.resize()));
  }

  if(document.readyState!=="loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
