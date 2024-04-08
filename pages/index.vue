<template>
  <div v-if="username" class="flex flex-col h-screen">
    <header
      class="flex items-center justify-between bg-cosmicDust p-4 text-galactic"
    >
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-semibold">🌠 Cosmic Chat</h1>
        <h2>Welcome, {{ username }}</h2>
      </div>
      <button
        @click="clearUsername()"
        class="bg-nebulaPink px-4 py-2 rounded hover:bg-stardust transition-colors duration-150 ease-in-out shadow-glow"
      >
        🚀 Warp Out
      </button>
    </header>
    <div class="flex custom-flex-grow overflow-hidden">
      <aside
        class="w-64 bg-spaceGray p-4 overflow-y-auto text-moonlight shadow-lg"
      >
        <div class="mb-4">
          <div
            class="flex items-center gap-2 mb-4 p-2 rounded-md bg-black shadow cosmicglow"
          >
            <h2 class="text-base font-semibold">🌌 The Nebula Lounge</h2>
          </div>
          <p>Current Sector: {{ currentRoom }}</p>
        </div>
        <div>
          <h3
            class="flex items-center gap-2 mb-4 p-2 rounded-md bg-black shadow cosmicglow text-base font-semibold"
          >
            👽 Interstellar Visitors
          </h3>
          <ul>
            <li
              v-for="(user, index) in users"
              :key="index"
              class="text-gray-300 hover:text-white mb-2"
            >
              {{ user }}
            </li>
          </ul>
        </div>
      </aside>
      <Chat />
    </div>
  </div>

  <div
    v-else
    class="h-screen flex items-center justify-center bg-cover bg-no-repeat"
    style="background-image: url('/your-path-to-stars-background.jpg')"
  >
    <div class="text-center">
      <input
        v-model="tempUsername"
        @keyup.enter="setUsername"
        placeholder="Enter your username"
        class="text-black p-2 rounded mb-4"
      />
      <button
        @click="setUsername"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Join Chat
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempUsername: "",
      currentRoom: "",
    };
  },
  computed: {
    username() {
      return this.$store.state.users.username;
    },
    users() {
      return this.$store.state.users.users;
    },
  },
  methods: {
    saveUsername() {
      if (!this.tempUsername.trim()) return;
      this.$store.commit("users/setUsername", this.tempUsername);
      localStorage.setItem("username", this.tempUsername);
    },
    clearUsername() {
      this.$store.commit("users/setUsername", "");
      localStorage.setItem("username", "");
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    setUsername() {
      this.saveUsername();
      this.navigateTo("/");
    },
  },
};
</script>

<style>
.custom-flex-grow {
  flex-grow: 0.8;
}
</style>
