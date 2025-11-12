import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function BotTestButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [pollLogs, setPollLogs] = useState([]);

    // Poll the last message endpoint every 1 second
    useEffect(() => {
        const pollLastMessage = async () => {
            try {
                const response = await fetch('/chat/1/last', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                    }
                });

                const data = await response.json();
                const timestamp = new Date().toLocaleTimeString();
                
                if (response.ok) {
                    setLastMessage(data);
                    setPollLogs(prev => [...prev, {
                        timestamp,
                        status: 'success',
                        data: data
                    }].slice(-10)); // Keep only last 10 logs
                } else {
                    setPollLogs(prev => [...prev, {
                        timestamp,
                        status: 'error',
                        data: data
                    }].slice(-10));
                }
            } catch (error) {
                const timestamp = new Date().toLocaleTimeString();
                setPollLogs(prev => [...prev, {
                    timestamp,
                    status: 'error',
                    data: { error: error.message }
                }].slice(-10));
            }
        };

        // Poll immediately and then every 1 second
        pollLastMessage();
        const interval = setInterval(pollLastMessage, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = () => {
        if (!message.trim()) {
            alert('Please enter a message');
            return;
        }

        setIsLoading(true);
        setResponse(null);

        // Make POST request to the chat endpoint with course_id = 1
        router.post('/chat/1', {
            content: message,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                console.log('Message sent successfully:', page.props);
                setResponse('Message sent successfully! Status: pending');
                setMessage(''); // Clear the input
            },
            onError: (errors) => {
                console.error('Error sending message:', errors);
                setResponse('Error: ' + JSON.stringify(errors));
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Bot Test</h3>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                    />
                </div>

                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !message.trim()}
                    className={`w-full px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                        isLoading || !message.trim()
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </div>
                    ) : (
                        'Send Message'
                    )}
                </button>

                {response && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <h4 className="text-sm font-medium text-gray-800 mb-1">Response:</h4>
                        <p className="text-sm text-gray-600">{response}</p>
                    </div>
                )}

                {/* Current Last Message */}
                {lastMessage && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <h4 className="text-sm font-medium text-blue-800 mb-1">Current Last Message:</h4>
                        <div className="text-xs text-blue-600 font-mono">
                            <pre className="whitespace-pre-wrap">{JSON.stringify(lastMessage, null, 2)}</pre>
                        </div>
                    </div>
                )}

                {/* Polling Logs */}
                <div className="p-3 bg-gray-900 border border-gray-700 rounded-md">
                    <h4 className="text-sm font-medium text-white mb-2">Polling Logs (Updates every 1s):</h4>
                    <div className="max-h-40 overflow-y-auto">
                        {pollLogs.length === 0 ? (
                            <p className="text-xs text-gray-400">No logs yet...</p>
                        ) : (
                            <div className="space-y-1">
                                {pollLogs.map((log, index) => (
                                    <div key={index} className="text-xs">
                                        <span className="text-gray-400">[{log.timestamp}]</span>
                                        <span className={`ml-2 ${log.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                            {log.status.toUpperCase()}
                                        </span>
                                        <div className="text-gray-300 ml-4 mt-1">
                                            <pre className="whitespace-pre-wrap font-mono">
                                                {JSON.stringify(log.data, null, 2)}
                                            </pre>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
