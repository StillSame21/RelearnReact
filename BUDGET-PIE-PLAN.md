# Budget Allocation: Progress Bar → Pie Chart + Split Layout

## Context

`BudgetAllocation.jsx` shows a stacked horizontal **progress bar** on top, then a
5-column input grid below. You want to:
1. **Delete** the progress bar.
2. **Split** the card into two columns: vertical form on the **left**, pie chart on the **right**.
3. Pie chart uses **Recharts**, with its **own legend** beside it.

The card already sits directly under the Total Capital / metrics row (`MetricsCards`),
so "under total capital" = keep the card where it is, just restructure its insides.

Nothing in `Dashboard.jsx` needs to change — it already passes `customCosts`,
`setCustomCosts`, `selectedRegionData`, and `getPercentage`. The five `...Pct` props
become unused after this (optional cleanup noted at end).

---

## Step 1 — Install Recharts

```bash
npm install recharts
```

Recharts 3.x supports React 19 (your `package.json` has `react ^19.2.7`). No config needed.

---

## Step 2 — Rewrite `src/components/dashboard/BudgetAllocation.jsx`

Full replacement below. Read the comments — that's the teaching part.

```jsx
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// SINGLE SOURCE OF TRUTH.
// Old code repeated colors as Tailwind classes (bg-indigo-500) AND as bar segments.
// Recharts <Cell> needs a real hex/rgb color, NOT a Tailwind class — so we store both:
//   - `dot`  : Tailwind class for the small legend/label circle
//   - `hex`  : raw color Recharts paints the pie slice with
// Keep these hex values matching the Tailwind ones so pie + form look identical.
const CATEGORIES = [
  { key: 'housing',   label: 'Housing',          dot: 'bg-indigo-500',  hex: '#6366f1' },
  { key: 'food',      label: 'Food & Groceries', dot: 'bg-emerald-500', hex: '#10b981' },
  { key: 'transport', label: 'Transport',        dot: 'bg-amber-400',   hex: '#fbbf24' },
  { key: 'utilities', label: 'Utilities',        dot: 'bg-purple-400',  hex: '#c084fc' },
  { key: 'leisure',   label: 'Leisure',          dot: 'bg-sky-400',     hex: '#38bdf8' },
];

export default function BudgetAllocation({
  customCosts,
  setCustomCosts,
  selectedRegionData,
  getPercentage,
}) {
  // Recharts wants an array of { name, value } objects.
  // We build it from the live customCosts so the pie updates as you type.
  // Filter out 0 values so empty categories don't render invisible/zero slices.
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

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
        <div className="flex items-center justify-center gap-6">
          <PieChart width={240} height={240}>
            <Pie
              data={pieData}
              dataKey="value"      // which field is the slice size
              nameKey="name"       // which field labels the slice
              cx="50%"             // center x
              cy="50%"             // center y
              innerRadius={55}     // >0 = donut hole. Set 0 for a solid pie.
              outerRadius={100}
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
```

### Why these choices
- **`CATEGORIES` constant** = single source of truth. Form, pie `<Cell>`s, and legend all
  map the same array, so colors can never drift apart.
- **`dot` (Tailwind class) vs `hex` (raw color)**: Recharts renders real SVG, so it needs
  `#6366f1`, not `bg-indigo-500`. Tailwind classes mean nothing to Recharts.
- **`pieData` built from `customCosts`** = pie is reactive. Typing in an input changes
  `customCosts` → re-render → new `pieData` → pie redraws. No manual sync.
- **`.filter(value > 0)`** avoids drawing zero-width slices for empty categories.
- **Custom legend** instead of Recharts `<Legend>` = exact color/label match with the form
  and full Tailwind styling control.
- **`innerRadius={55}`** makes a donut. Set to `0` if you want a full solid pie.

---

## Step 3 (optional cleanup) — trim dead props in `Dashboard.jsx`

After this change, `housingPct / foodPct / transportPct / utilitiesPct / leisurePct`
are no longer used by `BudgetAllocation` (it derives % via `getPercentage`). You may:
- Remove those five props from the `<BudgetAllocation .../>` JSX (lines 67–71), and
- Remove the five `const ...Pct = getPercentage(...)` lines (39–43) **if nothing else uses them**.

`getPercentage`, `customCosts`, `setCustomCosts`, `selectedRegionData` must stay.
Skip this step if you want the smallest diff — unused props are harmless.

---

## Verification

1. `npm install recharts` succeeds.
2. `npm run dev`, open the app.
3. Progress bar is **gone**.
4. Card shows: vertical inputs on left, donut pie + legend on right (stacks on narrow screens).
5. Type a new value in any input → pie slice + legend % update live.
6. Change region in the top selector → inputs reset to that region's averages, pie redraws.
7. Hover a slice → tooltip shows `RM <value>`.
8. `npm run lint` clean (no unused-var warnings — do Step 3 if lint flags the `...Pct` vars).
