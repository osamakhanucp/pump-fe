<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { AuthService } from "./services/AuthService";

export default {
  data: function () {
    return {};
  },
  components: {},
  methods: {},

  created() {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style>

/* custom scrollbar */
::-webkit-scrollbar {
    width: 8px;

  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--very-light-pink);
    border-radius: 4px;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #acacac;
  }
</style>
