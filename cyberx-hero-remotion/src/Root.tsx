import "./index.css";
import { Composition } from "remotion";
import { HeroStoryboard } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CyberXHero"
        component={HeroStoryboard}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
