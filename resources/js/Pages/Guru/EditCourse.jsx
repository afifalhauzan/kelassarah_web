import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from 'react';

export default function EditCourse({ course }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        order: '',
        is_published: false,
        knowledge_prompt: '',
        welcome_message: '',
        thumbnail_url: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                order: course.order || '',
                is_published: course.is_published || false,
                knowledge_prompt: course.knowledge_prompt || '',
                welcome_message: course.welcome_message || '',
                thumbnail_url: course.thumbnail_url || ''
            });
        }
    }, [course]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.put(`/course/${course.id}`, formData, {
            onSuccess: () => {
                setIsSubmitting(false);
                setMessage('Course updated successfully!');
                // Redirect back to course list after 2 seconds
                setTimeout(() => {
                    router.get('/course');
                }, 2000);
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setMessage('Error updating course. Please check the form.');
            }
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Course" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Edit Course</h1>
                                    <p className="text-sm text-gray-500">Update course information</p>
                                </div>
                                <Link
                                    href="/course"
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Course List
                                </Link>
                            </div>

                            {/* Success/Error Message */}
                            {message && (
                                <div className={`mb-4 px-4 py-3 rounded ${
                                    message.includes('successfully') 
                                        ? 'bg-green-100 border border-green-400 text-green-700'
                                        : 'bg-red-100 border border-red-400 text-red-700'
                                }`}>
                                    {message}
                                </div>
                            )}

                            {/* Edit Form */}
                            <div className="bg-white border rounded-lg p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Course Title *
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter course title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Order *
                                            </label>
                                            <input
                                                type="number"
                                                name="order"
                                                value={formData.order}
                                                onChange={handleInputChange}
                                                required
                                                min="1"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter course order"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter course description"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Thumbnail URL
                                        </label>
                                        <input
                                            type="text"
                                            name="thumbnail_url"
                                            value={formData.thumbnail_url}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter thumbnail URL"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Knowledge Prompt
                                        </label>
                                        <textarea
                                            name="knowledge_prompt"
                                            value={formData.knowledge_prompt}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter knowledge prompt for AI"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Welcome Message
                                        </label>
                                        <textarea
                                            name="welcome_message"
                                            value={formData.welcome_message}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter welcome message for students"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="is_published"
                                            checked={formData.is_published}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label className="ml-2 text-sm font-medium text-gray-700">
                                            Publish this course (make it visible to students)
                                        </label>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmitting ? 'Updating...' : 'Update Course'}
                                        </button>
                                        <Link
                                            href="/course"
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}