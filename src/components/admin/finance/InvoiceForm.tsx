import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Invoice {
  id?: string;
  client_id: string;
  project_id?: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: string;
  due_date?: string;
}

interface Client {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  client_id: string;
}

interface InvoiceFormProps {
  invoice?: Invoice | null;
  clients: Client[];
  projects: Project[];
  onSubmit: (invoice: Omit<Invoice, 'id'>) => void;
  onCancel: () => void;
}

export function InvoiceForm({ invoice, clients, projects, onSubmit, onCancel }: InvoiceFormProps) {
  const [formData, setFormData] = useState({
    client_id: '',
    project_id: '',
    invoice_number: '',
    amount: '',
    currency: 'MAD',
    status: 'pending',
    due_date: ''
  });

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (invoice) {
      setFormData({
        client_id: invoice.client_id || '',
        project_id: invoice.project_id || '',
        invoice_number: invoice.invoice_number || '',
        amount: invoice.amount?.toString() || '',
        currency: invoice.currency || 'MAD',
        status: invoice.status || 'pending',
        due_date: invoice.due_date || ''
      });
    } else {
      // Generate invoice number for new invoices
      const invoiceNum = `INV-${Date.now()}`;
      setFormData(prev => ({ ...prev, invoice_number: invoiceNum }));
    }
  }, [invoice]);

  useEffect(() => {
    // Filter projects by selected client
    if (formData.client_id) {
      const clientProjects = projects.filter(p => p.client_id === formData.client_id);
      setFilteredProjects(clientProjects);
    } else {
      setFilteredProjects([]);
    }
  }, [formData.client_id, projects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const invoiceData = {
      ...formData,
      project_id: formData.project_id || null,
      amount: parseFloat(formData.amount),
      due_date: formData.due_date || null
    };
    
    onSubmit(invoiceData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // Clear project selection if client changes
      if (field === 'client_id') {
        newData.project_id = '';
      }
      return newData;
    });
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle>{invoice ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invoice_number">Invoice Number *</Label>
            <Input
              id="invoice_number"
              value={formData.invoice_number}
              onChange={(e) => handleChange('invoice_number', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_id">Client *</Label>
            <Select value={formData.client_id} onValueChange={(value) => handleChange('client_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_id">Project (Optional)</Label>
            <Select value={formData.project_id} onValueChange={(value) => handleChange('project_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Project</SelectItem>
                {filteredProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => handleChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MAD">MAD</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input
              id="due_date"
              type="date"
              value={formData.due_date}
              onChange={(e) => handleChange('due_date', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {invoice ? 'Update' : 'Create'} Invoice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}