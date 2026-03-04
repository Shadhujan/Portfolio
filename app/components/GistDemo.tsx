interface GistDemoProps {
  gistId: string;
  title?: string;
}

export default function GistDemo({ gistId, title = "Live Demo" }: GistDemoProps) {
  return (
    <div className="w-full aspect-video rounded-xl border border-gray-700 overflow-hidden shadow-2xl bg-gray-900">
      <iframe
        src={`https://gisthost.github.io/?${gistId}`}
        title={title}
        className="w-full h-full"
        loading="lazy" // Good for performance!
        allowFullScreen
      />
    </div>
  );
}
