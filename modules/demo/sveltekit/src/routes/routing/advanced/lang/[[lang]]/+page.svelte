<script lang="ts">
    export let data;
</script>

<div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold">Language Selection</h1>
    <p class="mt-4">
        Current Language: <code class="bg-gray-200 px-2 py-1 rounded"
            >{data.lang}</code
        >
    </p>
    <p class="text-sm text-gray-500 mt-2">
        Accessed via <code>/routing/advanced/lang/[[lang]]</code>
    </p>

    {#if data.lang === "default"}
        <p class="mt-4 text-orange-500">
            No language specified, defaulting to English.
        </p>
    {/if}
</div>
