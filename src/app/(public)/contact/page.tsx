import ContactInfo from "@/components/blocks/contact/ContactInfo";
import ContactForm from "@/components/blocks/contact/ContactForm";
import ContactMap from "@/components/blocks/contact/ContactMap";

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 py-10 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Kontak</h1>
        <p className="mt-2 text-zinc-300">Kami siap membantu kebutuhan keamanan Anda, dari konsultasi hingga implementasi.</p>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 pb-12 lg:pb-16">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 lg:col-span-8">
            <ContactForm />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <ContactInfo />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 md:px-8 xl:px-12 pb-16">
        <ContactMap />
      </section>
    </main>
  );
}