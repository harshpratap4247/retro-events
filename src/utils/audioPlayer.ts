/**
 * Pure Web Audio API Synthesizer & Vinyl Ambience
 * 100% self-contained: zero external network assets or MP3 dependencies.
 */

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private vinylNode: AudioBufferSourceNode | null = null;
  private vinylGain: GainNode | null = null;
  private isVinylPlaying = false;
  private isMuted = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Generates authentic analog vinyl surface crackle using filtered white noise
   */
  public toggleVinylCrackle(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isVinylPlaying) {
      this.stopVinylCrackle();
      return false;
    }

    try {
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Create gentle vinyl noise with occasional pops & crackles
      for (let i = 0; i < bufferSize; i++) {
        // Base low hiss
        let sample = (Math.random() * 2 - 1) * 0.04;
        // Occasional crackle burst
        if (Math.random() < 0.0006) {
          sample += (Math.random() * 2 - 1) * 0.45;
        }
        data[i] = sample;
      }

      this.vinylNode = this.ctx.createBufferSource();
      this.vinylNode.buffer = buffer;
      this.vinylNode.loop = true;

      // Bandpass filter to emulate 70s phonograph frequency response
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 1200;
      bandpass.Q.value = 1.2;

      this.vinylGain = this.ctx.createGain();
      this.vinylGain.gain.value = 0.25;

      this.vinylNode.connect(bandpass);
      bandpass.connect(this.vinylGain);
      this.vinylGain.connect(this.ctx.destination);

      this.vinylNode.start();
      this.isVinylPlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  public stopVinylCrackle() {
    if (this.vinylNode) {
      try {
        this.vinylNode.stop();
        this.vinylNode.disconnect();
      } catch {
        // ignored
      }
      this.vinylNode = null;
    }
    this.isVinylPlaying = false;
  }

  public isCrackleActive(): boolean {
    return this.isVinylPlaying;
  }

  /**
   * Plays a vintage warm electric piano / clavinet chime chord
   */
  public playGroovyChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // 1970s Funk major 7th chord (F4, A4, C5, E5)
      const freqs = [349.23, 440.0, 523.25, 659.25];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm triangle/sawtooth mix
        osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.001, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.04 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.6);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Plays a vintage mechanical tape deck button click / toggle sound
   */
  public playTapeClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }
}

export const retroAudio = new RetroAudioEngine();
