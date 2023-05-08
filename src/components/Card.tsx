import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IDeveloper } from '../types/types';
import { cardStyle } from '../utils/style-const';

interface IProps {
  developer: IDeveloper;
}

function DeveloperCard(props: IProps) {
  const { image, altText, name, descr, link } = props.developer;
  return (
    <>
      <Card sx={cardStyle}>
        <CardActionArea>
          <div className="photo">
            <CardMedia
              component="img"
              height="300"
              image={image}
              alt={altText}
              sx={{ verticalAlign: 'top' }}
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
            <GitHubIcon>
              <a href={link}></a>
            </GitHubIcon>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default DeveloperCard;
