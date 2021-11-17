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
        }else{  //ゲームクリア
          alert("Game Clear!!");
          clearTimeout(timer);
          console.log("time:"+score.textContent);
          let time=parseInt(score.textContent);
          load(time);
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
/*function firstsave(){
  let test = new ClearTime();
  let key = "time";
  test.set(key,null);
  test.save()
    .then(function(){
      console.log("成功");
    })
    .catch(function(err){
      console.log("エラー発生:"+err);
    });
}*/
function save(time){
  let test = new ClearTime();
  let key = "time";
  test.set(key,parseInt(time));
  test.save()
    .then(function(){
      console.log("成功");
    })
    .catch(function(err){
      console.log("エラー発生:"+err);
    });
}
function load(score){
  ClearTime
  .order("time")
  .fetchAll()
    .then(function(result){
      let min=result[0].time;
      if(min>score){
        alert("ハイスコア！！");
        save(score);
      }else{
        save(score);
      }

    })
    .catch(function(err){
      alert("ハイスコア");
      save(score);
    });

}
