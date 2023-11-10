<template>
  <div class="flex h-screen">
    <div class="bg-blue-500 flex-none w-16 p-1">
      <nuxt-link to="/vue-3-datepicker-desktop" class="block h-16 bg-green-400 hover:bg-green-300 rounded flex items-center justify-center text-xs">
        Dsktp
      </nuxt-link>
      <nuxt-link to="/vue-3-datepicker-mobile-4" class="block h-16 bg-green-400 hover:bg-green-300 mt-1 rounded flex items-center justify-center text-xs">
        Mble 4
      </nuxt-link>
      <nuxt-link to="/vue-3-datepicker-mobile-18" class="block h-16 bg-green-400 hover:bg-green-300 mt-1 rounded flex items-center justify-center text-xs">
        Mble 18
      </nuxt-link>
      <nuxt-link to="/v-calendar-desktop" class="block h-16 bg-blue-400 hover:bg-blue-300 mt-1 rounded flex items-center justify-center text-xs">
        Dsktp
      </nuxt-link>
      <nuxt-link to="/v-calendar-mobile" class="block h-16 bg-blue-400 hover:bg-blue-300 mt-1 rounded flex items-center justify-center text-xs">
        Mble
      </nuxt-link>
    </div>
    <div class="flex-1 h-full">
      <slot />
    </div>
  </div>
</template>
