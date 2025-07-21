import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Campaign {
  id?: string;
  client_id?: string;
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
}

interface Client {
  id: string;
  name: string;
}

interface CampaignFormProps {
  campaign?: Campaign | null;
  clients: Client[];
  onSubmit: (campaign: Omit<Campaign, 'id'>) => void;
  onCancel: () => void;
}

export function CampaignForm({ campaign, clients, onSubmit, onCancel }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    client_id: '',
    name: '',
    platform: 'facebook',
    budget: '',
    spent: '',
    impressions: '',
    clicks: '',
    conversions: '',
    start_date: '',
    end_date: '',
    status: 'active'
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        client_id: campaign.client_id || '',
        name: campaign.name || '',
        platform: campaign.platform || 'facebook',
        budget: campaign.budget?.toString() || '',
        spent: campaign.spent?.toString() || '',
        impressions: campaign.impressions?.toString() || '',
        clicks: campaign.clicks?.toString() || '',
        conversions: campaign.conversions?.toString() || '',
        start_date: campaign.start_date || '',
        end_date: campaign.end_date || '',
        status: campaign.status || 'active'
      });
    }
  }, [campaign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaignData = {
      ...formData,
      client_id: formData.client_id || null,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
      spent: formData.spent ? parseFloat(formData.spent) : undefined,
      impressions: formData.impressions ? parseInt(formData.impressions) : undefined,
      clicks: formData.clicks ? parseInt(formData.clicks) : undefined,
      conversions: formData.conversions ? parseInt(formData.conversions) : undefined,
      start_date: formData.start_date || undefined,
      end_date: formData.end_date || undefined
    };
    
    onSubmit(campaignData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{campaign ? 'Edit Campaign' : 'Create New Campaign'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform *</Label>
              <Select value={formData.platform} onValueChange={(value) => handleChange('platform', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_id">Client</Label>
            <Select value={formData.client_id} onValueChange={(value) => handleChange('client_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Client</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (MAD)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spent">Amount Spent (MAD)</Label>
              <Input
                id="spent"
                type="number"
                step="0.01"
                value={formData.spent}
                onChange={(e) => handleChange('spent', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="impressions">Impressions</Label>
              <Input
                id="impressions"
                type="number"
                value={formData.impressions}
                onChange={(e) => handleChange('impressions', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clicks">Clicks</Label>
              <Input
                id="clicks"
                type="number"
                value={formData.clicks}
                onChange={(e) => handleChange('clicks', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conversions">Conversions</Label>
              <Input
                id="conversions"
                type="number"
                value={formData.conversions}
                onChange={(e) => handleChange('conversions', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleChange('start_date', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => handleChange('end_date', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {campaign ? 'Update' : 'Create'} Campaign
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}