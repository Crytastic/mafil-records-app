import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import { formatDateToISOString } from './Utils';

type DateRange = {
  start: string;
  end: string;
};

type DateRangeChoice = 'hardcoded' | 'past72Hours' | 'custom';

interface DateRangeSelectorProps {
  setDateRange: React.Dispatch<React.SetStateAction<{ start: string; end: string }>>;
  dateRange: { start: string; end: string };
}

export function DateRangeSelector({ setDateRange, dateRange }: DateRangeSelectorProps) {
  const [currentChoice, setCurrentChoice] = useState<DateRangeChoice>('hardcoded');

  function setDateRangeChoice(choice: DateRangeChoice) {
    setCurrentChoice(choice);
    if (choice === 'hardcoded') {
      setDateRange({ start: '2022-11-10T12:00:00', end: '2022-11-25T12:00:00' });
    } else if (choice === 'past72Hours') {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setHours(endDate.getHours() - 72);
      setDateRange({
        start: formatDateToISOString(startDate),
        end: formatDateToISOString(endDate),
      });
    }
    console.log({ choice });
  }

  const handleCustomDateChange = (start: string, end: string) => {
    setDateRange({ start, end });
  };

  return (
    <Box>
      <Box paddingBottom={2}>
        <FormControl>
          <InputLabel>Date Range</InputLabel>
          <Select
            value={currentChoice}
            onChange={(e: SelectChangeEvent<DateRangeChoice>) =>
              setDateRangeChoice(e.target.value as DateRangeChoice)
            }
          >
            <MenuItem value={'hardcoded'}>2022-11-10 to 2022-11-25</MenuItem>
            <MenuItem value={'past72Hours'}>Past 72 Hours</MenuItem>
            <MenuItem value={'custom'}>Custom</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {currentChoice === 'custom' && (
        <Box
          gap={2}
          display='flex'
          flexWrap='wrap'
          flexDirection='row'
        >
          <Box>
            <DatePicker
              label="Start Date"
              value={new Date(dateRange.start)}
              onChange={(newValue: Date | null) => {
                if (newValue) {
                  handleCustomDateChange(formatDateToISOString(newValue), dateRange.end);
                }
              }}
            />
          </Box>
          <Box>
            <DatePicker
              label="End Date"
              value={new Date(dateRange.end)}
              onChange={(newValue: Date | null) => {
                if (newValue) {
                  handleCustomDateChange(dateRange.start, formatDateToISOString(newValue));
                }
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default DateRange;
