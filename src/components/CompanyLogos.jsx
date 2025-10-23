import { brainwaveSymbol, brainwaveWhiteSymbol, sliders04 } from "../assets";
import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        "The best way to find yourself is to lose yourself in the service of Medicare."
      </h5>
      <ul className="flex">
        {companyLogos.map((sclogo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img src={brainwaveWhiteSymbol} width={30} height={20} alt={sclogo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
