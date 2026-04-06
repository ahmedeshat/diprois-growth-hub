import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import * as fallback from "@/components/dashboard/dashboardData";

type SheetTab =
  | "KPIs"
  | "Revenue"
  | "FoodCost"
  | "Waste"
  | "WasteCategories"
  | "WastedIngredients"
  | "Inventory"
  | "Menu"
  | "Marketing"
  | "AIInsights"
  | "Alerts";

async function fetchSheet(tab: SheetTab, sheetId: string) {
  const { data, error } = await supabase.functions.invoke("read-google-sheet", {
    body: null,
    headers: { "Content-Type": "application/json" },
  });

  // Use query params approach via direct fetch
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const url = `${supabaseUrl}/functions/v1/read-google-sheet?tab=${encodeURIComponent(tab)}&sheetId=${encodeURIComponent(sheetId)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch sheet tab ${tab}`);
  }

  const json = await res.json();
  return json.data as Record<string, string>[];
}

// Transform functions for each tab
function parseNumber(val: string): number {
  return parseFloat(val.replace(/[€,%x]/g, "").replace(/,/g, "")) || 0;
}

function transformKPIs(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    title: r.title || "",
    value: r.value || "",
    change: r.change || "",
    up: r.up === "true" || r.up === "TRUE",
    subtitle: r.subtitle || "",
  }));
}

function transformRevenue(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    month: r.month || "",
    revenue: parseNumber(r.revenue),
    target: parseNumber(r.target),
  }));
}

function transformFoodCost(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    month: r.month || "",
    actual: parseNumber(r.actual),
    target: parseNumber(r.target),
  }));
}

function transformWaste(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    week: r.week || "",
    cost: parseNumber(r.cost),
    pct: parseNumber(r.pct),
  }));
}

function transformWasteCategories(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    category: r.category || "",
    cost: parseNumber(r.cost),
    pct: parseNumber(r.pct),
  }));
}

function transformWastedIngredients(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    name: r.name || "",
    cost: r.cost || "",
    trend: r.trend || "down",
  }));
}

function transformInventory(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    name: r.name || "",
    category: r.category || "",
    stock: r.stock || "",
    status: r.status || "ok",
    cost: r.cost || "",
    reorder: r.reorder === "true" || r.reorder === "TRUE",
  }));
}

function transformMenu(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    name: r.name || "",
    orders: parseNumber(r.orders),
    revenue: r.revenue || "",
    cost: r.cost || "",
    margin: r.margin || "",
    popularity: r.popularity || "medium",
    profitability: r.profitability || "medium",
  }));
}

function transformMarketing(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    channel: r.channel || "",
    spend: r.spend || "",
    leads: parseNumber(r.leads),
    bookings: parseNumber(r.bookings),
    cac: r.cac || "",
    roi: r.roi || "",
    trend: r.trend || "up",
  }));
}

function transformAIInsights(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    type: r.type || "cost",
    title: r.title || "",
    description: r.description || "",
    priority: r.priority || "medium",
  }));
}

function transformAlerts(rows: Record<string, string>[]) {
  return rows.map((r) => ({
    type: r.type || "info",
    message: r.message || "",
    time: r.time || "",
  }));
}

const transformers: Record<SheetTab, (rows: Record<string, string>[]) => any[]> = {
  KPIs: transformKPIs,
  Revenue: transformRevenue,
  FoodCost: transformFoodCost,
  Waste: transformWaste,
  WasteCategories: transformWasteCategories,
  WastedIngredients: transformWastedIngredients,
  Inventory: transformInventory,
  Menu: transformMenu,
  Marketing: transformMarketing,
  AIInsights: transformAIInsights,
  Alerts: transformAlerts,
};

const fallbackData: Record<SheetTab, any[]> = {
  KPIs: fallback.kpiData,
  Revenue: fallback.revenueData,
  FoodCost: fallback.foodCostData,
  Waste: fallback.wasteData,
  WasteCategories: fallback.wasteCategoryData,
  WastedIngredients: fallback.topWastedIngredients,
  Inventory: fallback.inventoryItems,
  Menu: fallback.menuItems,
  Marketing: fallback.marketingChannels,
  AIInsights: fallback.aiInsights,
  Alerts: fallback.recentAlerts,
};

export function useSheetData<T = any>(tab: SheetTab, sheetId: string | null) {
  const query = useQuery({
    queryKey: ["sheet-data", tab, sheetId],
    queryFn: async () => {
      if (!sheetId) throw new Error("No sheet ID configured");
      const raw = await fetchSheet(tab, sheetId);
      return transformers[tab](raw) as T[];
    },
    enabled: !!sheetId,
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: 1,
  });

  return {
    data: (query.data ?? fallbackData[tab]) as T[],
    loading: query.isLoading && !!sheetId,
    error: query.error,
    isUsingFallback: !query.data,
  };
}

// Hook to get the user's sheet ID from their profile or settings
export function useSheetId() {
  const query = useQuery({
    queryKey: ["user-sheet-id"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("user_settings")
        .select("google_sheet_id")
        .eq("user_id", user.id)
        .maybeSingle();

      return data?.google_sheet_id || null;
    },
    staleTime: 10 * 60 * 1000,
  });

  return {
    sheetId: query.data ?? null,
    loading: query.isLoading,
  };
}
