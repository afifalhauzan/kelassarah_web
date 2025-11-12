import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useChat } from '@/Context/ChatContext';

export default function ChatTestPage({ auth }) {
    const { chatContextCourseld, setChatContextCourseld, history, chatStatus, isPolling } = useChat();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Integrated Chat Test</h2>}
        >
            <Head title="Chat Test" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Integrated Chat Test</h1>
                                <p className="text-gray-600">Test the integrated ChatContext with real API calls</p>
                            </div>

                            {/* Course ID Controls */}
                            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Chat Configuration</h3>
                                <div className="flex items-center space-x-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Course ID:
                                        <select 
                                            value={chatContextCourseld} 
                                            onChange={(e) => setChatContextCourseld(parseInt(e.target.value))}
                                            className="mt-1 ml-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value={1}>Course 1</option>
                                            <option value={2}>Course 2</option>
                                            <option value={3}>Course 3</option>
                                        </select>
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <span className={`w-3 h-3 rounded-full ${isPolling ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
                                        <span className="text-sm text-gray-600">
                                            {isPolling ? 'Polling Active' : 'Polling Inactive'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Status: <span className="font-medium">{chatStatus}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Messages: <span className="font-medium">{history.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">How to test:</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li><strong>Open Chat Widget:</strong> Click the chat bubble in the bottom-right corner</li>
                                    <li><strong>Send Messages:</strong> Type messages in the chat input</li>
                                    <li><strong>API Integration:</strong> Messages are sent to <code className="bg-gray-200 px-1 rounded">POST /chat/{chatContextCourseld}</code></li>
                                    <li><strong>Real-time Polling:</strong> System polls <code className="bg-gray-200 px-1 rounded">GET /chat/{chatContextCourseld}/last</code> every 2 seconds</li>
                                    <li><strong>Message History:</strong> All messages are loaded from <code className="bg-gray-200 px-1 rounded">GET /chat/{chatContextCourseld}</code></li>
                                    <li><strong>Change Course:</strong> Use the dropdown above to switch between different courses</li>
                                    <li><strong>Reset Chat:</strong> Use the reset button in the chat header to clear history</li>
                                </ul>
                            </div>

                            {/* Current State Display */}
                            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Current Chat State:</h3>
                                <div className="text-sm font-mono bg-white p-3 rounded border">
                                    <pre className="whitespace-pre-wrap">
                                        {JSON.stringify({
                                            courseId: chatContextCourseld,
                                            status: chatStatus,
                                            isPolling,
                                            messageCount: history.length,
                                            lastMessage: history.length > 0 ? history[history.length - 1] : null
                                        }, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}