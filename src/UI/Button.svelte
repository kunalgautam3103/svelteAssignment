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
    <button role="button" class="btn font_fam wid_fit" tabindex="0" {id} {name} {type} on:click {disabled} aria-label={caption}>{caption}</button>
{/if}
