import SearchBar from "./(components)/searchBar";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-fixed bg-cover bg-[25%]" style={{ backgroundImage: "url(/background.jpg)" }}>
      <div className="flex flex-col items-center justify-center h-1/2 space-y-8">
        <h1 className={`font-jura text-[3.5em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-barre`}>Gwada Resto</h1>
        <p className="text-lg text-white">Welcome to Gwada Resto</p>
      </div>
      <div className="w-screen h-1/2 bg-black/70 rounded-t-3xl flex flex-col items-center">
        <SearchBar />
      </div>
    </div>
  );


}
