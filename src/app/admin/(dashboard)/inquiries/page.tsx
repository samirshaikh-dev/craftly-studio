"use client";

import { useState, useEffect } from "react";
import { getLeads } from "@/lib/firebase/lead";
import type { LeadRecord } from "@/types/lead";

export default function AdminInquiriesPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "converted">("all");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getLeads();
        if (!cancelled) setLeads(data);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const formatDate = (timestamp: unknown): string => {
    if (!timestamp) return "—";
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp as string | number);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "—";
    }
  };

  const statusStyles: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    converted: "bg-green-100 text-green-700",
  };

  const priorityStyles: Record<string, string> = {
    "High Priority": "bg-orange-100 text-orange-800",
    "Urgent / Critical": "bg-red-100 text-red-800",
    "Medium Priority": "bg-blue-50 text-blue-700",
    "Low Priority": "bg-gray-100 text-gray-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Inquiries</h1>
        <span className="text-on-surface-variant font-bold">{filtered.length} total</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {(["all", "new", "contacted", "converted"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
              filter === f
                ? "bg-accent text-white"
                : "bg-surface border border-outline text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-surface border border-outline rounded-2xl p-12 text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading inquiries...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface border border-outline rounded-2xl p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">mail</span>
          <p className="text-on-surface-variant text-lg">No inquiries yet.</p>
        </div>
      ) : (
        <div className="bg-surface border border-outline rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline">
                  <th className="px-6 py-4 text-sm font-bold text-on-surface-variant">Name & Project</th>
                  <th className="px-6 py-4 text-sm font-bold text-on-surface-variant hidden md:table-cell">Email</th>
                  <th className="px-6 py-4 text-sm font-bold text-on-surface-variant hidden lg:table-cell">Budget & Timeline</th>
                  <th className="px-6 py-4 text-sm font-bold text-on-surface-variant hidden lg:table-cell">Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-on-surface-variant">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-outline last:border-b-0 hover:bg-white transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-on-surface truncate max-w-[200px]">{lead.name}</p>
                        {lead.priorityLevel && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityStyles[lead.priorityLevel] || "bg-gray-100 text-gray-700"}`}>
                            {lead.priorityLevel}
                          </span>
                        )}
                      </div>
                      {lead.projectType && (
                        <p className="text-xs font-semibold text-accent mt-0.5">{lead.projectType}</p>
                      )}
                      <p className="text-sm text-on-surface-variant truncate max-w-[280px] mt-0.5">{lead.message}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <a href={`mailto:${lead.email}`} className="text-sm text-accent hover:underline">{lead.email}</a>
                      {lead.phone && <p className="text-xs text-on-surface-variant mt-0.5">{lead.phone}</p>}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm font-medium text-on-surface">{lead.budgetRange || lead.company || "—"}</span>
                      {lead.timeline && <p className="text-xs text-on-surface-variant mt-0.5">Timeline: {lead.timeline}</p>}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-on-surface-variant">{formatDate(lead.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${statusStyles[lead.status] || ""}`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
