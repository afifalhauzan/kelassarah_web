export default function SearchInput({
    value,
    onChange,
    placeholder = "Cari...",
}) {
    return (
        <div className="relative w-full md:w-72">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={onChange}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </div>
    );
}
