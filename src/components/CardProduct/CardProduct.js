import React from "react";
import { Card, CardMedia, CardContent} from '@material-ui/core';
import { withStyles } from "@mui/material";



function CardProd({name, price, image}){
    return(
        <Card sx={{maxWidth: 345}}>
            <CardMedia 
               component="img"
               height="140"
               image={image}
               alt="green iguana"
            />
            <CardContent>
                <Typography variant="h5" component="div">
                     {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                         Precio: ${price}
                </Typography>
            </CardContent>

        </Card>
    )
}


export default withStyles({
    item:{
        minWidth: "350px",
        margin: "1em",
        boxSizing: "border-box"
    },
    media:{
        minWidth: "200px",

    }
})(CardProd);