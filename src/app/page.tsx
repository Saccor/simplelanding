'use client';

import React from 'react';
import SimpleLanding from '@/components/SimpleLanding';

export default function Home() {
  return (
    <SimpleLanding 
      imageUrl="/images/image.png"
      mainHeading="WE'RE BUILDING TECHNOLOGY"
      subHeading="THAT'S MORE THAN SMART"
      emailHeading="We're shaping a sustainable future for audio devices."
      emailSubtext="More to come - stay tuned"
    />
  );
}
