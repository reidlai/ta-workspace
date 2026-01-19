<script lang="ts">
    import * as Card from "$lib/components/ui/card";
</script>

<div class="container mx-auto p-8 space-y-8">
    <h1 class="text-3xl font-bold mb-6">SvelteKit Routing Examples</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card.Root>
            <Card.Header>
                <Card.Title>Basic Routing</Card.Title>
                <Card.Description
                    >Standard paths and route groups</Card.Description
                >
            </Card.Header>
            <Card.Content class="space-y-2">
                <ul class="list-disc pl-5 space-y-1">
                    <li>
                        <a
                            href="/routing/basic/hello"
                            class="text-primary hover:underline"
                            >Sub-route (/routing/basic/hello)</a
                        >
                    </li>
                    <li>
                        <a
                            href="/routing/basic/about"
                            class="text-primary hover:underline"
                            >Route Group (Marketing) - About</a
                        >
                    </li>
                    <li>
                        <a
                            href="/routing/basic/contact"
                            class="text-primary hover:underline"
                            >Route Group (Marketing) - Contact</a
                        >
                    </li>
                    <li>
                        <a
                            href="/routing/basic/dashboard"
                            class="text-primary hover:underline"
                            >Route Group (App) - Dashboard</a
                        >
                    </li>
                </ul>
            </Card.Content>
        </Card.Root>

        <Card.Root>
            <Card.Header>
                <Card.Title>Advanced Routing</Card.Title>
                <Card.Description
                    >Dynamic parameters and wildcards</Card.Description
                >
            </Card.Header>
            <Card.Content class="space-y-2">
                <ul class="list-disc pl-5 space-y-1">
                    <li>
                        <a
                            href="/routing/advanced/users/123"
                            class="text-primary hover:underline"
                            >Dynamic Param ([id])</a
                        >
                    </li>
                    <li>
                        <a
                            href="/routing/advanced/lang"
                            class="text-primary hover:underline"
                            >Optional Param ([[lang]]) - Default</a
                        >
                    </li>
                    <li>
                        <a
                            href="/routing/advanced/lang/fr"
                            class="text-primary hover:underline"
                            >Optional Param ([[lang]]) - 'fr'</a
                        >
                    </li>
                    <li>
                        <a
                            href="/routing/advanced/files/documents/work/project-a"
                            class="text-primary hover:underline"
                            >Rest Param ([...path])</a
                        >
                    </li>
                </ul>
            </Card.Content>
        </Card.Root>
    </div>
</div>
