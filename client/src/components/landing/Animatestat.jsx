import { useRef, useEffect } from "react";
import { useCounter } from "@/hooks/useCounter";

export default function Animatestat({
  icon: Icon,
  endValue,
  label,
  duration = 2000,
  hasLiveBadge = false,
}) {
  const ref = useRef(null);
  const [count, setIsVisible] = useCounter(endValue, duration);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [setIsVisible]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-lg"
    >
      <div className="relative">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#FFE5E5] p-4">
          <Icon className="h-6 w-6 text-[#FF4545]" />
        </div>
        {hasLiveBadge && (
          <span className="absolute -right-2 -top-2 rounded-full bg-[#FF4545] px-2 py-0.5 text-xs text-white">
            Live
          </span>
        )}
      </div>
      <div className="text-4xl font-bold mb-2">{count.toLocaleString()}</div>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  );
}
