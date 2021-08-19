<template >
  <q-select
    outlined
    :disable="disable"
    :readonly="readonly"
    :multiple="multiple"
    :dense="dense"
    :label="required ? label + '*' : label"
    @input="handleInput"
    v-bind:value="value"
    :required="required"
    :placeholder="placeholder"
    :options="options"
    :option-value="optionValue ? optionValue : optionLabel"
    :option-label="optionLabel"
    :error="error"
    map-options
    emit-values
  >
    <template v-slot:error>
      <slot name="input-error"></slot>
    </template>
    <template v-if="value && clearable" v-slot:append>
      <q-icon name="cancel" @click.stop="handleInput" class="cursor-pointer" />
    </template>
  </q-select>
</template>

<script>
import { QSelect } from "quasar";
export default {
  name: "CSelect",
  components: {
    QSelect,
  },
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
    clearable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {},
    options: {
      type: Array,
      required: true,
    },
    optionLabel: {
      type: String,
      default: "label",
    },
    optionValue: {
      type: String,
      default: "",
    },
    dataValue: {},
    dense: {
      type: Boolean,
      default: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      content: this.value,
      model: "",
    };
  },

  methods: {
    handleInput: function (value) {
      // console.log(value)
      this.$emit("on-select", value);
      if (this.dataValue) {
        this.$emit("input", value[this.dataValue]);
      } else {
        this.$emit("input", value[this.optionLabel]);
      }
    },
  },
};
</script>

<style scoped>
</style>
