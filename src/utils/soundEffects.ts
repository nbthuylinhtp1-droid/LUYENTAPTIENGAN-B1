// Web Audio API Sound Synthesizer for instant, zero-dependency, reliable sound effects
import confetti from 'canvas-confetti';

class SoundEffectsManager {
  private ctx: AudioContext | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // 1. Hoành tráng, mạnh mẽ: Fanfare Chúc Mừng Chiến Thắng (Victory Fanfare + Trumpet Harmonics)
  public playGrandVictorySound(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Chords sequence: C4, E4, G4, C5 -> Triumph chord with brass tone
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.18, vol: 0.35 }, // C5
        { freq: 659.25, time: 0.16, dur: 0.18, vol: 0.4 },  // E5
        { freq: 783.99, time: 0.32, dur: 0.22, vol: 0.45 }, // G5
        { freq: 1046.50, time: 0.50, dur: 0.85, vol: 0.6 }, // High C6 (sustained climax)
        { freq: 523.25, time: 0.50, dur: 0.85, vol: 0.35 }, // Harmonized low C5
        { freq: 659.25, time: 0.50, dur: 0.85, vol: 0.35 }, // Harmonized E5
      ];

      notes.forEach(({ freq, time, dur, vol }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Triangle + subtle Sine harmonics for bright brass/celebratory tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        // Attack & Decay Envelope
        gain.gain.setValueAtTime(0, now + time);
        gain.gain.linearRampToValueAtTime(vol, now + time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.05);
      });

      // Add a sparkly glitter chime on top
      const sparkleNotes = [1318.51, 1567.98, 2093.00]; // E6, G6, C7
      sparkleNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.55 + idx * 0.08);

        gain.gain.setValueAtTime(0, now + 0.55 + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.55 + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55 + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + 0.55 + idx * 0.08);
        osc.stop(now + 0.55 + idx * 0.08 + 0.45);
      });
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // 2. Nhẹ nhàng, êm dịu, khích lệ: Gentle Encouragement Warm Chime
  public playGentleEncouragementSound(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Soft warm soothing melody (F4 -> A4 -> C5 gently fading)
      const soothingTones = [
        { freq: 349.23, time: 0.0, dur: 0.35, vol: 0.18 }, // F4
        { freq: 440.00, time: 0.14, dur: 0.45, vol: 0.18 }, // A4
        { freq: 523.25, time: 0.28, dur: 0.65, vol: 0.16 }, // C5
      ];

      soothingTones.forEach(({ freq, time, dur, vol }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Pure sine wave for soft, mellow, warm bell feeling
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0, now + time);
        gain.gain.linearRampToValueAtTime(vol, now + time + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.1);
      });
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // 3. Hoành tráng: Tung bông tung hoa rực rỡ nhiều đợt (Grand Confetti Explosion)
  public triggerGrandCelebration(): void {
    // Play grand fanfare sound
    this.playGrandVictorySound();

    // Burst 1: Center blast
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#f97316', '#fbbf24', '#10b981', '#6366f1', '#ec4899'],
    });

    // Burst 2: Left cannon after 180ms
    setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 75,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#f97316', '#38bdf8', '#fbbf24'],
      });
    }, 180);

    // Burst 3: Right cannon after 350ms
    setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 75,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#0284c7', '#ea580c', '#34d399'],
      });
    }, 350);

    // Burst 4: Sky shower after 550ms
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.4 },
        colors: ['#f97316', '#0284c7', '#e11d48', '#a855f7'],
      });
    }, 550);
  }

  // 4. Khích lệ nhẹ nhàng: Trigger Gentle encouragement
  public triggerGentleEncouragement(): void {
    this.playGentleEncouragementSound();
  }
}

export const soundEffects = new SoundEffectsManager();
