import { useMemo } from 'react';
import { useClock } from '../hooks/useClock';

interface SequencerProps {
  sequenceLength: number
}

export default function Sequencer(props: SequencerProps) {

  const time = useClock();
  const steps = useMemo(() => [...Array(props.sequenceLength).keys()], []);
  const activeStep = time.getSeconds() % steps.length;

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h2>Sequencer</h2>
        <p style={{ margin: 0, color: 'var(--text)' }}>
          Step {activeStep + 1} / {steps.length}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, minmax(40px, 1fr))',
          gap: '10px',
          width: '100%',
          maxWidth: '520px',
        }}
      >
        {steps.map((step) => {
          const isActive = step === activeStep;
          return (
            <div
              key={step}
              style={{
                minHeight: '48px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '12px',
                background: isActive ? '#ff4d4d' : 'var(--border)',
                color: isActive ? '#fff' : 'var(--text-h)',
                fontWeight: 600,
                transition: 'background 0.2s ease, transform 0.2s ease',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isActive ? '0 0 0 6px rgba(255, 77, 77, 0.16)' : 'none',
              }}
            >
              {step + 1}
            </div>
          );
        })}
      </div>
    </section>
  );
};