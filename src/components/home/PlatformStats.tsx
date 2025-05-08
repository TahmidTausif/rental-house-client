import { Building2, Users, BadgeCheck, Clock4 } from "lucide-react";

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
      value: "2,500+",
      icon: <Building2 size={36} />,
    },
    {
      label: "Happy Tenants",
      value: "1,200+",
      icon: <Users size={36} />,
    },
    {
      label: "Verified Landlords",
      value: "350+",
      icon: <BadgeCheck size={36} />,
    },
    {
      label: "Avg. Rent Time",
      value: "3 Days",
      icon: <Clock4 size={36} />,
    },
  ];

const PlatformStats = ({ stats = demoStats }: PlatformStatsProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-center"
            >
              <div className="flex justify-center mb-3 text-primary">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
