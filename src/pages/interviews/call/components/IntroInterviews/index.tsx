import { ButtonComponent } from '@/components/ButtonComponent';
import {
  Box,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { ERROR_MESSAGES } from 'react-record-webcam';
import type {
  CameraState,
  InterviewDetail,
  InterviewState,
} from '../../CallInterview.interfaces';

import { useEffect, useRef, useState } from 'react';

const IntroInterviews = ({
  data,
  setInterviewState,
  permissionState,
}: {
  data?: InterviewDetail;
  setInterviewState: (state: InterviewState) => void;
  permissionState?: CameraState;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [micReady, setMicReady] = useState(false);

  const [cameraEverReady, setCameraEverReady] = useState(false);
  const [micEverDetected, setMicEverDetected] = useState(false);

  const [audioLevel, setAudioLevel] = useState<number[]>([]);

  const isBlocked =
    permissionState?.errorCode === ERROR_MESSAGES.NO_USER_PERMISSION ||
    permissionState?.errorCode === 'Permission denied';

  const isMediaNotReady =
    !cameraEverReady || !micEverDetected || isBlocked;

  useEffect(() => {
    let stream: MediaStream;

    const initMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // CAMERA
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setCameraReady(true);
            setCameraEverReady(true);
          };
        }

        // MIC
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 64;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);

        const checkAudio = () => {
          analyser.getByteFrequencyData(dataArray);

          const avg =
            dataArray.reduce((a, b) => a + b, 0) / bufferLength;

          if (avg > 10) {
            setMicReady(true);
            setMicEverDetected(true);
          }

          setAudioLevel([...dataArray]);

          requestAnimationFrame(checkAudio);
        };

        checkAudio();
      } catch (err) {
        console.error(err);
      }
    };

    initMedia();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      px={2}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '420px' },
          borderRadius: 4,
          boxShadow: 4,
          p: 3,
          backgroundColor: 'white',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* HEADER */}
        <Stack spacing={0.5} alignItems="center" mb={1}>
          <Typography fontSize={20} fontWeight={700}>
            {data?.name}
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            AI Interview Session
          </Typography>
        </Stack>

        <Divider sx={{ mb: 1 }} />

        {/* WARNING */}
        <Box
          sx={{
            backgroundColor: '#FFF7E6',
            border: '1px solid #FFD591',
            borderRadius: 2,
            p: 1.5,
            mb: 2,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <WarningAmberIcon color="warning" />
            <Box>
              <Typography fontSize={13} fontWeight={600}>
                Please prepare before starting:
              </Typography>
              <Typography fontSize={13}>
                • Ensure microphone is enabled  
                • Stay in a quiet environment  
                • Do not switch tabs (will be recorded)
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* VIDEO */}
        <Box
          sx={{
            width: '100%',
            height: 240,
            borderRadius: 2,
            overflow: 'hidden',
            mb: 1.5,
            backgroundColor: '#000',
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            muted
          />
        </Box>

        {/* CAMERA STATUS */}
        <Stack spacing={0.5} alignItems="center" mb={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <VideocamIcon
              color={cameraReady && !isBlocked ? 'success' : 'error'}
              fontSize="small"
            />
            <Typography fontSize={13}>
              {cameraReady
                ? 'Camera ready'
                : permissionState?.message || 'Checking camera...'}
            </Typography>
          </Stack>
        </Stack>

        {/* MIC TEST */}
        <Box mb={2}>
          <Typography fontSize={13} mb={1}>
            Microphone Test
          </Typography>

          <Stack
            direction="row"
            spacing={0.5}
            alignItems="flex-end"
            sx={{
              height: 60,
              overflow: 'hidden',
            }}
          >
            {audioLevel.slice(0, 20).map((val, i) => (
              <Box
                key={i}
                sx={{
                  width: 4,
                  height: `${Math.min(val / 2, 40)}px`,
                  backgroundColor: micReady ? 'green' : 'red',
                  borderRadius: 1,
                  transition: '0.1s',
                }}
              />
            ))}
          </Stack>

          <Typography fontSize={12} mt={0.5}>
            {micEverDetected
              ? 'Mic detected - speak to see levels'
              : 'Speak to test mic...'}
          </Typography>
        </Box>

        {/* ACTIONS */}
        <Box sx={{ mt: 'auto' }}>
          <Stack spacing={1}>
            <ButtonComponent
              variant="contained"
              fullWidth
              size="large"
              onClick={() => setInterviewState('QUESTION')}
              disabled={isMediaNotReady}
              sx={{
                fontWeight: 600,
                py: 1.2,
                borderRadius: 2,
              }}
            >
              Start Interview
            </ButtonComponent>

            <ButtonComponent
              variant="outlined"
              fullWidth
              size="medium"
              onClick={() => setInterviewState('END')}
              sx={{
                borderRadius: 2,
              }}
            >
              Exit
            </ButtonComponent>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default IntroInterviews;