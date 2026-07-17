export default function BudgetAllocation({ 
  customCosts, 
  setCustomCosts, 
  selectedRegionData, 
  housingPct, 
  foodPct, 
  transportPct, 
  utilitiesPct, 
  leisurePct, 
  getPercentage 
}) {
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Budget Allocation</h3>
        <p className="text-sm text-gray-500">Customize your monthly expenses against regional benchmarks.</p>
      </div>

      {/* Visual Stacked Progress Bar */}
      <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden flex mb-8">
        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${housingPct}%` }} title="Housing"></div>
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${foodPct}%` }} title="Food"></div>
        <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${transportPct}%` }} title="Transport"></div>
        <div className="h-full bg-purple-400 transition-all duration-300" style={{ width: `${utilitiesPct}%` }} title="Utilities"></div>
        <div className="h-full bg-sky-400 transition-all duration-300" style={{ width: `${leisurePct}%` }} title="Leisure"></div>
      </div>

      {/* Unified Interactive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {[
          { key: 'housing', label: 'Housing', color: 'bg-indigo-500' },
          { key: 'food', label: 'Food & Groceries', color: 'bg-emerald-500' },
          { key: 'transport', label: 'Transport', color: 'bg-amber-400' },
          { key: 'utilities', label: 'Utilities', color: 'bg-purple-400' },
          { key: 'leisure', label: 'Leisure', color: 'bg-sky-400' },
        ].map((item) => {
          const avgCost = selectedRegionData?.costs?.[item.key] ?? 0;
          const customCost = customCosts?.[item.key] ?? 0;
          const itemPct = getPercentage(customCost);

          return (
            <div key={item.key} className="flex flex-col">
              {/* Label and Color Dot */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                <span className="text-sm font-semibold text-gray-700">{item.label} ({itemPct}%)</span>
              </div>
              
              {/* Editable Input */}
              <div className="relative mb-1">
                <span className="absolute left-3 top-2 text-gray-400 text-sm">RM</span>
                <input 
                  type="number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-gray-900 font-bold outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                  value={customCost === 0 ? '' : customCost}
                  onChange={(e) => {
                     setCustomCosts({
                       ...customCosts, 
                       [item.key]: Number(e.target.value)
                     });
                  }}
                />
              </div>
              
              {/* Benchmark Text */}
              <span className="text-xs text-gray-400 font-medium ml-1">
                Avg: RM {avgCost.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
