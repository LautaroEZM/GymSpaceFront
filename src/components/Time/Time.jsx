import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Container from "@mui/material/Container";

export default function Time({ time, setTime, labelName }) {

  // IMPORTANT: this component recieves a local state passed down to props by the father
  // the label text is also passed down to props by the father component

  const handleTime = (value) => { // recieves the value
    const newValue = formatTime(value) // formats it
    setTime(newValue) // sets the new value
  }

  const formatTime = (value) => {
    const hour = value.$H;
    const minutes = value.$m;

    // Calcula el total de minutos
    const totalMinutes = hour * 60 + minutes;

    // Devuelve el valor entre 0 y 24
    const formattedValue = totalMinutes / 60;

    return formattedValue;
  };

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
