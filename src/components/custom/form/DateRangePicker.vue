<script setup lang="ts">
import { type Ref, ref } from "vue";
import { watch } from "vue";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

import { Calendar as CalendarIcon } from "lucide-vue-next";
import type { DateRange } from "radix-vue";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import getQueryVariable from "@/helpers/getQueryVariable";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const value = ref({
  start: new CalendarDate(
    dayjs(getQueryVariable("startDate") as string).year(),
    dayjs(getQueryVariable("startDate") as string).month() + 1,
    dayjs(getQueryVariable("startDate") as string).date()
  ),
  end: new CalendarDate(
    dayjs(getQueryVariable("endDate") as string).year(),
    dayjs(getQueryVariable("endDate") as string).month() + 1,
    dayjs(getQueryVariable("endDate") as string).date()
  ),
}) as Ref<DateRange>;

const emit = defineEmits(["filterTable"]);

watch(
  () => value.value.end,
  (newValue) => {
    if (newValue) {
      emit("filterTable", value.value);
    }
  }
);
</script>

<template>
  <div class="w-full">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          :class="
            cn(
              'w-full justify-start text-left font-normal overflow-clip',
              !value && 'text-muted-foreground'
            )
          "
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          <template v-if="value.start">
            <template v-if="value.end">
              {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(value.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(value.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else> Pick a date </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <RangeCalendar
          v-model="value"
          initial-focus
          :number-of-months="2"
          @update:start-value="(startDate) => (value.start = startDate)"
          @update:end-value="(endDate) => (value.end = endDate)"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
