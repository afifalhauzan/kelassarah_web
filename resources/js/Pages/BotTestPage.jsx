import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BotTestButton from '@/Components/ui/BotTestButton';

export default function BotTestPage({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bot Test</h2>}
        >
            <Head title="Bot Test" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Bot Test Page</h1>
                                <p className="text-gray-600">Test the chatbot functionality with course ID 1</p>
                            </div>

                            <div className="flex justify-center">
                                <BotTestButton />
                            </div>

                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">How it works:</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Enter a message in the textarea</li>
                                    <li>Click "Send Message" to send it to the chatbot API</li>
                                    <li>The message will be sent to <code className="bg-gray-200 px-1 rounded">POST /chat/1</code></li>
                                    <li>Course ID is set to 1 for testing purposes</li>
                                    <li>The API will process the message and queue an OpenAI response</li>
                                    <li>The component polls <code className="bg-gray-200 px-1 rounded">GET /chat/1/last</code> every 1 second to check for new messages</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}