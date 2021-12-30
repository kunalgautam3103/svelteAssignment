<script>
    export let type = "button";
    export let href = null;
    export let disabled = false;
    export let caption = null;
    import "../css/style.css";
</script>

{#if href}
    <a {href}>{caption}</a>
{:else}
    <button class="btn" id="button" name="button" {type} on:click {disabled}
        >{caption}</button
    >
{/if}

