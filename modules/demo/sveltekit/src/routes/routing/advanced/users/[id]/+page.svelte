<script lang="ts">
    export let data;
</script>

<div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold">User Profile</h1>
    <p class="mt-4">
        User ID: <code class="bg-gray-200 px-2 py-1 rounded">{data.id}</code>
    </p>
    <p class="text-sm text-gray-500 mt-2">
        Accessed via <code>/routing/advanced/users/[id]</code>
    </p>
</div>
