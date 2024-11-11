import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Radio, Volume2, VolumeX } from 'lucide-react';

interface WalkieTalkieProps {
  driverId?: string;
  companyId?: string;
  onClose?: () => void;
}

export function WalkieTalkie({ driverId, companyId, onClose }: WalkieTalkieProps) {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [lastMessage, setLastMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new AudioContext();
    
    // Cleanup on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startTransmission = async () => {
    try {
      if (!audioContextRef.current) return;

      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = volume;
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      setIsTransmitting(true);
      setLastMessage('Transmitting...');

      // In production, this would send audio data to the server
      // For demo, we'll just simulate transmission
      setTimeout(() => {
        setLastMessage('Last transmission: 3 seconds ago');
      }, 3000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      setLastMessage('Error: Could not access microphone');
    }
  };

  const stopTransmission = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsTransmitting(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Radio className={`h-5 w-5 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
          <span className="ml-2 font-medium">Walkie-Talkie</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="text-sm text-gray-500">
          {lastMessage || 'Ready to transmit'}
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg ${
              isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            } hover:bg-gray-200`}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1"
          />
        </div>

        {/* Transmit Button */}
        <button
          onMouseDown={startTransmission}
          onMouseUp={stopTransmission}
          onMouseLeave={stopTransmission}
          onTouchStart={startTransmission}
          onTouchEnd={stopTransmission}
          disabled={!isConnected}
          className={`w-full py-4 rounded-lg flex items-center justify-center space-x-2 ${
            isTransmitting
              ? 'bg-red-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors disabled:bg-gray-300`}
        >
          {isTransmitting ? (
            <>
              <MicOff className="h-6 w-6 animate-pulse" />
              <span>Release to end transmission</span>
            </>
          ) : (
            <>
              <Mic className="h-6 w-6" />
              <span>Press & hold to talk</span>
            </>
          )}
        </button>

        {/* Connection Status */}
        <div className="text-xs text-center text-gray-500">
          {isConnected ? (
            <span className="text-green-600">Connected</span>
          ) : (
            <span className="text-red-600">Disconnected - Trying to reconnect...</span>
          )}
        </div>
      </div>
    </div>
  );
}