import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IDeveloper } from '../types/types';
import { cardStyle } from '../utils/style-const';

interface IProps {
  developer: IDeveloper;
}

function DeveloperCard(props: IProps) {
  const { image, altText, name, descr } = props.developer;
  return (
    <>
      <Card sx={cardStyle}>
        <CardActionArea sx={{ display: 'flex' }}>
          <div className="photo">
            <CardMedia
              component="img"
              image={image}
              alt={altText}
              sx={{
                height: '50px',
                width: '50px',
                margin: '15px',
                verticalAlign: 'top',
                borderRadius: '100%',
              }}
            />
          </div>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {descr}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default DeveloperCard;
