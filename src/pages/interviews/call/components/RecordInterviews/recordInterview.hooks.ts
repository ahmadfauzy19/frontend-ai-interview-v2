import { useRef, useState } from 'react';
import axiosUtils from '@/utils/axiosUtils';

export const useRecordInterview = (showSnackbar: any) => {
  const [timer, setTimer] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedUpload, setFailedUpload] = useState<{
    blob: Blob;
    questionId: string;
    fileName: string;
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breakTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // =========================
  // TIMER
  // =========================

  const startTimer = () => {
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startBreakTimer = () => {
    if (breakTimerRef.current) return;
    breakTimerRef.current = setInterval(() => {
      setBreakTime(prev => prev + 1);
    }, 1000);
  };

  const stopBreakTimer = () => {
    if (breakTimerRef.current) {
      clearInterval(breakTimerRef.current);
      breakTimerRef.current = null;
    }
  };

  const resetBreakTimer = () => {
    stopBreakTimer();
    setBreakTime(0);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}m ${s}s`;
  };

  // =========================
  // UPLOAD
  // =========================

  const uploadWithRetry = async (
    url: string,
    formData: FormData,
    retries = 2
  ): Promise<any> => {
    try {
      abortControllerRef.current = new AbortController();

      return await axiosUtils.post(url, formData, {
        signal: abortControllerRef.current.signal,
      });

    } catch (err: any) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
        throw err;
      }

      if (retries > 0) {
        await new Promise(r => setTimeout(r, 1000));
        return uploadWithRetry(url, formData, retries - 1);
      }

      throw err;
    }
  };

  const cancelUpload = () => {
    abortControllerRef.current?.abort();
    showSnackbar('Upload dibatalkan', 'info');
  };

  return {
    // state
    timer,
    breakTime,
    isLoading,
    failedUpload,

    // setter
    setIsLoading,
    setFailedUpload,

    // timer
    startTimer,
    stopTimer,
    startBreakTimer,
    stopBreakTimer,
    resetBreakTimer,
    formatTimer,

    // upload
    uploadWithRetry,
    cancelUpload,

    // refs (kalau butuh cleanup)
    abortControllerRef,
  };
};