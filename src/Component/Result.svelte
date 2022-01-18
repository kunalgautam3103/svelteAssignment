<script>
  import { question, selectedAns, attempted, unattempted } from "../store";
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import "../css/style.css";
import { prevent_default } from "svelte/internal";
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
  $: uncorrectCount = $attempted.length - correctCount;
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
        if (
          JSON.parse($question[i].content_text).answers[j].answer ===
          $selectedAns[i]
        ) {
          ind = j;
        }
      }
    } else {
      ind = null;
    }
    indexCur[i] = ind;
  }
  $: for (let i = 0; i < 11; i++) {
    let localcorrect = 0;
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
  }
  $: unattempted.set(unattQues);
  const onKeyPress = (e,i )=> {
    if (e.keyCode === 13) {
      dispatch("rev", i);
    }
  };
</script>

<div class="main_div display_flex_col position_relative width_98 padding_0">
  <div class="resultbox display_flex_row">
    <div class="res" tabindex="0">
      <h3>Result</h3>
      <h3>{result}&#37;</h3>
    </div>
    <div class="res" tabindex="0">
      <h3>Attempted</h3>
      <h3>{atmcount}</h3>
    </div>
    <div class="res" tabindex="0">
      <h3>UnAttempted</h3>
      <h3>{uatmcount}</h3>
    </div>
    <div class="res" tabindex="0">
      <h3>correct</h3>
      <h3>{correctCount}</h3>
    </div>
    <div class="res" tabindex="0">
      <h3>InCorrect</h3>
      <h3>{uncorrectCount}</h3>
    </div>
  </div>
  <div>
    <table class="tab wid_fit">
      <tr>
        <th class="tab_data" scope="col">Index</th>
        <th class="tab_data" scope="col">Question</th>
        <th class="tab_data" scope="col">Option</th>
      </tr>
      {#each $question as ques, index (ques)}
        <tr>
          <td tabindex="0" class="tab_data">{index + 1}</td>
          <td tabindex="0" class="question tab_data trunc" on:keypress={(e)=>onKeyPress(e,index)} on:click={()=>{dispatch("rev", index);}}>
            {JSON.parse(ques.content_text).question}
          </td>
          <td class="answer tab_data">
            {#each arr as arr, i (arr)}
              <span
                tabindex="0"
                role="textbox"
                aria-label={(corArray[index] != indexCur[index] && indexCur[index] == i)? "answer is wrong" : ((corArray[index] === i)?"anwer is coorect":"unselected ")}
                class="com_radio border_circle com_radio_result comm_radio" 
                class:correct={corArray[index] === i ? true : false}
                class:select={corArray[index] != indexCur[index] && indexCur[index] == i ? true : false}
              >
                {i + 1}
              </span>
            {/each}
          </td>
        </tr>
      {/each}
      <table />
    </table>
  </div>
  <Button
    name="dash_btn"
    id="dash_btn"
    type="button"
    caption="Dashboard"
    on:click={() => {dispatch("moveToStart");}}
  />
</div>
