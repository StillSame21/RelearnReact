import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const CATEGORIES = [                                                
  { key: 'housing', label: 'Housing', dot: 'bg-indigo-500', hex: '#6366f1' },
  { key: 'food', label: 'Food & Groceries', dot: 'bg-emerald-500', hex: '#10b981' },
  { key: 'transport', label: 'Transport', dot: 'bg-amber-400', hex: '#fbbf24' },
  { key: 'utilities', label: 'Utilities', dot: 'bg-purple-400', hex: '#c084fc' }, { key: 'leisure', label: 'Leisure', dot: 'bg-sky-400', hex: '#38bdf8' },                                              
];
export default function BudgetAllocation({
  customCosts,
  setCustomCosts,
  selectedRegionData,
  getPercentage,
}) {
  const pieData = CATEGORIES
    .map((c) => ({
      name: c.label,
      value: customCosts?.[c.key] ?? 0,
      hex: c.hex,
    }))
    .filter((d) => d.value > 0);
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Budget Allocation</h3>
        <p className="text-sm text-gray-500">Customize your monthly expenses against regional benchmarks.</p>
      </div>

      {/* TWO-COLUMN SPLIT.
          grid-cols-1 on mobile (stacked), lg:grid-cols-2 on wide screens.
          Left = form, Right = pie + legend. */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-center">

        {/* ---------- LEFT: vertical form ---------- */}
        {/* flex-col + gap = one row per category, stacked top to bottom. */}
        <div className="flex flex-col gap-4">
          {CATEGORIES.map((item) => {
            const avgCost = selectedRegionData?.costs?.[item.key] ?? 0;
            const customCost = customCosts?.[item.key] ?? 0;
            const itemPct = getPercentage(customCost);

            return (
              <div key={item.key} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-3 h-3 rounded-full ${item.dot}`}></span>
                  <span className="text-sm font-semibold text-gray-700">
                    {item.label} ({itemPct}%)
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400 text-sm">RM</span>
                  <input
                    type="number"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-gray-900 font-bold outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                    value={customCost === 0 ? '' : customCost}
                    onChange={(e) => {
                      setCustomCosts({
                        ...customCosts,
                        [item.key]: Number(e.target.value),
                      });
                    }}
                  />
                </div>

                <span className="text-xs text-gray-400 font-medium ml-1 mt-1">
                  Avg: RM {avgCost.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
        {/* ---------- RIGHT: pie + legend ---------- */}
        {/* flex-row: pie on left of this column, legend list on right. */}
        <div className="flex items-center justify-center gap-8">
          <PieChart width={280} height={280}>
            <Pie
              data={pieData}
              dataKey="value"      // which field is the slice size
              nameKey="name"       // which field labels the slice
              cx="50%"             // center x
              cy="50%"             // center y
              innerRadius={65}     // >0 = donut hole. Set 0 for a solid pie.
              outerRadius={125}
              paddingAngle={2}     // tiny gap between slices
            >
              {/* One <Cell> per slice = per-slice color.
                  Without Cells, Recharts picks its own default colors. */}
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={entry.hex} />
              ))}
            </Pie>
            {/* Tooltip = hover popup showing RM value. Optional but nice. */}
            <Tooltip formatter={(value) => `RM ${value.toLocaleString()}`} />
          </PieChart>

          {/* CUSTOM LEGEND (not Recharts' built-in <Legend>).
              We hand-roll it so colors/labels match the form exactly and we
              control the styling. Maps the same CATEGORIES array. */}
          <ul className="flex flex-col gap-2">
            {CATEGORIES.map((item) => {
              const pct = getPercentage(customCosts?.[item.key] ?? 0);
              return (
                <li key={item.key} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${item.dot}`}></span>
                  <span className="text-sm text-gray-600">
                    {item.label} <span className="font-semibold text-gray-800">{pct}%</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}