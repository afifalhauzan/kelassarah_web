import React, { useRef, useEffect, useState, useCallback, Component } from 'react';
import Webcam from 'react-webcam';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Head, Link } from '@inertiajs/react';

// Error Boundary Component
class CatchError extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-6">
                    <div className="bg-red-900/50 p-8 rounded-xl border border-red-500 max-w-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Terjadi Kesalahan Game</h2>
                        <p className="mb-4 text-gray-300">Maaf, terjadi error tak terduga.</p>
                        <pre className="bg-black/50 p-3 rounded text-left text-xs mb-6 overflow-auto max-h-40">
                            {this.state.error?.toString()}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-white text-red-900 px-6 py-2 rounded-lg font-bold"
                        >
                            Muat Ulang
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function WebcamGameContent({ course }) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('intro'); // intro, playing, quiz, finished
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [target, setTarget] = useState({ x: 0.5, y: 0.5, size: 0.15, visible: true }); // normalized coordinates
    const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'

    // Parse game data safely
    const gameData = course.game_data || { questions: [] };
    const questions = Array.isArray(gameData.questions) ? gameData.questions : [];

    // --- Hand Tracking Setup ---
    useEffect(() => {
        let camera = null;
        let hands = null;

        try {
            hands = new Hands({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                }
            });

            hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            hands.onResults(onResults);

            if (webcamRef.current && webcamRef.current.video) {
                camera = new Camera(webcamRef.current.video, {
                    onFrame: async () => {
                        if (webcamRef.current?.video && hands) {
                            try {
                                await hands.send({ image: webcamRef.current.video });
                            } catch (e) {
                                console.error("MediaPipe Send Error:", e);
                            }
                        }
                    },
                    width: 640,
                    height: 480
                });
                camera.start();
            }
        } catch (e) {
            console.error("Camera/MediaPipe Init Error:", e);
        }

        return () => {
            if (camera) camera.stop();
            if (hands) hands.close();
        };
    }, [gameState]); // Removed onResults from dependency array to prevent re-initialization issues

    // --- Image Asset Setup ---
    const targetImageRef = useRef(null);
    useEffect(() => {
        const img = new Image();
        img.src = '/images/target.png';
        img.onload = () => {
            console.log("Target Loaded");
            targetImageRef.current = img;
        };
    }, []);

    // --- Render Loop (Updated) ---
    const getDynamicTargetPos = (baseTarget, videoWidth, videoHeight) => {
        if (!baseTarget.visible) return null;

        const time = Date.now() / 1000; // Seconds
        // Movement Pattern: Figure-8ish
        const offsetX = Math.sin(time * 1.5) * 0.15; // Amplitude 0.15 (normalized)
        const offsetY = Math.cos(time * 2.0) * 0.1;  // Amplitude 0.1

        const x = (baseTarget.x + offsetX) * videoWidth;
        const y = (baseTarget.y + offsetY) * videoHeight;

        // Clamp to screen bounds (approx)
        return {
            x: Math.max(50, Math.min(videoWidth - 50, x)),
            y: Math.max(50, Math.min(videoHeight - 50, y))
        };
    };

    const onResults = useCallback((results) => {
        if (!canvasRef.current || !webcamRef.current?.video) return;

        try {
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const ctx = canvasRef.current.getContext('2d');
            ctx.save();
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            // Mirror the canvas context to match the mirrored video
            ctx.translate(canvasRef.current.width, 0);
            ctx.scale(-1, 1);

            // Calculate Dynamic Target Position ONCE per frame
            const dynPos = getDynamicTargetPos(target, videoWidth, videoHeight);

            // Draw Hands & Aim Cursor
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
                    // 1. Draw Skeleton (Thicker for visibility)
                    drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
                    drawLandmarks(ctx, landmarks, { color: '#FF0000', lineWidth: 2, radius: 3 });

                    // 2. Draw Aim Cursor (Crosshair) at Index Tip (Landmark 8)
                    const indexTip = landmarks[8];
                    const tipX = indexTip.x * canvasRef.current.width;
                    const tipY = indexTip.y * canvasRef.current.height;

                    ctx.save();
                    ctx.strokeStyle = '#00FFFF'; // Cyan for high contrast
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    // Crosshair
                    ctx.moveTo(tipX - 15, tipY);
                    ctx.lineTo(tipX + 15, tipY);
                    ctx.moveTo(tipX, tipY - 15);
                    ctx.lineTo(tipX, tipY + 15);
                    // Circle
                    ctx.arc(tipX, tipY, 20, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.restore();

                    if (gameState === 'playing' && dynPos) {
                        checkGestureAndTarget(landmarks, dynPos);
                    }
                }
            }

            // Draw Target (if playing) - INDEPENDENT of Hand Detection
            if (gameState === 'playing' && dynPos) {
                const cx = dynPos.x;
                const cy = dynPos.y;

                const pulse = 1 + Math.sin(Date.now() / 200) * 0.1;
                const size = target.size * videoWidth * pulse;

                if (targetImageRef.current) {
                    // Draw Gold Glow
                    ctx.save();
                    ctx.globalAlpha = 1.0; // CRITICAL: Ensure fully opaque
                    ctx.shadowColor = '#FFD700';
                    ctx.shadowBlur = 40; // Intense glow

                    // Clip to circle
                    ctx.beginPath();
                    ctx.arc(cx, cy, size / 2, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.clip(); // Apply clip

                    ctx.drawImage(
                        targetImageRef.current,
                        cx - size / 2,
                        cy - size / 2,
                        size,
                        size
                    );

                    ctx.restore(); // Restore context (removes clip & shadow)
                } else {
                    // Fallback
                    ctx.beginPath();
                    ctx.arc(cx, cy, size / 2, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
                    ctx.fill();
                    ctx.stroke();
                }

                // Draw "BIDIK" or "TEMBAK" text
                ctx.scale(-1, 1);
                ctx.font = "bold 24px Arial";
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 4;

                if (isAimingRef.current) {
                    ctx.fillStyle = "#FF4500"; // Red-Orange for Locked On
                    ctx.fillText("TEMBAK!!", -cx - 50, cy + size / 2 + 30); // Prompt to shoot

                    // Add crosshair overlay
                    ctx.strokeStyle = "#FF0000";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-cx, cy - size / 2);
                    ctx.lineTo(-cx, cy + size / 2);
                    ctx.moveTo(-cx - size / 2, cy);
                    ctx.lineTo(-cx + size / 2, cy);
                    ctx.stroke();

                } else {
                    ctx.fillStyle = "#FFD700"; // Gold
                    ctx.fillText("BIDIK...", -cx - 40, cy + size / 2 + 30);
                }

                ctx.scale(-1, 1);
            }

            ctx.restore();
        } catch (e) {
            console.error("Render Loop Error:", e);
        }
    }, [gameState, target]);

    // --- Audio System ---
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef({
        bgm: new Audio('/audio/bgm.mp3'),
        shoot: new Audio('/audio/shoot.mp3'),
        correct: new Audio('/audio/correct.mp3'),
        wrong: new Audio('/audio/wrong.mp3')
    });

    // Initialize Audio Settings
    useEffect(() => {
        const { bgm, shoot, correct, wrong } = audioRef.current;
        bgm.loop = true;
        bgm.volume = 0.4; // Lower background music
        shoot.volume = 0.6;
        correct.volume = 0.6;
        wrong.volume = 0.6;

        return () => {
            bgm.pause();
            bgm.currentTime = 0;
        };
    }, []);

    // Handle BGM Playback based on Game State
    useEffect(() => {
        const { bgm } = audioRef.current;
        if (isMuted) {
            bgm.pause();
            return;
        }

        if (gameState === 'intro') {
            // Optional: different intro music? For now, silence or start bgm interaction
            // Browsers block autoplay until interaction. 
        } else if (gameState === 'playing' || gameState === 'quiz') {
            bgm.play().catch(e => console.log("Audio play blocked:", e));
        } else if (gameState === 'finished') {
            bgm.pause();
        }
    }, [gameState, isMuted]);

    const playSfx = (name) => {
        if (isMuted) return;
        const sound = audioRef.current[name];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("SFX play blocked:", e));
        }
    };

    // --- Gesture State ---
    const prevFingerRef = useRef({ y: 0, time: 0 });
    const isAimingRef = useRef(false);

    const checkGestureAndTarget = (landmarks, dynPos) => {
        if (gameState !== 'playing') return;

        // Landmarks: 8 = Index Tip
        const indexTip = landmarks[8];

        // De-normalize coordinates
        const tipX = indexTip.x * canvasRef.current.width;
        const tipY = indexTip.y * canvasRef.current.height;

        // 1. Check AIMING (Collision)
        const dist = Math.sqrt(
            Math.pow(tipX - dynPos.x, 2) +
            Math.pow(tipY - dynPos.y, 2)
        );

        // Hit box radius (approx size / 2)
        const hitRadius = (target.size * canvasRef.current.width) / 2;
        const isAiming = dist < hitRadius;
        isAimingRef.current = isAiming;

        // 2. Check SHOOTING (Recoil - Sudden Upward Movement)
        const now = Date.now();
        const dt = now - prevFingerRef.current.time;

        if (dt > 50) {
            const dy = indexTip.y - prevFingerRef.current.y;
            const recoilThreshold = 0.04;

            if (isAiming && dy < -recoilThreshold) {
                playSfx('shoot'); // Play Shoot Sound
                handleHit();
            }

            prevFingerRef.current = { y: indexTip.y, time: now };
        }
    };

    const handleHit = () => {
        if (gameState !== 'playing') return;
        setGameState('quiz');
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            playSfx('correct');
            setScore(prev => prev + 1);
            setFeedback('correct');
        } else {
            playSfx('wrong');
            setFeedback('wrong');
        }

        // Removed auto-timeout. We now wait for user to read explanation.
    };

    const nextQuestion = () => {
        setFeedback(null);
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            setGameState('playing');
            setTarget({
                x: 0.2 + Math.random() * 0.6,
                y: 0.2 + Math.random() * 0.6,
                size: 0.15,
                visible: true
            });
        } else {
            setGameState('finished');
        }
    };

    // Safety check for current question
    const currentQuestion = questions[currentQuestionIndex];
    const isQuizReady = gameState === 'quiz' && !feedback && currentQuestion;

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
            <Head title={`Game: ${course.title}`} />

            {/* Webcam Layer - Full Opacity */}
            <div className="absolute inset-0 z-0">
                <Webcam
                    ref={webcamRef}
                    mirrored={true}
                    className="w-full h-full object-cover"
                    onUserMedia={() => setIsCameraReady(true)}
                />
            </div>

            {/* Canvas Layer - High Contrast & Visibility */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 w-full h-full"
            />

            {/* Vintage Frame via CSS */}
            <div className="absolute inset-0 z-20 pointer-events-none border-[20px] border-double border-[#8B4513] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
                style={{
                    borderImage: 'linear-gradient(to bottom right, #DAA520, #8B4513, #DAA520) 1'
                }}>
            </div>

            {/* UI Layer */}
            <div className="absolute inset-0 z-30 flex flex-col items-center pointer-events-none font-serif">
                {/* Header Stats & Mute Toggle */}
                <div className="w-full p-4 flex justify-between items-start text-[#FFD700] font-bold text-xl drop-shadow-[0_2px_4px_black]">
                    <div className="flex gap-4">
                        <div className="bg-black/40 px-4 py-2 rounded-lg border border-[#FFD700]">📜 Soal: {currentQuestionIndex + 1}/{questions.length}</div>
                        <div className="bg-black/40 px-4 py-2 rounded-lg border border-[#FFD700]">💎 Skor: {score}</div>
                    </div>
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="pointer-events-auto bg-black/40 px-3 py-2 rounded-full border border-[#FFD700] hover:bg-black/60 active:scale-95 transition-all"
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                </div>

                {/* Feedback Overlay */}
                {/* Feedback Overlay with Explanation */}
                {feedback && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-300 p-8 pointer-events-auto">
                        <div className="mb-6 animate-bounce">
                            {feedback === 'correct' ? (
                                <div className="text-8xl drop-shadow-[0_0_20px_gold]">✅</div>
                            ) : (
                                <div className="text-8xl drop-shadow-[0_0_20px_red]">❌</div>
                            )}
                        </div>

                        {/* Explanation Card */}
                        <div className="bg-[#fff8e1] border-4 border-[#5d4037] p-6 rounded-xl max-w-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center relative">
                            {/* Decorative corner */}
                            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[#FFD700] bg-[#5d4037]"></div>
                            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[#FFD700] bg-[#5d4037]"></div>

                            <h3 className={`text-2xl font-black mb-4 ${feedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                                {feedback === 'correct' ? 'JAWABAN TEPAT!' : 'JAWABAN KURANG TEPAT'}
                            </h3>

                            <div className="text-[#3e2723] text-lg font-medium leading-relaxed mb-6 border-t border-b border-[#3e2723]/20 py-4">
                                {currentQuestion?.explanation ? (
                                    <>
                                        <span className="font-bold block mb-2 text-sm uppercase tracking-wide text-[#5d4037]/70">Penjelasan:</span>
                                        {currentQuestion.explanation}
                                    </>
                                ) : (
                                    <span className="italic text-gray-500">Tidak ada penjelasan tambahan.</span>
                                )}
                            </div>

                            <button
                                onClick={nextQuestion}
                                className="bg-[#5d4037] hover:bg-[#3e2723] text-[#FFD700] font-bold py-3 px-8 rounded-lg shadow-lg transform active:scale-95 transition-all text-xl border-2 border-[#FFD700]"
                            >
                                {currentQuestionIndex < questions.length - 1 ? 'Lanjut ke Soal Berikutnya ➡' : 'Lihat Hasil Akhir 🏁'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Intro Screen */}
                {gameState === 'intro' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 pointer-events-auto">
                        <div
                            className="text-center text-[#3e2723] max-w-lg p-10 relative"
                            style={{
                                backgroundImage: 'url("/images/parchment.png")',
                                backgroundSize: 'cover',
                                boxShadow: 'inset 0 0 50px rgba(62, 39, 35, 0.5), 0 0 20px rgba(0,0,0,0.8)',
                                borderRadius: '8px'
                            }}
                        >
                            <h1 className="text-4xl font-bold mb-4 border-b-2 border-[#3e2723] pb-2 uppercase tracking-widest">Misi Rahasia</h1>
                            <p className="mb-6 text-lg font-semibold italic">
                                "Wahai Penjelajah Waktu, temukan artefak yang hilang dan jawab teka-tekinya!"
                            </p>
                            <div className="mb-8 bg-[#5d4037]/10 p-4 rounded border border-[#5d4037]/30 text-left text-sm font-medium">
                                <strong>📜 Panduan Ekspedisi:</strong>
                                <ul className="list-disc ml-5 mt-2 space-y-2">
                                    <li>Pastikan kamera aktif & pencahayaan cukup.</li>
                                    <li>Bentuk tangan menyerupai <strong>"Pistol"</strong> (☝️+👍).</li>
                                    <li><strong>BIDIK:</strong> Arahkan jari ke Emblem Emas.</li>
                                    <li><strong>TEMBAK:</strong> Sentakkan jari ke atas saat target terkunci!</li>
                                </ul>
                            </div>

                            {questions.length > 0 ? (
                                <button
                                    onClick={() => setGameState('playing')}
                                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA000] text-[#3e2723] font-black py-3 px-10 rounded-sm text-xl shadow-[0_4px_0_#B07D1C] active:shadow-none active:translate-y-1 transition-all border-2 border-[#3e2723]"
                                >
                                    ⚔️ MULAI MISI ⚔️
                                </button>
                            ) : (
                                <div className="text-red-800 font-bold bg-red-200/50 p-2 rounded">
                                    [ARSIP KOSONG] Belum ada soal.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Finished Screen */}
                {gameState === 'finished' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90 pointer-events-auto">
                        <div
                            className="text-center text-[#3e2723] p-10 max-w-lg relative"
                            style={{
                                backgroundImage: 'url("/images/parchment.png")',
                                backgroundSize: 'cover',
                                boxShadow: '0 0 50px rgba(255, 215, 0, 0.2)',
                                borderRadius: '4px'
                            }}
                        >
                            <h1 className="text-4xl font-bold mb-6 border-b-2 border-[#3e2723] pb-4">⚜️ Misi Selesai ⚜️</h1>
                            <div className="text-7xl font-black mb-2 text-[#5d4037]">{score} / {questions.length}</div>
                            <p className="mb-8 uppercase tracking-widest text-sm font-bold">Artefak Terkumpul</p>

                            <div className="space-x-4 flex justify-center">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-[#5d4037] text-[#FFD700] hover:bg-[#3e2723] py-2 px-6 rounded font-bold border-2 border-[#FFD700]"
                                >
                                    Ulangi Misi
                                </button>
                                <Link
                                    href={route('course.show', course.id)}
                                    className="bg-[#FFD700] text-[#3e2723] hover:bg-[#FFA000] py-2 px-6 rounded font-bold border-2 border-[#3e2723] inline-block"
                                >
                                    Kembali ke Markas
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quiz Modal (Bottom Sheet style) */}
            {isQuizReady && (
                <div
                    className="absolute bottom-0 left-0 right-0 p-8 rounded-t-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 pointer-events-auto animate-in slide-in-from-bottom duration-500 font-serif"
                    style={{
                        backgroundImage: 'url("/images/parchment.png")',
                        backgroundSize: 'cover',
                        borderTop: '4px solid #5d4037'
                    }}
                >
                    <div className="max-w-3xl mx-auto text-[#3e2723]">
                        {/* Question Card */}
                        <div className="bg-[#fff8e1]/90 p-6 rounded-xl border-2 border-[#5d4037]/30 shadow-md mb-6 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-center leading-relaxed">
                                {currentQuestion?.text || 'Pertanyaan Hilang dalam Sejarah'}
                            </h3>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {currentQuestion?.options?.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx === currentQuestion.correct_index)}
                                    className="w-full text-left p-4 rounded-xl border-2 border-[#5d4037]/40 bg-[#fff8e1]/80 hover:bg-[#ffecb3] hover:border-[#5d4037] hover:scale-[1.02] transition-all font-bold text-lg text-[#3e2723] active:scale-[0.98] flex items-center shadow-sm group"
                                >
                                    <span className="font-black mr-4 bg-[#5d4037] text-[#FFD700] w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-[#FFD700] group-hover:bg-[#3e2723] transition-colors">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span>{opt}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function WebcamGame(props) {
    return (
        <CatchError>
            <WebcamGameContent {...props} />
        </CatchError>
    );
}
