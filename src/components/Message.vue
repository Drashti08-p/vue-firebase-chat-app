<template>
  <div class="message my-4">
    <span v-if="!sender" class="ml-2 text-xs text-gray-400">{{ name }}</span>
    <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
      <Avatar class="mt-1" :src="photoUrl" />
      <div
        class="text break-words w-3/4 p-3 rounded-lg text-white"
        :class="sender ? 'bg-green-800' : 'bg-gray-700'"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";

export default {
  components: { Avatar },
  props: {
    name: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    sender: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.text {
  word-break: break-word; /* Break long words to fit */
}
</style>
