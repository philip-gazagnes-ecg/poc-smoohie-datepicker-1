<template>
  <div class="flex h-screen">
    <div class="bg-blue-500 flex-none w-16 p-1">
      <nuxt-link to="/device-desktop" class="block h-16 bg-blue-400 hover:bg-blue-300 rounded flex items-center justify-center text-xs">
        Desktop
      </nuxt-link>
      <nuxt-link to="/device-mobile" class="block h-16 bg-blue-400 hover:bg-blue-300 mt-1 rounded flex items-center justify-center text-xs">
        Mobile
      </nuxt-link>
    </div>
    <div class="flex-1 h-full">
      <slot />
    </div>
  </div>
</template>
