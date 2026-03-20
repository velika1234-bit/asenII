import { useState, useRef, useEffect } from "react";

export function useMedievalAmbience() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const pluckTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function buildDrones(ctx: AudioContext, dest: AudioNode) {
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.6;
    filter.connect(dest);

    const delayNode = ctx.createDelay(2);
    delayNode.delayTime.value = 0.35;
    const delayFeedGain = ctx.createGain();
    delayFeedGain.gain.value = 0.22;
    delayNode.connect(delayFeedGain);
    delayFeedGain.connect(delayNode);
    delayFeedGain.connect(dest);

    const drones: { freq: number; gain: number; type: OscillatorType }[] = [
      { freq: 73.42,  gain: 0.36, type: "sawtooth" },
      { freq: 146.83, gain: 0.22, type: "sine"     },
      { freq: 110.00, gain: 0.18, type: "sine"     },
      { freq: 174.61, gain: 0.14, type: "sine"     },
      { freq: 220.00, gain: 0.10, type: "sine"     },
    ];

    drones.forEach(({ freq, gain, type }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = (Math.random() - 0.5) * 7;
      gainNode.gain.value = gain;

      const pitchLfo = ctx.createOscillator();
      const pitchLfoGain = ctx.createGain();
      pitchLfo.frequency.value = 0.04 + Math.random() * 0.07;
      pitchLfoGain.gain.value = freq * 0.003;
      pitchLfo.connect(pitchLfoGain);
      pitchLfoGain.connect(osc.frequency);
      pitchLfo.start();

      const ampLfo = ctx.createOscillator();
      const ampLfoGain = ctx.createGain();
      ampLfo.frequency.value = 0.05 + Math.random() * 0.09;
      ampLfoGain.gain.value = gain * 0.14;
      ampLfo.connect(ampLfoGain);
      ampLfoGain.connect(gainNode.gain);
      ampLfo.start();

      osc.connect(gainNode);
      gainNode.connect(filter);
      gainNode.connect(delayNode);
      osc.start();
    });
  }

  function schedulePluck(ctx: AudioContext, master: GainNode) {
    const delay = 3500 + Math.random() * 9000;
    pluckTimerRef.current = setTimeout(() => {
      if (!ctxRef.current) return;

      const notes = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const dur = 1.8 + Math.random() * 2;

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const pf = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.value = freq;

      pf.type = "bandpass";
      pf.frequency.value = freq * 1.8;
      pf.Q.value = 2.5;

      const now = ctx.currentTime;
      g.gain.setValueAtTime(0.16, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);

      osc.connect(pf);
      pf.connect(g);
      g.connect(master);
      osc.start(now);
      osc.stop(now + dur);

      schedulePluck(ctx, master);
    }, delay);
  }

  function start() {
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.38, ctx.currentTime + 3.5);
    master.connect(ctx.destination);

    buildDrones(ctx, master);
    schedulePluck(ctx, master);

    ctxRef.current = ctx;
    masterRef.current = master;
    setPlaying(true);
  }

  function stop() {
    if (pluckTimerRef.current) {
      clearTimeout(pluckTimerRef.current);
      pluckTimerRef.current = null;
    }
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 1.8);
      const ctx = ctxRef.current;
      setTimeout(() => ctx.close(), 2200);
      ctxRef.current = null;
      masterRef.current = null;
    }
    setPlaying(false);
  }

  function toggle() {
    if (playing) stop();
    else start();
  }

  useEffect(() => {
    return () => {
      if (pluckTimerRef.current) clearTimeout(pluckTimerRef.current);
      ctxRef.current?.close();
    };
  }, []);

  return { playing, toggle };
}
