<div class="flex h-screen bg-gray-100">
    <aside class="w-64 bg-gray-900 text-white p-6">
        <h2 class="text-xl font-bold mb-6">App Sidebar</h2>
        <nav class="space-y-2">
            <a href="/" class="block hover:text-gray-300">Overview</a>
            <a href="/" class="block hover:text-gray-300">Settings</a>
        </nav>
    </aside>
    <main class="flex-1 overflow-auto">
        <slot />
    </main>
</div>
