import React from 'react';
import welcomePageVideo from '../assets/graphi.mp4';

export default function WelcomePageVideo() {
  return <video src={welcomePageVideo} autoPlay width="90%" playsInline loop muted />;
}
