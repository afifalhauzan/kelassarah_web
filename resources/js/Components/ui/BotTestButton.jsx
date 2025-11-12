import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function BotTestButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);

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
            </div>
        </div>
    );
}
