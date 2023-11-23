import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Card,CardMedia, Typography, CardContent } from '@mui/material';


export default function DetailService() {
    const { id } = useParams();
    const [service, setServ] = useState({});
    const [coach, setCoach] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    console.log(id)
    useEffect(() => {
        const getService = async (id) => {
            try {
                const response = await axios.get(`https://gymspace-backend.onrender.com/Services/${id}`);
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

    //  useEffect(()=> {
    //      const getCoach = async (id)=>{
    //          try{
    //              const response = await axios.get(`https://gymspace-backend.onrender.com/Coaches/${id}`);
    //              const data = response.data
    //              if (data){
    //                  setCoach(data);
    //              }else{
    //                  setError('Internal server error');
    //              }
    //              setIsLoading(false);
    //          } catch (error){
    //              setError('Internal server error');
    //              setIsLoading(false);
    //          }
    //      };
    //      getCoach(id);
    //  }, [id]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return(
        <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999",
      }}
    >
      <div>
        <Card sx={{maxWidth:345}}>
            <CardMedia
            component="img"
            height="400"
            image={service.image}
            >          
            </CardMedia>
            <CardContent sx={{
              backgroundColor:"orange",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
                <Typography
                    variant="body1"
                    sx={{ color: "Black", textAlign: "center" }}
                >
                    {service.name}
                </Typography> 
                <Typography
                    variant="body1"
                    sx={{ color: "#text.secondary", textAlign: "center" }}
                >
                {service.description}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#text.secondary", textAlign: "center" }}
                >
                {service.category}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#text.secondary", textAlign: "center" }}
                >
                ${service.price}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#text.secondary", textAlign: "center" }}
                >
                {service.startTime}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#text.secondary", textAlign: "center" }}
                >
                {service.duration}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#text.secondary", textAlign: "center" }}
                >
                Status= {service.status}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#text.secondary", textAlign: "center" }}
                >
                capacity= {service.capacity}
                </Typography>
            </CardContent>
        </Card>
        <Link to="/Services">
          <button>X</button>
        </Link>
       </div>
    </div>    
    )
};