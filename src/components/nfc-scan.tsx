'use client';

import { useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Nfc, XCircle } from 'lucide-react';
import { Button } from './ui/button';

type ScanStatus = 'idle' | 'scanning' | 'success' | 'unsupported' | 'error';

export default function NfcScan({ onScanSuccess }: { onScanSuccess?: (result: string) => void }) {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { toast } = useToast();

  const isNfcSupported = 'NDEFReader' in window;

  const playBeep = (success = true) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      gainNode.gain.value = 0.1;
      oscillator.frequency.value = success ? 523.25 : 261.63; // C5 for success, C4 for error
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

  const startScan = useCallback(async () => {
    if (!isNfcSupported) {
      setStatus('unsupported');
      return;
    }
    
    setStatus('scanning');
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      
      ndef.addEventListener('reading', ({ message, serialNumber }) => {
        const decoder = new TextDecoder();
        // Assuming the first record contains the student ID
        const firstRecord = message.records[0];
        const studentId = decoder.decode(firstRecord.data);
        
        playBeep(true);
        setScanResult(studentId);
        setStatus('success');
        toast({
          title: 'Scan Successful!',
          description: `ID: ${studentId}`,
        });
        if (onScanSuccess) {
          onScanSuccess(studentId);
        }
      });

      ndef.addEventListener('readingerror', () => {
        playBeep(false);
        setStatus('error');
        toast({
            variant: 'destructive',
            title: 'Scan Error',
            description: 'Could not read the NFC tag. Please try again.',
        });
      });

    } catch (error) {
        playBeep(false);
        setStatus('error');
        console.error('NFC scan failed:', error);
        toast({
            variant: 'destructive',
            title: 'NFC Error',
            description: 'Could not start NFC scanning. Make sure permissions are granted.',
        });
    }
  }, [isNfcSupported, onScanSuccess, toast]);

  const getStatusContent = () => {
    switch (status) {
      case 'idle':
        return (
          <div className="text-center text-muted-foreground">
            <p>Click the button below to start scanning.</p>
          </div>
        );
      case 'scanning':
        return (
          <div className="flex flex-col items-center justify-center text-primary animate-pulse">
            <Nfc className="h-16 w-16 mb-4" />
            <p className="font-semibold">Ready to Scan</p>
            <p className="text-sm text-muted-foreground">Hold card near your device...</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center text-green-500">
            <CheckCircle className="h-16 w-16 mb-4" />
            <p className="font-bold">Scan Successful</p>
            <p className="text-sm mt-2 text-center break-all">ID: {scanResult}</p>
          </div>
        );
      case 'unsupported':
         return (
          <div className="flex flex-col items-center justify-center text-destructive">
            <XCircle className="h-16 w-16 mb-4" />
            <p className="font-bold">NFC Not Supported</p>
            <p className="text-sm text-center mt-2">Your browser or device does not support WebNFC.</p>
          </div>
        );
       case 'error':
         return (
          <div className="flex flex-col items-center justify-center text-destructive">
            <XCircle className="h-16 w-16 mb-4" />
            <p className="font-bold">Scan Failed</p>
            <p className="text-sm text-center mt-2">Could not read the NFC tag. Please try again.</p>
          </div>
        );
    }
  }

  return (
    <div className="py-4 flex flex-col items-center justify-center gap-4">
        <div className="relative w-full aspect-video rounded-md flex items-center justify-center bg-muted/30 p-4">
            {getStatusContent()}
        </div>
        <Button onClick={startScan} disabled={status === 'scanning' || !isNfcSupported} className="w-full">
            {status === 'success' || status === 'error' ? 'Scan Again' : 'Start Scanning'}
        </Button>
    </div>
  );
}
