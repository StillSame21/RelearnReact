import { useState } from 'react';
import costData from './util/costData.json';

export default function Body() {
  const klData = costData.kuala_lumpur;
  const flatRegions = Object.values(costData);
  
  const [inputFundsMYR, setInputFundsMYR] = useState(50000);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(klData.locationName);
  
  const totalAvailableMYR = inputFundsMYR;
  const selectedRegionData = flatRegions.find(r => r.locationName === selectedRegion) || klData;
  
  // Calculate total monthly cost for the selected region
  const totalMonthlyCost = Object.values(selectedRegionData.costs).reduce((acc, cost) => acc + cost, 0);

  // Calculate projected runway in months (rounded to 1 decimal place)
  const runwayMonths = totalMonthlyCost > 0 
    ? (totalAvailableMYR / totalMonthlyCost).toFixed(1) 
    : 0;
    
  // Calculate dynamic percentages safely (avoiding divide-by-zero)
  const getPercentage = (cost) => {
    if (totalMonthlyCost === 0) return 0;
    return Math.round((cost / totalMonthlyCost) * 100);
  };

  const costs = selectedRegionData.costs;
  const housingPct = getPercentage(costs.housing);
  const foodPct = getPercentage(costs.food);
  const transportPct = getPercentage(costs.transport);
  const utilitiesPct = getPercentage(costs.utilities);
  const leisurePct = getPercentage(costs.leisure);
  
  return (
    <main className="flex-1 bg-gray-50 p-6 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* Top Header Row within the Body */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Runway Simulator</h2>
          <p className="text-gray-500 text-sm">Analyze localized expenses in Malaysian Ringgit.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
          {/* Region Selector */}
          <div className="bg-white px-4 py-2 border border-gray-200 rounded-xl shadow-sm flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-400 uppercase">Region:</span>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="text-sm font-bold text-gray-800 bg-transparent outline-none cursor-pointer"
            >
              {flatRegions.map((region, index) => (
                <option key={index} value={region.locationName}>
                  {region.locationName}
                </option>
              ))}
            </select>
          </div>
          
          {/* Interactive Input Field */}
          <div 
            className="bg-white px-4 py-2 border border-gray-200 rounded-xl shadow-sm flex items-center gap-3"
            onClick={() => setIsEditing(true)}
          >
            <span className="text-sm font-semibold text-gray-400 uppercase">Input Funds:</span>
            <div className="flex items-center text-sm font-bold text-gray-800 cursor-pointer">
              <span className="mr-1">RM</span>
              {isEditing ? (
                <input 
                  type="number"
                  value={inputFundsMYR}
                  onChange={(e) => setInputFundsMYR(Number(e.target.value))}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  className="w-24 outline-none bg-transparent"
                />
              ) : (
                <span>{inputFundsMYR.toLocaleString()}</span>
              )}
              <span className="ml-2 text-xs font-medium text-gray-400">MYR</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Metric Cards Grid (Phase 2 & 3 Analytics Outline) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        
        {/* Card 1: Total Capital */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Capital</h3>
            <div className="w-7 h-7 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xs font-bold">RM</div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              RM {totalAvailableMYR.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-gray-400 text-xs font-medium mt-2 block">Available funds for runway</span>
          </div>
        </div>

        {/* Card 3: Target Zone Selection Indicator */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Target Location</h3>
            <div className="w-7 h-7 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center text-xs font-bold">LOC</div>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900 mt-1 truncate">{selectedRegion}</p>
            <span className="text-indigo-600 text-xs font-semibold mt-2 block">{selectedRegionData.tier} Tier</span>
          </div>
        </div>

        {/* Card 4: Calculated Runway Output */}
        <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Projected Runway</h3>
            <div className="w-7 h-7 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-xs font-bold">TIME</div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{runwayMonths} Months</p>
            <span className="text-emerald-500 text-xs font-medium mt-2 block">Safe burn rate distribution</span>
          </div>
        </div>

      </div>

    

      {/* 3. Main Data Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Visual Budget Splitter Allocation */}
        <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-fit">
          <h3 className="text-base font-bold text-gray-800 mb-1">Monthly Burn Rate Allocation</h3>
          <p className="text-xs text-gray-400 mb-6">Visual model detailing how your monthly capital is partitioned inside the current environment.</p>

          {/* Visual Stacked Progress Bar */}
          <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden flex mb-6">
            <div className="h-full bg-indigo-500" style={{ width: `${housingPct}%` }} title="Housing"></div>
            <div className="h-full bg-emerald-500" style={{ width: `${foodPct}%` }} title="Food"></div>
            <div className="h-full bg-amber-400" style={{ width: `${transportPct}%` }} title="Transport"></div>
            <div className="h-full bg-purple-400" style={{ width: `${utilitiesPct}%` }} title="Utilities"></div>
            <div className="h-full bg-sky-400" style={{ width: `${leisurePct}%` }} title="Leisure"></div>
          </div>

          {/* Detailed Categorical Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: `Housing (${housingPct}%)`, value: `RM ${costs.housing.toLocaleString()}`, color: 'bg-indigo-500' },
              { label: `Food & Groceries (${foodPct}%)`, value: `RM ${costs.food.toLocaleString()}`, color: 'bg-emerald-500' },
              { label: `Transport/Tolls (${transportPct}%)`, value: `RM ${costs.transport.toLocaleString()}`, color: 'bg-amber-400' },
              { label: `Utilities/Net (${utilitiesPct}%)`, value: `RM ${costs.utilities.toLocaleString()}`, color: 'bg-purple-400' },
              { label: `Leisure/Misc (${leisurePct}%)`, value: `RM ${costs.leisure.toLocaleString()}`, color: 'bg-sky-400' },
            ].map((category, index) => (
              <div key={index} className="flex flex-col border-l-2 pl-3 border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full ${category.color}`}></span>
                  <span className="text-[11px] font-medium text-gray-400 truncate">{category.label}</span>
                </div>
                <span className="text-base font-bold text-gray-800">{category.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Cost of Living Comparative Matrix Data Table */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Regional Cost Breakdown</h3>
              <p className="text-sm text-gray-500 mt-0.5">Static tier profile comparison (values in MYR).</p>
            </div>
            
            <div className="p-5 space-y-4">
            {/* Cost Category Elements mapped dynamically from JSON keys */}
            {[
                { key: 'housing', label: 'Avg Rent Baseline' },
                { key: 'food', label: 'Monthly Food Index' },
                { key: 'transport', label: 'Transport Allocation' },
                { key: 'utilities', label: 'Utilities & Connectivity' },
                { key: 'leisure', label: 'Leisure & Entertainment' },
            ].map((item) => {
                // Dynamically access the cost value from the JSON data objects using the key
                const klCost = klData?.costs?.[item.key] ?? 0;
                const subCost = selectedRegionData?.costs?.[item.key] ?? 0;

                return (
                <div key={item.key} className="flex justify-between items-center text-xs pb-3 border-b border-gray-50 last:border-none last:pb-0">
                    <span className="font-medium text-gray-600">{item.label}</span>
                    <div className="flex gap-4 font-mono text-right">
                    <span className="text-gray-400" title="Kuala Lumpur Target">
                        RM {klCost.toLocaleString()}
                    </span>
                    <span className="text-indigo-600 font-bold" title={`${selectedRegion} Target`}>
                        RM {subCost.toLocaleString()}
                    </span>
                    </div>
                </div>
                );
            })}
            </div>
          </div>

          {/* Table Legend Footer */}
          <div className="bg-gray-50 p-4 border-t border-gray-100 text-[11px] flex justify-between text-gray-400 font-medium">
            <span>Grey: KL ({klData.tier} Tier)</span>
            <span className="text-indigo-600 font-semibold">Indigo: {selectedRegion} ({selectedRegionData.tier} Tier)</span>
          </div>
        </div>

      </div>

    </main>
  );
}