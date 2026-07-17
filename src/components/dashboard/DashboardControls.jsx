export default function DashboardControls({ 
  selectedRegion, 
  setSelectedRegion, 
  flatRegions, 
  inputFundsMYR, 
  setInputFundsMYR, 
  isEditing, 
  setIsEditing 
}) {
  return (
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
  );
}
