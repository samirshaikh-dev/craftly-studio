"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Star,
  Plus,
  RefreshCw,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  Quote,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Testimonial, TestimonialFormData } from "@/types/testimonial";
import TestimonialModal from "@/components/forms/TestimonialModal";

type FilterStatus = "all" | "published" | "draft" | "featured";
type ViewMode = "cards" | "table";

// Initial seed data from the live website for quick one-click setup
const INITIAL_SEED_TESTIMONIALS: TestimonialFormData[] = [
  {
    quote:
      "Craftly Studio transformed our digital presence. We saw more high-value inquiries in the first month than we did the entire previous year. Their engineering depth is unmatched.",
    author: "Rajesh Mehta",
    role: "CEO",
    company: "Vapi Industrial Group",
    rating: 5,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPhecCwmsxbNV5t8XbdjEtkqtI2nMb_CFO5XTNEQt0soXWKJH3zxNx68FwiGEEEfB1Lmmh-mfRMeJSjuD5rq147vx2gmLw-PeGVCBfAFAQZDcccYGqO_YlXmlbLv6jDXTDcVH4vNQBTg9yI_eK7LS9P40BPTjOA-jUMyXttvAZ2TaI9b2BorYubLAeKSJ3yRsoyZNi02EEzimgZ3tGpexieafAghws8_-bkCQfzKt6rfqd5eIdm6Xf",
    initials: "RM",
    gradient: "from-blue-400 to-indigo-500",
    status: "published",
    featured: true,
    order: 1,
  },
  {
    quote:
      "Our booking flow used to be slow and complicated. Craftly built an automated clinic scheduler that has simplified intake and boosted appointments by 60%.",
    author: "Dr. Amrita Sen",
    role: "Founder",
    company: "Sen Care Clinic",
    rating: 5,
    avatar: "",
    initials: "AS",
    gradient: "from-emerald-400 to-teal-500",
    status: "published",
    featured: true,
    order: 2,
  },
  {
    quote:
      "We needed a lead generation engine that actually worked for local B2B searches. Craftly Studio delivered a platform that ranks #1 on search results and drives consistent client calls.",
    author: "Karan Shah",
    role: "Marketing Director",
    company: "Daman Biz Group",
    rating: 5,
    avatar: "",
    initials: "KS",
    gradient: "from-orange-400 to-red-500",
    status: "published",
    featured: true,
    order: 3,
  },
];

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 4000);
    },
    []
  );

  // Fetch testimonials from API
  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      const data = await res.json();
      if (data.testimonials) {
        setTestimonials(data.testimonials);
      }
    } catch (err) {
      console.error("Error loading testimonials:", err);
      showNotification("Could not load testimonials. Check connection.", "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Handle Create or Update submission from modal
  const handleModalSubmit = async (data: TestimonialFormData) => {
    if (editingItem) {
      // Update existing
      const res = await fetch(`/api/admin/testimonials/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update testimonial");
      setTestimonials((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...item, ...data } : item))
      );
      showNotification("Testimonial updated successfully!");
    } else {
      // Create new
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create testimonial");
      const result = await res.json();
      const newEntry: Testimonial = {
        id: result.id,
        ...data,
        createdAt: new Date().toISOString(),
      };
      setTestimonials((prev) => [newEntry, ...prev]);
      showNotification("New testimonial published successfully!");
    }
  };

  // Quick Toggle Status (published <-> draft)
  const handleToggleStatus = async (item: Testimonial) => {
    setActionId(item.id);
    const newStatus: "published" | "draft" = item.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, status: newStatus } : t))
      );
      showNotification(`Marked as ${newStatus}`);
    } catch (err) {
      console.error(err);
      showNotification("Could not change status", "error");
    } finally {
      setActionId(null);
    }
  };

  // Quick Toggle Featured
  const handleToggleFeatured = async (item: Testimonial) => {
    setActionId(item.id);
    const newFeatured = !item.featured;
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newFeatured }),
      });
      if (!res.ok) throw new Error("Failed to update featured flag");
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, featured: newFeatured } : t))
      );
      showNotification(
        newFeatured ? "Featured on homepage slider!" : "Removed from homepage slider"
      );
    } catch (err) {
      console.error(err);
      showNotification("Could not update featured setting", "error");
    } finally {
      setActionId(null);
    }
  };

  // Handle Delete
  const handleDelete = async (item: Testimonial) => {
    if (!window.confirm(`Are you sure you want to delete testimonial by "${item.author}"?`)) {
      return;
    }
    setActionId(item.id);
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      setTestimonials((prev) => prev.filter((t) => t.id !== item.id));
      showNotification("Testimonial deleted successfully");
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete testimonial", "error");
    } finally {
      setActionId(null);
    }
  };

  // One-click Seed Starter Data if empty
  const handleSeedData = async () => {
    setSeeding(true);
    try {
      for (const item of INITIAL_SEED_TESTIMONIALS) {
        await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      await fetchTestimonials();
      showNotification("Sample testimonials seeded successfully!");
    } catch (err) {
      console.error("Seeding error:", err);
      showNotification("Failed to seed sample testimonials", "error");
    } finally {
      setSeeding(false);
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = testimonials.length;
    const published = testimonials.filter((t) => t.status === "published").length;
    const draft = testimonials.filter((t) => t.status === "draft").length;
    const featured = testimonials.filter((t) => t.featured).length;
    const avgRating =
      total > 0
        ? (testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / total).toFixed(1)
        : "5.0";
    return { total, published, draft, featured, avgRating };
  }, [testimonials]);

  // Filter & Search
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      if (filter === "published" && item.status !== "published") return false;
      if (filter === "draft" && item.status !== "draft") return false;
      if (filter === "featured" && !item.featured) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        item.author.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        item.quote.toLowerCase().includes(q)
      );
    });
  }, [testimonials, filter, search]);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl border text-sm font-bold flex items-center gap-2.5 transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-red-50 text-red-800 border-red-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-extrabold text-on-surface">
              Client Testimonials
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant mt-1.5">
            Manage customer reviews, high-impact quotes, ratings, and homepage featured endorsements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setLoading(true);
              fetchTestimonials();
            }}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface border border-outline hover:border-accent text-on-surface text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => {
              setEditingItem(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-accent/90 transition-all shadow-md shadow-accent/25 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface border border-outline rounded-2xl p-5 transition-all hover:border-accent/40">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
            Total Reviews
          </p>
          <p className="font-display text-3xl font-extrabold text-on-surface">{stats.total}</p>
        </div>

        <div className="bg-surface border border-outline rounded-2xl p-5 transition-all hover:border-accent/40">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Published
          </p>
          <p className="font-display text-3xl font-extrabold text-on-surface">
            {stats.published}
          </p>
        </div>

        <div className="bg-surface border border-outline rounded-2xl p-5 transition-all hover:border-accent/40">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Drafts
          </p>
          <p className="font-display text-3xl font-extrabold text-on-surface">{stats.draft}</p>
        </div>

        <div className="bg-surface border border-outline rounded-2xl p-5 transition-all hover:border-accent/40">
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" /> Featured
          </p>
          <p className="font-display text-3xl font-extrabold text-on-surface">
            {stats.featured}
          </p>
        </div>

        <div className="col-span-2 md:col-span-1 bg-surface border border-outline rounded-2xl p-5 transition-all hover:border-accent/40">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Avg. Rating
          </p>
          <div className="flex items-baseline gap-1">
            <p className="font-display text-3xl font-extrabold text-on-surface">
              {stats.avgRating}
            </p>
            <span className="text-xs text-on-surface-variant font-bold">/ 5.0</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs, Search & View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface border border-outline rounded-2xl p-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: "all", label: "All Reviews", count: stats.total },
              { id: "published", label: "Published", count: stats.published },
              { id: "draft", label: "Drafts", count: stats.draft },
              { id: "featured", label: "Featured", count: stats.featured },
            ] as const
          ).map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-accent text-white shadow-sm"
                    : "bg-white border border-outline text-on-surface-variant hover:text-on-surface hover:border-accent/40"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-surface text-on-surface-variant font-bold"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & View Mode */}
        <div className="flex items-center gap-3">
          <div className="relative min-w-[220px] max-w-sm flex-1">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search author, company, quote..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-outline bg-white text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex items-center bg-white border border-outline rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "cards"
                  ? "bg-accent text-white"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              title="Grid Cards view"
              aria-label="Grid Cards view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-accent text-white"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-surface border border-outline rounded-3xl p-16 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-on-surface-variant font-medium text-sm">
            Loading testimonials from Firestore...
          </p>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="bg-surface border border-outline rounded-3xl p-12 md:p-16 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-2 border border-accent/20">
            <Quote className="w-8 h-8 fill-accent/10" />
          </div>
          <h3 className="font-display text-2xl font-bold text-on-surface">
            {search ? "No matching testimonials found" : "No testimonials yet"}
          </h3>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
            {search
              ? `No testimonials matched your search query "${search}". Try refining your keywords.`
              : filter !== "all"
              ? `You currently don't have any testimonials in the "${filter}" filter category.`
              : "Client reviews build instant credibility for Craftly Studio. Add your first client review or load existing website testimonials with 1 click."}
          </p>

          {!search && filter === "all" && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setEditingItem(null);
                  setModalOpen(true);
                }}
                className="bg-accent text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-accent/90 transition-all shadow-md shadow-accent/20 flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Testimonial</span>
              </button>

              <button
                onClick={handleSeedData}
                disabled={seeding}
                className="bg-white border border-outline text-on-surface px-5 py-2.5 rounded-xl font-bold text-xs hover:border-accent hover:text-accent transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{seeding ? "Seeding..." : "Load 3 Existing Site Testimonials"}</span>
              </button>
            </div>
          )}
        </div>
      ) : viewMode === "cards" ? (
        /* CARDS GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => {
            const isProcessing = actionId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-surface border ${
                  item.featured ? "border-accent/50 shadow-md" : "border-outline"
                } rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative`}
              >
                <div>
                  {/* Top Badges & Quick Toggles */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {/* Status toggle pill */}
                      <button
                        onClick={() => handleToggleStatus(item)}
                        disabled={isProcessing}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                          item.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Click to toggle status"
                      >
                        {item.status === "published" ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        <span>{item.status === "published" ? "Published" : "Draft"}</span>
                      </button>

                      {/* Featured button */}
                      <button
                        onClick={() => handleToggleFeatured(item)}
                        disabled={isProcessing}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                          item.featured
                            ? "bg-accent/10 text-accent border-accent/30 font-extrabold"
                            : "bg-white text-on-surface-variant/70 border-outline hover:text-accent hover:border-accent"
                        }`}
                        title={
                          item.featured
                            ? "Featured on Homepage slider (click to remove)"
                            : "Click to feature on homepage slider"
                        }
                      >
                        <Star
                          className={`w-3 h-3 ${
                            item.featured ? "fill-accent text-accent" : "text-neutral-400"
                          }`}
                        />
                        <span>{item.featured ? "Featured" : "Regular"}</span>
                      </button>
                    </div>

                    {/* Star Rating preview */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < (item.rating || 5)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mb-6 relative">
                    <Quote className="w-6 h-6 text-accent/20 mb-2 fill-accent/10" />
                    <p className="text-sm text-on-surface leading-relaxed italic line-clamp-4">
                      &quot;{item.quote}&quot;
                    </p>
                  </div>
                </div>

                {/* Bottom Author Info & Actions */}
                <div className="pt-4 border-t border-outline flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Avatar or Gradient Initial */}
                    <div className="w-10 h-10 rounded-full border border-outline overflow-hidden relative flex items-center justify-center shrink-0 bg-neutral-100 shadow-sm">
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${
                            item.gradient || "from-blue-400 to-indigo-500"
                          } flex items-center justify-center text-white font-extrabold text-xs`}
                        >
                          {item.initials || "CS"}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold text-xs text-on-surface truncate">
                        {item.author}
                      </p>
                      <p className="text-[11px] text-on-surface-variant truncate">
                        {item.role}
                        {item.company ? ` • ${item.company}` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setModalOpen(true);
                      }}
                      className="p-2 rounded-xl text-on-surface-variant hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                      title="Edit Testimonial"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      disabled={isProcessing}
                      className="p-2 rounded-xl text-on-surface-variant hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-surface border border-outline rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline bg-white/50 text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Quote Preview</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Homepage</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline text-xs">
                {filteredTestimonials.map((item) => {
                  const isProcessing = actionId === item.id;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-white/80 transition-colors group"
                    >
                      {/* Client */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full border border-outline overflow-hidden relative flex items-center justify-center shrink-0 bg-neutral-100">
                            {item.avatar ? (
                              <Image
                                src={item.avatar}
                                alt={item.author}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div
                                className={`w-full h-full bg-gradient-to-br ${
                                  item.gradient || "from-blue-400 to-indigo-500"
                                } flex items-center justify-center text-white font-extrabold text-[11px]`}
                              >
                                {item.initials || "CS"}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-on-surface text-sm">{item.author}</p>
                            <p className="text-[11px] text-on-surface-variant">
                              {item.role}
                              {item.company ? ` • ${item.company}` : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Quote Preview */}
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-on-surface line-clamp-2 italic">
                          &quot;{item.quote}&quot;
                        </p>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-on-surface">
                            {item.rating || 5}.0
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          disabled={isProcessing}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold border transition-colors cursor-pointer ${
                            item.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          <span>{item.status === "published" ? "Published" : "Draft"}</span>
                        </button>
                      </td>

                      {/* Homepage Featured */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleFeatured(item)}
                          disabled={isProcessing}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold border transition-colors cursor-pointer ${
                            item.featured
                              ? "bg-accent/10 text-accent border-accent/30"
                              : "bg-white text-on-surface-variant border-outline hover:border-accent"
                          }`}
                        >
                          <Star
                            className={`w-3 h-3 ${
                              item.featured ? "fill-accent text-accent" : "text-neutral-400"
                            }`}
                          />
                          <span>{item.featured ? "Featured" : "No"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                            title="Edit Testimonial"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            disabled={isProcessing}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                            title="Delete Testimonial"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Testimonial Create / Edit Modal */}
      <TestimonialModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleModalSubmit}
        initialData={editingItem}
      />
    </div>
  );
}
