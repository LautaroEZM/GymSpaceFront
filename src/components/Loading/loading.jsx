import Container from "@mui/material/Container";

export default function Loading({ label, state }) {
  return (
    <Container maxWidth="xs">
      {state ? (
        <>
          <img src="https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=3410d4e6-6f7f-4f21-b2f7-721f0bd06b92" />
          <h1>{`Loading ${label} `}</h1>
        </>
      ) : null}
    </Container>
  );
}
