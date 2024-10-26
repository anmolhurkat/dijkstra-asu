export default function Home() {
  return (
    <main className="flex h-screen text-white">
      <div className="w-1/3 p-4 overflow-y-auto border-r border-gray-800">
        Left Panel
      </div>
      <div className="w-2/3 bg-[#111111] p-4">
        <div className="w-full h-full bg-[#1a1a1a] rounded-lg flex">Map</div>
      </div>
    </main>
  );
}
