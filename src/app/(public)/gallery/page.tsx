import GalleryGrid from "@/components/blocks/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <main>
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
        <h1 className="text-2xl font-bold tracking-tight">Galeri</h1>
        <p className="mt-2 text-muted-foreground">Dokumentasi kegiatan dan operasional.</p>
      </div>
      <GalleryGrid />
    </main>
  );
}