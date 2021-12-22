<script>
import { question,selectedAns, attempted ,unattempted} from '../store';
import {createEventDispatcher} from 'svelte';
import Button from '../UI/Button.svelte'
let dispatch = createEventDispatcher();
let result = 0;
let correctCount = 0;
let uncorrectCount = 0;
let atmcount = 0;
let uatmcount = 0;
let indexCur = [];
let corArray = [];
let unattQues = [];
let arr = [0, 1, 2, 3];

export let correct;
$: for (let j = 0; j < 12; j++) {
	if (correct.includes($selectedAns[j])) {
		correctCount += 1;
	}
}
$: uncorrectCount = 11 - correctCount;
$: for (let j = 0; j < 11; j++) {
	if ($selectedAns[j] != undefined) {
		atmcount += 1;
	} else {
		uatmcount += 1;
	}
}

$: result = Math.round((correctCount / 11) * 100);
$: for (let i = 0; i < 11; i++) {
	let ind = 0;
	if ($selectedAns[i]) {
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($question[i].content_text).answers[j].answer === $selectedAns[i]) {
				ind = j;
			}
		}
	} else {
		ind = null
	}
	indexCur[i] = ind;
}


$: for (let i = 0; i < 11; i++) {
	let localcorrect = 0
	for (let j = 0; j < 4; j++) {
		if (JSON.parse($question[i].content_text).answers[j].is_correct == "1") {
			localcorrect = j;
		}
	}
	corArray[i] = localcorrect;
}

for (let i = 0; i < 11; i++) {

	if ($selectedAns[i] == undefined) {
		unattQues.push($question[i]);

	}
	console.log(unattQues);
}
$: unattempted.set(unattQues);
</script>
<style>
    
.resultbox {
  display: flex;
  background: rgb(235, 224, 204);
  border: 1px solid rgb(185, 128, 54);
  position: relative;
  left: 3vw;
  top: 5vw;
  width: 90vw;
  height: 20vh;
  border-radius: 5px;
  padding: 1rem;
  justify-content: space-around;
}

.circle {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  padding: 5px;
  margin: 3px;
  background: #fff;
  border: 2px solid rgb(240, 248, 132);
  color: #000;
  text-align: center;
}
.table {
  padding: 5px;
  margin: 30px;
  position: relative;
  top: 20vh;
}

.tabledata {
  border: 1px solid rgb(243, 238, 238);
  background-color: rgb(194, 229, 243);
}

.answer {
  width: 10vw;
  padding: 10px;
}
.correct {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  padding: 3px;
  background: #fff;
  border: 2px solid rgb(1, 148, 1);
  color: #000;
  text-align: center;
}
.select {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  padding: 3px;
  background: #fff;
  border: 2px solid rgb(250, 49, 49);
  color: #000;
  text-align: center;
}

</style>
<div class="mainDiv">
    <Button type="button" caption="Dash board"  on:click={()=>{dispatch("moveToStart")}} />	
    <div class="resultbox">
     <div>
      <h3>Result</h3>
      <h3>{result}&#37;</h3>
     </div>
     <div>
        <h3>Attempted</h3>
        <h3>{atmcount}</h3>
       </div>
       
       <div>
        <h3>UnAttempted</h3>
        <h3>{uatmcount}</h3>
       </div>
       
       <div>
        <h3>correct</h3>
        <h3>{correctCount}</h3>
       </div>
       <div>
        <h3>InCorrect</h3>
        <h3>{uncorrectCount}</h3>
       </div>
       
</div>
<div class="qDiv">
    <table class="table">
        <tr>
            <th class="tabledata">Index</th>
            <th class="tabledata">Question</th>
            <th class="tabledata">Option</th>
          </tr>
 
     {#each $question as ques , index(ques)}
     <tr>
     <td class="tabledata">{index+1}</td>
     <td class="question tabledata" on:click={()=>{dispatch("rev",index)}} >{JSON.parse(ques.content_text).question}</td>
     <td class="answer tabledata">
        {#each arr as arr , i (arr)} 
         <span class="circle" class:correct={(corArray[index]===i)?true:false} 
         class:select={(corArray[index]!=indexCur[index] && indexCur[index]==i)?true:false} >{i+1}</span>
    
     {/each}
        </td>
     </tr>
    {/each} 
</table>
 </div>


</div>