import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  CheckSquare, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Clock,
  Target,
  AlertCircle,
  UserCog
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function DashboardOverview() {
  // Mock data - replace with real data from your backend
  const stats = {
    totalClients: 24,
    activeProjects: 12,
    monthlyRevenue: 45200,
    completedTasks: 156,
    pendingTasks: 23,
    teamMembers: 8,
    socialPosts: 89,
    campaignROI: 3.2
  };

  const recentActivities = [
    { id: 1, type: "client", message: "عميل جديد: شركة الأندلس للتجارة", time: "منذ ساعتين" },
    { id: 2, type: "task", message: "تم إكمال حملة الفيسبوك لمطعم الياسمين", time: "منذ 4 ساعات" },
    { id: 3, type: "payment", message: "تم استلام دفعة 5000 درهم من عميل البركة", time: "أمس" },
    { id: 4, type: "team", message: "انضم مصمم جرافيك جديد للفريق", time: "منذ يومين" }
  ];

  const upcomingDeadlines = [
    { id: 1, project: "حملة رمضان - مول المغرب", deadline: "غداً", priority: "high" },
    { id: 2, project: "تصميم موقع - شركة الأطلس", deadline: "خلال 3 أيام", priority: "medium" },
    { id: 3, project: "إدارة حسابات - كافيه القصبة", deadline: "خلال أسبوع", priority: "low" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">لوحة التحكم</h1>
        <p className="text-muted-foreground mt-2">نظرة عامة على أداء الوكالة اليوم</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي العملاء</p>
                <p className="text-2xl font-bold">{stats.totalClients}</p>
                <p className="text-xs text-green-500 mt-1">+2 هذا الشهر</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الإيرادات الشهرية</p>
                <p className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} MAD</p>
                <p className="text-xs text-green-500 mt-1">+15% من الشهر الماضي</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المشاريع النشطة</p>
                <p className="text-2xl font-bold">{stats.activeProjects}</p>
                <p className="text-xs text-yellow-500 mt-1">3 في المراجعة</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-full">
                <Target className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ROI الحملات</p>
                <p className="text-2xl font-bold">{stats.campaignROI}x</p>
                <p className="text-xs text-green-500 mt-1">أداء ممتاز</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              تقدم المهام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>المهام المكتملة</span>
                <span>{stats.completedTasks} / {stats.completedTasks + stats.pendingTasks}</span>
              </div>
              <Progress 
                value={(stats.completedTasks / (stats.completedTasks + stats.pendingTasks)) * 100} 
                className="h-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-500">{stats.completedTasks}</p>
                <p className="text-xs text-muted-foreground">مكتملة</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-500">{stats.pendingTasks}</p>
                <p className="text-xs text-muted-foreground">قيد التنفيذ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              المواعيد النهائية القادمة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.project}</p>
                  <p className="text-xs text-muted-foreground">{item.deadline}</p>
                </div>
                <Badge 
                  variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {item.priority === "high" ? "عاجل" : item.priority === "medium" ? "متوسط" : "منخفض"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            النشاطات الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === "client" ? "bg-blue-500/20" :
                  activity.type === "task" ? "bg-green-500/20" :
                  activity.type === "payment" ? "bg-yellow-500/20" :
                  "bg-purple-500/20"
                }`}>
                  {activity.type === "client" && <Users className="h-4 w-4 text-blue-500" />}
                  {activity.type === "task" && <CheckSquare className="h-4 w-4 text-green-500" />}
                  {activity.type === "payment" && <DollarSign className="h-4 w-4 text-yellow-500" />}
                  {activity.type === "team" && <UserCog className="h-4 w-4 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}