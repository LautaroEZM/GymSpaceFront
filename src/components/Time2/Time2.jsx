import { Container, Select, MenuItem, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";

export default function ({ time, setTime, labelName }) {
  const [hours, setHours] = useState([]);
  const [minutes, setMinutes] = useState([]);

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    let arr = [];
    let arr2 = [];
    let i = 0;
    while (i <= 24) {
      arr.push(i);
      i++;
    }
    i = 0;
    while (i <= 60) {
      arr2.push(i);
      i++;
    }
    arr = arr.map((e) => e < 10 ? '0' + e : e.toString());
    arr2 = arr2.map((e) => e.toString());
    setHours(arr);
    setMinutes(arr2);
  }, []);

  return (
    <Container maxWidth="xs">
      <InputLabel name="selectTime">{labelName}:</InputLabel>
      <Select
        labelId="selectTime"
        name="time"
        label="Time"
        value={time}
        onChange={handleChange}
      >
        {hours.length >= 1
          ? hours.map((hour, i) => (
              <MenuItem key={i} value={hour}>
                {`${hour}`}
              </MenuItem>
            ))
          : null}
      </Select>
      {/* <Select
        labelId="selectCoach"
        name="time"
        label="Time"
        value={minutes}
        onChange={handleChange}
      >
        {minute.length >= 1
          ? minute.map((minute, i) => (
              <MenuItem key={i} value={minutes}>
                {`${minute}`}
              </MenuItem>
            ))
          : null}
      </Select> */}
    </Container>
  );
}
