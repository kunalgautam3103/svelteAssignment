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
  let ops = ["A", "B", "C", "D"];
</script>

<section class="content_container display_flex_col">
  {#each $question as ques, i (ques)}
    {#if currentQues === i}
      <div class="content_div">
        <p class="para font_sz">
          {i + 1}. {JSON.parse(ques.content_text).question}
        </p>
        <div class="radio_div font_sz display_flex_co">
          {#each JSON.parse(ques.content_text).answers as answers, index (answers)}
            <label
              class="lab_rev font_sz"
              for="answer{index}"
              id="label{index}"
              class:cor={answers.is_correct == 1}
              class:wro={$selectedAns.includes(answers.answer) &&
                answers.is_correct == 0 &&
                $selectedAns != null}
            >
              <span>{ops[index]}. </span>
              <input
                type="radio"
                class="radio_input"
                name="answer"
                id="answer"
                value={answers.answer}
                checked={answers.answer && answers.is_correct == 1
                  ? true
                  : false}
                disabled
              />
              <div
                class="com_radio"
                class:wrong_answer={$selectedAns.includes(answers.answer) &&
                  answers.is_correct == 0 &&
                  $selectedAns != null}
                class:radio_check={answers.is_correct == 1 || answers.answer}
              />
              {@html answers.answer}
            </label>
          {/each}
        </div>
        <div class="exp">
          {#if explain}
            {#each JSON.parse(ques.content_text).answers as answers, index (answers)}
              <div class="explain ">
                {#if answers.is_correct == 1}
                  {ops[index]}. {@html JSON.stringify(
                    JSON.parse(ques.content_text).explanation
                  )
                    .replace('"', " ")
                    .replace("Answer", answers.answer)
                    .replace(/(?:\\[rn]|[\r\n]+)+/g, "")
                    .replace(/Answer option.*/, "")
                    .replace(/Answer.*/, "")}
                {/if}
              </div>
            {/each}
          {/if}
        </div>
      </div>
      <div class="foot display_flex_row">
        <Button
          type="button"
          caption="Prev"
          disabled={prevDis}
          on:click={() => {
            dispatch("current", i - 1);
          }}
        />
        <h3>{i + 1} of {11}</h3>
        <Button
          type="button"
          caption="Next"
          disabled={nextDis}
          on:click={() => {
            dispatch("current", i + 1);
          }}
        />
        <Button
          type="button"
          caption="Result"
          on:click={() => {
            dispatch("moveToResult");
          }}
        />
        <Button
          type="button"
          caption="Dashboard "
          on:click={() => {
            dispatch("moveToStart");
          }}
        />
      </div>
    {/if}
  {/each}
</section>

