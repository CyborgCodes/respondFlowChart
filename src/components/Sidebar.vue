<template>
  <div class="h-full border-l flex flex-col">
    <!-- Header (Fixed) -->
    <div class="p-6 flex flex-col gap-4">
      <div class="flex items-center gap-2.5">
        <i class="calendar-icon pi pi-calendar-clock"></i>
        <h1 class="text-md font-bold text-white">Business Hours</h1>
      </div>
      <p class="text-sm">
        Allows a branch to be created based on date & time conditions. Use it to set business hours
        or date range conditions.
      </p>
      <Divider class="!m-0" />
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-auto p-6 flex flex-col gap-4">
      <!-- Title -->
      <div class="grid grid-cols-4 items-center">
        <div class="flex items-center gap-2.5">
          <i class="pi pi-calendar"></i>
          <h1>Days</h1>
        </div>
        <div class="flex items-center gap-2.5 col-span-3">
          <i class="pi pi-clock"></i>
          <h1>Time</h1>
        </div>
      </div>

      <!-- Time Pickers -->
      <div v-for="(day, index) in days" :key="index" class="grid grid-cols-4 items-center">
        <!-- Day -->
        <div>
          <span class="font-bold">{{ day }}</span>
        </div>

        <!-- Start Time Picker -->
        <DatePicker
          showIcon
          iconDisplay="input"
          :id="'datepicker-timeonly-start-' + day"
          v-model="businessHours[index].startTime"
          timeOnly
          fluid
        >
          <template #inputicon="slotProps">
            <i class="pi pi-clock" @click="slotProps.clickCallback" />
          </template>
        </DatePicker>

        <!-- Divider -->
        <Divider align="center" layout="vertical">
          <p>to</p>
        </Divider>

        <!-- End Time Picker -->
        <DatePicker
          showIcon
          iconDisplay="input"
          :id="'datepicker-timeonly-end-' + day"
          v-model="businessHours[index].endTime"
          timeOnly
          fluid
        >
          <template #inputicon="slotProps">
            <i class="pi pi-clock" @click="slotProps.clickCallback" />
          </template>
        </DatePicker>
      </div>

      <!-- Time Zone -->
      <label class="mt-2.5">Time Zone</label>
      <Select />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Divider from 'primevue/divider'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'

// Days of the week
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Business hours data
const businessHours = ref(
  days.map(() => ({
    startTime: null,
    endTime: null,
  })),
)
</script>

<style scoped>
.calendar-icon {
  font-size: 22px;
  color: var(--p-primary-500);
}
</style>
