import { Button } from "./ui/button";

const Welcome = () => {
  return (
    <div className="flex flex-col md:flex-row text-white justify-between items-center gap-6">
      <div className="w-full">
        <p className="text-2xl md:text-3xl font-bold">
          Hello, <span className="text-color">Brooklyn Simmons</span> 👋
        </p>
        <p className="text-lg font-bold">
          Welcome to <span className="text-color">Spot Trading!</span>
        </p>
      </div>
      <Button className="wallet-button text-2xl font-bold w-full md:w-auto">
        Start Trading
      </Button>
    </div>
  );
};

export default Welcome;
