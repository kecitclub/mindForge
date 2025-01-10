"use client";

import { Clock, Users, CheckCircle, MapPin } from "lucide-react";
import Animatestat from "./Animatestat";
import { useCounter } from "../../hooks/useCounter";
import { useRef, useEffect } from "react";

export function Impact() {
  const bottomStatsRef = useRef(null);
  const [dailyEmergencies, setDailyVisible] = useCounter(140);
  const [activeUnits, setActiveVisible] = useCounter(120);
  const [satisfaction, setSatisfactionVisible] = useCounter(96);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDailyVisible(true);
          setActiveVisible(true);
          setSatisfactionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomStatsRef.current) {
      observer.observe(bottomStatsRef.current);
    }

    return () => observer.disconnect();
  }, [setDailyVisible, setActiveVisible, setSatisfactionVisible]);

  return (
    <section className="container mx-auto px-4 py-16" id="impact">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Our Impact in Numbers
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Real-time statistics showcasing our emergency response effectiveness
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Animatestat
          icon={Clock}
          endValue={300}
          label="Average Response Time (Seconds)"
          hasLiveBadge
        />
        <Animatestat icon={Users} endValue={6500} label="Lives Saved" />
        <Animatestat
          icon={CheckCircle}
          endValue={96}
          label="Success Rate (%)"
        />
        <Animatestat icon={MapPin} endValue={43} label="Cities Covered" />
      </div>

      <div
        ref={bottomStatsRef}
        className="bg-black rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="text-center">
          <p className="text-[#FF4545] mb-2">Daily Emergencies Handled</p>
          <span className="text-white text-3xl font-bold">
            {dailyEmergencies}
          </span>
        </div>
        <div className="text-center">
          <p className="text-[#FF4545] mb-2">Active Response Units</p>
          <span className="text-white text-3xl font-bold">{activeUnits}</span>
        </div>
        <div className="text-center">
          <p className="text-[#FF4545] mb-2">Customer Satisfaction</p>
          <span className="text-white text-3xl font-bold">{satisfaction}%</span>
        </div>
      </div>
    </section>
  );
}
