import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar } from '@mui/material';
import axios from 'axios';
import { API_URL, API_URL_LOCAL } from '../../../utils/constants';

const ReviewModal = ({ open, onClose, title, image, userService }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(userService.Review?.comment || "");
    const [review, setReview] = useState(userService.Review);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);
    useEffect(() => { setComment(userService.Review?.comment) }, [userService])

    const createReview = async (comment) => {
        try {
            const url = `${API_URL}/reviews`
            // const url = `${API_URL_LOCAL}/reviews`
            const { data } = await axios.post(url, {
                userServicesID: userService.userServicesID,
                comment,
                display: "tocheck",
            })
            setReview(data)
            setShowSuccessBanner(true)
        } catch (error) {
            console.log(error);
        }
    }

    const updateReview = async (comment) => {
        try {
            const url = `${API_URL}/reviews/${review.reviewID}`
            // const url = `${API_URL_LOCAL}/reviews/${review.reviewID}`
            const { data } = await axios.put(url, {
                comment,
                display: "tocheck",
            })
            setReview(data)
            setShowSuccessBanner(true)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveChanges = () => {
        setIsEditing(false);
        review ? updateReview(comment) : createReview(comment)
    };

    const handleClose = () => {
        setIsEditing(false);
        onClose();
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle
                style={{
                    textAlign: 'center',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
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
                    disabled={!isEditing}
                    defaultValue={comment}
                    onChange={handleCommentChange}
                />
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={isEditing}
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </Button>
                <Button
                    disabled={!isEditing}
                    onClick={handleSaveChanges}
                >
                    Save Changes
                </Button>
            </DialogActions>
            <Snackbar
                open={showSuccessBanner}
                autoHideDuration={3000}
                onClose={() => setShowSuccessBanner(false)}
                message="Changes saved successfully!"
                ContentProps={{
                    sx: { backgroundColor: 'green' }
                }}
            />
        </Dialog>
    );
};

export default ReviewModal;