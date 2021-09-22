<template>
  <div class="breadcrumbs">
    <q-icon name="home" class="icon" /> /
    <span
      v-for="(breadcrumb, index) in crumbs"
      :key="index"
      @click="
        () => {
          gotoRoute(index !== crumbs.length - 1 ? breadcrumb.path : '');
        }
      "
    >
      {{ getName(breadcrumb.text) }}
      <span v-if="index !== crumbs.length - 1">/</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",

  components: {},

  data() {
    return {
      route: [],
    };
  },

  methods: {
    gotoRoute(route) {
      // console.log(route);
      this.$router
        .push({
          name: route,
        })
        .catch((error) => {
          if (error.name !== "NavigationDuplicated") {
            throw error;
          }
        });
    },
    getName(breadcrumb) {
      // console.log(breadcrumb);
      if (breadcrumb.split("-").length > 1) {
        let name = "";
        for (let i = 0; i < breadcrumb.split("-").length; i++) {
          name = name + " " + breadcrumb.split("-")[i];
        }
        return name;
      } else {
        return breadcrumb;
      }
    },
  },
  computed: {
    crumbs: function () {
      let pathArray = this.$route.path.split("/");
      pathArray.shift();
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: this.$route.matched[idx].meta.breadCrumb || path,
        });
        return breadcrumbArray;
      }, []);
      return breadcrumbs;
    },
  },

  created() {
    this.route = this.$route.matched.slice(-1)[0];
    // console.log(this.route);
  },

  validations: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  font-size: 14px;
  text-transform: capitalize;
}
span:last-child {
  font-size: 14px;
  color: #059ddb;
  font-weight: bold;
}
</style>