import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ClientList } from "@/components/admin/clients/ClientList";
import { ClientForm } from "@/components/admin/clients/ClientForm";
import { ProjectList } from "@/components/admin/clients/ProjectList";
import { ProjectForm } from "@/components/admin/clients/ProjectForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showClientForm, setShowClientForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const { toast } = useToast();

  const fetchClients = async () => {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error fetching clients", variant: "destructive" });
    } else {
      setClients(data || []);
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*, clients(name)')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error fetching projects", variant: "destructive" });
    } else {
      setProjects(data || []);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchProjects();
  }, []);

  const handleClientSubmit = async (clientData) => {
    try {
      if (editingClient) {
        const { error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', editingClient.id);
        if (error) throw error;
        toast({ title: "Client updated successfully" });
      } else {
        const { error } = await supabase.from('clients').insert([clientData]);
        if (error) throw error;
        toast({ title: "Client created successfully" });
      }
      fetchClients();
      setShowClientForm(false);
      setEditingClient(null);
    } catch (error) {
      toast({ title: "Error saving client", variant: "destructive" });
    }
  };

  const handleProjectSubmit = async (projectData) => {
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        if (error) throw error;
        toast({ title: "Project updated successfully" });
      } else {
        const { error } = await supabase.from('projects').insert([projectData]);
        if (error) throw error;
        toast({ title: "Project created successfully" });
      }
      fetchProjects();
      setShowProjectForm(false);
      setEditingProject(null);
    } catch (error) {
      toast({ title: "Error saving project", variant: "destructive" });
    }
  };

  return (
    <AdminLayout onSignOut={() => window.location.href = "/admin"}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Clients & Projects</h1>
          <p className="text-muted-foreground">Manage your clients and their projects</p>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Clients</CardTitle>
                <Button onClick={() => setShowClientForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </CardHeader>
              <CardContent>
                <ClientList 
                  clients={clients} 
                  onEdit={(client) => {
                    setEditingClient(client);
                    setShowClientForm(true);
                  }}
                  onRefresh={fetchClients}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <Button onClick={() => setShowProjectForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent>
                <ProjectList 
                  projects={projects} 
                  onEdit={(project) => {
                    setEditingProject(project);
                    setShowProjectForm(true);
                  }}
                  onRefresh={fetchProjects}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showClientForm && (
          <ClientForm
            client={editingClient}
            onSubmit={handleClientSubmit}
            onCancel={() => {
              setShowClientForm(false);
              setEditingClient(null);
            }}
          />
        )}

        {showProjectForm && (
          <ProjectForm
            project={editingProject}
            clients={clients}
            onSubmit={handleProjectSubmit}
            onCancel={() => {
              setShowProjectForm(false);
              setEditingProject(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}