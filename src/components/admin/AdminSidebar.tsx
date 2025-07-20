import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Smartphone,
  DollarSign,
  UserCog,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "لوحة التحكم", url: "/admin", icon: LayoutDashboard },
  { title: "العملاء والمشاريع", url: "/admin/clients", icon: Users },
  { title: "المهام والمواعيد", url: "/admin/tasks", icon: CheckSquare },
  { title: "وسائل التواصل", url: "/admin/social", icon: Smartphone },
  { title: "المالية (MAD)", url: "/admin/finance", icon: DollarSign },
  { title: "إدارة الفريق", url: "/admin/team", icon: UserCog },
  { title: "التقارير والتحليلات", url: "/admin/analytics", icon: BarChart3 },
  { title: "الإعدادات", url: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  onSignOut: () => void;
}

export function AdminSidebar({ onSignOut }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/admin") {
      return currentPath === "/admin";
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path: string) => 
    isActive(path) 
      ? "bg-primary/20 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-accent/50 text-muted-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-border bg-card/50 backdrop-blur-sm`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold gradient-text">Backvue</h2>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-muted-foreground text-sm font-medium mb-2">
              القائمة الرئيسية
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/admin"}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="mr-3 text-right">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out Button */}
        <div className="mt-auto p-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={onSignOut}
            className={`w-full justify-start hover:bg-destructive/10 hover:text-destructive ${
              collapsed ? "px-2" : "px-3"
            }`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="mr-3">تسجيل الخروج</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}