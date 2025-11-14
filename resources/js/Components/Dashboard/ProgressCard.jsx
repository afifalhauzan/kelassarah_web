import { Link } from '@inertiajs/react';

export default function ProgressCard({ title, progress, lastCourseUrl = '#' }) {
    return (
        <div className="relative bg-blue-500 rounded-2xl p-6 md:p-8 text-white overflow-hidden">
            <span className="absolute top-0 left-6 bg-blue-600 text-blue-100 text-xs font-semibold px-3 py-1 rounded-b-lg">
                Terakhir Dilihat
            </span>

            <div className="absolute -right-4 -top-4 w-24 h-24 text-blue-400 opacity-50">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3.5c.6 0 1.1.4 1.2.9l.4 1.9c.1.4.4.7.8.8l1.9.4c.5.1.9.6.9 1.2s-.4 1.1-.9 1.2l-1.9.4c-.4.1-.7.4-.8.8l-.4 1.9c-.1.5-.6.9-1.2.9s-1.1-.4-1.2-.9l-.4-1.9c-.1-.4-.4-.7-.8-.8l-1.9-.4c-.5-.1-.9-.6-.9-1.2s.4-1.1.9-1.2l1.9-.4c.4-.1.7-.4.8-.8l.4-1.9c.1-.5.6-.9 1.2-.9zM15 9.5c.3 0 .5.2.6.5l.2 1c.1.2.3.4.5.5l1 .2c.3.1.5.3.5.6s-.2.5-.5.6l-1 .2c-.2.1-.4.3-.5.5l-.2 1c-.1.3-.3.5-.6.5s-.5-.2-.6-.5l-.2-1c-.1-.2-.3-.4-.5-.5l-1-.2c-.3-.1-.5-.3-.5-.6s.2-.5.5.6l1-.2c.2-.1.4-.3.5-.5l.2-1c.1-.3.3-.5.6-.5zM5 12.5c.3 0 .5.2.6.5l.2 1c.1.2.3.4.5.5l1 .2c.3.1.5.3.5.6s-.2.5-.5.6l-1 .2c-.2.1-.4.3-.5.5l-.2 1c-.1.3-.3.5-.6.5s-.5-.2-.6-.5l-.2-1c-.1-.2-.3-.4-.5-.5l-1-.2c-.3-.1-.5-.3-.5-.6s.2-.5.5.6l1-.2c.2-.1.4-.3.5-.5l.2-1c.1-.3.3-.5.6-.5z"></path>
                </svg>
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 pr-10">{title}</h3>

                <div className="w-full bg-blue-400 rounded-full h-2.5 mb-2">
                    <div 
                        className="bg-white rounded-full h-2.5" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-right text-blue-100 text-sm font-medium mb-6">
                    {progress}%
                </div>

                <Link 
                    href={lastCourseUrl}
                    className="inline-flex items-center bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-100 transition"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                    Lanjutkan
                </Link>
            </div>
        </div>
    );
}
