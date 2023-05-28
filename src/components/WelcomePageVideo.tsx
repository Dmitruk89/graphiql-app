import React from 'react';
import welcomePageVideo from '../assets/GraphiQL_demo.mp4';

export default function WelcomePageVideo() {
  return (
    <video
      src={welcomePageVideo}
      autoPlay
      width="100%"
      playsInline
      loop
      muted
      style={{ zIndex: '-1' }}
    />
  );
}
