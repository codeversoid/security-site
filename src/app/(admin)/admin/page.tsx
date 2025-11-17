"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SiteSettings = {
  siteName: string;
  logoUrl: string;
  address: string;
  email: string;
  phone: string;
  comproUrl: string;
  whatsapp: string;
  homeHeroImageUrl?: string;
  homeAboutImageUrl?: string;
};

type NewsPost = { slug: string; title: string; excerpt: string; date: string; image: string; content?: string };

type GalleryItem = { src: string; alt: string; category: string };
type GalleryData = { categories: { id: string; name: string }[]; items: GalleryItem[] };

export default function AdminPage() {
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const [site, setSite] = useState<SiteSettings | null>(null);
  const [savingSite, setSavingSite] = useState(false);
  const [siteStatus, setSiteStatus] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [siteUploadStatus, setSiteUploadStatus] = useState<string | null>(null);
  const [uploadingCompro, setUploadingCompro] = useState(false);
  const [comproUploadStatus, setComproUploadStatus] = useState<string | null>(null);

  const [news, setNews] = useState<NewsPost[]>([]);
  const [savingNews, setSavingNews] = useState(false);
  const [newPost, setNewPost] = useState<NewsPost>({ slug: "", title: "", excerpt: "", date: "", image: "/news/news-01.svg", content: "" });
  const [newsStatus, setNewsStatus] = useState<string | null>(null);
  const [uploadingNewsImage, setUploadingNewsImage] = useState(false);
  const [newsImageUploadStatus, setNewsImageUploadStatus] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<NewsPost | null>(null);

  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [savingGallery, setSavingGallery] = useState(false);
  const [newItem, setNewItem] = useState<GalleryItem>({ src: "", alt: "", category: "diklat" });
  const [galleryStatus, setGalleryStatus] = useState<string | null>(null);
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);
  const [galleryImageUploadStatus, setGalleryImageUploadStatus] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");

  // About Management
  type Member = { name: string; role: string; imageUrl: string };
  type Partner = { name?: string; logoUrl?: string };
  type AboutData = {
    directorName: string;
    directorTitle: string;
    directorPhotoUrl: string;
    directorMessage: string;
    aboutLogoUrl: string;
    team: Member[];
    partners: Partner[];
  };
  const [about, setAbout] = useState<AboutData | null>(null);
  const [savingAbout, setSavingAbout] = useState(false);
  const [aboutStatus, setAboutStatus] = useState<string | null>(null);
  const [uploadingDirectorPhoto, setUploadingDirectorPhoto] = useState(false);
  const [directorUploadStatus, setDirectorUploadStatus] = useState<string | null>(null);
  const [uploadingAboutLogo, setUploadingAboutLogo] = useState(false);
  const [aboutLogoUploadStatus, setAboutLogoUploadStatus] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<Member>({ name: "", role: "", imageUrl: "" });
  const [uploadingMemberImage, setUploadingMemberImage] = useState(false);
  const [memberImageUploadStatus, setMemberImageUploadStatus] = useState<string | null>(null);
  const [newPartnerLogo, setNewPartnerLogo] = useState<string>("");
  const [newPartnerName, setNewPartnerName] = useState<string>("");
  const [uploadingPartnerLogo, setUploadingPartnerLogo] = useState(false);
  const [partnerUploadStatus, setPartnerUploadStatus] = useState<string | null>(null);

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 32);

  useEffect(() => {
    (async () => {
      try {
        const s = await fetch("/api/admin/site", { cache: "no-store" }).then((r) => r.json());
        if (s?.data) setSite(s.data); else setAuthStatus(s?.message || null);
      } catch {}
      try {
        const n = await fetch("/api/admin/news", { cache: "no-store" }).then((r) => r.json());
        setNews(n.data?.posts ?? []);
      } catch {}
      try {
        const g = await fetch("/api/admin/gallery", { cache: "no-store" }).then((r) => r.json());
        if (g?.data) setGallery(g.data);
      } catch {}
      try {
        const a = await fetch("/api/admin/about", { cache: "no-store" }).then((r) => r.json());
        if (a?.data) setAbout(a.data);
      } catch {}
    })();
  }, []);

  const saveSite = async () => {
    if (!site) return;
    setSavingSite(true);
    try {
      const resp = await fetch("/api/admin/site", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(site) });
      const json = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setSiteStatus(`Gagal menyimpan${json?.message ? ": " + json.message : ""}`);
        return;
      }
      const latest = await fetch("/api/admin/site", { cache: "no-store" }).then((r) => r.json());
      setSite(latest.data);
      setSiteStatus("Tersimpan");
    } finally {
      setSavingSite(false);
    }
  };

  const addNewsPost = () => {
    if (!newPost.slug || !newPost.title) return;
    setNews((prev) => [...prev, newPost]);
    setNewPost({ slug: "", title: "", excerpt: "", date: "", image: "/news/news-01.svg", content: "" });
  };

  const removeNewsPost = (slug: string) => setNews((prev) => prev.filter((p) => p.slug !== slug));

  const saveNews = async () => {
    setSavingNews(true);
    try {
      const resp = await fetch("/api/admin/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ posts: news }) });
      const json = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setNewsStatus(`Gagal menyimpan${json?.message ? ": " + json.message : ""}`);
        return;
      }
      const latest = await fetch("/api/admin/news", { cache: "no-store" }).then((r) => r.json());
      setNews(Array.isArray(latest?.data?.posts) ? latest.data.posts : []);
      setNewsStatus("Tersimpan");
    } finally {
      setSavingNews(false);
    }
  };

  const startEdit = (slug: string) => {
    const found = news.find((p) => p.slug === slug);
    if (!found) return;
    setEditingSlug(slug);
    setEditDraft({ ...found });
  };

  const applyEdit = () => {
    if (!editingSlug || !editDraft) return;
    setNews((prev) => prev.map((p) => (p.slug === editingSlug ? { ...editDraft } : p)));
    setEditingSlug(null);
    setEditDraft(null);
  };

  const cancelEdit = () => {
    setEditingSlug(null);
    setEditDraft(null);
  };

  const addGalleryItem = () => {
    if (!newItem.src || !newItem.alt || !newItem.category || !gallery) return;
    setGallery({ ...gallery, items: [...gallery.items, newItem] });
    setNewItem({ src: "", alt: "", category: gallery.categories[0]?.id ?? "diklat" });
  };

  const removeGalleryItem = (src: string) => {
    if (!gallery) return;
    setGallery({ ...gallery, items: gallery.items.filter((it) => it.src !== src) });
  };

  const saveGallery = async () => {
    if (!gallery) return;
    setSavingGallery(true);
    try {
      const resp = await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(gallery) });
      const json = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setGalleryStatus(`Gagal menyimpan${json?.message ? ": " + json.message : ""}`);
        return;
      }
      const latest = await fetch("/api/admin/gallery", { cache: "no-store" }).then((r) => r.json());
      setGallery(latest.data);
      setGalleryStatus("Tersimpan");
    } finally {
      setSavingGallery(false);
    }
  };

  const addGalleryCategory = () => {
    if (!gallery) return;
    const name = newCategoryName.trim();
    const id = (newCategoryId || slugify(newCategoryName)).trim();
    if (!name || !id) return;
    const exists = gallery.categories.some(
      (c) => c.id === id || c.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      setGalleryStatus("Kategori sudah ada");
      return;
    }
    const nextCategories = [...gallery.categories, { id, name }];
    const nextNewItem = { ...newItem };
    if (!nextCategories.find((c) => c.id === nextNewItem.category)) {
      nextNewItem.category = id;
    }
    setGallery({ ...gallery, categories: nextCategories });
    setNewItem(nextNewItem);
    setNewCategoryName("");
    setNewCategoryId("");
    setGalleryStatus("Kategori ditambahkan, jangan lupa klik Simpan");
  };

  const removeGalleryCategory = (id: string) => {
    if (!gallery) return;
    const nextCategories = gallery.categories.filter((c) => c.id !== id);
    const nextItems = gallery.items.filter((it) => it.category !== id);
    let nextNewItemCategory = newItem.category;
    if (!nextCategories.find((c) => c.id === nextNewItemCategory)) {
      nextNewItemCategory = nextCategories[0]?.id || "";
    }
    setGallery({ ...gallery, categories: nextCategories, items: nextItems });
    setNewItem({ ...newItem, category: nextNewItemCategory });
    setGalleryStatus("Kategori dihapus beserta item terkait, klik Simpan untuk menerapkan");
  };

  // About helpers
  const saveAbout = async () => {
    if (!about) return;
    setSavingAbout(true);
    setAboutStatus(null);
    try {
      const resp = await fetch("/api/admin/about", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(about) });
      const json = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setAboutStatus(`Gagal menyimpan${json?.message ? ": " + json.message : ""}`);
        return;
      }
      const latest = await fetch("/api/admin/about", { cache: "no-store" }).then((r) => r.json());
      setAbout(latest.data);
      setAboutStatus("Tersimpan");
    } finally {
      setSavingAbout(false);
    }
  };

  const addTeamMember = () => {
    if (!about) return;
    if (!newMember.name || !newMember.role) return;
    setAbout({ ...about, team: [...about.team, newMember] });
    setNewMember({ name: "", role: "", imageUrl: "" });
  };
  const removeTeamMember = (idx: number) => {
    if (!about) return;
    const next = [...about.team];
    next.splice(idx, 1);
    setAbout({ ...about, team: next });
  };
  const addPartner = () => {
    if (!about) return;
    const name = (newPartnerName || "").trim();
    const logo = (newPartnerLogo || "").trim();
    if (!name && !logo) return;
    setAbout({ ...about, partners: [...about.partners, { name, logoUrl: logo }] });
    setNewPartnerLogo("");
    setNewPartnerName("");
  };
  const updatePartnerField = (idx: number, field: keyof Partner, value: string) => {
    if (!about) return;
    const next = [...about.partners];
    const curr = { ...next[idx] };
    (curr as any)[field] = value;
    next[idx] = curr;
    setAbout({ ...about, partners: next });
  };
  const removePartner = (idx: number) => {
    if (!about) return;
    const next = [...about.partners];
    next.splice(idx, 1);
    setAbout({ ...about, partners: next });
  };

  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>
          <p className="mt-2 text-muted-foreground">Kelola konten situs: identitas perusahaan, berita, dan galeri.</p>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={async () => {
              setAuthStatus(null);
              const resp = await fetch("/api/logout", { method: "POST" }).catch(() => null);
              if (!resp || !resp.ok) {
                setAuthStatus("Gagal logout");
                return;
              }
              window.location.href = "/login?redirect=/admin";
            }}
            className="rounded-full"
          >
            Keluar
          </Button>
        </div>
      </div>
      {authStatus && <p className="mt-2 text-red-600 text-sm">{authStatus}</p>}

      {/* Site Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Identitas Situs</CardTitle>
          <CardDescription>Nama perusahaan, logo, kontak, alamat, dan tautan COMPRO.</CardDescription>
          <CardContent />
          <CardFooter />
        </CardHeader>
        <CardContent>
          {site && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama Situs</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.siteName} onChange={(e) => setSite({ ...site, siteName: e.target.value })} />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Logo URL</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.logoUrl} onChange={(e) => setSite({ ...site, logoUrl: e.target.value })} />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !site) return;
                    setUploadingLogo(true);
                    setSiteUploadStatus(null);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      form.append("bucket", "assets");
                      form.append("folder", "logos");
                      const resp = await fetch("/api/upload", { method: "POST", body: form });
                      const json = await resp.json().catch(() => ({}));
                      if (!resp.ok || !json?.url) {
                        setSiteUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                        return;
                      }
                      // Simpan URL logo baru
                      setSite({ ...site, logoUrl: json.url });
                      setSiteUploadStatus("Logo terupload, membersihkan logo lama...");

                      // Bersihkan semua file lama di folder logos, sisakan file terbaru
                      if (json?.path) {
                        try {
                          const cleanResp = await fetch("/api/storage", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ bucket: "assets", folder: "logos", keepPath: json.path }),
                          });
                          const cleanJson = await cleanResp.json().catch(() => ({}));
                          if (!cleanResp.ok) {
                            setSiteUploadStatus(`Logo terupload, tapi gagal bersihkan: ${cleanJson?.message || "unknown"}`);
                          } else {
                            const removedCount = Array.isArray(cleanJson?.removed) ? cleanJson.removed.length : 0;
                            setSiteUploadStatus(removedCount > 0 ? `Logo terupload, ${removedCount} file lama dihapus` : "Logo terupload");
                          }
                        } catch {
                          setSiteUploadStatus("Logo terupload, gagal membersihkan file lama");
                        }
                      } else {
                        setSiteUploadStatus("Logo terupload");
                      }
                    } finally {
                      setUploadingLogo(false);
                    }
                  }}
                />
                {uploadingLogo && <p className="mt-2 text-xs text-muted-foreground">Mengunggah logo...</p>}
                {siteUploadStatus && <p className="mt-2 text-xs text-muted-foreground">{siteUploadStatus}</p>}
              </div>
              {/* Gambar Hero Home */}
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Hero Image (URL)</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.homeHeroImageUrl ?? ""} onChange={(e) => setSite({ ...site, homeHeroImageUrl: e.target.value })} />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !site) return;
                    setUploadingLogo(true);
                    setSiteUploadStatus(null);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      form.append("bucket", "assets");
                      form.append("folder", "home/hero");
                      const resp = await fetch("/api/upload", { method: "POST", body: form });
                      const json = await resp.json().catch(() => ({}));
                      if (!resp.ok || !json?.url) {
                        setSiteUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                        return;
                      }
                      setSite({ ...site, homeHeroImageUrl: json.url });
                      setSiteUploadStatus("Hero image terupload");
                    } finally {
                      setUploadingLogo(false);
                    }
                  }}
                />
              </div>
              {/* Gambar About Home */}
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">About Image (URL)</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.homeAboutImageUrl ?? ""} onChange={(e) => setSite({ ...site, homeAboutImageUrl: e.target.value })} />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !site) return;
                    setUploadingLogo(true);
                    setSiteUploadStatus(null);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      form.append("bucket", "assets");
                      form.append("folder", "home/about");
                      const resp = await fetch("/api/upload", { method: "POST", body: form });
                      const json = await resp.json().catch(() => ({}));
                      if (!resp.ok || !json?.url) {
                        setSiteUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                        return;
                      }
                      setSite({ ...site, homeAboutImageUrl: json.url });
                      setSiteUploadStatus("About image terupload");
                    } finally {
                      setUploadingLogo(false);
                    }
                  }}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.email} onChange={(e) => setSite({ ...site, email: e.target.value })} />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Telepon</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.phone} onChange={(e) => setSite({ ...site, phone: e.target.value })} />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.whatsapp} onChange={(e) => setSite({ ...site, whatsapp: e.target.value })} />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Alamat</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.address} onChange={(e) => setSite({ ...site, address: e.target.value })} />
              </div>
              <div className="col-span-12">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">COMPRO (PDF URL)</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={site.comproUrl} onChange={(e) => setSite({ ...site, comproUrl: e.target.value })} />
                <input
                  type="file"
                  accept="application/pdf"
                  className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !site) return;
                    setUploadingCompro(true);
                    setComproUploadStatus(null);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      form.append("bucket", "assets");
                      form.append("folder", "docs");
                      const resp = await fetch("/api/upload", { method: "POST", body: form });
                      const json = await resp.json().catch(() => ({}));
                      if (!resp.ok || !json?.url) {
                        setComproUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                        return;
                      }
                      setSite({ ...site, comproUrl: json.url });
                      setComproUploadStatus("COMPRO terupload");
                    } finally {
                      setUploadingCompro(false);
                    }
                  }}
                />
                {uploadingCompro && <p className="mt-2 text-xs text-muted-foreground">Mengunggah COMPRO...</p>}
                {comproUploadStatus && <p className="mt-2 text-xs text-muted-foreground">{comproUploadStatus}</p>}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={saveSite} disabled={savingSite || !site} className="rounded-full">{savingSite ? "Menyimpan..." : "Simpan Identitas"}</Button>
          {siteStatus && <span className="ml-3 text-sm text-muted-foreground">{siteStatus}</span>}
        </CardFooter>
      </Card>

      {/* News Management */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Manajemen Berita</CardTitle>
          <CardDescription>Tambah, hapus, dan simpan daftar berita.</CardDescription>
          <CardContent />
          <CardFooter />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Slug</label>
              <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newPost.slug} onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })} />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Judul</label>
              <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
            </div>
            <div className="col-span-12">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Ringkasan</label>
              <textarea className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" rows={3} value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} />
            </div>
            {/* Konten dipindah ke atas, tepat setelah ringkasan */}
            <div className="col-span-12">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Konten (HTML/Teks)</label>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setNewPost((p) => ({ ...p, content: `${p.content || ""}\n\n<h2>Judul Bagian</h2>\n<p>Paragraf pembuka...</p>\n` }))}>+ Judul & Paragraf</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setNewPost((p) => ({ ...p, content: `${p.content || ""}\n\n<ul>\n  <li>Poin 1</li>\n  <li>Poin 2</li>\n  <li>Poin 3</li>\n</ul>\n` }))}>+ List</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setNewPost((p) => ({ ...p, content: `${p.content || ""}\n\n<img src=\"/news/news-01.svg\" alt=\"Gambar ilustrasi\" className=\"my-4 rounded\" />\n` }))}>+ Gambar</Button>
              </div>
              <textarea
                className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                rows={10}
                value={newPost.content ?? ""}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Tulis konten artikel (HTML atau teks biasa). Contoh: <h2>Judul</h2><p>Paragraf...</p>"
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Tanggal</label>
              <input
                type="date"
                className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                value={(newPost.date || "").split("T")[0]}
                onChange={(e) => {
                  const dateOnly = e.target.value;
                  const timeOnly = (newPost.date || "").split("T")[1]?.slice(0,5) ?? "";
                  const next = timeOnly ? `${dateOnly}T${timeOnly}:00` : dateOnly;
                  setNewPost({ ...newPost, date: next });
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-3">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Waktu</label>
              <input
                type="time"
                className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                value={(newPost.date || "").split("T")[1]?.slice(0,5) ?? ""}
                onChange={(e) => {
                  const timeOnly = e.target.value; // HH:mm
                  const dateOnly = (newPost.date || "").split("T")[0] || "";
                  const next = dateOnly ? `${dateOnly}T${timeOnly}:00` : `${timeOnly}:00`;
                  setNewPost({ ...newPost, date: next });
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Gambar (URL)</label>
              <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newPost.image} onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} />
              <input
                type="file"
                accept="image/*"
                className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploadingNewsImage(true);
                  setNewsImageUploadStatus(null);
                  try {
                    const form = new FormData();
                    form.append("file", file);
                    form.append("bucket", "assets");
                    form.append("folder", "news");
                    const resp = await fetch("/api/upload", { method: "POST", body: form });
                    const json = await resp.json().catch(() => ({}));
                    if (!resp.ok || !json?.url) {
                      setNewsImageUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                      return;
                    }
                    setNewPost((prev) => ({ ...prev, image: json.url }));
                    setNewsImageUploadStatus("Gambar terupload");
                  } finally {
                    setUploadingNewsImage(false);
                  }
                }}
              />
              {uploadingNewsImage && <p className="mt-2 text-xs text-muted-foreground">Mengunggah gambar berita...</p>}
              {newsImageUploadStatus && <p className="mt-2 text-xs text-muted-foreground">{newsImageUploadStatus}</p>}
            </div>
          </div>
          <div className="mt-3">
            <Button variant="outline" size="sm" onClick={addNewsPost} className="rounded-full">Tambah Berita</Button>
          </div>

          

          <div className="mt-6">
            <h4 className="font-semibold">Daftar Berita</h4>
            <ul className="mt-3 space-y-2">
              {news.map((p) => (
                <li key={p.slug} className="flex items-center justify-between rounded-lg border bg-card/30 px-3 py-2">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(p.slug)}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => removeNewsPost(p.slug)}>Hapus</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {editingSlug && editDraft && (
            <div className="mt-6 rounded-lg border bg-card/30 p-4">
              <h5 className="font-semibold">Edit Berita</h5>
              <div className="grid grid-cols-12 gap-4 mt-3">
                <div className="col-span-12 md:col-span-6">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Slug</label>
                  <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={editDraft.slug} onChange={(e) => setEditDraft({ ...(editDraft as NewsPost), slug: e.target.value })} />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Judul</label>
                  <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={editDraft.title} onChange={(e) => setEditDraft({ ...(editDraft as NewsPost), title: e.target.value })} />
                </div>
                <div className="col-span-12">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Ringkasan</label>
                  <textarea className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" rows={3} value={editDraft.excerpt} onChange={(e) => setEditDraft({ ...(editDraft as NewsPost), excerpt: e.target.value })} />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Tanggal</label>
                  <input
                    type="date"
                    className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                    value={(editDraft.date || "").split("T")[0]}
                    onChange={(e) => {
                      const dateOnly = e.target.value;
                      const timeOnly = (editDraft.date || "").split("T")[1]?.slice(0,5) ?? "";
                      const next = timeOnly ? `${dateOnly}T${timeOnly}:00` : dateOnly;
                      setEditDraft({ ...(editDraft as NewsPost), date: next });
                    }}
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Waktu</label>
                  <input type="time" className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={(editDraft.date || "").split("T")[1]?.slice(0,5) ?? ""} onChange={(e) => {
                    const time = e.target.value;
                    const dateOnly = (editDraft.date || "").split("T")[0] || editDraft.date || "";
                    const iso = dateOnly ? `${dateOnly}T${time}:00` : time;
                    setEditDraft({ ...(editDraft as NewsPost), date: iso });
                  }} />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Gambar (URL)</label>
                  <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={editDraft.image} onChange={(e) => setEditDraft({ ...(editDraft as NewsPost), image: e.target.value })} />
                </div>
                {/* Konten dipindah ke atas, tepat setelah ringkasan */}
                <div className="col-span-12">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Konten (HTML/Teks)</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setEditDraft((p) => p ? ({ ...p, content: `${p.content || ""}\n\n<h2>Judul Bagian</h2>\n<p>Paragraf pembuka...</p>\n` }) : p)}>+ Judul & Paragraf</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => setEditDraft((p) => p ? ({ ...p, content: `${p.content || ""}\n\n<ul>\n  <li>Poin 1</li>\n  <li>Poin 2</li>\n  <li>Poin 3</li>\n</ul>\n` }) : p)}>+ List</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => setEditDraft((p) => p ? ({ ...p, content: `${p.content || ""}\n\n<img src=\"/news/news-01.svg\" alt=\"Gambar ilustrasi\" className=\"my-4 rounded\" />\n` }) : p)}>+ Gambar</Button>
                  </div>
                  <textarea
                    className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                    rows={10}
                    value={editDraft.content ?? ""}
                    onChange={(e) => setEditDraft({ ...(editDraft as NewsPost), content: e.target.value })}
                    placeholder="Tulis konten artikel (HTML atau teks biasa). Contoh: <h2>Judul</h2><p>Paragraf...</p>"
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button size="sm" className="rounded-full" onClick={applyEdit}>Simpan Perubahan</Button>
                <Button size="sm" variant="ghost" className="rounded-full" onClick={cancelEdit}>Batal</Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={saveNews} disabled={savingNews} className="rounded-full">{savingNews ? "Menyimpan..." : "Simpan Perubahan Berita"}</Button>
          {newsStatus && <span className="ml-3 text-sm text-muted-foreground">{newsStatus}</span>}
        </CardFooter>
      </Card>

      {/* Gallery Management */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Manajemen Galeri</CardTitle>
          <CardDescription>Tambah item galeri berdasarkan kategori (Diklat/Event/Sertifikasi).</CardDescription>
          <CardContent />
          <CardFooter />
        </CardHeader>
        <CardContent>
          {gallery && (
            <>
              <div className="mb-6 rounded-lg border bg-card/30 p-4">
                <h4 className="font-semibold">Kelola Kategori</h4>
                <div className="grid grid-cols-12 gap-4 mt-3">
                  <div className="col-span-12 md:col-span-5">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama Kategori</label>
                    <input
                      className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                      value={newCategoryName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewCategoryName(val);
                        if (!newCategoryId) setNewCategoryId(slugify(val));
                      }}
                      placeholder="Contoh: Diklat"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">ID/Slug Kategori</label>
                    <input
                      className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                      value={newCategoryId}
                      onChange={(e) => setNewCategoryId(e.target.value)}
                      placeholder="Contoh: diklat"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-2 flex items-end">
                    <Button variant="outline" size="sm" onClick={addGalleryCategory} className="rounded-full w-full">Tambah Kategori</Button>
                  </div>
                </div>
                <div className="mt-4">
                  <ul className="space-y-2">
                    {gallery.categories.map((c) => (
                      <li key={c.id} className="flex items-center justify-between rounded-lg border bg-card/30 px-3 py-2">
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {c.id}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeGalleryCategory(c.id)}>Hapus</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Kategori</label>
                  <select className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                    {gallery.categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Gambar (URL)</label>
                  <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newItem.src} onChange={(e) => setNewItem({ ...newItem, src: e.target.value })} />
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadingGalleryImage(true);
                      setGalleryImageUploadStatus(null);
                      try {
                        const form = new FormData();
                        form.append("file", file);
                        form.append("bucket", "assets");
                        form.append("folder", "gallery");
                        const resp = await fetch("/api/upload", { method: "POST", body: form });
                        const json = await resp.json().catch(() => ({}));
                        if (!resp.ok || !json?.url) {
                          setGalleryImageUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                          return;
                        }
                        setNewItem((prev) => ({ ...prev, src: json.url }));
                        setGalleryImageUploadStatus("Gambar galeri terupload");
                      } finally {
                        setUploadingGalleryImage(false);
                      }
                    }}
                  />
                  {uploadingGalleryImage && <p className="mt-2 text-xs text-muted-foreground">Mengunggah gambar galeri...</p>}
                  {galleryImageUploadStatus && <p className="mt-2 text-xs text-muted-foreground">{galleryImageUploadStatus}</p>}
                </div>
                <div className="col-span-12 md:col-span-4">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Alt</label>
                  <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newItem.alt} onChange={(e) => setNewItem({ ...newItem, alt: e.target.value })} />
                </div>
              </div>
              <div className="mt-3">
                <Button variant="outline" size="sm" onClick={addGalleryItem} className="rounded-full">Tambah Item</Button>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">Daftar Item</h4>
                <ul className="mt-3 space-y-2">
                  {gallery.items.map((it) => (
                    <li key={it.src} className="flex items-center justify-between rounded-lg border bg-card/30 px-3 py-2">
                      <div>
                        <p className="font-medium">{it.alt}</p>
                        <p className="text-xs text-muted-foreground">{it.category} — {it.src}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeGalleryItem(it.src)}>Hapus</Button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={saveGallery} disabled={savingGallery || !gallery} className="rounded-full">{savingGallery ? "Menyimpan..." : "Simpan Perubahan Galeri"}</Button>
          {galleryStatus && <span className="ml-3 text-sm text-muted-foreground">{galleryStatus}</span>}
        </CardFooter>
      </Card>

      {/* About Management */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Manajemen Halaman Tentang</CardTitle>
          <CardDescription>Kelola sambutan direktur, logo, struktur tim, dan rekan/mitra.</CardDescription>
          <CardContent />
          <CardFooter />
        </CardHeader>
        <CardContent>
          {about && (
            <div className="grid grid-cols-12 gap-4">
              {/* Direktur */}
              <div className="col-span-12">
                <h4 className="font-semibold">Sambutan Direktur</h4>
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama Direktur</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={about.directorName} onChange={(e) => setAbout({ ...about, directorName: e.target.value })} />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Jabatan/Title</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={about.directorTitle} onChange={(e) => setAbout({ ...about, directorTitle: e.target.value })} />
              </div>
              <div className="col-span-12">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Sambutan</label>
                <textarea className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" rows={4} value={about.directorMessage} onChange={(e) => setAbout({ ...about, directorMessage: e.target.value })} />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Foto Direktur (URL)</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={about.directorPhotoUrl} onChange={(e) => setAbout({ ...about, directorPhotoUrl: e.target.value })} />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !about) return;
                    setUploadingDirectorPhoto(true);
                    setDirectorUploadStatus(null);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      form.append("bucket", "assets");
                      form.append("folder", "about/director");
                      const resp = await fetch("/api/upload", { method: "POST", body: form });
                      const json = await resp.json().catch(() => ({}));
                      if (!resp.ok || !json?.url) {
                        setDirectorUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                        return;
                      }
                      setAbout({ ...about, directorPhotoUrl: json.url });
                      setDirectorUploadStatus("Foto direktur terupload");
                    } finally {
                      setUploadingDirectorPhoto(false);
                    }
                  }}
                />
                {uploadingDirectorPhoto && <p className="mt-2 text-xs text-muted-foreground">Mengunggah foto direktur...</p>}
                {directorUploadStatus && <p className="mt-2 text-xs text-muted-foreground">{directorUploadStatus}</p>}
              </div>

              {/* Logo About */}
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Logo About (URL)</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={about.aboutLogoUrl} onChange={(e) => setAbout({ ...about, aboutLogoUrl: e.target.value })} />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !about) return;
                    setUploadingAboutLogo(true);
                    setAboutLogoUploadStatus(null);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      form.append("bucket", "assets");
                      form.append("folder", "about/logo");
                      const resp = await fetch("/api/upload", { method: "POST", body: form });
                      const json = await resp.json().catch(() => ({}));
                      if (!resp.ok || !json?.url) {
                        setAboutLogoUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                        return;
                      }
                      setAbout({ ...about, aboutLogoUrl: json.url });
                      setAboutLogoUploadStatus("Logo about terupload");
                    } finally {
                      setUploadingAboutLogo(false);
                    }
                  }}
                />
                {uploadingAboutLogo && <p className="mt-2 text-xs text-muted-foreground">Mengunggah logo about...</p>}
                {aboutLogoUploadStatus && <p className="mt-2 text-xs text-muted-foreground">{aboutLogoUploadStatus}</p>}
              </div>

              {/* Struktur Tim */}
              <div className="col-span-12 mt-4">
                <h4 className="font-semibold">Struktur Tim</h4>
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Peran</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} />
              </div>
              <div className="col-span-12 md:col-span-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Gambar (URL)</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newMember.imageUrl} onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })} />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingMemberImage(true);
                    setMemberImageUploadStatus(null);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      form.append("bucket", "assets");
                      form.append("folder", "about/team");
                      const resp = await fetch("/api/upload", { method: "POST", body: form });
                      const json = await resp.json().catch(() => ({}));
                      if (!resp.ok || !json?.url) {
                        setMemberImageUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                        return;
                      }
                      setNewMember((prev) => ({ ...prev, imageUrl: json.url }));
                      setMemberImageUploadStatus("Gambar anggota terupload");
                    } finally {
                      setUploadingMemberImage(false);
                    }
                  }}
                />
                {uploadingMemberImage && <p className="mt-2 text-xs text-muted-foreground">Mengunggah gambar anggota...</p>}
                {memberImageUploadStatus && <p className="mt-2 text-xs text-muted-foreground">{memberImageUploadStatus}</p>}
              </div>
              <div className="col-span-12">
                <Button variant="outline" size="sm" onClick={addTeamMember} className="rounded-full">Tambah Anggota</Button>
              </div>
              <div className="col-span-12">
                <ul className="mt-3 space-y-2">
                  {about.team.map((m, idx) => (
                    <li key={`${m.name}-${idx}`} className="flex items-center justify-between rounded-lg border bg-card/30 px-3 py-2">
                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.role} — {m.imageUrl}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeTeamMember(idx)}>Hapus</Button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rekan & Mitra */}
              <div className="col-span-12 mt-6">
                <h4 className="font-semibold">Rekan & Mitra</h4>
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Logo (URL)</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newPartnerLogo} onChange={(e) => setNewPartnerLogo(e.target.value)} />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingPartnerLogo(true);
                    setPartnerUploadStatus(null);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      form.append("bucket", "assets");
                      form.append("folder", "about/partners");
                      const resp = await fetch("/api/upload", { method: "POST", body: form });
                      const json = await resp.json().catch(() => ({}));
                      if (!resp.ok || !json?.url) {
                        setPartnerUploadStatus(`Gagal upload${json?.message ? ": " + json.message : ""}`);
                        return;
                      }
                      setNewPartnerLogo(json.url);
                      setPartnerUploadStatus("Logo mitra terupload");
                    } finally {
                      setUploadingPartnerLogo(false);
                    }
                  }}
                />
                {uploadingPartnerLogo && <p className="mt-2 text-xs text-muted-foreground">Mengunggah logo mitra...</p>}
                {partnerUploadStatus && <p className="mt-2 text-xs text-muted-foreground">{partnerUploadStatus}</p>}
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama Mitra</label>
                <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={newPartnerName} onChange={(e) => setNewPartnerName(e.target.value)} />
                <div className="mt-3">
                  <Button variant="outline" size="sm" onClick={addPartner} className="rounded-full">Tambah Mitra</Button>
                </div>
              </div>
              <div className="col-span-12">
                <ul className="mt-3 space-y-2">
                  {about.partners.map((p, idx) => (
                    <li key={`${p.name || p.logoUrl || idx}`} className="flex items-center justify-between rounded-lg border bg-card/30 px-3 py-2">
                      <div className="flex-1 md:flex md:items-center md:gap-4">
                        <div className="md:flex-1">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama</label>
                          <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={p.name || ""} onChange={(e) => updatePartnerField(idx, "name", e.target.value)} placeholder="Nama mitra" />
                        </div>
                        <div className="md:flex-1 mt-3 md:mt-0">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground">Logo (URL)</label>
                          <input className="mt-2 w-full rounded-lg border bg-card/30 px-3 py-2 text-sm" value={p.logoUrl || ""} onChange={(e) => updatePartnerField(idx, "logoUrl", e.target.value)} placeholder="Tautan logo opsional" />
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removePartner(idx)}>Hapus</Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={saveAbout} disabled={savingAbout || !about} className="rounded-full">{savingAbout ? "Menyimpan..." : "Simpan Perubahan About"}</Button>
          {aboutStatus && <span className="ml-3 text-sm text-muted-foreground">{aboutStatus}</span>}
        </CardFooter>
      </Card>
    </main>
  );
}