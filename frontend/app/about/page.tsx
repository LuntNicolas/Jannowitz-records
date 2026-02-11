import React from 'react'

const Page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8 p-10  rounded-2xl shadow-xl">

                {/* Icon Bereich */}
                <div className="flex justify-center space-x-4 animate-bounce">
                    <span className="text-5xl">🚧</span>
                    <span className="text-5xl">🏗️</span>
                    <span className="text-5xl">👷</span>
                </div>

                {/* Text Bereich */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-amber-100 tracking-tight">
                        Still under Construction
                    </h1>
                </div>

                {/* Fortschrittsbalken (nur Deko) */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-8">
                    <div className="bg-yellow-400 h-2.5 rounded-full w-[65%] animate-pulse"></div>
                </div>

                {/* Button zurück zur Homepage */}
                <div className="pt-6">
                    <a
                        href="/releases" // Oder dein entsprechender Link
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30"
                    >
                        <span className="mr-2">🚀</span>
                        Check our latest releases
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Page
