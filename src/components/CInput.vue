<template >
  <q-input
    outlined
    :label="required ? label + '*' : label"
    :required="required"
    :placeholder="placeholder"
    @input="handleInput"
    v-bind:value="value"
    :type="type"
    :dense="dense"
    :disable="disabled"
    :readonly="readonly"
    :error="error"
    :hint="hint"
    :mask="mask"
  >
    <template v-slot:prepend>
      <slot name="input-prepand">
        <!--            add prepand icon or button -->
      </slot>
    </template>

    <template v-slot:append>
      <slot name="input-append">
        <!--                add append icon or button -->
      </slot>
    </template>

    <template v-slot:after>
      <slot name="input-after">
        <!--                icon or button after start of input-->
      </slot>
    </template>

    <template v-slot:error>
      <!--            error here-->
      <slot name="input-error"> </slot>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "CInput",

  props: {
    label: {
      type: String,
      default: "Label",
      required: true,
    },
    required: {
      type: Boolean,
    },
    placeholder: {
      type: String,
    },

    value: {},
    type: {
      type: String,
      default: "text",
    },
    dense: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: null,
    },
    mask: {
      type: String,
    },
    autoGrow: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      content: this.value,
    };
  },

  methods: {
    trimValue: function (value) {
      if (value == null) {
        return value;
      }
      return value.trim();
    },
    handleInput: function (value) {
      value = this.trimValue(value);
      this.$emit("input", value);
    },
    onChangeFn: function (value) {
      value = this.trimValue(value);
      this.$emit("change", value);
    },
  },
  watch: {
    value(value) {
      this.onChangeFn(value);
    },
  },
};
</script>

<style scoped>
</style>
