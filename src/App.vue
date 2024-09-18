
<template>
  <Navbar />
  <Chat />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Chat from "./components/Chat.vue";

export default {
  name: "App",
  components: { Navbar, Chat },
};
</script>
