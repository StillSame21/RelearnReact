import { useState, useEffect } from 'react';
import costData from '../../util/costData.json';
import DashboardControls from './DashboardControls';
import MetricsCards from './MetricsCards';
import BudgetAllocation from './BudgetAllocation';

export default function Dashboard() {
  const klData = costData.kuala_lumpur;
  const flatRegions = Object.values(costData);
  
  const [inputFundsMYR, setInputFundsMYR] = useState(50000);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(klData.locationName);
  const [customCosts, setCustomCosts] = useState(klData.costs);
  
  const totalAvailableMYR = inputFundsMYR;
  const selectedRegionData = flatRegions.find(r => r.locationName === selectedRegion) || klData;
  
  // When region changes, reset custom costs to match the new region's average
  useEffect(() => {
    setCustomCosts(selectedRegionData.costs);
  }, [selectedRegionData]);

  // Calculate total monthly cost for the selected region using customCosts
  const totalMonthlyCost = Object.values(customCosts).reduce((acc, cost) => acc + cost, 0);

  // Calculate projected runway in months (rounded to 1 decimal place)
  const runwayMonths = totalMonthlyCost > 0 
    ? (totalAvailableMYR / totalMonthlyCost).toFixed(1) 
    : 0;
    
  // Calculate dynamic percentages safely (avoiding divide-by-zero)
  const getPercentage = (cost) => {
    if (totalMonthlyCost === 0) return 0;
    return Math.round((cost / totalMonthlyCost) * 100);
  };

  const costs = customCosts;
  const housingPct = getPercentage(costs.housing);
  const foodPct = getPercentage(costs.food);
  const transportPct = getPercentage(costs.transport);
  const utilitiesPct = getPercentage(costs.utilities);
  const leisurePct = getPercentage(costs.leisure);
  
  return (
    <main className="flex-1 bg-gray-50 p-6 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <DashboardControls 
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        flatRegions={flatRegions}
        inputFundsMYR={inputFundsMYR}
        setInputFundsMYR={setInputFundsMYR}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <MetricsCards 
        totalAvailableMYR={totalAvailableMYR}
        totalMonthlyCost={totalMonthlyCost}
        runwayMonths={runwayMonths}
      />

      <BudgetAllocation 
        customCosts={customCosts}
        setCustomCosts={setCustomCosts}
        selectedRegionData={selectedRegionData}
        housingPct={housingPct}
        foodPct={foodPct}
        transportPct={transportPct}
        utilitiesPct={utilitiesPct}
        leisurePct={leisurePct}
        getPercentage={getPercentage}
      />
    </main>
  );
}