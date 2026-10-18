"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { LeadRecord } from "@/types/lead";

type FilterStatus = "all" | "new" | "contacted" | "converted" | "archived";

export default function AdminInquiriesPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showNotification = useCallback((message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (!res.ok) {
        throw new Error("Failed to load inquiries from API");
      }
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      showNotification("Could not load inquiries. Check connection.", "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    if (selectedLead) {
      setAdminNotes(selectedLead.notes || "");
    }
  }, [selectedLead]);

  // Handle status update
  const handleStatusChange = async (id: string, newStatus: LeadRecord["status"]) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );

      if (selectedLead?.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      showNotification(`Inquiry marked as ${newStatus}`);
    } catch (err) {
      console.error("Status update error:", err);
      showNotification("Failed to update status", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle saving notes
  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: adminNotes }),
      });

      if (!res.ok) {
        throw new Error("Failed to save notes");
      }

      setLeads((prev) =>
        prev.map((lead) => (lead.id === selectedLead.id ? { ...lead, notes: adminNotes } : lead))
      );
      setSelectedLead((prev) => (prev ? { ...prev, notes: adminNotes } : null));

      showNotification("Internal notes saved successfully");
    } catch (err) {
      console.error("Notes save error:", err);
      showNotification("Failed to save notes", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete inquiry
  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete inquiry");
      }

      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
      showNotification("Inquiry deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      showNotification("Failed to delete inquiry", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  // Formatting date
  const formatDate = (timestamp: unknown): string => {
    if (!timestamp) return "—";
    try {
      if (typeof timestamp === "object" && timestamp !== null && "seconds" in timestamp) {
        const seconds = (timestamp as { seconds: number }).seconds;
        return new Date(seconds * 1000).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
      const d = timestamp instanceof Date ? timestamp : new Date(timestamp as string | number);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  // Status counters
  const counts = useMemo(() => {
    return {
      all: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      converted: leads.filter((l) => l.status === "converted").length,
      archived: leads.filter((l) => l.status === "archived").length,
    };
  }, [leads]);

  // Filtered and searched leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesFilter = filter === "all" ? true : lead.status === filter;
      if (!matchesFilter) return false;

      if (!search.trim()) return true;
      const query = search.toLowerCase();
      return (
        lead.name?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.company?.toLowerCase().includes(query) ||
        lead.projectType?.toLowerCase().includes(query) ||
        lead.message?.toLowerCase().includes(query)
      );
    });
  }, [leads, filter, search]);

  const statusBadgeStyle = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "contacted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "converted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "archived":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-surface text-on-surface border-outline";
    }
  };

  const priorityBadgeStyle = (priority?: string) => {
    switch (priority) {
      case "Urgent / Critical":
        return "bg-red-50 text-red-700 border-red-200";
      case "High Priority":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Medium Priority":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Low Priority":
        return "bg-slate-50 text-slate-600 border-slate-200";
      default:
        return "bg-surface text-on-surface-variant border-outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg border text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-red-50 text-red-800 border-red-300"
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {notification.type === "success" ? "check_circle" : "error"}
          </span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-on-surface">Client Inquiries</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Manage contact form submissions, qualification statuses, and direct communications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-outline hover:border-accent text-on-surface text-sm font-bold transition-colors cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-base ${loading ? "animate-spin" : ""}`}>
              sync
            </span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface border border-outline rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "new", "contacted", "converted", "archived"] as const).map((f) => {
            const count = counts[f];
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-accent text-white shadow-sm"
                    : "bg-white border border-outline text-on-surface-variant hover:text-on-surface hover:border-accent/40"
                }`}
              >
                <span>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-surface text-on-surface-variant font-bold"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[240px] max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-outline bg-white text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Main Inquiries Table */}
      {loading ? (
        <div className="bg-surface border border-outline rounded-2xl p-16 text-center">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant font-medium">Loading inquiries from Firestore...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-surface border border-outline rounded-2xl p-16 text-center space-y-3">
          <span className="material-symbols-outlined text-6xl text-outline-variant">inbox</span>
          <h3 className="font-display text-xl font-bold text-on-surface">No inquiries found</h3>
          <p className="text-on-surface-variant text-sm max-w-md mx-auto">
            {search
              ? "No contact submissions match your search query. Try searching with different terms."
              : filter !== "all"
              ? `No inquiries currently have the status "${filter}".`
              : "No customer inquiries have been submitted yet. Submissions from the public Contact Us page will appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-surface border border-outline rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline bg-white/50 text-xs font-extrabold uppercase tracking-wider text-on-surface-variant">
                  <th className="px-6 py-4">Client &amp; Company</th>
                  <th className="px-6 py-4 hidden md:table-cell">Service &amp; Scope</th>
                  <th className="px-6 py-4 hidden lg:table-cell">Inquiry Preview</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline text-sm">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-white/80 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    {/* Client & Company */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-on-surface">{lead.name}</span>
                        {lead.priorityLevel && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityBadgeStyle(
                              lead.priorityLevel
                            )}`}
                          >
                            {lead.priorityLevel}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-on-surface-variant mt-0.5">
                        {lead.company ? (
                          <span className="font-medium text-on-surface">{lead.company} • </span>
                        ) : null}
                        <span>{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                          {lead.phone}
                        </div>
                      )}
                    </td>

                    {/* Service & Scope */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-block font-semibold text-accent text-xs">
                        {lead.projectType || "General Inquiry"}
                      </span>
                      <div className="text-xs text-on-surface-variant mt-0.5">
                        {lead.budgetRange ? <span>{lead.budgetRange}</span> : null}
                        {lead.timeline ? <span> • {lead.timeline}</span> : null}
                      </div>
                    </td>

                    {/* Inquiry Preview */}
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-xs text-on-surface-variant line-clamp-2 max-w-[280px]">
                        {lead.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 hidden sm:table-cell whitespace-nowrap text-xs text-on-surface-variant">
                      {formatDate(lead.createdAt)}
                    </td>

                    {/* Interactive Status Selector */}
                    <td
                      className="px-6 py-4"
                      onClick={(e) => e.stopPropagation()} // Prevent opening drawer when changing dropdown
                    >
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as LeadRecord["status"])
                        }
                        disabled={isUpdating}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${statusBadgeStyle(
                          lead.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td
                      className="px-6 py-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          title="View Full Details"
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-accent hover:bg-accent/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          title="Delete Inquiry"
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Slide-over / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-surface border border-outline rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-outline pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-display text-2xl font-extrabold text-on-surface">
                    {selectedLead.name}
                  </h2>
                  {selectedLead.priorityLevel && (
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${priorityBadgeStyle(
                        selectedLead.priorityLevel
                      )}`}
                    >
                      {selectedLead.priorityLevel}
                    </span>
                  )}
                </div>
                <p className="text-sm text-on-surface-variant">
                  {selectedLead.company ? `${selectedLead.company} • ` : ""}
                  Submitted on {formatDate(selectedLead.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-outline/20 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Direct Communication Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${selectedLead.email}?subject=Regarding your inquiry with Craftly Studio`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>Send Email</span>
              </a>

              {selectedLead.phone && (
                <>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello ${selectedLead.name}, thank you for contacting Craftly Studio regarding your project.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>Chat on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-outline text-on-surface font-bold text-xs hover:border-accent transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">call</span>
                    <span>Call Phone</span>
                  </a>
                </>
              )}
            </div>

            {/* Project Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white border border-outline rounded-2xl p-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Project Type
                </span>
                <span className="text-sm font-semibold text-accent">
                  {selectedLead.projectType || "General Inquiry"}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Budget
                </span>
                <span className="text-sm font-semibold text-on-surface">
                  {selectedLead.budgetRange || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Timeline
                </span>
                <span className="text-sm font-semibold text-on-surface">
                  {selectedLead.timeline || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Status
                </span>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    handleStatusChange(selectedLead.id, e.target.value as LeadRecord["status"])
                  }
                  className={`text-xs font-bold px-2 py-1 rounded-md border focus:outline-none ${statusBadgeStyle(
                    selectedLead.status
                  )}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Source
                </span>
                <span className="text-xs font-mono text-on-surface-variant">
                  {selectedLead.source || "contact_form"}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Document ID
                </span>
                <span className="text-xs font-mono text-on-surface-variant truncate block" title={selectedLead.id}>
                  {selectedLead.id}
                </span>
              </div>
            </div>

            {/* Client Message */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-2">
                Inquiry Message
              </span>
              <div className="bg-white border border-outline rounded-2xl p-4 text-on-surface text-sm leading-relaxed whitespace-pre-wrap">
                {selectedLead.message}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Internal Team Notes
                </span>
                <span className="text-xs text-on-surface-variant">Private to admins</span>
              </div>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Record call updates, qualification notes, or proposal progress..."
                rows={3}
                className="w-full p-3 rounded-xl border border-outline bg-white text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-accent"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all disabled:opacity-50 cursor-pointer"
                >
                  Save Notes
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-outline">
              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                <span>Delete Inquiry</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-xl bg-surface border border-outline font-bold text-xs text-on-surface hover:bg-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
