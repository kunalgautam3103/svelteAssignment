<script>
    import {question,selectedAns} from '../store'
    import Button from '../UI/Button.svelte';
    import {createEventDispatcher} from 'svelte';
    const dispatch=createEventDispatcher();
    export let currentQues = 0;
    var explain = true;
    export let prevDis;
    export let nextDis;
    let ops=["A","B","C","D"];
  

</script>
<style>
.radioDiv {
  display: flex;
  flex-direction: column;
  font-family: "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: 20px;
  align-items: flex-start;
  position: relative;
  left: 10px;
  top: 20px;
}

.contentDiv {
  margin: 2em;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.footer {
  background: rgb(185, 128, 54);
  width: 100vw;
  height: 10vh;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.para {
  font-family: "Times New Roman", Times, serif;
  font-weight: 700;
  font-size: 25px;
  margin-top: 10px;
  padding: 0;
  text-align: justify;
}
.label {
  font-size: 18px;
  display: flex;
  padding: 2px;
  margin: 5px;
}
.radio_input {
  margin-left: 4rem;
  display: none;
}

.radioCheck {
  width: 0.9em;
  height: 0.9em;
  background-color: #f5f5f0;
  border: 1px solid rgb(8, 8, 8);
  border-radius: 50%;
  margin-right: 10px;
  box-sizing: border-box;
  padding: 2px;
}
.radioCheck:after {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  background: green;
  border-radius: 50%;
  transform: scale(0);
}
.radio_input:checked + .radioCheck::after {
  transform: scale(1);
}
.wrongAnswer {
  width: 0.9em;
  height: 0.9em;
  border: 1px solid rgb(0, 0, 0);
  background-color: #f5f5f0;
  padding: 2px;
  box-sizing: border-box;
  border-radius: 50%;
  margin-right: 10px;
}
.exp {
  display: none;
}
.explain {
  border: 1px solid skyblue;
  background: skyblue;
  content: "";
  font-size: 20px;
}
.wrongAnswer:after {
  display: block;
  background: rgb(255, 0, 0);
  width: 100%;
  transform: scale(1);
  height: 100%;
  border-radius: 50%;
}
.cor {
  font-weight: 600;
  color: rgb(0, 128, 0);
}
.wro {
  font-weight: 600;
  color: rgb(255, 0, 0);
}


</style>
<section class="section">
    {#each $question as ques , i(ques)}
    {#if currentQues===i}
    <div class="contentDiv">
    <p class="para">{i+1}. {JSON.parse(ques.content_text).question}</p>
    <div class="radioDiv">
    {#each JSON.parse(ques.content_text).answers as answers , index(answers)}
    <label class="label" for="answer{index}" id="label{index}"   class:cor={answers.is_correct==1} class:wro={$selectedAns.includes(answers.answer)&& answers.is_correct==0 && $selectedAns!=null}>
    <span>{ops[index]}. </span>
    <input type="radio" class="radio_input" name="answer" id="answer" value="{answers.answer}"  
    checked={answers.answer&&answers.is_correct==1?true : false}
    disabled
    />
    <div
    class:wrongAnswer={$selectedAns.includes(answers.answer)&& answers.is_correct==0 && $selectedAns!=null}
    class:radioCheck={answers.is_correct == 1||answers.answer}
  />
  {@html answers.answer}
</label>
    {#if explain}
    <div class="explain" class:exp={answers.is_correct==0}>
      {#if answers.is_correct==1}
      {@html (JSON.stringify(JSON.parse(ques.content_text).explanation).replace('"'," ").replace("Answer",answers.answer).replace(/(?:\\[rn]|[\r\n]+)+/g,"").replace(/Answer option.*/, '').replace(/Answer.*/,'') )}
      
    {/if}
    </div>
    
  {/if}
  {/each}
  </div>
  </div>
    <div class="footer">
    <Button type="button"  caption="Prev" disabled={prevDis} on:click={()=>{dispatch("current",i-1)}}/>
    <h3>{i+1} of {11}</h3>
    <Button type="button" caption="Next"  disabled={nextDis} on:click={()=>{dispatch("current",i+1)}} />
    <Button type="button" caption="Result"  on:click={()=>{dispatch("moveToResult")}} />
    <Button type="button" caption="Dash board "  on:click={()=>{dispatch("moveToStart")}} />
    </div>
    {/if}
    {/each}
    </section>