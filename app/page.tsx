import Nav from "./components/nav";
import Chatbot from "./components/chatbot";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center">
        <div>
          <div>
            <Chatbot />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button className="absolute opacity-5  transform-none flex justify-center items-center top-[18px] right-[22px] p-1 bg-accent-500 hover:brightness-94 color-white rounded-md w-[34px] h-[34px] transition-theme disabled:cursor-not-allowed">
              <div className="text-lg">
                <div className="i-ph:arrow-right">
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
