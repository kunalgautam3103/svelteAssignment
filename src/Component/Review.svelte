<script>
  import { question, selectedAns } from "../store";
  import Button from "../UI/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import "../css/style.css";
  const dispatch = createEventDispatcher();
  export let currentQues = 0;
  var explain = true;
  export let prevDis;
  export let nextDis;
  let rel;
  let ops = ["A", "B", "C", "D"];

  $: if (currentQues + 1) {
    rel = JSON.parse($question[currentQues].content_text).explanation;
    let start_ind = rel.indexOf("<seq");
    while (start_ind > -1) {
      let str1 = rel.substr(start_ind, 14);
      let find = rel.charAt(start_ind + 9);
      rel = rel.replace(str1, find);
      start_ind = rel.indexOf("<seq");
    }
  }
</script>

<section class="content_container display_flex_col position_rel width_100">
  {#each $question as ques, i (ques)}
    {#if currentQues === i}
      <div class="content_div">
        <p class="para font_sz font_fam position_relative">
          {i + 1}. {JSON.parse(ques.content_text).question}
        </p>
        <div
          class="radio_div font_sz font_fam display_flex_col position_relative"
        >
          {#each JSON.parse(ques.content_text).answers as answers, index (answers)}
            <label
              class="lab_rev display_flex font_sz font_fam"
              for="answer{index}"
              id="label{index}"
              class:cor={answers.is_correct == 1}
              class:wro={$selectedAns.includes(answers.answer) && answers.is_correct == 0 && $selectedAns != null}
            >
              <span>{ops[index]}. </span>
              <input
                type="radio"
                class="radio_input"
                name="answer"
                id="answer"
                value={answers.answer}
                checked={answers.answer && answers.is_correct == 1 ? true : false}
                disabled
              />
              <div
                class="com_radio border_circle"
                class:wrong_answer={$selectedAns.includes(answers.answer) && answers.is_correct == 0 && $selectedAns != null}
                class:radio_check={answers.is_correct == 1 || answers.answer}
              />
              {@html answers.answer}
            </label>
          {/each}
        </div>
        <div class="exp">
          {#each JSON.parse(ques.content_text).answers as answers, index (answers)}
            <div class="explain font_fam">
              {#if answers.is_correct == 1}
                {@html rel}
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <div class="foot display_flex_row width_100 postion_fix">
        <Button
          type="button"
          caption="Prev"
          disabled={prevDis}
          on:click={() => {dispatch("current", i - 1); }}
        />
        <h3>{i + 1} of {11}</h3>
        <Button
          name="next_btn"
          id="next_btn"
          type="button"
          caption="Next"
          disabled={nextDis}
          on:click={() => {dispatch("current", i + 1); }}
        />
        <Button
          name="result"
          id="result"
          type="button"
          caption="Result"
          on:click={() => {dispatch("moveToResult");}}
        />
        <Button
          name="dash"
          id="dash"
          type="button"
          caption="Dashboard "
          on:click={() => {dispatch("moveToStart");}}
        />
      </div>
    {/if}
  {/each}
</section>
