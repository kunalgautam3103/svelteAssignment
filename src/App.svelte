<script>
	import Button from "./UI/Button.svelte"
	import Header from "./UI/Header.svelte";
	import Content from './Component/Content.svelte'
	import {question } from './store';
    import { onMount } from "svelte";
	import List from './Component/List.svelte'
	import EndModel from './Component/EndModel.svelte'
	import Result from './Component/Result.svelte'
	import Review from './Component/Review.svelte'
	let startpage = true;
	let contentpage = false;
	let list = false;
	let endModel = false;
	let currentQues = 0;
	let reviewpage = false;
	let resultpage = false
	let nextDis = false;
	let prevDis = true;
	const correct = [];

	onMount(async () => {
		fetch("question.json")
			.then(
				(res) => res.json()
			)
			.then(
				(data) => {
			
					question.set(data);
				
			
			
					for (let i = 0; i < 11; i++) {
 	                   for (let j = 0; j < 4; j++) {
				
 		                  if (JSON.parse($question[i].content_text).answers[j].is_correct === "1") {
						
 			                  correct[i]=JSON.parse($question[i].content_text).answers[j].answer;
							
 		                  }
                      	}
                     }
				}

			)
			.catch(err => console.log("error"));

	});

	function openContentPage() {

		startpage = false;
		contentpage = true;
	}

	function closelist() {
		list = false;
	}

	function openlist() {
		list = true;
	}

	function openEndmodel() {
		
		endModel = true;
	}

	function closeEnd() {
		endModel = false
	}

	function displayResult() {
		resultpage = true;
		startpage = true;
		currentQues = 0;

	}

	function currentQuestion(event) {

		currentQues = event.detail;
	
	}

	function review(event) {

		currentQues = event.detail;
		resultpage = false;
		startpage = false;
		contentpage = false;
		reviewpage = true;
		
	}

	function movetoresult() {
		startpage = true;
		resultpage = true;
	}

	function movetostart() {
		startpage = true;
		resultpage = false;
		endModel = false;
		currentQues = 0;
	}


	$: if (currentQues == 10) {
		nextDis = true;

	}
	else {
		nextDis = false;
	}
	$: if (currentQues != 0) {
		prevDis = false;
	}
	else {
		prevDis = true;
	}
</script>

<main>
	<header><Header/></header>
	{#if startpage}
	{#if resultpage}
	<Result 
	on:rev={review} 
	on:current={currentQuestion}
	on:moveToStart={movetostart}
	correct={correct}
	/>
	{:else}
	<div class="startpage">
	<Button caption="Start Test" 
	type="button" 
	
	on:click={openContentPage} 
	/>
    </div>
	{/if}
	{:else if contentpage}
	<Content
	 on:openList={openlist}
	 on:endModel={openEndmodel}
	 currentQues={currentQues} 
	 on:current={currentQuestion}
	 prevDis={prevDis} 
	 nextDis={nextDis}
	 list={list}
	 />
	{#if list}
    <List
	 on:closeList={closelist}
	 on:current={currentQuestion}
	 />
	{/if}
	{#if endModel}
    <EndModel on:closeEndmodel={closeEnd} 
	 on:resultpage={displayResult}
	 />
	{/if}
	{:else if reviewpage}
	<Review 
	prevDis={prevDis} 
	nextDis={nextDis} 
	on:current={currentQuestion} 
	currentQues={currentQues}
	on:moveToResult={movetoresult} 
	on:moveToStart={movetostart}
	
	/>
	{/if}

	
</main>

<style>
main {
  text-align: center;
  padding: 0;
  max-width: 240px;
  margin: 0;
}
.startpage {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}

</style>