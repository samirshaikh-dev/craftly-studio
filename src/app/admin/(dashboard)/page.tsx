"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/firebase/blog";
import { getLeadsCount, getNewLeadsCount } from "@/lib/firebase/lead";

export default function AdminDashboardPage() {
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [totalInquiries, setTotalInquiries] = useState<number | null>(null);
  const [newInquiries, setNewInquiries] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [posts, inquiries, newLeads] = await Promise.allSettled([
          getBlogPosts(),
          getLeadsCount(),
          getNewLeadsCount(),
        ]);
        if (!cancelled) {
          setBlogCount(posts.status === "fulfilled" ? posts.value.length : 0);
          setTotalInquiries(inquiries.status === "fulfilled" ? inquiries.value : 0);
          setNewInquiries(newLeads.status === "fulfilled" ? newLeads.value : 0);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const statCards = [
    { label: "Blog Posts", value: blogCount, icon: "article", live: true, highlight: false },
    { label: "Total Inquiries", value: totalInquiries, icon: "mail", live: true, highlight: false },
    {
      label: "New Leads",
      value: newInquiries,
      icon: "mark_email_unread",
      live: true,
      highlight: (newInquiries ?? 0) > 0,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`bg-surface border rounded-2xl p-6 transition-all ${
              stat.highlight ? "border-accent/40 shadow-sm" : "border-outline"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-on-surface-variant font-bold text-sm">{stat.label}</p>
              <span
                className={`material-symbols-outlined ${
                  stat.highlight ? "text-accent" : "text-on-surface-variant"
                }`}
              >
                {stat.icon}
              </span>
            </div>
            {stat.live && loading ? (
              <div className="w-12 h-8 bg-outline/30 rounded animate-pulse" />
            ) : (
              <div className="flex items-baseline gap-2">
                <p className="font-display text-3xl font-bold">
                  {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                </p>
                {stat.highlight && (
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    Action Needed
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-surface border border-outline rounded-2xl p-6">
        <h2 className="font-display text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-3 p-4 rounded-xl border border-outline hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <span className="material-symbols-outlined text-accent">inbox</span>
            <span className="font-bold text-sm">Review Inquiries</span>
          </Link>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-3 p-4 rounded-xl border border-outline hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <span className="material-symbols-outlined text-accent">add</span>
            <span className="font-bold text-sm">New Blog Post</span>
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center gap-3 p-4 rounded-xl border border-outline hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <span className="material-symbols-outlined text-accent">upload</span>
            <span className="font-bold text-sm">Upload Media</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
