<template>
  <main class="flex-1 flex flex-col bg-gray-800 text-gray-300 shadow-inner">
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex items-end space-x-2"
        >
          <div
            class="rounded-lg p-2 text-white"
            :class="{
              'bg-blue-500': message.username !== username,
              'bg-pink-500 ml-auto': message.username === username,
            }"
          >
            <div class="text-sm font-semibold">
              {{ message.username === username ? "You" : message.username }}
            </div>
            <p class="text-base">{{ message.text }}</p>
            <div class="text-right text-xs">{{ message.time }}</div>
          </div>
        </div>
      </div>
    </div>
    <form
      @submit.prevent="sendMessage(message)"
      class="border-t-2 border-gray-600 p-4"
    >
      <div class="flex gap-2">
        <input
          v-model="message"
          type="text"
          placeholder="🖋️ Type your cosmic thoughts here..."
          class="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-500 bg-gray-700 text-white"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
        >
          Send 🌌
        </button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      message: "",
      username: "",
    };
  },
  mounted() {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      this.username = storedUsername;
    }
    if (this.username) {
      this.connect();
    }
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    },
  },
  methods: {
    connect() {
      this.ws = new WebSocket("ws://localhost:3001");

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.$store.commit("chat/RECEIVE_MESSAGE", message);
          console.log("message", message);
        } catch (error) {
          console.log("Received non-JSON message:", event.data);
        }
      };
    },
    sendMessage() {
      if (!this.message.trim()) return;

      const payload = {
        username: this.username,
        text: this.message,
        time: new Date().toLocaleTimeString(),
      };

      this.ws.send(JSON.stringify(payload));
      this.$store.commit("chat/RECEIVE_MESSAGE", payload);

      this.message = "";
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
