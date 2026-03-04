import GistDemo from '../components/GistDemo';

export default function GistTestPage() {
  const gistId = "91fed5757e310bda0ac3fc83dc34b7b2"; // Windows 95 Simulation Gist ID

  return (
    <div className="min-h-screen p-8 bg-black text-white flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">Gist Demo Test</h1>
      <p className="text-gray-400">Testing the Windows 95 Gist embedding</p>
      <div className="w-full max-w-4xl">
        <GistDemo gistId={gistId} title="Windows 95 Live Demo" />
      </div>
    </div>
  );
}
