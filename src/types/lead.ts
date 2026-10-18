export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  priorityLevel: string;
  budgetRange: string;
  timeline: string;
  message: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  priorityLevel?: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
  source: string;
  status: "new" | "contacted" | "converted" | "archived";
  notes?: string;
  createdAt: unknown;
  updatedAt?: unknown;
}

export interface UpdateLeadInput {
  status?: "new" | "contacted" | "converted" | "archived";
  notes?: string;
}

