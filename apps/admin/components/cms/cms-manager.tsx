"use client";

import * as React from "react";
import {
  FileText,
  Search,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Globe,
  Briefcase,
  Users,
  X,
  Save,
} from "lucide-react";
import { Badge, EmptyState } from "@samvad/ui";
import {
  CmsEntity,
  CmsEntityType,
  CmsLifecycleStatus,
} from "@samvad/types";

interface CmsManagerProps {
  initialEntities?: CmsEntity[];
  callerRole: string;
}

export function CmsManager({ initialEntities = [], callerRole }: CmsManagerProps) {
  const [entities, setEntities] = React.useState<CmsEntity[]>(initialEntities);
  const [loading, setLoading] = React.useState(initialEntities.length === 0);
  const [selectedType, setSelectedType] = React.useState<CmsEntityType | "ALL">("PAGES");
  const [selectedStatus, setSelectedStatus] = React.useState<CmsLifecycleStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Drawer / Modal states
  const [editingEntity, setEditingEntity] = React.useState<CmsEntity | null>(null);
  const [isCreatingNew, setIsCreatingNew] = React.useState(false);
  const [feedbackToast, setFeedbackToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form states for Create/Edit
  const [formState, setFormState] = React.useState<{
    id?: string;
    entityType: CmsEntityType;
    title: string;
    slug: string;
    status: CmsLifecycleStatus;
    author: string;
    seoTitle: string;
    seoDescription: string;
    featuredImage: string;
    metadataText: string;
  }>({
    entityType: "PAGES",
    title: "",
    slug: "",
    status: "DRAFT",
    author: "Author",
    seoTitle: "",
    seoDescription: "",
    featuredImage: "",
    metadataText: "{}",
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setFeedbackToast({ message, type });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  // Fetch entities from API
  const fetchEntities = React.useCallback(async () => {
    try {
      const res = await fetch("/api/cms/entities");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setEntities(json.data);
        }
      }
    } catch {
      // Offline fallback
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  // Counts by Entity Type
  const entityTypeCounts = React.useMemo(() => {
    const counts: Record<string, number> = {
      PAGES: 0,
      SERVICES: 0,
      INDUSTRIES: 0,
      CASE_STUDIES: 0,
      INSIGHTS: 0,
      NEWSROOM: 0,
      LEADERSHIP: 0,
      MEDIA: 0,
    };
    for (const e of entities) {
      const current = counts[e.entityType];
      if (typeof current === "number") {
        counts[e.entityType] = current + 1;
      }
    }
    return counts;
  }, [entities]);

  // Filtered List
  const filteredEntities = React.useMemo(() => {
    return entities.filter((e) => {
      if (selectedType !== "ALL" && e.entityType !== selectedType) return false;
      if (selectedStatus !== "ALL" && e.status !== selectedStatus) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.slug.toLowerCase().includes(q) ||
          e.author.toLowerCase().includes(q) ||
          (e.seoTitle && e.seoTitle.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [entities, selectedType, selectedStatus, searchQuery]);

  // Optimistic Status Transition
  const handleOptimisticStatusTransition = async (
    entityId: string,
    targetStatus: CmsLifecycleStatus
  ) => {
    const previousEntities = [...entities];
    const targetEntity = entities.find((e) => e.id === entityId);
    if (!targetEntity) return;

    // 1. Optimistic local state update
    setEntities((prev) =>
      prev.map((e) =>
        e.id === entityId
          ? {
              ...e,
              status: targetStatus,
              updatedAt: new Date().toISOString(),
              publishedAt:
                targetStatus === "PUBLISHED"
                  ? e.publishedAt || new Date().toISOString()
                  : targetStatus === "DRAFT" || targetStatus === "REVIEW"
                  ? null
                  : e.publishedAt,
            }
          : e
      )
    );

    showToast(`Optimistic transition to ${targetStatus}...`);

    try {
      // 2. Perform authorized server mutation
      const res = await fetch("/api/cms/entities/transition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: entityId,
          entityType: targetEntity.entityType,
          targetStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Rollback on rejection
        setEntities(previousEntities);
        showToast(data.error?.message || "Status transition unauthorized or rejected.", "error");
        return;
      }

      showToast(`Successfully transitioned "${targetEntity.title}" to ${targetStatus}`);
    } catch {
      // Rollback on network error
      setEntities(previousEntities);
      showToast("Network error. State transition rolled back.", "error");
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (entity: CmsEntity) => {
    setEditingEntity(entity);
    setIsCreatingNew(false);
    setFormState({
      id: entity.id,
      entityType: entity.entityType,
      title: entity.title,
      slug: entity.slug,
      status: entity.status,
      author: entity.author,
      seoTitle: entity.seoTitle || "",
      seoDescription: entity.seoDescription || "",
      featuredImage: entity.featuredImage || "",
      metadataText: entity.metadata ? JSON.stringify(entity.metadata, null, 2) : "{}",
    });
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsCreatingNew(true);
    setEditingEntity(null);
    setFormState({
      entityType: selectedType === "ALL" ? "PAGES" : selectedType,
      title: "",
      slug: "",
      status: "DRAFT",
      author: "Editorial Principal",
      seoTitle: "",
      seoDescription: "",
      featuredImage: "",
      metadataText: "{}",
    });
  };

  // Save Entity (Create or Update with Optimistic UI)
  const handleSaveEntity = async (e: React.FormEvent) => {
    e.preventDefault();

    let parsedMetadata = {};
    try {
      parsedMetadata = JSON.parse(formState.metadataText || "{}");
    } catch {
      showToast("Metadata must be valid JSON.", "error");
      return;
    }

    const payload = {
      entityType: formState.entityType,
      title: formState.title.trim(),
      slug: formState.slug.trim(),
      status: formState.status,
      author: formState.author.trim(),
      seoTitle: formState.seoTitle.trim() || null,
      seoDescription: formState.seoDescription.trim() || null,
      featuredImage: formState.featuredImage.trim() || null,
      metadata: parsedMetadata,
    };

    const previousEntities = [...entities];

    if (isCreatingNew) {
      // Optimistic Add
      const tempId = `temp_${Date.now()}`;
      const optimisticEntity: CmsEntity = {
        ...payload,
        id: tempId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: payload.status === "PUBLISHED" ? new Date().toISOString() : null,
      };

      setEntities([optimisticEntity, ...entities]);
      setIsCreatingNew(false);
      showToast("Creating new content entity...");

      try {
        const res = await fetch("/api/cms/entities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          setEntities(previousEntities);
          showToast(data.error?.message || "Failed to create entity.", "error");
          return;
        }

        // Replace optimistic entity with persisted server entity
        setEntities((prev) =>
          prev.map((item) => (item.id === tempId ? data.data : item))
        );
        showToast(`"${payload.title}" created successfully.`);
      } catch {
        setEntities(previousEntities);
        showToast("Network error. Entity creation rolled back.", "error");
      }
    } else if (editingEntity) {
      // Optimistic Edit
      const entityId = editingEntity.id;
      setEntities((prev) =>
        prev.map((item) =>
          item.id === entityId
            ? {
                ...item,
                ...payload,
                updatedAt: new Date().toISOString(),
              }
            : item
        )
      );
      setEditingEntity(null);
      showToast("Updating content entity...");

      try {
        const res = await fetch(`/api/cms/entities/${entityId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          setEntities(previousEntities);
          showToast(data.error?.message || "Update rejected.", "error");
          return;
        }

        showToast(`"${payload.title}" updated successfully.`);
      } catch {
        setEntities(previousEntities);
        showToast("Network error. Edit rolled back.", "error");
      }
    }
  };

  // Delete Entity
  const handleDeleteEntity = async (entity: CmsEntity) => {
    if (!confirm(`Are you sure you want to permanently delete or archive "${entity.title}"?`)) {
      return;
    }

    const previousEntities = [...entities];
    setEntities((prev) => prev.filter((e) => e.id !== entity.id));
    showToast(`Removing "${entity.title}"...`);

    try {
      const res = await fetch(`/api/cms/entities/${entity.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setEntities(previousEntities);
        showToast(data.error?.message || "Deletion rejected.", "error");
        return;
      }

      showToast(`Entity "${entity.title}" successfully removed.`);
    } catch {
      setEntities(previousEntities);
      showToast("Network error. Deletion rolled back.", "error");
    }
  };

  const entityTabs: { id: CmsEntityType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "PAGES", label: "Pages", icon: Layers },
    { id: "SERVICES", label: "Services", icon: Briefcase },
    { id: "INDUSTRIES", label: "Industries", icon: Globe },
    { id: "CASE_STUDIES", label: "Case Studies", icon: Sparkles },
    { id: "INSIGHTS", label: "Insights", icon: FileText },
    { id: "NEWSROOM", label: "Newsroom", icon: NewspaperIcon },
    { id: "LEADERSHIP", label: "Leadership", icon: Users },
    { id: "MEDIA", label: "Media Assets", icon: ImageIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedbackToast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded border px-4 py-3 font-mono text-xs shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-200 ${
            feedbackToast.type === "error"
              ? "border-rose-900 bg-rose-950/90 text-rose-200"
              : "border-gold-500/50 bg-zinc-950/90 text-gold-300"
          }`}
        >
          {feedbackToast.message}
        </div>
      )}

      {/* 1. Header with Entity Switcher Tabs */}
      <div className="flex flex-col gap-4 border-b border-zinc-800/80 pb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-zinc-100">
              SAMVAD Content Management System
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              Unified governance, lifecycle states, SEO metadata, and optimistic updates across all 8 advisory domains
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="gold">Role: {callerRole}</Badge>
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-2 rounded bg-gold-500 px-4 py-2 font-mono text-xs font-semibold text-zinc-950 hover:bg-gold-400 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Create Entity</span>
            </button>
          </div>
        </div>

        {/* 8 Required Content Domains Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {entityTabs.map((tab) => {
            const Icon = tab.icon;
            const count = entityTypeCounts[tab.id] || 0;
            const isActive = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-sm border font-mono text-xs transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-gold-500 bg-gold-950/40 text-gold-300 font-semibold"
                    : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-gold-400" : "text-zinc-500"}`} />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? "bg-gold-500/20 text-gold-300" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Controls: Lifecycle Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, slug, author, or SEO tag..."
            className="w-full rounded border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 font-sans"
          />
        </div>

        {/* Lifecycle Status Filter */}
        <div className="flex items-center gap-1 font-mono text-xs">
          <span className="text-zinc-500 uppercase text-[10px] mr-1 hidden sm:inline">Status:</span>
          {(["ALL", "DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedStatus === status
                  ? "bg-gold-500 text-zinc-950 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Entity Data Table or Empty State */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-12 rounded border border-zinc-800 bg-zinc-900/40" />
          <div className="h-64 rounded border border-zinc-800 bg-zinc-900/40" />
        </div>
      ) : filteredEntities.length === 0 ? (
        <EmptyState
          code="NO_CMS_ENTITIES"
          title={`No ${selectedType} Entities Found`}
          description="There are currently no content records matching your specified lifecycle filter or search query."
          action={
            <button
              onClick={() => {
                setSelectedStatus("ALL");
                setSearchQuery("");
              }}
              className="rounded border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-gold-400 hover:bg-zinc-800 transition-colors"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded border border-zinc-800 bg-zinc-900/60 shadow-sm font-sans">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-800/80 bg-zinc-950/80 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Entity Title &amp; Slug</th>
                <th className="py-3 px-4">SEO Readiness</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Lifecycle Status</th>
                <th className="py-3 px-4">Updated / Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredEntities.map((entity) => {
                const hasSeo = Boolean(entity.seoTitle && entity.seoDescription);
                return (
                  <tr key={entity.id} className="hover:bg-zinc-950/40 transition-colors group">
                    {/* Title & Slug */}
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex items-start gap-3">
                        {entity.featuredImage ? (
                          <div className="h-10 w-14 shrink-0 rounded border border-zinc-800 bg-zinc-950 overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={entity.featuredImage}
                              alt={entity.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-14 shrink-0 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-600">
                            <ImageIcon className="h-4 w-4" />
                          </div>
                        )}
                        <div className="space-y-0.5 min-w-0">
                          <span className="font-serif text-sm font-medium text-zinc-100 group-hover:text-gold-300 transition-colors block truncate">
                            {entity.title}
                          </span>
                          <span className="font-mono text-[11px] text-zinc-500 block truncate">
                            /{entity.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* SEO Readiness */}
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {hasSeo ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>SEO Ready</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-amber-400/80">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>Incomplete Meta</span>
                        </span>
                      )}
                    </td>

                    {/* Author */}
                    <td className="py-3 px-4 text-zinc-400">{entity.author}</td>

                    {/* Status Dropdown with Optimistic Transition */}
                    <td className="py-3 px-4">
                      <select
                        value={entity.status}
                        onChange={(e) =>
                          handleOptimisticStatusTransition(
                            entity.id,
                            e.target.value as CmsLifecycleStatus
                          )
                        }
                        className={`rounded border px-2 py-1 font-mono text-[11px] focus:outline-none transition-colors ${
                          entity.status === "PUBLISHED"
                            ? "border-gold-500/60 bg-gold-950/40 text-gold-300 font-semibold"
                            : entity.status === "REVIEW"
                            ? "border-sky-500/60 bg-sky-950/40 text-sky-300"
                            : entity.status === "ARCHIVED"
                            ? "border-zinc-700 bg-zinc-900 text-zinc-500"
                            : "border-zinc-800 bg-zinc-950 text-zinc-400"
                        }`}
                      >
                        <option value="DRAFT">DRAFT</option>
                        <option value="REVIEW">REVIEW</option>
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>

                    {/* Timestamps */}
                    <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                      <div>Updated: {new Date(entity.updatedAt).toLocaleDateString()}</div>
                      {entity.publishedAt && (
                        <span className="text-[10px] text-gold-500/80">
                          Live: {new Date(entity.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 font-mono text-[11px]">
                        <button
                          onClick={() => handleOpenEdit(entity)}
                          className="p-1 rounded text-zinc-400 hover:text-gold-300 transition-colors"
                          title="Edit Entity Dossier"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEntity(entity)}
                          className="p-1 rounded text-zinc-500 hover:text-rose-400 transition-colors"
                          title="Purge / Archive Entity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Edit / Create Entity Drawer Modal */}
      {(editingEntity || isCreatingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-gold-400">
                  {isCreatingNew ? "Ingest New Content Entity" : "Edit Advisory Content Dossier"}
                </span>
                <h3 className="font-serif text-lg font-bold text-zinc-100 mt-0.5">
                  {isCreatingNew ? `New ${formState.entityType} Entity` : formState.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditingEntity(null);
                  setIsCreatingNew(false);
                }}
                className="text-zinc-400 hover:text-zinc-200 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEntity} className="space-y-4 font-sans text-xs">
              {/* Type & Lifecycle Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-zinc-400">
                    Entity Domain Type
                  </label>
                  <select
                    disabled={!isCreatingNew}
                    value={formState.entityType}
                    onChange={(e) =>
                      setFormState({ ...formState, entityType: e.target.value as CmsEntityType })
                    }
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-zinc-200 focus:border-gold-500 focus:outline-none"
                  >
                    <option value="PAGES">PAGES</option>
                    <option value="SERVICES">SERVICES</option>
                    <option value="INDUSTRIES">INDUSTRIES</option>
                    <option value="CASE_STUDIES">CASE_STUDIES</option>
                    <option value="INSIGHTS">INSIGHTS</option>
                    <option value="NEWSROOM">NEWSROOM</option>
                    <option value="LEADERSHIP">LEADERSHIP</option>
                    <option value="MEDIA">MEDIA</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-zinc-400">
                    Lifecycle Workflow State
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        status: e.target.value as CmsLifecycleStatus,
                      })
                    }
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-zinc-200 focus:border-gold-500 focus:outline-none"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-zinc-400">Title</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Cognitive Asymmetry in Modern Geopolitical Crisis"
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none font-serif text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-zinc-400">
                    URI Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.slug}
                    onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                    placeholder="e.g. cognitive-asymmetry"
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-zinc-400">
                    Author / Practice Lead
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.author}
                    onChange={(e) => setFormState({ ...formState, author: e.target.value })}
                    placeholder="e.g. Devavrat Mukherjee"
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* SEO Title & Description */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[10px] uppercase text-zinc-400">
                    SEO Meta Title Tag
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {formState.seoTitle.length} / 160
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={160}
                  value={formState.seoTitle}
                  onChange={(e) => setFormState({ ...formState, seoTitle: e.target.value })}
                  placeholder="Target title displayed in Google search results"
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[10px] uppercase text-zinc-400">
                    SEO Meta Description
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {formState.seoDescription.length} / 320
                  </span>
                </div>
                <textarea
                  rows={2}
                  maxLength={320}
                  value={formState.seoDescription}
                  onChange={(e) => setFormState({ ...formState, seoDescription: e.target.value })}
                  placeholder="Summarize the advisory insight for sovereign search engines..."
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none text-xs"
                />
              </div>

              {/* Featured Image URL */}
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-zinc-400">
                  Featured Cover Image URL
                </label>
                <input
                  type="url"
                  value={formState.featuredImage}
                  onChange={(e) => setFormState({ ...formState, featuredImage: e.target.value })}
                  placeholder="https://cdn.samvadadvisory.com/assets/..."
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-100 placeholder-zinc-600 focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* JSON Metadata */}
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase text-zinc-400">
                  Domain Metadata (JSON Dictionary)
                </label>
                <textarea
                  rows={3}
                  value={formState.metadataText}
                  onChange={(e) => setFormState({ ...formState, metadataText: e.target.value })}
                  placeholder='{ "category": "THOUGHT_LEADERSHIP", "priority": 1 }'
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-xs text-gold-400 placeholder-zinc-700 focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingEntity(null);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2 rounded border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200 transition-colors font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded bg-gold-500 text-zinc-950 font-mono text-xs font-semibold hover:bg-gold-400 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>{isCreatingNew ? "Create Entity" : "Commit Edits"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function NewspaperIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}
