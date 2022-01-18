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
  let unicode;
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
  function handleKeydown(e) {
    unicode = e.keyCode;
    if (unicode == 78) {
      if (currentQues != 10) {
        e.preventDefault();
        dispatch("current", currentQues + 1);
      }
    } else if (unicode == 80) {
      if (currentQues != 0) {
        e.preventDefault();
        dispatch("current", currentQues - 1);
      }
    } else if (unicode == 68) { e.preventDefault();
      dispatch("moveToStart");
    } else if (unicode == 82) {
      e.preventDefault();
      dispatch("moveToResult");
    }
  }
</script>

<section class="content_container display_flex_col position_relative position_top width_100">
  {#each $question as ques, i (ques)}
    {#if currentQues === i}
      <div class="content_div">
        <p class="para font_sz font_fam position_relative padding_0" tabindex="0">
          {i + 1}. {JSON.parse(ques.content_text).question}
        </p>
        <div class="radio_div font_sz font_fam display_flex_col position_relative height_fit">
          {#each JSON.parse(ques.content_text).answers as answers, index (answers)}
            <label
              tabindex="0"
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
                checked={answers.answer && answers.is_correct == 1? true: false}
                disabled
              />
              <div
                aria-label={$selectedAns.includes(answers.answer) &&
                answers.is_correct == 0 && $selectedAns != null? "answer is wrong": answers.is_correct == 1? "anwer is coorect": "unselected "}
                id="inside_lab"
                class="com_radio border_circle com_radio_review"
                wrong={$selectedAns.includes(answers.answer) && answers.is_correct == 0 && $selectedAns != null}
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
                <span class="exp_data" tabindex="0">{@html rel}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <div class="foot display_flex_row width_100 postion_fix height_10">
        <Button
          type="button"
          caption="Prev"
          accesskey="p"
          disabled={prevDis}
          on:click={() => { dispatch("current", i - 1); }}
        />
        <h3>{i + 1} of {11}</h3>
        <Button
          name="next_btn"
          id="next_btn"
          type="button"
          caption="Next"
          accesskey="n"
          disabled={nextDis}
          on:click={() => { dispatch("current", i + 1); }}
        />
        <Button
          name="result"
          id="result"
          type="button"
          accesskey="r"
          caption="Result"
          on:click={() => { dispatch("moveToResult"); }}
        />
        <Button
          name="dash"
          id="dash"
          type="button"
          accesskey="d"
          caption="Dashboard"
          on:click={() => { dispatch("moveToStart"); }}
        />
      </div>
    {/if}
  {/each}
</section>
<svelte:window on:keydown={handleKeydown} />
