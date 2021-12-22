<script>
  import { fly } from 'svelte/transition';
import { createEventDispatcher } from 'svelte';
import {question, attempted,unattempted,selectedAns} from "../store"
const dispatch = createEventDispatcher();

let showA = true;
let unattQues = [];
let showAtt = false;
let showU = false;
let atmcount = 0
let uatmcount = 0;

function showAll() {
	showAtt = false;
	showA = true;
	showU = false;
}

function showAttempted(event) {
  showAtt = true;
	showA = false;
	showU = false;
	event.preventDefault();
}

function showUn() {
	showAtt = false;
	showA = false;
	showU = true;
}

function move(index, ques) {
	dispatch("current", index);
	dispatch("closeList");

}

function moveU(index, ques) {
	let inx = $question.indexOf(ques);
	dispatch("current", inx);
	dispatch("closeList");
}

for (let i = 0; i < 11; i++) {
  if ($selectedAns[i] == undefined) {
		unattQues.push($question[i]);
		uatmcount += 1;
	}
}
$: atmcount = 11 - uatmcount;
$: unattempted.set(unattQues);
</script>
<style>
.modal-backdrop {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: transparent;
}

.modal {
  border: 5px solid rgb(247, 142, 142);
  position: fixed;
  top: 5em;
  left: 0;
  height: 36rem;
  background: rgb(255, 255, 255);
  z-index: 100;
  width: 28em;
  overflow: scroll;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.heading {
  display: flex;
  justify-content: space-around;
  background: rgb(185, 128, 54);
}
.head {
  margin:1rem;
}

.innerDiv {
  font-family: Georgia, "Times New Roman", Times, serif;
  background: rgb(189, 225, 240);
}
.content {
  margin-top: 5px;
}
.head:hover {
  background-color: #cf0056;
  border: 2px solid;
}

</style>
<div  class="modal-backdrop" on:click={()=>{dispatch("closeList")}} />
    <div transition:fly={{x:-40}} class="modal">
    <div class="heading">
     <h3 class="head" on:click="{showAll}">All Question: 11</h3>
     <h3 class="head" on:click="{showAttempted}">Attempted: {atmcount} </h3>
     <h3 class="head" on:click="{showUn}">Unattempted: {uatmcount} </h3>

</div>
    
<div class="content">
        
    {#if showA}
     {#each $question as ques ,index(ques)}
        <div class="innerDiv" on:click={move(index,ques)}>
          {index+1}. {JSON.parse(ques.content_text).question}
        </div>
        <hr>
     {/each}
    {/if}
    {#if showAtt}
     {#if $attempted.length==0}
       <p>No Question Attempted</p>
     {:else}
       {#each $attempted as ques ,index(ques)}
         <div class="innerDiv" on:click={moveU(index,ques)}>
          {index+1}. {JSON.parse(ques.content_text).question}
         </div>
        <hr>
        {/each}
      {/if}
    {/if}
      {#if showU}
      {#if $attempted.length==11}
      <p>No Question to Show</p>
      {:else}
        {#each $unattempted as ques ,index(ques)}
           <div class="innerDiv" on:click={moveU(index,ques)}>
            {index+1}. {JSON.parse(ques.content_text).question}
           </div>
           <hr>
       {/each}
       {/if}
       {/if}
    </div>
</div>
