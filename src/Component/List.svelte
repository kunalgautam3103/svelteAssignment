<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { question, attempted, selectedAns } from "../store";
  import { onMount } from "svelte";
  import "../css/style.css";
  const dispatch = createEventDispatcher();
  let showA = true;
  let unattQues = [];
  let attSeq = [];
  let showAtt = false;
  let showU = false;
  let atmcount = 0;
  let uatmcount = 0;
  let shw_all;
  export let load;
  let shw_att;
  let shw_un;
  $: if (load) {
    selectAll();
    showAll();
  }
  function selectAll() {
    shw_all.style.background = "#f5c7da";
    shw_att.style.background = null;
    shw_un.style.background = null;
  }
  function showAll() {
    showAtt = false;
    showA = true;
    showU = false;
  }
  function showAttempted(event) {
    showAtt = true;
    showA = false;
    showU = false;
    shw_att.style.background = "#f5c7da";
    shw_all.style.background = "";
    shw_un.style.background = "";
  }
  function showUn() {
    showAtt = false;
    showA = false;
    showU = true;
    shw_un.style.background = "#f5c7da";
    shw_all.style.background = "";
    shw_att.style.background = "";
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
      } else {
        question.subscribe((item) => {
          unattQues = [...unattQues, item[i]];
          uatmcount = unattQues.length;
        });
      }
    }
  }
  $: if ($attempted.length == 11) {
    uatmcount = 0;
  }
  $: if ($attempted.length > 0) {
    attempted.subscribe((item) => {
      for (let items of item) {
        let i = $question.indexOf(items);
        attSeq[i] = items;
      }
    });
  }
  function onKeyPress(e, str) {
    if (str == "all") {
      showAll();
    }
    if (str == "att") {
      showAttempted();
    }
    if (str == "unatt") {
      showUn();
    }
  }
  function onKeyPressUp(e, index, ques, str) {
    if (e.keyCode == 13) {
      if (str == "all") {
        move(index, ques);
      } else {
        moveU(index, ques);
      }
    }
  }
</script>

<div class="model_list " transition:fly={{ x: -40 }}>
  <div class="list_heading_div postion_fix display_flex">
    <h3 role="button" name="all" id="all" bind:this={shw_all} class="list_heading" tabindex="0" on:keypress={(e) => onKeyPress(e, "all")} on:click={showAll}>
      All Question: 11
    </h3>
    <h3 role="button" tabindex="0" name="att" id="att" bind:this={shw_att} class="list_heading" on:keypress={(e) => onKeyPress(e, "att")} on:click={showAttempted}>
      Attempted: {atmcount}
    </h3>
    <h3 role="button" tabindex="0" name="unatt" id="unatt" bind:this={shw_un} class="list_heading" on:keypress={(e) => onKeyPress(e, "unatt")} on:click={showUn}>
      Unattempted: {uatmcount}
    </h3>
  </div>
  <div class="list_content position_relative">
    {#if showA}
      {#each $question as ques, index (ques)}
        <div class="inner_div wrap font_fam trunc" tabindex="0" on:keypress={(e) => onKeyPressUp(e, index, ques, "all")} on:click={move(index, ques)}>
          {index + 1}. {JSON.parse(ques.content_text).question}
        </div>
        <hr />
      {/each}
    {/if}
    {#if showAtt}
      {#if $attempted.length == 0}
        <p>No Question Attempted</p>
      {:else}
        {#each attSeq as ques, index}
          {#if ques != null}
            <div class="inner_div wrap font_fam trunc" tabindex="0" on:keypress={(e) => onKeyPressUp(e, index, ques, "at")} on:click={moveU(index, ques)}>
              {$question.indexOf(ques) + 1}. {JSON.parse(ques.content_text).question}
            </div>
            <hr />
          {/if}
        {/each}
      {/if}
    {/if}
    {#if showU}
      {#if $attempted.length == 11}
        <p>No Question to Show</p>
      {:else}
        {#each unattQues as ques, index (ques)}
          <div class="inner_div wrap font_fam trunc" tabindex="0" on:keypress={(e) => onKeyPressUp(e, index, ques, "at")} on:click={moveU(index, ques)}>
            {$question.indexOf(ques) + 1}. {JSON.parse(ques.content_text).question}
          </div>
          <hr />
        {/each}
      {/if}
    {/if}
  </div>
</div>
