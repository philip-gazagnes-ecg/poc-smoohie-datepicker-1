<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import {
  Menu, MenuButton, MenuItems,
} from '@headlessui/vue'

const activeMonth = ref<number>(7)
const activeYear = ref<number>(2025)
const startDate = new Date('2025-08-23')
const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 21))
const date = ref<Date[]>([startDate, endDate])
const tempStartDate = ref<Date | null>(null)
const showDatePicker = ref<boolean>(false)
const datepicker = ref<typeof VueDatePicker | null>(null)
const flexibility = ref<number>(0)
const flexibilityChoices = ['Dates exactes', '+/-1j', '+/-3j', '+/-5j']

const monthNames = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(0)
  d.setMonth(i)
  return d.toLocaleString('fr-FR', { month: 'long' })
})

const handleTriggerClick = async() => {
  showDatePicker.value = true
  await nextTick

  if (datepicker.value) {
    datepicker.value.setMonthYear({ month: activeMonth.value, year: activeYear.value })
  }
}

const handleRangeStart = (event: Date) => {
  tempStartDate.value = new Date(event)
}

const handleRangeEnd = (event: Date) => {
  if (tempStartDate.value) {
    date.value = [tempStartDate.value, new Date(event)]
    tempStartDate.value = null
  }
}

const handlePrevButtonClick = () => {
  activeMonth.value = activeMonth.value === 0 ? 11 : activeMonth.value - 1
  activeYear.value = activeMonth.value === 11 ? activeYear.value - 1 : activeYear.value
  if (datepicker.value) {
    datepicker.value.setMonthYear({ month: activeMonth.value, year: activeYear.value })
  }
}
const handleNextButtonClick = () => {
  activeMonth.value = activeMonth.value === 11 ? 0 : activeMonth.value + 1
  activeYear.value = activeMonth.value === 0 ? activeYear.value + 1 : activeYear.value
  if (datepicker.value) {
    datepicker.value.setMonthYear({ month: activeMonth.value, year: activeYear.value })
  }
}

const getMaxDate = computed<Date | undefined>(() => (tempStartDate.value
  ? new Date(new Date(tempStartDate.value).setDate(tempStartDate.value.getDate() + 21))
  : undefined))
const getDisabledDates = computed<Date[] | undefined>(
  () => (tempStartDate.value ? [new Date(tempStartDate.value), new Date(new Date(tempStartDate.value).setDate(tempStartDate.value.getDate() + 1))] : undefined),
)

// give me the code for a computed const that takes an array of 2 dates, and returns the following string :
// DAYNAME1 DAYNUM1 -> DAYNAME2 DAYNUM2 MONTHNAME2 (NBNIGHTS nights)
// ex : Lundi 23 -> Mercredi 25 Août (2 nuits)
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
  <div class="px-32 h-full bg-blue-50 flex flex-row-reverse items-center">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          @click="handleTriggerClick"
        >
          Vos dates de séjour
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-[110%] -top-[250px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="bg-slate-100 p-4">
            <div class="relative mb-4 text-center">
              <button
                v-for="(choice, index) in flexibilityChoices"
                :key="index"
                class="mx-1 rounded-full px-4 py-1 border border-blue-200"
                :class="{ 'bg-blue-500' : flexibility === index, 'bg-blue-50' : flexibility !== index, 'text-white' : flexibility === index }"
                @click="flexibility = index"
              >
                {{ choice }}
              </button>
            </div>
            <div class="flex items-start">
              <button class="rounded-full bg-white p-4" @click="handlePrevButtonClick">
                &lt;
              </button>
              <VueDatePicker
                v-if="showDatePicker"
                ref="datepicker"
                :model-value="date"
                class="mx-2"
                inline
                range
                :multi-calendars="2"
                :start-date="startDate"
                :max-date="getMaxDate"
                :disabled-dates="getDisabledDates"
                @range-start="handleRangeStart"
                @range-end="handleRangeEnd"
              >
                <template #month-year="{ month, year }">
                  {{ monthNames[month] }} {{ year }}
                </template>
                <template #action-row />
              </VueDatePicker>
              <button class="rounded-full bg-white p-4" @click="handleNextButtonClick">
                &gt;
              </button>
            </div>
            <div class="mt-4 flex gap-4 rounded-lg bg-white p-8">
              <div class="flex-1" v-html="tempStartDate ? '...' : getDateString" />
              <button class="flex-1 rounded-full bg-blue-600 hover:bg-blue-800 py-4 text-white">
                CTA
              </button>
            </div>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<style>
.dp--tp-wrap {
  display: none;
}
</style>
