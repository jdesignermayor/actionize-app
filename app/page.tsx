import Image from "next/image";
import { mistral } from '@ai-sdk/mistral';
import Nav from "./components/nav";

export default function Home() {
  return (
    <>
    <Nav />
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center pt-[25em]">
        <h1 className=" font-bold text-4xl">What do you want to ship ?</h1>
        <p className=" text-xl">Your AI Assistant, for Life-Work Balance</p>
        <div className="flex flex-col items-center justify-center">
          <textarea name="prompt" className=" text-2xl rounded-lg bg-gray-900 p-3" id="prompt" rows={4} cols={50} placeholder="Enter your prompt here..."></textarea>
          <button className="absolute opacity-5  transform-none flex justify-center items-center top-[18px] right-[22px] p-1 bg-accent-500 hover:brightness-94 color-white rounded-md w-[34px] h-[34px] transition-theme disabled:cursor-not-allowed">
            <div className="text-lg">
              <div className="i-ph:arrow-right">
              </div>
            </div>
          </button>
        </div>
        <p> Blank templates </p>
        <div className="flex flex-row items-center justify-center">
          <div className=" flex flex-col rounded-lg bg-gray-700 ">badge 1</div>
          <div className=" flex flex-col rounded-lg bg-gray-700 ">badge 1</div>
          <div className=" flex flex-col rounded-lg bg-gray-700 ">badge 1</div>
          <div className=" flex flex-col rounded-lg bg-gray-700 ">badge 1</div>
        </div>
      </div>
      <div>
        ....
      </div>
    </div>
    </>
  );
}
