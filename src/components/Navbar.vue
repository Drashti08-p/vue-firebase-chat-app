<template>
  <nav
    class="bg-gray-800 text-white shadow-lg p-2"
  >
    <div class="flex items-center justify-between max-w-5xl mx-auto">
      <h1 class="text-lg font-bold"><strong>Vue</strong> Chat App</h1>
      <div v-if="isLogin" class="flex items-center">
        <Avatar :src="user.photoURL" />
        <button
          class="text-gray-400 hover:text-white ml-4"
          @click="signOutUser"
        >
          Sign Out
        </button>
      </div>
      <button
        v-else
        class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        @click="signIn"
      >
        Sign In
      </button>
    </div>
  </nav>
</template>

<script>
import Avatar from "./Avatar.vue";
import { useAuth } from "./firebase";

export default {
  components: { Avatar },
  setup() {
    const { user, isLogin, signOutUser, signIn } = useAuth();
    return { user, isLogin, signOutUser, signIn };
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
