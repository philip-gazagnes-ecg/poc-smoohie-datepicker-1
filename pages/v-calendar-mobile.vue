<script lang="ts" setup>
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const activeMonth = ref<number>(7)
const activeYear = ref<number>(2025)
const range = ref({
  start: new Date(2025, 7, 6),
  end: new Date(2025, 7, 10),
  // start: null,
  // end: null,
})

const tempStartDate = ref<Date | null>(null)
const datepicker = ref<any>(null)
const flexibility = ref<number>(0)
const flexibilityChoices = ['Dates exactes', '+/-1j', '+/-3j', '+/-5j']

onMounted(async() => {
  await nextTick

  if (datepicker.value) {
    await datepicker.value.move({ month: activeMonth.value, year: activeYear.value })
  }
})

const getMaxDate = computed<Date | undefined>(() => (tempStartDate.value
  ? new Date(new Date(tempStartDate.value).setDate(tempStartDate.value.getDate() + 21))
  : new Date('2026-10-31')))

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

const handleDragStart = (startDate:Date):void => {
  tempStartDate.value = startDate
  document.querySelector('.id-2022-12-15')?.classList.add('custom-disabled')
  document.querySelector('.id-2022-12-16')?.classList.add('custom-disabled')
  document.querySelector('.id-2022-12-17')?.classList.add('custom-disabled')
}
const handleDragEnd = ():void => {
  document.querySelectorAll('.vc-day')?.forEach(el => {
    el.classList.remove('custom-disabled')
  })
}

const handleUpdateModelValue = ():void => {
  tempStartDate.value = null
  handleDragEnd()
}

interface DragEvent {
    start: Date;
}

const handleDrag = (e:DragEvent):void => {
  if (!tempStartDate.value) handleDragStart(e.start)
}
</script>

<template>
  <button @click="openModal">
    Datepicker
  </button>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto relative w-screen">
                <div class="flex h-full flex-col bg-white shadow-xl">
                  <div class="relative flex-1">
                    <div class="flex h-screen flex-col">
                      <div class="p-1 bg-slate-100 border-b border-black-100 flex-initial h-16 flex">
                        <span class="flex-1" v-html="tempStartDate ? '...' : getDateString" />
                        <button class="bg-blue flex-initial" @click="closeModal">
                          close
                        </button>
                      </div>
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
                          @drag="handleDrag"
                          @update:model-value="handleUpdateModelValue"
                        />
                      </div>
                      <div class="flex-initial p-4 border-t border-black-100">
                        <button class="w-full rounded-full bg-blue-900 p-4 text-white">
                          CTA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style>
.custom-disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
