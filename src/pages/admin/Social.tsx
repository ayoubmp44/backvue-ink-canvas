import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SocialPostList } from "@/components/admin/social/SocialPostList";
import { SocialPostForm } from "@/components/admin/social/SocialPostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Instagram, Facebook, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Social() {
  const [posts, setPosts] = useState([]);
  const [clients, setClients] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('social_posts')
      .select('*, clients(name)')
      .order('scheduled_date', { ascending: false });
    if (error) {
      toast({ title: "Error fetching posts", variant: "destructive" });
    } else {
      setPosts(data || []);
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
    fetchPosts();
    fetchClients();
  }, []);

  const handlePostSubmit = async (postData) => {
    try {
      if (editingPost) {
        const { error } = await supabase
          .from('social_posts')
          .update(postData)
          .eq('id', editingPost.id);
        if (error) throw error;
        toast({ title: "Post updated successfully" });
      } else {
        const { error } = await supabase.from('social_posts').insert([postData]);
        if (error) throw error;
        toast({ title: "Post created successfully" });
      }
      fetchPosts();
      setShowPostForm(false);
      setEditingPost(null);
    } catch (error) {
      toast({ title: "Error saving post", variant: "destructive" });
    }
  };

  const todayPosts = posts.filter(post => {
    const postDate = new Date(post.scheduled_date);
    const today = new Date();
    return postDate.toDateString() === today.toDateString();
  }).length;

  const scheduledPosts = posts.filter(post => post.status === 'scheduled').length;
  const draftPosts = posts.filter(post => post.status === 'draft').length;

  return (
    <AdminLayout onSignOut={() => window.location.href = "/admin"}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Social Media</h1>
          <p className="text-muted-foreground">Manage your social media content calendar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Posts</p>
                  <p className="text-2xl font-bold">{todayPosts}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold">{scheduledPosts}</p>
                </div>
                <Instagram className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold">{draftPosts}</p>
                </div>
                <Facebook className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Content Calendar</CardTitle>
            <Button onClick={() => setShowPostForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Post
            </Button>
          </CardHeader>
          <CardContent>
            <SocialPostList 
              posts={posts} 
              onEdit={(post) => {
                setEditingPost(post);
                setShowPostForm(true);
              }}
              onRefresh={fetchPosts}
            />
          </CardContent>
        </Card>

        {showPostForm && (
          <SocialPostForm
            post={editingPost}
            clients={clients}
            onSubmit={handlePostSubmit}
            onCancel={() => {
              setShowPostForm(false);
              setEditingPost(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}