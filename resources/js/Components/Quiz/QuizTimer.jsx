import { useState, useEffect } from 'react';

const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Output: HH:MM:SS (e.g., 01:30:00)
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const getTimerColorState = (remaining, total) => {
    const percentageLeft = (remaining / total) * 100;
    
    if (percentageLeft <= 2) { 
        return 'danger';
    }
    if (percentageLeft <= 15) { 
        return 'warning';
    }
    return 'normal'; 
};


export default function QuizTimer({ totalMinutes = 90 }) {
    const totalTimeInSeconds = totalMinutes * 60;
    const [remainingTime, setRemainingTime] = useState(totalTimeInSeconds);
    
    useEffect(() => {
        if (remainingTime <= 0) return;
        const timerInterval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [remainingTime]);

    const timeString = formatTime(remainingTime);
    const colorState = getTimerColorState(remainingTime, totalTimeInSeconds);
    const styleConfig = {
        normal: {
            container: 'bg-blue-600/10 border-blue-600', 
            label: 'text-blue-700',
            time: 'text-blue-800',
        },
        warning: {
            container: 'bg-yellow-600/10 border-yellow-700', 
            label: 'text-yellow-700',
            time: 'text-yellow-800',
        },
        danger: {
            container: 'bg-red-600/10 border-red-700', 
            label: 'text-red-700',
            time: 'text-red-800',
        }
    };
    
    const currentStyle = styleConfig[colorState];

    return (
        <div 
            className={`rounded-xl p-4 text-center mb-6 border-2 transition-colors
                ${currentStyle.container}
            `}
        >
            <p className={`text-sm font-medium ${currentStyle.label}`}>Sisa Waktu</p>
            <p className={`text-3xl font-bold ${currentStyle.time}`}>
                {timeString}
            </p>
        </div>
    );
}