import { CardActions, CardContent, CardMedia, Grid, Rating, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { LinkNoDeco, ProductCard, SmallOrangeOutlinedButton } from '../../../styles/ComponentStyles'
import ReviewModal from '../ReviewModal';

export default function UserProductsCard({ userProduct }) {
    const [openModal, setOpenModal] = useState(false);

    return <Grid item xs={12} sm={6} md={4} lg={2} xl={2} style={{ margin: '8px' }}>
        <ProductCard
            sx={{
                height: "100%",
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={userProduct.picture_url}
                alt={userProduct.title}
                style={{
                    color: "#fff",
                    fontStyle: "italic",
                    fontSize: "14px",
                }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Rating
                    name={`rating-${userProduct.productID}`}
                    value={4}
                    precision={0.5}
                    readOnly
                    sx={{ marginBottom: 1, color: "#ff9721" }}
                />
                <Typography
                    variant="h6"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                    {userProduct.title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                    ${userProduct.unitPrice}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: "center" }}>
                <LinkNoDeco to={`/Marketplace/detail/${userProduct.productID}`}>
                    <SmallOrangeOutlinedButton>
                        VIEW DETAIL
                    </SmallOrangeOutlinedButton>
                </LinkNoDeco>
                {/* <SmallOrangeOutlinedButton onClick={() => setOpenModal(true)}>
                    ADD REVIEW
                </SmallOrangeOutlinedButton> */}
            </CardActions>
            <ReviewModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title={userProduct.title}
                image={userProduct.picture_url}
            />
        </ProductCard>
    </Grid>
}
