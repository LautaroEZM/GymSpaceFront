import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/system';

const ServiceCard = ({ serviceName, extraInfo, enrolledPeople, coaches }) => {
    return (
            <Card style={{backgroundColor:'#222',color:'#ddd',width:'75%',margin:'auto', border:'1px solid #ddd'}}>
                <CardContent>
                    <Typography variant="h5" component="div" align="center">
                        {serviceName}
                    </Typography>
                    <Typography align="center">
                        {extraInfo}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Box style={{ display: 'flex' }}>
                        <Box style={{ flex: 1 }}>
                            <Typography variant="subtitle1">Users : {enrolledPeople.length}</Typography>
                            <List>
                                {enrolledPeople.map((person, index) => (
                                    <ListItem key={index}>{person}</ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box style={{ flex: 1 }}>
                            <Typography variant="subtitle1">Coaches : {coaches.length}</Typography>
                            <List>
                                {coaches.map((coach, index) => (
                                    <ListItem key={index}>{coach}</ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
    );
};

export default ServiceCard;
