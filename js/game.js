let timer = null;
let clear=0;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size=5;
  let MAX;
  let qnum=Math.floor(Math.random()*q.length);
  let max=document.getElementById("max");
  if(max.value>0){
      MAX=max.value;
      console.log(MAX);
  }else{
    MAX=3;
  }
  for (var i = 0; i < size*size; i++) {
    let s = document.createElement("span");
    s.textContent=q[qnum][0];
    s.setAttribute("id","num"+i);
    cells.appendChild(s);
    s.addEventListener('click',function(){
      if(q[qnum][1]==this.textContent){
        correct.play();
        while(cells.firstChild){
          cells.removeChild(cells.firstChild);

        }
        clear++;
        clearnum.textContent="clear:"+clear;
        if(clear<MAX){
          gameStart();
        }else{
          alert("Game Clear!!");
          clearTimeout(timer);
        }
      }else{
        wrong.play();
      }
    });

    if(i%size==size-1){
      const br=document.createElement("br");
      cells.appendChild(br);
    }
  }
  let random=Math.floor(Math.random()*size*size);
  let ans=document.getElementById("num"+random);
  ans.textContent=q[qnum][1];

}

function time() {
  let now = new Date();
  let time = parseInt((now.getTime()-start.getTime())/1000);
  score.textContent=time;
  timer=setTimeout("time()",1000);
}
