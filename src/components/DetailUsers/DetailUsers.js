import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Card,CardMedia, Typography, CardContent } from "@mui/material";
import { Link } from 'react-router-dom';
import { buildReq } from './../../utils/auth0Utils';
import { API_URL } from './../../utils/constants';
import { useAuth0 } from "@auth0/auth0-react";


export default function DetailUsers() {
    const { id } = useParams();
    const [User, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const getUser = async (id) => {
            try {

                const req = await buildReq({},getAccessTokenSilently);
                const response = await axios.get(`${API_URL}/Users/${id}`,req);

                const { data }  = response;
                if (data) {
                    setUser(data);
                } else {
                    setError('Internal server error');
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching User:', error);
                setError('Internal server error');
                setIsLoading(false);
            }
        };
        getUser(id);
    }, [id]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <p>{error}</p>;
    };

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
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                height="140"
                image={User.photo}
            />
            <CardContent
            sx={{
                backgroundColor:"orange",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            <Typography
                variant="h6"
                sx={{ color: "black", textAlign: "center" }}
            >
                Nombre: {User.firstName},{User.lastName}
            </Typography>
            <Typography
                variant="div"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Genero: {User.gender}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Birth: {User.birth}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Email: {User.email}
            </Typography>         
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Telefono: {User.phone}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Contact Phone: {User.contactPhone}
            </Typography>     
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Direccion: {User.address}
            </Typography> 
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Matricula: {User.enrollment}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Estado: {User.state}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                Rol : {User.systemRole}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "#text.secondary", textAlign: "center" }}
            >
                {User.UserID}
            </Typography>
            </CardContent>
        </Card>
        <Link to="/Dashboard">
          <button>X</button>
        </Link> 
       </div>
    </div>     
    )
}; 