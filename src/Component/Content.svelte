<script>
 import { question ,selectedAns, attempted, unattempted} from '../store';
 import Button from "../UI/Button.svelte";
 import {createEventDispatcher, onMount} from 'svelte';
 let localOption = [];
 let minute = 60;
 let second = 0;
 let minString;
 let secString;
 export let prevDis = false;
 export let nextDis = true;
 export let currentQues;
 export let list;
 let opt=["A","B","C","D"];

const dispatch = createEventDispatcher();
$: selectedAns.update(items => {
 	return [...localOption];

 });

$: if ($selectedAns[currentQues] != undefined) {
 	attempted.update(its => {
 		if (its.includes($question[currentQues])) {
 			return its;
 		} else {
 			return [...its, $question[currentQues]];
 		}

 	})
 }

 onMount(() => {
 	timer();
 })

 function timer() {

 	if (second == 0) {
 		minute--;
 		second = 60;
 	} else {
 		second--;
 	}
 	if (second < 10) {
 		secString = "0" + second;
 	} else {
 		secString = second;
 	}

 	if (minute < 10) {
 		minString = "0" + minute;
 	} else {
 		minString = minute;
 	}
 }

 setInterval(() => {
 	timer();
 }, 1000);
</script>
<style>
.section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.radioDiv {
  display: flex;
  flex-direction: column;
  font-family: "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: 1.3rem;
  text-align: justify;
  align-items: flex-start;
  position: relative;
  left: 1rem;
  top:1rem;
}
.label {
  margin: 5px;
}

.footer {
  background: rgb(185, 128, 54);
  width: 100vw;
  height: 10vh;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.para {
  font-family: "Times New Roman", Times, serif;
  font-weight: 800;
  font-size: 1.5rem;
  position: relative;
  margin-top: 1rem;
  padding: 0;
  text-align: justify;
}
.moveleft {
  position: absolute;
  left: 30vw;
}
.head3 {
  margin: 1rem;
}
.contentDiv {
  margin: 2em;
}
</style>

<section class="section">
{#each $question as ques , i(ques)}

{#if currentQues===i}
<div class="contentDiv" class:moveleft={list}>
<p class="para">{i+1}. {JSON.parse(ques.content_text).question}</p>
<div class="radioDiv">
{#each JSON.parse(ques.content_text).answers as answers , index(answers)}

<label class="label">
{opt[index]}.	
<input type="radio" value="{answers.answer}" name="radio" id="radio{index}" bind:group="{localOption[i]}"  />
{@html  answers.answer}
</label>

{/each}
</div>
</div>
<div class="footer">
<h3 class="head3" >{minString}:{secString}</h3>
<Button type="button"  caption="List"  on:click={()=>{dispatch("openList")}} />
<Button type="button"   caption="Prev" disabled={prevDis} on:click={()=>{dispatch("current", i - 1)}} />
<h3 class="head3">{i+1} of {11}</h3>
<Button type="button" caption="Next"  disabled={nextDis} on:click={()=>{dispatch("current", i + 1)}} />
<Button type="button" caption="End Test"   on:click={()=>{dispatch("endModel")}} />	
</div>
{/if}
{/each}
</section>