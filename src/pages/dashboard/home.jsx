import React from "react";
import dashboardCardsData from "@/data/dashboard-cards-data";
import { StatisticsCard } from "@/widgets/cards";
import { useUser } from "@/layouts";

export function Home() {
  const { user } = useUser();
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCardsData.map(({ icon, title, value }) => (
          <StatisticsCard value={value} title={title} icon={icon} />
        ))}

        <div>The dashboard data is currenty kept static for now, Upgrades on the wayyyyyyyyy.</div>
      </div>
    </div>
  );
}

export default Home;
