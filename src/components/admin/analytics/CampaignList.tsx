import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, TrendingUp, MousePointer, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  name: string;
  platform: string;
  budget?: number;
  spent?: number;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  start_date?: string;
  end_date?: string;
  status: string;
  clients?: { name: string };
  created_at: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onRefresh: () => void;
}

export function CampaignList({ campaigns, onEdit, onRefresh }: CampaignListProps) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('campaigns').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Campaign deleted successfully" });
      onRefresh();
    } catch (error) {
      toast({ title: "Error deleting campaign", variant: "destructive" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return 'bg-blue-500/20 text-blue-400';
      case 'instagram': return 'bg-pink-500/20 text-pink-400';
      case 'google': return 'bg-red-500/20 text-red-400';
      case 'linkedin': return 'bg-blue-600/20 text-blue-400';
      case 'twitter': return 'bg-sky-500/20 text-sky-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00';
  };

  const calculateConversionRate = (conversions: number, clicks: number) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : '0.00';
  };

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Budget / Spent</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  {campaign.start_date && (
                    <div className="text-sm text-muted-foreground">
                      {new Date(campaign.start_date).toLocaleDateString()} - 
                      {campaign.end_date ? new Date(campaign.end_date).toLocaleDateString() : 'Ongoing'}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getPlatformColor(campaign.platform)}>
                  {campaign.platform}
                </Badge>
              </TableCell>
              <TableCell>{campaign.clients?.name || '-'}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{(campaign.spent || 0).toLocaleString()} / {(campaign.budget || 0).toLocaleString()} MAD</div>
                  <div className="text-muted-foreground">
                    {campaign.budget ? `${(((campaign.spent || 0) / campaign.budget) * 100).toFixed(1)}% spent` : '0% spent'}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {(campaign.impressions || 0).toLocaleString()} impressions
                  </div>
                  <div className="flex items-center gap-1">
                    <MousePointer className="h-3 w-3" />
                    {(campaign.clicks || 0).toLocaleString()} clicks (CTR: {calculateCTR(campaign.clicks || 0, campaign.impressions || 0)}%)
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {(campaign.conversions || 0)} conversions (CR: {calculateConversionRate(campaign.conversions || 0, campaign.clicks || 0)}%)
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(campaign)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this campaign? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(campaign.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {campaigns.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No campaigns found. Create your first campaign to start tracking analytics.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}