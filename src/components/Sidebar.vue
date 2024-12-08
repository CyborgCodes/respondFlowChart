<template>
  <Drawer
    :visible="visible"
    position="right"
    class="!w-[600px]"
    :pt="{
      header: {
        style: {
          display: 'none',
        },
      },
    }"
  >
    <div class="h-full flex flex-col p-2.5">
      <!-- Header (Fixed) -->
      <div class="py-6">
        <i class="pi pi-times cursor-pointer" @click="closeDrawer"></i>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2.5">
          <i class="calendar-icon pi pi-calendar-clock"></i>
          <h1 class="text-md font-bold">Business Hours</h1>
        </div>
        <p class="text-sm">
          Allows a branch to be created based on date & time conditions. Use it to set business
          hours or date range conditions.
        </p>
        <Divider class="!m-0" />
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 p-6 overflow-auto flex flex-col gap-4">
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
            v-model="nodeData.times[index].startTime"
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
            v-model="nodeData.times[index].endTime"
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
        <Select v-model="timezone" :options="timezones" optionLabel="label" />
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Divider, DatePicker, Select, Drawer } from 'primevue'

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  nodeData: {
    type: Object as any,
  },
})

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const emit = defineEmits(['update:visible'])

const closeDrawer = () => {
  emit('update:visible', false)
}

console.log('nodeDataaaa: ', props.nodeData.value)

watch(props, (newVal) => {
  console.log('newww: ', newVal.nodeData.timezone)
})

// Reactive State
const businessHours = ref(
  days.map(() => ({
    startTime: null,
    endTime: null,
  })),
)

const timezone = ref('UTC')
const timezones = ref([
  { value: 'UTC', label: 'UTC' },
  { value: 'PST', label: 'Pacific Standard Time' },
  { value: 'EST', label: 'Eastern Standard Time' },
  // Add more timezones as needed
])

// Watch changes (example for logging or emitting updates)
watch(
  businessHours,
  (newVal) => {
    console.log('Business hours updated:', newVal)
  },
  { deep: true },
)
</script>

<style scoped>
.calendar-icon {
  font-size: 22px;
  color: var(--p-primary-500);
}
</style>
