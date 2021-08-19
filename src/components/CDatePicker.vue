<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <q-input
      :outlined="outlined"
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
      :min="min"
      :max="max"
    >
      <template v-slot:prepend>
        <slot name="input-prepand">
          <!--            add prepand icon or button -->
        </slot>
      </template>

      <template v-slot:append>
        <slot name="input-append">
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date" @input="handleInput" :options="options" 
      :range="range" />
            </q-popup-proxy>
          </q-icon>
          <q-icon
            name="close"
            class="cursor-pointer"
            @click="
              () => {
                handleInput('');
              }
            "
          />
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
  </div>
</template>

<script>
export default {
  name: "CDatePicker",
  props: {
    label: {
      type: String,
      default: "Select Date",
    },
    required: {
      type: Boolean,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    min: {
      type: String,
    },
    max: {
      type: String,
    },
    options: {},
    type: {},
    placeholder: {},
    hint: {},
    mask: {},
    range: {},
  },
  data: function () {
    return {
      date: this.value ? this.value : "",
    };
  },

  methods: {
    handleInput: function (value) {
      // if (!range) {
        this.$refs.qDateProxy.hide();
      // }
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
</style>
