"use client";

import { Building2, Users, BadgeCheck, Clock4 } from "lucide-react";
import CountUp from "react-countup";
import SectionHeader from "../shared/SectionHeader";

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface PlatformStatsProps {
  stats?: StatItem[];
}

const demoStats: StatItem[] = [
  {
    label: "Total Listings",
    value: "2500",
    icon: <Building2 size={36} />,
  },
  {
    label: "Happy Tenants",
    value: "1200",
    icon: <Users size={36} />,
  },
  {
    label: "Verified Landlords",
    value: "350",
    icon: <BadgeCheck size={36} />,
  },
  {
    label: "Avg. Rent Time",
    value: "3 Days",
    icon: <Clock4 size={36} />,
  },
];

const isNumeric = (val: string) => /^[0-9]+$/.test(val.replace(/[, +]/g, ""));

const PlatformStats = ({ stats = demoStats }: PlatformStatsProps) => {
  return (
    <section className="py-10 pb-20 px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
      <div className="space-y-4 text-center mb-8">
        <SectionHeader
          title="Our latest outcomes"
          subtitle="OUR STATS"
        />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-center"
            >
              <div className="flex justify-center mb-3 text-primary">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-primary mb-1">
                {isNumeric(stat.value) ? (
                  <CountUp end={parseInt(stat.value)} duration={2} separator="," />
                ) : (
                  stat.value
                )}
              </h3>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
