<script>
	import Button from "./UI/Button.svelte";
	import Header from "./UI/Header.svelte";
	import Content from "./Component/Content.svelte";
	import { question } from "./store";
	import { onMount } from "svelte";
	import List from "./Component/List.svelte";
	import EndModel from "./Component/EndModel.svelte";
	import Result from "./Component/Result.svelte";
	import Review from "./Component/Review.svelte";
	import "./css/style.css";
	let startpage = true;
	let contentpage = false;
	let list = false;
	let endModel = false;
	let currentQues = 0;
	let reviewpage = false;
	let resultpage = false;
	let nextDis = false;
	let prevDis = true;
	const correct = [];
	import "./css/style.css";

	onMount(async () => {
		fetch("question.json")
			.then((res) => res.json())
			.then((data) => {
				question.set(data);

				for (let i = 0; i < 11; i++) {
					for (let j = 0; j < 4; j++) {
						if (
							JSON.parse($question[i].content_text).answers[j]
								.is_correct === "1"
						) {
							correct[i] = JSON.parse(
								$question[i].content_text
							).answers[j].answer;
						}
					}
				}
			})
			.catch((err) => console.log("error"));
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
		endModel = false;
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
		location.reload()
	}

	$: if (currentQues == 10) {
		nextDis = true;
	} else {
		nextDis = false;
	}
	$: if (currentQues != 0) {
		prevDis = false;
	} else {
		prevDis = true;
	}
</script>

<main>
	<header><Header /></header>
	{#if startpage}
		{#if resultpage}
			<Result
				on:rev={review}
				on:current={currentQuestion}
				on:moveToStart={movetostart}
				{correct}
			/>
		{:else}
			<div class="start_page display_flex_row width_100">
				<Button
					caption="Start Test"
					type="button"
					on:click={openContentPage}
				/>
			</div>
		{/if}
	{:else if contentpage}
		<Content
			on:openList={openlist}
			on:endModel={openEndmodel}
			{currentQues}
			on:current={currentQuestion}
			{prevDis}
			{nextDis}
			{list}
			on:closeList={closelist}
		/>
		{#if list}
			<List on:current={currentQuestion} />
		{/if}
		{#if endModel}
			<EndModel
				on:closeEndmodel={closeEnd}
				on:resultpage={displayResult}
			/>
		{/if}
	{:else if reviewpage}
		<Review
			{prevDis}
			{nextDis}
			on:current={currentQuestion}
			{currentQues}
			on:moveToResult={movetoresult}
			on:moveToStart={movetostart}
		/>
	{/if}
</main>
