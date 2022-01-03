<script>
    export let type = "button";
    export let href = null;
    export let disabled = false;
    export let caption = null;
    export let name = null;
    export let id = null;
    import "../css/style.css";
</script>

{#if href}
    <a {href}>{caption}</a>
{:else}
    <button class="btn" {id} {name} {type} on:click {disabled}>{caption}</button
    >
{/if}
