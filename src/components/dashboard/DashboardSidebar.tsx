import { useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, Trash2, ChefHat, Megaphone,
  BarChart3, Lightbulb, Settings, LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import diproisLogo from "@/assets/diprois-logo.png";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Inventory", url: "/dashboard/inventory", icon: Package },
  { title: "Waste", url: "/dashboard/waste", icon: Trash2 },
  { title: "Menu Engineering", url: "/dashboard/menu", icon: ChefHat },
  { title: "Marketing", url: "/dashboard/marketing", icon: Megaphone },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Recommendations", url: "/dashboard/recommendations", icon: Lightbulb },
];

const secondaryNav = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

interface DashboardSidebarProps {
  onLogout: () => void;
}

export function DashboardSidebar({ onLogout }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-4">
        {/* Logo */}
        <div className={`flex items-center gap-2.5 px-4 mb-6 ${collapsed ? "justify-center px-2" : ""}`}>
          <img src={diproisLogo} alt="Diprois" className="h-8 w-8 rounded-md" />
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight text-sidebar-foreground">Diprois</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest font-semibold">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent/50 transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 mr-2 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest font-semibold">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent/50 transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 mr-2 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              className="hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2 shrink-0" />
              {!collapsed && <span>Log Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
