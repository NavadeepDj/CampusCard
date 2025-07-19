
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, QrCode, CameraOff } from 'lucide-react';
import { BrowserMultiFormatReader, IScannerControls, NotFoundException } from '@zxing/library';
import { Button } from './ui/button';

export default function CameraScan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const isMountedRef = useRef(true);
  
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const playBeep = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      gainNode.gain.value = 0.1; // Keep volume low
      oscillator.frequency.value = 523.25; // C5 note
      oscillator.type = 'sine';
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 150); // Beep duration
    } catch (e) {
      console.error("Failed to play beep sound.", e);
    }
  };
  
  const stopScan = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const startScan = useCallback(async () => {
    if (isScanning || !isMountedRef.current || !videoRef.current) return;
    
    setScanResult(null);
    setIsScanning(true);

    if (!codeReaderRef.current) {
      codeReaderRef.current = new BrowserMultiFormatReader();
    }
    const codeReader = codeReaderRef.current;

    try {
      const videoInputDevices = await codeReader.listVideoInputDevices();
      if (videoInputDevices.length === 0) {
        if (!isMountedRef.current) return;
        setHasCameraPermission(false);
        setIsScanning(false);
        return;
      }
      
      if (!isMountedRef.current) return;
      setHasCameraPermission(true);
      const firstDeviceId = videoInputDevices[0].deviceId;

      controlsRef.current = codeReader.decodeFromVideoDevice(
        firstDeviceId,
        videoRef.current,
        (result, err) => {
          if (!isMountedRef.current || !isScanning) return;

          if (result) {
            playBeep();
            setScanResult(result.getText());
            stopScan();
          }

          if (err && !(err instanceof NotFoundException)) {
            console.error('Barcode scan error:', err);
          }
        }
      );

    } catch (error) {
      if (!isMountedRef.current) return;
      console.error('Error initializing camera:', error);
      setHasCameraPermission(false);
      setIsScanning(false);
    }
  }, [isScanning, stopScan, toast]);


  useEffect(() => {
    isMountedRef.current = true;
    startScan();

    return () => {
      isMountedRef.current = false;
      stopScan();
    };
  }, []);

  useEffect(() => {
    if (scanResult) {
       toast({
        title: 'Scan Successful!',
        description: `ID: ${scanResult}`,
      });
    }
  }, [scanResult, toast]);


  return (
    <div className="py-4 flex flex-col items-center justify-center gap-4">
      <div className="relative w-full aspect-video rounded-md overflow-hidden border bg-muted">
        <video ref={videoRef} className={`w-full h-full object-cover ${scanResult ? 'blur-sm' : ''}`} autoPlay muted playsInline />
        
        {!isScanning && hasCameraPermission === null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-background">
            <QrCode className="h-16 w-16 mb-4 animate-pulse" />
            <p className="text-sm">Initializing camera...</p>
          </div>
        )}

        {hasCameraPermission === false && (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-destructive-foreground bg-destructive/90 p-4 text-center">
            <CameraOff className="h-16 w-16 mb-4" />
            <p className="text-lg font-bold">Camera Access Denied</p>
            <p className="text-sm mt-2">Please enable camera permissions in your browser settings and refresh the page.</p>
          </div>
        )}

        {scanResult && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-bold">Scan Successful</p>
            <p className="text-sm mt-2 text-center break-all">ID: {scanResult}</p>
          </div>
        )}
      </div>

      {hasCameraPermission === false ? (
        <Alert variant="destructive" className="w-full">
          <AlertTitle>Camera Access Required</AlertTitle>
          <AlertDescription>
            Please allow camera access to use this feature.
          </AlertDescription>
        </Alert>
      ) : (
        scanResult && (
          <Button onClick={startScan} className="w-full">
            Scan Again
          </Button>
        )
      )}
    </div>
  );
}
