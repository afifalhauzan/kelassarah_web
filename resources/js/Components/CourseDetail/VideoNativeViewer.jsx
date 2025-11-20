import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function VideoNativeViewer({ videoUrl, subtitleUrl }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Memuat Player...</span>
            </div>
        );
    }

    return (
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
            <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls={true} 
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 },
                    },
                    file: {
                        attributes: {
                            controlsList: "nodownload",
                        },
                    },
                }}
            />
        </div>
    );
}
