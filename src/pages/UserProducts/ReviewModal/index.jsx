import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

const ReviewModal = ({ open, onClose, title, image }) => {

    const fetchReview = async (body) => {
        try {
            const url = `http://gymspace.up.railway.app/reviews`
            const {data} = await axios(body, url)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                style={{
                    textAlign: 'center',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white', // Ajusta el color del texto si la imagen es oscura
                }}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="review"
                    label="Write your review here"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '20px' }}
                />
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onClose}>Cancel</Button>
                {/* <Button disabled>Edit</Button> */}
                <Button onClick={() => {
                    // Lógica para guardar la revisión
                    onClose();
                }}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewModal;