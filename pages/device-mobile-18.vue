<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const activeMonth = ref<number>(7)
const activeYear = ref<number>(2025)
const startDate = new Date('2025-08-23')
const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 21))
const date = ref<Date[]>([startDate, endDate])
const tempStartDate = ref<Date | null>(null)
const datepicker = ref<typeof VueDatePicker | null>(null)
const flexibility = ref<number>(0)
const flexibilityChoices = ['Dates exactes', '+/-1j', '+/-3j', '+/-5j']

const monthNames = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(0)
  d.setMonth(i)
  return d.toLocaleString('fr-FR', { month: 'long' })
})

onMounted(async() => {
  await nextTick
  if (datepicker.value) {
    datepicker.value.setMonthYear({ month: activeMonth.value, year: activeYear.value })
  }
})

const handleRangeStart = (event: Date) => {
  tempStartDate.value = new Date(event)
}

const handleRangeEnd = (event: Date) => {
  if (tempStartDate.value) {
    date.value = [tempStartDate.value, new Date(event)]
    tempStartDate.value = null
  }
}

const getMaxDate = computed<Date | undefined>(() => (tempStartDate.value
  ? new Date(new Date(tempStartDate.value).setDate(tempStartDate.value.getDate() + 21))
  : undefined))
const getDisabledDates = computed<Date[] | undefined>(
  () => (tempStartDate.value ? [new Date(tempStartDate.value), new Date(new Date(tempStartDate.value).setDate(tempStartDate.value.getDate() + 1))] : undefined),
)

const getDateString = computed<string>(() => {
  if (date.value.length !== 2) return ''
  const start = date.value[0]
  const end = date.value[1]
  const startDay = start.toLocaleString('fr-FR', { weekday: 'long' })
  const endDay = end.toLocaleString('fr-FR', { weekday: 'long' })
  const startNum = start.getDate()
  const endNum = end.getDate()
  const endMonth = end.toLocaleString('fr-FR', { month: 'long' })
  const nbNights = (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
  return `<strong>${startDay} ${startNum} -> ${endDay} ${endNum} ${endMonth} ${flexibility.value ? `(${flexibilityChoices[flexibility.value]})` : ''}</strong><br />Soit ${nbNights} nuits`
})
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
      <VueDatePicker
        ref="datepicker"
        :model-value="date"
        class="customdatepicker"
        inline
        range
        vertical
        :config="{
          noSwipe: true,
        }"
        :month-change-on-scroll="false"
        :multi-calendars="36"
        :start-date="startDate"
        :max-date="getMaxDate"
        :disabled-dates="getDisabledDates"
        @range-start="handleRangeStart"
        @range-end="handleRangeEnd"
      >
        <template
          #month-year="{
            month,
            year,
            // months,
            // years,
            // updateMonthYear,
            // handleMonthYearChange
          }"
        >
          {{ monthNames[month] }} {{ year }}
        </template>
        <!--<template #calendar-header="{ index, day }">
          <div :class="index === 5 || index === 6 ? 'red-color' : ''">
            3{{ day }}
          </div>
        </template>-->
        <template #action-buttons />
      </VueDatePicker>
    </div>
    <div class="flex-none p-4 border-t border-black-100">
      <button class="w-full rounded-full bg-blue-900 p-4 text-white">
        CTA
      </button>
    </div>
  </div>
</template>

<style>
.dp--tp-wrap {
  display: none;
}
.customdatepicker {
  .dp__outer_menu_wrap {
    width: 100%;
  }
  .dp__flex_display {
    flex-direction: column;
  }
}
</style>
