import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Button from "./Button";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ai-chat/context/AppContext";

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const handleSeeFullDetails = () => {
    if (user) {
      navigate('/credits');
    } else {
      navigate('/login', { state: { from: '/credits' } });
    }
  };

  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <Heading
          tag="Get started with Medicare"
          title="Pay once, use forever"
        />

        <div className="relative">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>

        <div className="flex justify-center mt-10">
          <Button onClick={handleSeeFullDetails}>
            See the full details
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
