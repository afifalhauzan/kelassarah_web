import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Courses() {
    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xs sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Courses Page
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
