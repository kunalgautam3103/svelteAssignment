<script>
export let type="button";
export let href=null;
export let disabled=false;
export let caption=null;

</script>
<style>
.button {
        background: #cf0056;
        font-size:1rem;
        font:inherit;
        cursor:pointer;
        border:1px solid #cf0056;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        width: 8vw;
        padding: 10px; 
        margin: 10px; 
        text-align: center; 
        font-weight: 700;

    }

    .button:focus{
        outline:none
    }
    .button:hover,
    .button:active{
        background: #aaaaaa ;
        color:white;
    }
    .button:disabled,
    .button[disabled]{
        background: #aaaaaa;
        color:rgb(0, 0, 0);
    }
</style>
{#if href }
<a {href}>{caption}</a>
{:else}
<button class="button" id="button" name="button" type="{type}"   on:click disabled={disabled}>{caption}</button>
{/if}