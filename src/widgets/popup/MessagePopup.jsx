export default function MessagePopup({ message }) {
    if (!message) return null;

    return (
        <div className="
        fixed top-6 right-6 z-[100]
        bg-[#0f172a]
        border border-green-500
        px-8 py-4
        rounded-2xl
        text-white
        shadow-2xl
        animate-pulse
        ">
            {message}
        </div>
    );
}