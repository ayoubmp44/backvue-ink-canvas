import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CampaignList } from "@/components/admin/analytics/CampaignList";
import { CampaignForm } from "@/components/admin/analytics/CampaignForm";
import { AnalyticsOverview } from "@/components/admin/analytics/AnalyticsOverview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Analytics() {
  const [campaigns, setCampaigns] = useState([]);
  const [clients, setClients] = useState([]);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const { toast } = useToast();

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*, clients(name)')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error fetching campaigns", variant: "destructive" });
    } else {
      setCampaigns(data || []);
    }
  };

  const fetchClients = async () => {
    const { data, error } = await supabase.from('clients').select('id, name').eq('status', 'active');
    if (error) {
      toast({ title: "Error fetching clients", variant: "destructive" });
    } else {
      setClients(data || []);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchClients();
  }, []);

  const handleCampaignSubmit = async (campaignData) => {
    try {
      if (editingCampaign) {
        const { error } = await supabase
          .from('campaigns')
          .update(campaignData)
          .eq('id', editingCampaign.id);
        if (error) throw error;
        toast({ title: "Campaign updated successfully" });
      } else {
        const { error } = await supabase.from('campaigns').insert([campaignData]);
        if (error) throw error;
        toast({ title: "Campaign created successfully" });
      }
      fetchCampaigns();
      setShowCampaignForm(false);
      setEditingCampaign(null);
    } catch (error) {
      toast({ title: "Error saving campaign", variant: "destructive" });
    }
  };

  return (
    <AdminLayout onSignOut={() => window.location.href = "/admin"}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Analytics & Reports</h1>
          <p className="text-muted-foreground">Track campaign performance and analytics</p>
        </div>

        <AnalyticsOverview campaigns={campaigns} />

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Campaigns</CardTitle>
            <Button onClick={() => setShowCampaignForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Campaign
            </Button>
          </CardHeader>
          <CardContent>
            <CampaignList 
              campaigns={campaigns} 
              onEdit={(campaign) => {
                setEditingCampaign(campaign);
                setShowCampaignForm(true);
              }}
              onRefresh={fetchCampaigns}
            />
          </CardContent>
        </Card>

        {showCampaignForm && (
          <CampaignForm
            campaign={editingCampaign}
            clients={clients}
            onSubmit={handleCampaignSubmit}
            onCancel={() => {
              setShowCampaignForm(false);
              setEditingCampaign(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}