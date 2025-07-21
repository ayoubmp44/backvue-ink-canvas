import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { TeamMemberList } from "@/components/admin/team/TeamMemberList";
import { TeamMemberForm } from "@/components/admin/team/TeamMemberForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, UserCheck, UserX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const { toast } = useToast();

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error fetching team members", variant: "destructive" });
    } else {
      setTeamMembers(data || []);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleMemberSubmit = async (memberData) => {
    try {
      if (editingMember) {
        const { error } = await supabase
          .from('team_members')
          .update(memberData)
          .eq('id', editingMember.id);
        if (error) throw error;
        toast({ title: "Team member updated successfully" });
      } else {
        const { error } = await supabase.from('team_members').insert([memberData]);
        if (error) throw error;
        toast({ title: "Team member added successfully" });
      }
      fetchTeamMembers();
      setShowMemberForm(false);
      setEditingMember(null);
    } catch (error) {
      toast({ title: "Error saving team member", variant: "destructive" });
    }
  };

  const totalMembers = teamMembers.length;
  const activeMembers = teamMembers.filter(member => member.status === 'active').length;
  const inactiveMembers = teamMembers.filter(member => member.status === 'inactive').length;
  const totalSalary = teamMembers
    .filter(member => member.status === 'active' && member.salary)
    .reduce((sum, member) => sum + parseFloat(member.salary), 0);

  return (
    <AdminLayout onSignOut={() => window.location.href = "/admin"}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Team Management</h1>
          <p className="text-muted-foreground">Manage your team members and freelancers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">{totalMembers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{activeMembers}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                  <p className="text-2xl font-bold">{inactiveMembers}</p>
                </div>
                <UserX className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                  <p className="text-2xl font-bold">{totalSalary.toLocaleString()} MAD</p>
                </div>
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Team Members</CardTitle>
            <Button onClick={() => setShowMemberForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </CardHeader>
          <CardContent>
            <TeamMemberList 
              teamMembers={teamMembers} 
              onEdit={(member) => {
                setEditingMember(member);
                setShowMemberForm(true);
              }}
              onRefresh={fetchTeamMembers}
            />
          </CardContent>
        </Card>

        {showMemberForm && (
          <TeamMemberForm
            member={editingMember}
            onSubmit={handleMemberSubmit}
            onCancel={() => {
              setShowMemberForm(false);
              setEditingMember(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}