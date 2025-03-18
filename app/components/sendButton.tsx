export default function SendButton({
    input,
    submitForm,
}: {
    input: string;
    submitForm: () => void;
}) {
    return (
        <button className=' flex items-center justify-center bg-white w-10 h-10  rounded-2xl p-2 focus:ring-4 ring-white '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
            </svg>
        </button>
    );
}