<template>
  <div class="flex h-screen">
    <!-- Image Section -->
    <div class="w-1/2 bg-gray-200 flex items-center justify-center">
      <img
        src="/public/image.jpg"
        alt="Decorative"
        class="w-full max-h-[930px] object-cover"
      />
    </div>

    <!-- Chat Section -->
    <div v-if="isLogin" class="w-1/2 flex flex-col">
      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-4 bg-gray-800 mt-[70px]">
        <div class="flex flex-col">
          <Message
            v-for="{ id, text, userPhotoURL, userName, userId } in messages"
            :key="id"
            :name="userName"
            :photo-url="userPhotoURL"
            :sender="userId === user?.uid"
          >
            {{ text }}
          </Message>
        </div>
        <!-- Scroll to this element to keep chat at the bottom -->
        <div ref="bottom" class="bg-gray-800 h-4"></div>
        <!-- Fix white bottom -->
      </div>

      <!-- Message Input Section -->
      <div class="bg-gray-900 shadow-lg px-4 py-2 flex items-center">
        <form
          v-if="isLogin"
          @submit.prevent="send"
          class="w-full flex items-center"
        >
          <input
            v-model="message"
            placeholder="Type your message..."
            required
            class="flex-grow bg-gray-700 text-white rounded p-2 m-2 focus:outline-none"
          />
          <button type="submit" class="icon-send p-2">
            <SendIcon />
          </button>
        </form>

        <!-- Display a message if the user is not logged in -->
        <!-- <p v-else class="text-gray-400">Please log in to send messages.</p> -->
      </div>
    </div>
    <div v-else class="text-white m-auto">
      <h1 class="text-4xl mb-4">Join the Conversation!</h1>
      <p class="text-xl mb-6">Sign in to send messages and stay connected.</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from "vue";
import { useAuth, useChat } from "./firebase";
import SendIcon from "./SendIcon.vue";
import Message from "./Message.vue";

export default {
  components: { Message, SendIcon },
  setup() {
    const { user, isLogin } = useAuth();
    const { messages, sendMessage } = useChat();
    console.log(messages.value, "messages");
    const bottom = ref(null);
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: "smooth" });
        });
      },
      { deep: true }
    );

    const message = ref("");
    const send = () => {
      if (message.value.trim()) {
        sendMessage(message.value);
        message.value = "";
      }
    };

    return { user, isLogin, messages, bottom, message, send };
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
