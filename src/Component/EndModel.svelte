<script>
import {fly} from 'svelte/transition'
import {createEventDispatcher} from 'svelte';
import { selectedAns} from '../store'
import Button from '../UI/Button.svelte'
const dispatch = createEventDispatcher();
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
<style>
.modal-backdrop {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: transparent;
}
.modal {
  border: 5px solid rgb(185, 128, 54);
  position: fixed;
  top: 20vh;
  left: 30vw;
  height: 25vh;
  background: rgb(226, 213, 188);
  z-index: 100;
  width: 30em;
  padding: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.heading2 {
  font-family: Georgia, "Times New Roman", Times, serif;
}

 
</style>
<div  class="modal-backdrop" on:click={()=>{dispatch("closeEndmodel")}}/>
<div transition:fly={{y:300}} class="modal">
    <h2 class="heading2">Do you Want to end Test ?</h2>
    <h3 class="heading3">Attempted: {attCount} </h3>
    <h3 class="heading3">UnAttempted: {unattCount} </h3>
    <Button type="button" caption="End Test" on:click={()=>{dispatch("resultpage")}}/>
    <Button type="button" caption="Cancel" on:click={()=>{dispatch("closeEndmodel")}}/>
  
</div>