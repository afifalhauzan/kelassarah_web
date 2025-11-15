import { Head } from '@inertiajs/react';
import Navbar from '@/Components/ui/Navbar';
import Footer from '@/Components/ui/Footer';
import { useState, useEffect } from 'react';

export default function Credits({ auth }) {
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        // Fetch credits data
        fetch('/data/credits_data.json')
            .then(response => response.json())
            .then(data => setCredits(data))
            .catch(error => console.error('Error loading credits:', error));
    }, []);

    // Helper function to format contact display text
    const getContactDisplayText = (contact) => {
        if (contact.includes('linkedin')) {
            return 'LinkedIn';
        } else if (contact.includes('instagram')) {
            return 'Instagram';
        } else {
            return contact.replace('mailto:', '').replace('https://', '');
        }
    };

    return (
        <>
            <Head title="Tim Kami - Kak Sarah" />
            
            <div className="bg-gray-50 text-gray-800 selection:bg-indigo-500 selection:text-white mt-10">
                <Navbar auth={auth} />
                
                <main className="pt-24 pb-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        {/* Title */}
                        <div className="text-center mb-16">
                            <h1 className="font-lilita text-4xl md:text-4xl lg:text-5xl text-blue-400 mb-8 tracking-relaxed">
                                Tim Kami
                            </h1>
                        </div>

                        {/* Dev Team Section */}
                        <div className="mb-16">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
                                Development Team
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {credits.filter(person => person.type === 'dev').map((person, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-xl p-6 box-shadow-default hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="flex justify-between items-start">
                                            {/* Left side - Name and Role */}
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {person.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {person.role}
                                                </p>
                                            </div>
                                            
                                            {/* Right side - Contact */}
                                            <div className="text-right">
                                                <a 
                                                    href={person.contact} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-500 hover:text-blue-700 break-all transition-colors duration-200"
                                                >
                                                    {getContactDisplayText(person.contact)}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Team Section */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
                                Content Team
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {credits.filter(person => person.type === 'content').map((person, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-xl p-6 box-shadow-default hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="flex justify-between items-start">
                                            {/* Left side - Name and Role */}
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {person.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {person.role}
                                                </p>
                                            </div>
                                            
                                            {/* Right side - Contact */}
                                            <div className="text-right">
                                                <a 
                                                    href={person.contact} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-500 hover:text-blue-700 break-all transition-colors duration-200"
                                                >
                                                    {getContactDisplayText(person.contact)}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}