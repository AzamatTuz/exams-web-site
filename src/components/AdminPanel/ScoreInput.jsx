export default function ScoreInput({ value, onChange }) {
    return (
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 text-center bg-black border border-gray-600 rounded text-white"
        />
    );
}