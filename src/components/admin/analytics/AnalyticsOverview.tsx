import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Eye, MousePointer, Target, DollarSign } from "lucide-react";

interface Campaign {
  id: string;
  budget?: number;
  spent?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  status: string;
}

interface AnalyticsOverviewProps {
  campaigns: Campaign[];
}

export function AnalyticsOverview({ campaigns }: AnalyticsOverviewProps) {
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + (c.spent || 0), 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);
  
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;
  const avgConversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : 0;
  const avgCPC = totalClicks > 0 ? (totalSpent / totalClicks).toFixed(2) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Campaigns</p>
              <p className="text-2xl font-bold">{activeCampaigns.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Impressions</p>
              <p className="text-2xl font-bold">{totalImpressions.toLocaleString()}</p>
            </div>
            <Eye className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Clicks</p>
              <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">CTR: {avgCTR}%</p>
            </div>
            <MousePointer className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Conversions</p>
              <p className="text-2xl font-bold">{totalConversions}</p>
              <p className="text-xs text-muted-foreground">Rate: {avgConversionRate}%</p>
            </div>
            <Target className="h-8 w-8 text-orange-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card md:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Budget vs Spent</p>
              <p className="text-2xl font-bold">{totalSpent.toLocaleString()} / {totalBudget.toLocaleString()} MAD</p>
              <p className="text-xs text-muted-foreground">
                {totalBudget > 0 ? `${((totalSpent / totalBudget) * 100).toFixed(1)}% spent` : '0% spent'}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card md:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Cost Per Click</p>
              <p className="text-2xl font-bold">{avgCPC} MAD</p>
              <p className="text-xs text-muted-foreground">
                {totalClicks > 0 ? `From ${totalClicks.toLocaleString()} clicks` : 'No clicks yet'}
              </p>
            </div>
            <MousePointer className="h-8 w-8 text-pink-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}