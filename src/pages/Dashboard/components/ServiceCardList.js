import React from 'react';
import ServiceCard from './ServiceCard';
import { Box } from '@mui/system';

const ServiceCardList = ({ services }) => {

    return (
        <Box>
            {services.map((service, index) => (
                <Box key={index} style={{ marginBottom: '20px' }}>
                    <ServiceCard
                        serviceName={service.serviceName}
                        extraInfo={service.extraInfo}
                        enrolledPeople={service.enrolledPeople}
                        coaches={service.coaches}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default ServiceCardList;