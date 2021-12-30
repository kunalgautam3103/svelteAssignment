<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { question, attempted, selectedAns } from "../store";
  import "../css/style.css";
  const dispatch = createEventDispatcher();
  let showA = true;
  let unattQues = [];
  let showAtt = false;
  let showU = false;
  let atmcount = 0;
  let uatmcount = 0;
  function showAll(event) {
    showAtt = false;
    showA = true;
    showU = false;
  }
  function showAttempted(event) {
    showAtt = true;
    showA = false;
    showU = false;
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
  $: if ($attempted) {
    unattQues = [];
    atmcount = $attempted.length;
    for (let i = 0; i < 11; i++) {
      if ($attempted.includes($question[i])) {
        console.log($question[i]);
      } else {
        question.subscribe((item) => {
          unattQues = [...unattQues, item[i]];
          uatmcount = unattQues.length;

          console.log(item[i], uatmcount);
        });
      }
    }
  }
  $: if ($attempted.length == 11) {
    uatmcount = 0;
  }
 $:console.log($attempted)
</script>

<div class="model_list" transition:fly={{ x: -40 }} >
  <div class="list_heading_div">
    <h3 class="list_heading" on:click={showAll}>All Question: 11</h3>
    <h3 class="list_heading" on:click={showAttempted}>Attempted: {atmcount}</h3>
    <h3 class="list_heading" on:click={showUn}>Unattempted: {uatmcount}</h3>
  </div>

  <div class="list_content">
    {#if showA}
      {#each $question as ques, index (ques)}
        <div class="inner_div" on:click={move(index, ques)}>
          {index + 1}. {JSON.parse(ques.content_text).question}
        </div>
        <hr />
      {/each}
    {/if}
    {#if showAtt}
      {#if $attempted.length == 0}
        <p>No Question Attempted</p>
      {:else}
        {#each $attempted as ques, index (ques)}
          <div class="inner_div" on:click={moveU(index, ques)}>
            {index + 1}. {JSON.parse(ques.content_text).question}
          </div>
          <hr />
        {/each}
      {/if}
    {/if}
    {#if showU}
      {#if $attempted.length == 11}
        <p>No Question to Show</p>
      {:else}
        {#each unattQues as ques, index (ques)}
          <div class="inner_div" on:click={moveU(index, ques)}>
            {index + 1}. {JSON.parse(ques.content_text).question}
          </div>
          <hr />
        {/each}
      {/if}
    {/if}
  </div>
</div>

