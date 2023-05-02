import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

interface IProps {
    image: string;
    name: string;
    descr: string;
    altText: string;
}

function DeveloperCard({image, name, descr, altText}: IProps) {
  return (
    <>
        <Card sx={{ width: '33%', margin: '0 15px' }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="300"
                image={image}
                alt={altText}
                sx={{ verticalAlign: 'top' }}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {descr}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
            </CardActions>
        </Card>
    </>
  );
}

export default DeveloperCard;
