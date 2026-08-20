let current=0, answers={}, remaining=50*60, finished=false;
const $=id=>document.getElementById(id);
function render(){
 if(finished)return;
 const item=QUESTIONS[current];
 $("meta").textContent=`Question ${current+1} of ${QUESTIONS.length}`;
 $("question").textContent=item.q;
 $("options").innerHTML=item.options.map((x,i)=>{
   const label=String.fromCharCode(65+i);
   return `<button class="option ${answers[current]===label?'selected':''}" onclick="choose('${label}')"><b>${label}.</b> ${x}</button>`;
 }).join("");
 $("prev").disabled=current===0;
 $("next").textContent=current===QUESTIONS.length-1?"Review →":"Next →";
 $("progress").style.width=((current+1)/QUESTIONS.length*100)+"%";
 $("palette").innerHTML=QUESTIONS.map((_,i)=>`<button class="dot ${answers[i]?'done':''} ${i===current?'current':''}" onclick="go(${i})">${i+1}</button>`).join("");
}
function choose(label){answers[current]=label;render()}
function go(i){current=i;render()}
$("prev").onclick=()=>{if(current>0){current--;render()}};
$("next").onclick=()=>{if(current<QUESTIONS.length-1){current++;render()}else{showToast("Review करके Submit Test दबाएँ")}};
$("submit").onclick=submit;
function tick(){
 if(finished)return;
 let m=Math.floor(remaining/60),s=remaining%60;
 $("timer").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
 if(remaining<=0){submit(true);return}
 remaining--;
}
function submit(auto=false){
 if(finished)return;
 const unanswered=QUESTIONS.length-Object.keys(answers).length;
 if(!auto && unanswered>0 && !confirm(`${unanswered} questions unanswered हैं। क्या आप test submit करना चाहते हैं?`))return;
 finished=true;
 clearInterval(clock);
 let score=0;
 QUESTIONS.forEach((x,i)=>{if(answers[i]===x.answer)score++});
 const pct=Math.round(score/QUESTIONS.length*100);
 $("exam").style.display="none";$("result").style.display="block";
 $("score").textContent=`${score} / ${QUESTIONS.length}`;
 $("summary").innerHTML=`Percentage: <b>${pct}%</b> &nbsp; • &nbsp; Attempted: <b>${Object.keys(answers).length}</b> &nbsp; • &nbsp; Unattempted: <b>${unanswered}</b>`;
 $("review").innerHTML=QUESTIONS.map((x,i)=>{
   const user=answers[i]||"—", ok=user===x.answer;
   return `<div class="review-item"><b>Q${i+1}. ${x.q}</b><p class="${ok?'correct':'wrong'}">${ok?'✓ सही':'✗ गलत'} — आपका उत्तर: ${user}</p><p><b>सही उत्तर:</b> ${x.answer}. ${x.options[x.answer.charCodeAt(0)-65]}</p><p class="small">${x.explanation}</p></div>`;
 }).join("");
 window.scrollTo({top:0,behavior:"smooth"});
}
function showToast(t){$("toast").textContent=t;$("toast").style.display="block";setTimeout(()=>$("toast").style.display="none",2200)}
render();tick();const clock=setInterval(tick,1000);
