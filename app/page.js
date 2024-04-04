import PopulationChart from "@/components/PopulationChart";
import CoinCard from "@/components/CoinCard";
import Wallet from "@/components/Wallet";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Welcome />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PopulationChart />
        <Wallet />
      </div>
      <CoinCard />
    </div>
  );
}
