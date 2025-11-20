import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoJsPlayer({ videoUrl, subtitleUrl, title }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    console.log('VideoJsPlayer props:', { videoUrl, subtitleUrl, title });

    useEffect(() => {
        if (!isMounted || !videoRef.current) return;

        // Initialize Video.js player
        const videoElement = videoRef.current;
        
        if (!playerRef.current) {
            const videoSource = getVideoSource(videoUrl);
            
            const videoJsOptions = {
                controls: true,
                responsive: true,
                fluid: true,
                playbackRates: [0.5, 1, 1.25, 1.5, 2],
                sources: [videoSource],
                html5: {
                    vhs: {
                        overrideNative: !videojs.browser.IS_SAFARI
                    },
                    nativeVideoTracks: false,
                    nativeAudioTracks: false,
                    nativeTextTracks: false
                },
                techOrder: ['html5'],
                preload: 'metadata'
            };

            playerRef.current = videojs(videoElement, videoJsOptions, function onPlayerReady() {
                console.log('Video.js player is ready');
                
                // Add custom styling
                this.addClass('vjs-custom-skin');
                
                // Add subtitle track after player is ready
                if (subtitleUrl) {
                    console.log('Adding subtitle track:', subtitleUrl);
                    this.addRemoteTextTrack({
                        kind: 'subtitles',
                        src: subtitleUrl,
                        srclang: 'id',
                        label: 'Indonesian',
                        default: true
                    }, false);
                }
            });

            // Error handling
            playerRef.current.on('error', function() {
                const error = playerRef.current.error();
                console.error('Video.js error:', error);
                
                // If HTTPS fails, try with native video element as fallback
                if (error.code === 4 && videoUrl.startsWith('https://')) {
                    console.log('HTTPS failed, trying with native video fallback');
                    // You could implement a fallback here
                }
            });

            // Ready event
            playerRef.current.ready(function() {
                console.log('Video.js player ready with source:', videoUrl);
            });

            // Add keyboard shortcuts
            playerRef.current.on('keydown', function(event) {
                // Space bar for play/pause
                if (event.which === 32) {
                    event.preventDefault();
                    if (playerRef.current.paused()) {
                        playerRef.current.play();
                    } else {
                        playerRef.current.pause();
                    }
                }
                // Arrow keys for seeking
                else if (event.which === 37) { // Left arrow
                    event.preventDefault();
                    playerRef.current.currentTime(playerRef.current.currentTime() - 10);
                } else if (event.which === 39) { // Right arrow
                    event.preventDefault();
                    playerRef.current.currentTime(playerRef.current.currentTime() + 10);
                }
            });
        } else {
            // Update source if videoUrl changes
            const videoSource = getVideoSource(videoUrl);
            playerRef.current.src(videoSource);
        }

        return () => {
            if (playerRef.current && !playerRef.current.isDisposed()) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [isMounted, videoUrl, subtitleUrl]);

    // Helper function to determine video type and fix URL
    const getVideoSource = (url) => {
        // Convert HTTP to HTTPS for compatibility
        let fixedUrl = url;
        // if (url.startsWith('http://') && !url.includes('localhost')) {
        //     fixedUrl = url.replace('http://', 'https://');
        // }

        // Determine video type
        let type = 'video/mp4'; // default
        if (fixedUrl.includes('youtube.com') || fixedUrl.includes('youtu.be')) {
            type = 'video/youtube';
        } else if (fixedUrl.includes('.mp4')) {
            type = 'video/mp4';
        } else if (fixedUrl.includes('.webm')) {
            type = 'video/webm';
        } else if (fixedUrl.includes('.ogg')) {
            type = 'video/ogg';
        }

        return { src: fixedUrl, type };
    };

    if (!isMounted) {
        return (
            <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <span className="text-gray-500 text-sm">Memuat Video...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
            <div data-vjs-player>
                <video
                    ref={videoRef}
                    className="video-js vjs-default-skin w-full h-full"
                    playsInline
                    data-setup="{}"
                    aria-label={title || "Video Player"}
                    crossOrigin="anonymous"
                >
                    {subtitleUrl && (
                        <track
                            kind="subtitles"
                            src={subtitleUrl}
                            srcLang="id"
                            label="Indonesian"
                            default
                        />
                    )}
                    <p className="vjs-no-js text-white p-4 text-center">
                        To view this video please enable JavaScript, and consider upgrading to a web browser that
                        <a href="https://videojs.com/html5-video-support/" target="_blank" rel="noopener">
                            supports HTML5 video
                        </a>.
                    </p>
                </video>
            </div>
        </div>
    );
}