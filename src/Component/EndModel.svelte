<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { selectedAns } from "../store";
  import Button from "../UI/Button.svelte";
  const dispatch = createEventDispatcher();
  import "../css/style.css";
  let attCount = 0;
  let unattCount = 0;
  $: for (let j = 0; j < 11; j++) {
    if ($selectedAns[j] != undefined) {
      attCount += 1;
    } else {
      unattCount += 1;
    }
  }
</script>

<div transition:fly={{ y: 300 }} class="modal_end wid_fit postion_fix">
  <div class="end_content">
    <h2 class="font_sz font_fam">Do you Want to end Test ?</h2>
    <h3 class="font_sz font_fam">Attempted: {attCount}</h3>
    <h3 class="font_sz font_fam">UnAttempted: {unattCount}</h3>
  </div>
  <Button
    id="end_test"
    name="end_test"
    type="button"
    caption="EndTest"
    on:click={() => {
      dispatch("resultpage");
    }}
  />
  <Button
    id="cancel_btn"
    type="button"
    name="cancel_btn"
    caption="Cancel"
    on:click={() => {
      dispatch("closeEndmodel");
    }}
  />
</div>
