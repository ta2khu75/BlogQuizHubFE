import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface Props {
    dateString: string;
    onTimeUp: () => void;
}

export interface CountdownTimerRef {
    stopCountdown: () => void;
}

const CountdownTimer = forwardRef<CountdownTimerRef, Props>(({ dateString, onTimeUp }, ref) => {
    const targetTimeRef = useRef(new Date(dateString).getTime());
    const [remainingTime, setRemainingTime] = useState(targetTimeRef.current - Date.now());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const timeLeft = targetTimeRef.current - Date.now();
            if (timeLeft <= 0) {
                clearInterval(intervalRef.current!);
                setRemainingTime(0);
                onTimeUp(); // Gọi hàm từ parent khi hết giờ
            } else {
                setRemainingTime(timeLeft);
            }
        }, 1000);

        return () => clearInterval(intervalRef.current!);
    }, []);

    // ✅ Expose stopCountdown để parent có thể gọi
    useImperativeHandle(ref, () => ({
        stopCountdown: () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                console.log("Countdown stopped by parent!"); // Log khi parent dừng
            }
        },
    }));

    const formatTime = (ms: number) => {
        if (ms <= 0) return "Hết thời gian!";
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return <div>Còn lại: {formatTime(remainingTime)}</div>;
});
CountdownTimer.displayName = "CountdownTimer";

export default CountdownTimer;

