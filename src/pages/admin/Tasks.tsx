import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { TaskList } from "@/components/admin/tasks/TaskList";
import { TaskForm } from "@/components/admin/tasks/TaskForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { toast } = useToast();

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, projects(name)')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error fetching tasks", variant: "destructive" });
    } else {
      setTasks(data || []);
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('id, name').eq('status', 'active');
    if (error) {
      toast({ title: "Error fetching projects", variant: "destructive" });
    } else {
      setProjects(data || []);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const handleTaskSubmit = async (taskData) => {
    try {
      if (editingTask) {
        const { error } = await supabase
          .from('tasks')
          .update(taskData)
          .eq('id', editingTask.id);
        if (error) throw error;
        toast({ title: "Task updated successfully" });
      } else {
        const { error } = await supabase.from('tasks').insert([taskData]);
        if (error) throw error;
        toast({ title: "Task created successfully" });
      }
      fetchTasks();
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      toast({ title: "Error saving task", variant: "destructive" });
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task => 
    task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed'
  ).length;

  return (
    <AdminLayout onSignOut={() => window.location.href = "/admin"}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Tasks & Deadlines</h1>
          <p className="text-muted-foreground">Manage your tasks and project deadlines</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                  <p className="text-2xl font-bold">{pendingTasks}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{inProgressTasks}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-red-400">{overdueTasks}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Tasks</CardTitle>
            <Button onClick={() => setShowTaskForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </CardHeader>
          <CardContent>
            <TaskList 
              tasks={tasks} 
              onEdit={(task) => {
                setEditingTask(task);
                setShowTaskForm(true);
              }}
              onRefresh={fetchTasks}
            />
          </CardContent>
        </Card>

        {showTaskForm && (
          <TaskForm
            task={editingTask}
            projects={projects}
            onSubmit={handleTaskSubmit}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}