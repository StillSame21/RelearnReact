export default function MetricsCards({ totalAvailableMYR, totalMonthlyCost, runwayMonths }) {
  return (
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

      {/* Card 2: Monthly Burn Rate */}
      <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between h-32">
        <div className="flex justify-between items-start">
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Monthly Burn Rate</h3>
          <div className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-xs font-bold">RM</div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            RM {totalMonthlyCost.toLocaleString()}
          </p>
          <span className="text-red-500 text-xs font-medium mt-2 block">Total budgeted expenses</span>
        </div>
      </div>

      {/* Card 3: Calculated Runway Output */}
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
  );
}
