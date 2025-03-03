export default function Ship({ text}: { text: string }) {
  return (
    <div className=" flex flex-col rounded-full text-sm border border-[#2b2b2b] px-2 py-1 cursor-pointer transition hover:bg-[#272727]">{text}</div>
  );
}