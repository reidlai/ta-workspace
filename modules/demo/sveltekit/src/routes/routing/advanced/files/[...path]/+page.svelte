<script lang="ts">
    export let data;
</script>

<div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold">File Viewer</h1>
    <p class="mt-4">
        Path: <code class="bg-gray-200 px-2 py-1 rounded">{data.path}</code>
    </p>
    <p class="text-sm text-gray-500 mt-2">
        Accessed via <code>/routing/advanced/files/[...path]</code>
    </p>

    <div class="mt-4 p-4 border rounded">
        <h3 class="font-bold">Breadcrumbs derived from path:</h3>
        <ul class="flex gap-2 mt-2">
            {#each data.segments as segment}
                <li class="bg-blue-100 px-2 py-1 rounded text-blue-800">
                    {segment}
                </li>
            {/each}
        </ul>
    </div>
</div>
