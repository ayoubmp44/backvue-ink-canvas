import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Mail, Phone, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department?: string;
  salary?: number;
  hire_date?: string;
  status: string;
  created_at: string;
}

interface TeamMemberListProps {
  teamMembers: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onRefresh: () => void;
}

export function TeamMemberList({ teamMembers, onEdit, onRefresh }: TeamMemberListProps) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Team member deleted successfully" });
      onRefresh();
    } catch (error) {
      toast({ title: "Error deleting team member", variant: "destructive" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'inactive': return 'bg-red-500/20 text-red-400';
      case 'on-leave': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'manager': return 'bg-purple-500/20 text-purple-400';
      case 'developer': return 'bg-blue-500/20 text-blue-400';
      case 'designer': return 'bg-pink-500/20 text-pink-400';
      case 'marketer': return 'bg-orange-500/20 text-orange-400';
      case 'freelancer': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{member.name}</div>
                  {member.hire_date && (
                    <div className="text-sm text-muted-foreground">
                      Joined {new Date(member.hire_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getRoleBadgeColor(member.role)}>
                  {member.role}
                </Badge>
              </TableCell>
              <TableCell>{member.department || '-'}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    {member.email}
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {member.phone}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {member.salary ? (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    {Number(member.salary).toLocaleString()} MAD
                  </div>
                ) : '-'}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(member)}
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
                        <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this team member? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(member.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {teamMembers.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No team members found. Add your first team member to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}