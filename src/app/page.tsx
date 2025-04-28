'use client';

import { useState } from 'react';
import SimpleLanding from '@/components/SimpleLanding';

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);

  const handleMuteChange = (newMutedState: boolean) => {
    setIsMuted(newMutedState);
  };

  return (
    <SimpleLanding 
      mainHeading="WE'RE BUILDING TECHNOLOGY"
      subHeading="THAT'S MORE THAN SMART"
      emailHeading="We're shaping a sustainable future for audio devices."
      emailSubtext="More to come - stay tuned"
      initialMuted={isMuted}
      onMuteChange={handleMuteChange}
    />
  );
}
