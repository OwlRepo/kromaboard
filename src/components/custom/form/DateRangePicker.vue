<script setup lang="ts">
import { type Ref, ref } from "vue";
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

const df = new DateFormatter("en-US", {
  dateStyle: "short",
});

const value = ref({
  start: new CalendarDate(dayjs().year(), dayjs().month() + 1, dayjs().date()),
  end: new CalendarDate(
    dayjs().year(),
    dayjs().month() + 1,
    dayjs().date()
  ).add({ days: 3 }),
}) as Ref<DateRange>;
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
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
