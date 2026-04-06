import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const DashboardSettings = () => {
  const [sheetId, setSheetId] = useState("");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await (supabase as any)
      .from("user_settings")
      .select("google_sheet_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data?.google_sheet_id) {
      setSheetId(data.google_sheet_id);
    }
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await (supabase as any)
        .from("user_settings")
        .upsert({
          user_id: user.id,
          google_sheet_id: sheetId.trim(),
        }, { onConflict: "user_id" });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["sheet-data"] });
      queryClient.invalidateQueries({ queryKey: ["user-sheet-id"] });

      toast({ title: "Settings saved", description: "Your Google Sheet ID has been updated." });
    } catch (err: any) {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    if (!sheetId.trim()) return;
    setTesting(true);
    setTestResult(null);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const url = `${supabaseUrl}/functions/v1/read-google-sheet?tab=KPIs&sheetId=${encodeURIComponent(sheetId.trim())}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${anonKey}`, apikey: anonKey },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setTestResult("success");
          toast({ title: "Connection successful!", description: `Found ${json.data.length} rows in KPIs tab.` });
        } else {
          setTestResult("error");
          toast({ title: "No data found", description: "The KPIs tab appears to be empty.", variant: "destructive" });
        }
      } else {
        setTestResult("error");
        const err = await res.json();
        toast({ title: "Connection failed", description: err.error || "Could not read sheet", variant: "destructive" });
      }
    } catch (err: any) {
      setTestResult("error");
      toast({ title: "Connection failed", description: err.message, variant: "destructive" });
    } finally {
      setTesting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure your data sources and preferences
        </p>
      </div>

      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <FileSpreadsheet size={16} className="text-primary" />
            Google Sheets Integration
          </CardTitle>
          <CardDescription className="text-xs">
            Connect your Google Sheet to pull live data into the dashboard. The sheet must be shared with the service account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">
              Google Sheet ID
            </label>
            <Input
              value={sheetId}
              onChange={(e) => setSheetId(e.target.value)}
              placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
              className="text-sm"
            />
            <p className="text-[10px] text-muted-foreground mt-1">
              Found in your Google Sheet URL: docs.google.com/spreadsheets/d/<strong>SHEET_ID</strong>/edit
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1.5">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save
            </Button>
            <Button onClick={handleTest} disabled={testing || !sheetId.trim()} size="sm" variant="outline" className="gap-1.5">
              {testing ? <Loader2 size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />}
              Test Connection
            </Button>
            {testResult === "success" && (
              <Badge variant="outline" className="text-accent border-accent/30 gap-1">
                <CheckCircle2 size={10} /> Connected
              </Badge>
            )}
            {testResult === "error" && (
              <Badge variant="outline" className="text-destructive border-destructive/30 gap-1">
                <AlertCircle size={10} /> Failed
              </Badge>
            )}
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
            <p className="text-[11px] font-semibold text-foreground mb-2">Required Sheet Tabs</p>
            <div className="grid grid-cols-2 gap-1">
              {["KPIs", "Revenue", "FoodCost", "Waste", "WasteCategories", "WastedIngredients", "Inventory", "Menu", "Marketing", "AIInsights", "Alerts"].map(tab => (
                <p key={tab} className="text-[10px] text-muted-foreground">• {tab}</p>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              Each tab's first row should be headers matching the expected column names. If a tab is missing, fallback sample data will be shown.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;
