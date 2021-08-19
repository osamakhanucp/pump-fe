<template>
  <div class="header">
    <span class="title">{{ title }}</span>
    <br />
    {{ subtitle }}
  </div>
</template>

<script>
export default {
  name: "Header",

  components: {},

  data() {
    return {};
  },

  methods: {},

  created() {},

  validations: function () {
    return {};
  },

  props: {
    title: {},
    subtitle: {},
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 16px 0px;
}
.title {
  font-size: 32px;
  font-weight: bold;
  text-transform: capitalize;
}
</style>