import { DatePicker } from "@mui/x-date-pickers";
import Container from "@mui/material/Container";

export default function Date({date, setDate}) {

  // this component receives the local state in the father component to work

  const handleDate = (value) => {
    // handles the date change
    const newValue = formatDate(value);
    setDate(newValue);
  };

  const formatDate = (value) => {
    // formats the date selected by the datePicker into a more friendly view
    const year = value.$y.toString();
    const month = (value.$M + 1).toString();
    const day = value.$D.toString();
    const newDate = `${year}-${month}-${day}`; // you can change the format here if you want
    return newDate; // returns a string of the date with the format YYYY-MM-DD
  };

  return (
    <Container maxWidth="xs">
      <DatePicker
        // className={styles.date}
        label="Birth"
        name="birth"
        format="YYYY-MM-DD"
        value={date}
        onChange={handleDate}
      />
    </Container>
  );
}
