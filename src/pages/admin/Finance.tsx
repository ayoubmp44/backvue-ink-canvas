import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { InvoiceList } from "@/components/admin/finance/InvoiceList";
import { InvoiceForm } from "@/components/admin/finance/InvoiceForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Finance() {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const { toast } = useToast();

  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*, clients(name), projects(name)')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error fetching invoices", variant: "destructive" });
    } else {
      setInvoices(data || []);
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

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('id, name, client_id');
    if (error) {
      toast({ title: "Error fetching projects", variant: "destructive" });
    } else {
      setProjects(data || []);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchClients();
    fetchProjects();
  }, []);

  const handleInvoiceSubmit = async (invoiceData) => {
    try {
      if (editingInvoice) {
        const { error } = await supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', editingInvoice.id);
        if (error) throw error;
        toast({ title: "Invoice updated successfully" });
      } else {
        const { error } = await supabase.from('invoices').insert([invoiceData]);
        if (error) throw error;
        toast({ title: "Invoice created successfully" });
      }
      fetchInvoices();
      setShowInvoiceForm(false);
      setEditingInvoice(null);
    } catch (error) {
      toast({ title: "Error saving invoice", variant: "destructive" });
    }
  };

  // Calculate financial metrics
  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  const thisMonthRevenue = invoices
    .filter(inv => {
      const invoiceDate = new Date(inv.created_at);
      const thisMonth = new Date();
      return invoiceDate.getMonth() === thisMonth.getMonth() && 
             invoiceDate.getFullYear() === thisMonth.getFullYear() &&
             inv.status === 'paid';
    })
    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  return (
    <AdminLayout onSignOut={() => window.location.href = "/admin"}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Finance (MAD)</h1>
          <p className="text-muted-foreground">Manage invoices and track payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{totalRevenue.toLocaleString()} MAD</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">{thisMonthRevenue.toLocaleString()} MAD</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingAmount.toLocaleString()} MAD</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-red-400">{overdueAmount.toLocaleString()} MAD</p>
                </div>
                <CheckCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Invoices</CardTitle>
            <Button onClick={() => setShowInvoiceForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </CardHeader>
          <CardContent>
            <InvoiceList 
              invoices={invoices} 
              onEdit={(invoice) => {
                setEditingInvoice(invoice);
                setShowInvoiceForm(true);
              }}
              onRefresh={fetchInvoices}
            />
          </CardContent>
        </Card>

        {showInvoiceForm && (
          <InvoiceForm
            invoice={editingInvoice}
            clients={clients}
            projects={projects}
            onSubmit={handleInvoiceSubmit}
            onCancel={() => {
              setShowInvoiceForm(false);
              setEditingInvoice(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}