export const kpiData = [
  { title: "Revenue (MTD)", value: "€42,580", change: "+12.3%", up: true, subtitle: "vs last month" },
  { title: "Food Cost %", value: "28.4%", change: "-2.1%", up: true, subtitle: "target: 30%" },
  { title: "Waste %", value: "3.2%", change: "-0.8%", up: true, subtitle: "target: <4%" },
  { title: "Inventory Value", value: "€12,450", change: "+1.2%", up: false, subtitle: "232 items" },
  { title: "Low Stock Alerts", value: "7", change: "+3", up: false, subtitle: "action required" },
  { title: "Marketing ROI", value: "4.2x", change: "+0.6x", up: true, subtitle: "all channels" },
  { title: "Orders (MTD)", value: "1,842", change: "+8.5%", up: true, subtitle: "avg €23.12" },
  { title: "Profit Margin", value: "18.6%", change: "+1.4%", up: true, subtitle: "net margin" },
];

export const revenueData = [
  { month: "Jan", revenue: 38200, target: 35000 },
  { month: "Feb", revenue: 35800, target: 36000 },
  { month: "Mar", revenue: 41500, target: 37000 },
  { month: "Apr", revenue: 39200, target: 38000 },
  { month: "May", revenue: 43100, target: 39000 },
  { month: "Jun", revenue: 42580, target: 40000 },
];

export const foodCostData = [
  { month: "Jan", actual: 32.1, target: 30 },
  { month: "Feb", actual: 31.5, target: 30 },
  { month: "Mar", actual: 30.2, target: 30 },
  { month: "Apr", actual: 29.8, target: 30 },
  { month: "May", actual: 29.1, target: 30 },
  { month: "Jun", actual: 28.4, target: 30 },
];

export const wasteData = [
  { week: "W1", cost: 420, pct: 4.1 },
  { week: "W2", cost: 380, pct: 3.8 },
  { week: "W3", cost: 350, pct: 3.5 },
  { week: "W4", cost: 310, pct: 3.2 },
];

export const wasteCategoryData = [
  { category: "Produce", cost: 480, pct: 33 },
  { category: "Seafood", cost: 390, pct: 27 },
  { category: "Dairy", cost: 230, pct: 16 },
  { category: "Meat", cost: 200, pct: 14 },
  { category: "Other", cost: 150, pct: 10 },
];

export const topWastedIngredients = [
  { name: "Fresh Herbs", cost: "€145", trend: "down" },
  { name: "Salmon Trimmings", cost: "€128", trend: "down" },
  { name: "Mixed Greens", cost: "€98", trend: "up" },
  { name: "Heavy Cream", cost: "€72", trend: "down" },
  { name: "Tomatoes", cost: "€65", trend: "down" },
];

export const inventoryItems = [
  { name: "Fresh Salmon", category: "Seafood", stock: "2.5 kg", status: "low", cost: "€45/kg", reorder: true },
  { name: "Truffle Oil", category: "Oils", stock: "0.3 L", status: "critical", cost: "€120/L", reorder: true },
  { name: "Parmesan Cheese", category: "Dairy", stock: "4 kg", status: "expiring", cost: "€28/kg", reorder: false },
  { name: "Fresh Basil", category: "Herbs", stock: "150g", status: "low", cost: "€18/kg", reorder: true },
  { name: "Wagyu Beef", category: "Meat", stock: "8 kg", status: "ok", cost: "€180/kg", reorder: false },
  { name: "Olive Oil", category: "Oils", stock: "12 L", status: "overstock", cost: "€14/L", reorder: false },
];

export const menuItems = [
  { name: "Grilled Sea Bass", orders: 342, revenue: "€8,208", cost: "28%", margin: "72%", popularity: "high", profitability: "high" },
  { name: "Caesar Salad", orders: 412, revenue: "€4,944", cost: "18%", margin: "82%", popularity: "high", profitability: "high" },
  { name: "Truffle Risotto", orders: 289, revenue: "€7,514", cost: "32%", margin: "68%", popularity: "high", profitability: "medium" },
  { name: "Chocolate Fondant", orders: 267, revenue: "€3,204", cost: "25%", margin: "75%", popularity: "medium", profitability: "high" },
  { name: "Beef Wellington", orders: 198, revenue: "€7,920", cost: "39%", margin: "61%", popularity: "medium", profitability: "low" },
  { name: "Lobster Bisque", orders: 89, revenue: "€2,225", cost: "42%", margin: "58%", popularity: "low", profitability: "low" },
  { name: "Tiramisu", orders: 78, revenue: "€936", cost: "22%", margin: "78%", popularity: "low", profitability: "high" },
];

export const marketingChannels = [
  { channel: "Instagram Ads", spend: "€1,200", leads: 340, bookings: 85, cac: "€14.12", roi: "5.2x", trend: "up" },
  { channel: "Google Ads", spend: "€800", leads: 210, bookings: 52, cac: "€15.38", roi: "4.1x", trend: "up" },
  { channel: "Email Campaign", spend: "€150", leads: 120, bookings: 38, cac: "€3.95", roi: "8.4x", trend: "up" },
  { channel: "Facebook Ads", spend: "€600", leads: 180, bookings: 32, cac: "€18.75", roi: "2.8x", trend: "down" },
  { channel: "TripAdvisor", spend: "€200", leads: 95, bookings: 28, cac: "€7.14", roi: "3.6x", trend: "up" },
];

export const aiInsights = [
  { type: "cost", title: "Reduce Salmon Reorder Quantity", description: "Current order quantity exceeds weekly usage by 35%. Reduce from 15kg to 10kg to save ~€225/month.", priority: "high" },
  { type: "menu", title: "Reprice Beef Wellington", description: "Current price yields only 61% margin. Increase by €4 to align with 68% target without impacting demand.", priority: "high" },
  { type: "menu", title: "Promote Tiramisu", description: "78% margin but low orders. Feature it as dessert special — similar items saw 45% order increase when promoted.", priority: "medium" },
  { type: "marketing", title: "Shift Budget from Facebook", description: "Facebook CAC is 33% higher than average. Reallocate €300/month to Email campaigns for better ROI.", priority: "medium" },
  { type: "waste", title: "Adjust Herb Prep Schedule", description: "Fresh herbs account for 33% of produce waste. Switch to twice-daily prep instead of morning batch.", priority: "high" },
  { type: "menu", title: "Consider Removing Lobster Bisque", description: "Low popularity (89 orders) and low margin (58%). Replace with a seasonal soup to improve category performance.", priority: "low" },
];

export const recentAlerts = [
  { type: "critical", message: "Truffle Oil stock critically low — only 0.3L remaining", time: "12 min ago" },
  { type: "warning", message: "Food cost spiked to 31.2% on Tuesday — seafood delivery pricing", time: "2 hours ago" },
  { type: "info", message: "Instagram campaign 'Summer Menu' exceeded target reach by 22%", time: "4 hours ago" },
  { type: "warning", message: "Parmesan Cheese expires in 3 days — 4kg remaining", time: "5 hours ago" },
  { type: "info", message: "Weekly waste report generated — 3.2% (below 4% target)", time: "Yesterday" },
  { type: "critical", message: "Fresh Salmon stock below reorder threshold", time: "Yesterday" },
];
