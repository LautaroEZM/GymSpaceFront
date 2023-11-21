import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Card,CardMedia, Typography, CardContent } from '@mui/material';


export default function ClassDet() {
    const { id } = useParams();
    const [service, setServ] = useState({});
    const [coach, setCoach] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getService = async (id) => {
            try {
                const response = await axios.get(`https://gymspace-backend.onrender.com/Services${id}`);
                const data = response.data
                if (data) {
                    setServ(data);
                } else {
                    setError('Internal server error');
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching Service:', error);
                setError('Internal server error');
                setIsLoading(false);
            }
        };
        getService(id);
    }, [id]);

    // useEffect(()=> {
    //     const getCoach = async (id)=>{
    //         try{
    //             const response = await axios.get(`https://gymspace-backend.onrender.com/Coaches${id}`);
    //             const data = response.data
    //             if (data){
    //                 setCoach(data);
    //             }else{
    //                 setError('Internal server error');
    //             }
    //             setIsLoading(false);
    //         } catch (error){
    //             setError('Internal server error');
    //             setIsLoading(false);
    //         }
    //     };
    //     getCoach(id);
    // }, [id]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return(
        <Card sx={{maxWidth:345}}>
            <CardMedia
            component="img"
            height="140"
            image={service.image}
            >          
            </CardMedia>
            <CardContent>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                    {service.name}
                </Typography> 
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                Coach= {coach.name}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                {service.serviceID}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                {service.description}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                {service.category}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                ${service.price}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                {service.startTime}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                {service.duration}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                Status= {service.status}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                >
                capacity= {service.capacity}
                </Typography>
            </CardContent>
        </Card>
    )
};