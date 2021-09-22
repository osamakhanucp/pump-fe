<template>
  <div>
    <div class="breadcrumbs">
      <breadcrumbs />
    </div>
    <div class="header">
      <span class="title">{{ title }}</span>
      <br />
      {{ subtitle }}
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs.vue";
export default {
  name: "Header",

  components: { Breadcrumbs },

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
  display: inline-block;
  padding: 16px 0px 8px 0px;
  border-bottom: 3px solid #059ddb;
  margin-bottom: 40px;
}
.title {
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
  color: #2c4457;
}
.breadcrumbs {
  margin-block: 16px;
}
</style>