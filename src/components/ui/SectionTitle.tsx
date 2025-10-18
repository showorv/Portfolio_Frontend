export default function SectionTitle({ title }: { title: string }) {
    return (
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        {title}
      </h2>
    );
  }
  