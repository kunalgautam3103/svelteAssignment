<script>
  import { question, selectedAns, attempted, unattempted } from "../store";
  import Button from "../UI/Button.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import "../css/style.css";
  import List from "./List.svelte";
  let localOption = [];
  let minute = 60;
  let second = 0;
  let minString;
  let secString;
  export let prevDis = false;
  export let nextDis = true;
  export let currentQues;
  let lis = document.getElementById("list");
  let opt = ["A", "B", "C", "D"];
  const dispatch = createEventDispatcher();
  $: selectedAns.update((items) => {
    return [...localOption];
  });
  $: if ($selectedAns[currentQues] != undefined) {
    attempted.update((its) => {
      if (its.includes($question[currentQues])) {
        return its;
      } else {
        return [...its, $question[currentQues]];
      }
    });
  }
  onMount(() => {
    timer();
  });
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
  function showlist() {
    lis = document.getElementById("list");
    lis.style.display = "block";
  }
  function hidelist() {
    lis = document.getElementById("list");
    lis.style.display = "none";
  }
  function currentQuestion(event) {
    currentQues = event.detail;
  }
  function closelist() {
    lis.style.display = "none";
  }
</script>

<section class="content_container display_flex_col position_rel">
  <div class="ques_cont">
    <div class="list" id="list">
      <List on:current on:closeList={closelist} />
    </div>
    {#each $question as ques, i (ques)}
      {#if currentQues === i}
        <div class="content_div" on:click={hidelist}>
          <p class="para font_sz">
            {i + 1}. {JSON.parse(ques.content_text).question}
          </p>
          <div class="radio_div font_sz display_flex_co">
            {#each JSON.parse(ques.content_text).answers as answers, index (answers)}
              <label class="lab">
                {opt[index]}.
                <input
                  type="radio"
                  value={answers.answer}
                  name="radio"
                  id="radio{index}"
                  bind:group={localOption[i]}
                />
                {@html answers.answer}
              </label>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>
  <div class="foot display_flex_row">
    <h3 class="content_heading">{minString}:{secString}</h3>
    <Button type="button" caption="List" on:click={showlist} />
    <Button
      id="prev_btn"
      name="prev_btn"
      type="button"
      caption="Prev"
      disabled={prevDis}
      on:click={() => {
        dispatch("current", currentQues - 1);
      }}
    />
    <h3 class="content_heading">{currentQues + 1} of {11}</h3>
    <Button
      id="next_btn"
      name="next_btn"
      type="button"
      caption="Next"
      disabled={nextDis}
      on:click={() => {
        dispatch("current", currentQues + 1);
      }}
    />
    <Button
      id="next_btn"
      name="next_btn"
      type="button"
      caption="EndTest"
      on:click={() => {
        dispatch("endModel");
      }}
    />
  </div>
</section>
