<script lang="ts" setup>
const range = ref({
  start: new Date(2022, 10, 6),
  end: new Date(2022, 10, 10),
  // start: null,
  // end: null,
})
const tempStartDate = ref<Date | null>(null)
const datepicker = ref<typeof VDatePicker | null>(null)
const flexibility = ref<number>(0)
const flexibilityChoices = ['Dates exactes', '+/-1j', '+/-3j', '+/-5j']
const getMaxDate = computed<Date | undefined>(() => (tempStartDate.value
  ? new Date(new Date(tempStartDate.value).setDate(tempStartDate.value.getDate() + 21))
  : undefined))
const getDateString = computed<string>(() => {
  if (!range.value.end && !range.value.end) return ''
  const { start, end } = range.value
  const startDay = start.toLocaleString('fr-FR', { weekday: 'long' })
  const endDay = end.toLocaleString('fr-FR', { weekday: 'long' })
  const startNum = start.getDate()
  const endNum = end.getDate()
  const endMonth = end.toLocaleString('fr-FR', { month: 'long' })
  const nbNights = (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
  return `<strong>${startDay} ${startNum} -> ${endDay} ${endNum} ${endMonth} ${flexibility.value ? `(${flexibilityChoices[flexibility.value]})` : ''}</strong><br />Soit ${nbNights} nuits`
})
const handleDayClick = e => {
  // console.log('handleDayClick', e)
}
const handleUpdateModelValue = e => {
  // console.log('handleUpdateModelValue', e)
  tempStartDate.value = null
  handleDragEnd()
}
const handleDrag = e => {
  if (!tempStartDate.value) handleDragStart(e.start)
}
const handleDragStart = startDate => {
  tempStartDate.value = startDate
  document.querySelector('.id-2022-12-15')?.classList.add('custom-disabled')
  document.querySelector('.id-2022-12-16')?.classList.add('custom-disabled')
  document.querySelector('.id-2022-12-17')?.classList.add('custom-disabled')
}
const handleDragEnd = () => {
  document.querySelectorAll('.vc-day')?.forEach(el => {
    el.classList.remove('custom-disabled')
  })
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="p-4 border-b border-black-100" v-html="tempStartDate ? '...' : getDateString" />
    <div class="relative flex-initial p-4 border-b border-black-100">
      <button
        v-for="(choice, index) in flexibilityChoices"
        :key="index"
        class="mx-1 rounded-full px-4 py-1"
        :class="{ 'bg-blue-500' : flexibility === index, 'bg-blue-50' : flexibility !== index, 'text-white' : flexibility === index }"
        @click="flexibility = index"
      >
        {{ choice }}
      </button>
    </div>
    <div class="flex-1 overflow-y-scroll">
      <VDatePicker
        ref="datepicker"
        v-model.range="range"
        expanded
        :rows="18"
        :max-date="getMaxDate"
        @dayclick="handleDayClick"
        @drag="handleDrag"
        @update:modelValue="handleUpdateModelValue"
      />
    </div>
    <div class="flex-none p-4 border-t border-black-100">
      <button class="w-full rounded-full bg-blue-900 p-4 text-white">
        CTA
      </button>
    </div>
  </div>
</template>

<style>
.custom-disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
