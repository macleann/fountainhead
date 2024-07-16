const playTone = (note: string, octave: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
  
    const frequencies: { [key: string]: number } = {
      'A': 440, 'A#': 466.16, 'B': 493.88, 'C': 523.25, 'C#': 554.37,
      'D': 587.33, 'D#': 622.25, 'E': 659.25, 'F': 698.46, 'F#': 739.99,
      'G': 783.99, 'G#': 830.61, 'H': 880
    };
  
    const baseFrequency = frequencies[note];
  
    if (baseFrequency === undefined) {
      console.error(`Invalid note: ${note}`);
      return;
    }
  
    const frequency = baseFrequency * Math.pow(2, octave - 4);
  
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
  
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

export default playTone;