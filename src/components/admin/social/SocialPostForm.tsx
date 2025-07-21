import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SocialPost {
  id?: string;
  client_id?: string;
  platform: string;
  content: string;
  media_url?: string;
  scheduled_date?: string;
  status: string;
}

interface Client {
  id: string;
  name: string;
}

interface SocialPostFormProps {
  post?: SocialPost | null;
  clients: Client[];
  onSubmit: (post: Omit<SocialPost, 'id'>) => void;
  onCancel: () => void;
}

export function SocialPostForm({ post, clients, onSubmit, onCancel }: SocialPostFormProps) {
  const [formData, setFormData] = useState({
    client_id: '',
    platform: 'instagram',
    content: '',
    media_url: '',
    scheduled_date: '',
    status: 'draft'
  });

  useEffect(() => {
    if (post) {
      setFormData({
        client_id: post.client_id || '',
        platform: post.platform || 'instagram',
        content: post.content || '',
        media_url: post.media_url || '',
        scheduled_date: post.scheduled_date ? 
          new Date(post.scheduled_date).toISOString().slice(0, 16) : '',
        status: post.status || 'draft'
      });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      client_id: formData.client_id || null,
      media_url: formData.media_url || null,
      scheduled_date: formData.scheduled_date ? 
        new Date(formData.scheduled_date).toISOString() : null
    };
    
    onSubmit(postData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="glass-card max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform *</Label>
            <Select value={formData.platform} onValueChange={(value) => handleChange('platform', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
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

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={4}
              placeholder="Write your post content here..."
              required
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.content.length} characters
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="media_url">Media URL</Label>
            <Input
              id="media_url"
              type="url"
              value={formData.media_url}
              onChange={(e) => handleChange('media_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduled_date">Scheduled Date & Time</Label>
            <Input
              id="scheduled_date"
              type="datetime-local"
              value={formData.scheduled_date}
              onChange={(e) => handleChange('scheduled_date', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {post ? 'Update' : 'Create'} Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}