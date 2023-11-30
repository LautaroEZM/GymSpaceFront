import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceCardList = ({ services }) => {

    return (
        <div>
            {services.map((service, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <ServiceCard
                        serviceName={service.serviceName}
                        extraInfo={service.extraInfo}
                        enrolledPeople={service.enrolledPeople}
                        coaches={service.coaches}
                    />
                </div>
            ))}
        </div>
    );
};

export default ServiceCardList;