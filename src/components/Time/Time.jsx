import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Container from "@mui/material/Container";

export default function Time({time, setTime, labelName}) {

    // IMPORTANT: this component recieves a local state passed down to props by the father
    // the label text is also passed down to props by the father component

    const handleTime = (value) => { // recieves the value
        const newValue = formatTime(value) // formats it
        setTime(newValue) // sets the new value
    }

    const formatTime = (value) => { // formats the time into a string
        const hour = value.$H.toString()
        const minutes = value.$m < 10 // if the minutes value is lower than 10
        ? '0' + value.$m  // it will add a 0 in front and also turn it into a string by data coertion
        : value.$m.toString() // if not, it will only turn it into a string
        const newValue = `${hour}:${minutes}` // joints the hour and minutes strings
        return newValue // returns the new value with a 24 hs format
    }

  return (
    <Container maxWidth="xs">
      <TimePicker
        label={labelName}
        value={time}
        onChange={handleTime}
      />
    </Container>
  );
}
