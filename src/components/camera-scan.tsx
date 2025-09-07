
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, QrCode, CameraOff } from 'lucide-react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Button } from './ui/button';

export default function CameraScan({ onScanSuccess }: { onScanSuccess?: (result: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  
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
      
      gainNode.gain.value = 0.1;
      oscillator.frequency.value = 523.25; // C5 note
      oscillator.type = 'sine';
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 150);
    } catch (e) {
      console.error("Failed to play beep sound.", e);
    }
  };

  const stopScan = useCallback(() => {
    if (codeReaderRef.current) {
        codeReaderRef.current.reset();
    }
    setIsScanning(false);
  }, []);

  const startScan = useCallback(async () => {
    if (!videoRef.current || !codeReaderRef.current) return;
    
    setScanResult(null);
    setIsScanning(true);

    try {
      await codeReaderRef.current.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, err) => {
          if (result) {
            playBeep();
            const resultText = result.getText();
            setScanResult(resultText);
            stopScan();
            if (onScanSuccess) {
              onScanSuccess(resultText);
            }
          }

          if (err && !(err instanceof NotFoundException)) {
            console.error('Barcode scan error:', err);
            stopScan();
          }
        }
      );

    } catch (error) {
      console.error('Error initializing camera for scanning:', error);
      setHasCameraPermission(false);
      setIsScanning(false);
    }
  }, [stopScan, onScanSuccess]);


  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader();
    
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };
    
    getCameraPermission();

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
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
        
        {hasCameraPermission === null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-background">
            <CameraOff className="h-16 w-16 mb-4 animate-pulse" />
            <p className="text-sm">Requesting Camera Permission...</p>
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

        {isScanning && !scanResult && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-2/3 h-1/2 border-4 border-dashed border-white/50 rounded-lg animate-pulse" />
                <p className="text-white mt-4 font-semibold bg-black/50 px-3 py-1 rounded-md">Scanning...</p>
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
        <Button onClick={scanResult ? startScan : isScanning ? stopScan : startScan} disabled={!hasCameraPermission} className="w-full">
          {scanResult ? (
            <><QrCode className="mr-2 h-4 w-4" />Scan Again</>
          ) : isScanning ? (
            'Stop Scanning'
          ) : (
            <><QrCode className="mr-2 h-4 w-4" />Start Scanning</>
          )}
        </Button>
      )}
    </div>
  );
}
