export default function Card({ title, value, trendText, trendType = "neutral" }) {
  // Determine the color of the bottom text based on whether the trend is good, bad, or neutral
  const trendColors = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-400",
  };
  
  const trendColorClass = trendColors[trendType] || trendColors.neutral;

  return (
    <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      
      {/* Only render the trend span if trendText is provided */}
      {trendText && (
        <span className={`${trendColorClass} text-xs font-medium mt-4`}>
          {trendText}
        </span>
      )}
    </div>
  );
}