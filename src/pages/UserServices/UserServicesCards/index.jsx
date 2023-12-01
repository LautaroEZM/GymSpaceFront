import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import ServiceCard from '../../Services/ServiceCard';
import { OrangeContainedButton } from '../../../styles/ComponentStyles';

export default function UserServicesCards({
    userServices,
    disabled,
    userServiceDisabled,
    title,
    redirectButtonName,
}) {
    return <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 7,
        }}
    >
        <Typography variant="h3" color="white">
            {title}
        </Typography>
        {!disabled ? (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {userServices.map((userService, i) => {
                    // console.log(service);
                    return !userServiceDisabled(userService) ?
                        <ServiceCard key={i} service={userService.Service} /> : null
                })}
            </Box>
        ) : (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 3,
                }}
            >
                {" "}
                <Typography sx={{ paddingBottom: 5 }} variant="h5" color="white">
                    {" "}
                    Noghing here yet{" "}
                </Typography>
                <OrangeContainedButton onClick={() => navigate("/Services")}>
                    {redirectButtonName}
                </OrangeContainedButton>
            </Box>
        )}
    </Box>
}
