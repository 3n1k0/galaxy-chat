<template>
  <div class="min-h-screen flex flex-col bg-galaxy-theme text-white">
    <header class="bg-gray-800 text-gray-200 py-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-lg font-bold">Galaxy Chat</h1>
        <nav>
          <nuxt-link to="/" class="px-4">Home</nuxt-link>
          <nuxt-link to="/about" class="px-4">About</nuxt-link>
        </nav>
      </div>
    </header>
    <main class="flex-1 container mx-auto p-4">
      <Nuxt />
    </main>
    <footer class="bg-gray-800 text-gray-400 py-4">
      <div class="container mx-auto text-center">Made with ♥ in the Cosmos</div>
    </footer>
  </div>
</template>

<style>
.bg-galaxy-theme {
  background-image: url("~@/assets/nebula.jpg");
  background-size: cover;
  background-position: center;
}
</style>
