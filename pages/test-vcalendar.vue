<script lang="ts" setup>
// const date = ref<Date | null>(null)
const range = ref({
  start: new Date(2020, 0, 6),
  end: new Date(2020, 0, 10),
})
</script>

<template>
  <div>
    <VDatePicker v-model.range="range" :rows="18" />
  </div>
</template>
