<template>
  <div class="app-layout">
    <app-header />
    <main class="main">
      <nuxt/>
    </main>
  </div>
</template>

<script lang="ts">
import AppHeader from '~/components/AppHeader/AppHeader.vue';

export default {
  components: {
    AppHeader
  }
};
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
}
.main {
  background: url("../assets/img/mainbackground.png");
  background-size: cover;
  min-height: calc(100vh - 70px);
  flex: 1 1 auto;
}
</style>
