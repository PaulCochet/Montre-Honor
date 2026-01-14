import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPOSANT SMILEY ANIME ---
const AnimatedSmiley = ({ color = "#3891FF", isHappy = true }) => {
  return (
    <motion.svg width="80" height="80" viewBox="0 0 100 100" fill="none">
      {/* Yeux qui clignent */}
      <motion.rect 
        x="30" y="35" width="8" height="20" rx="4" fill={color}
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.2], delay: 2 }}
      />
      <motion.rect 
        x="62" y="35" width="8" height="20" rx="4" fill={color}
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.2], delay: 2.1 }}
      />
      {/* Bouche qui parle/bouge */}
      <motion.path
        d={isHappy ? "M30 70 C 40 80, 60 80, 70 70" : "M35 75 Q 50 75 65 75"}
        stroke={color} strokeWidth="6" strokeLinecap="round"
        animate={{ d: ["M30 70 C 40 80, 60 80, 70 70", "M30 72 C 40 85, 60 85, 70 72", "M30 70 C 40 80, 60 80, 70 70"] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      />
    </motion.svg>
  );
};

// --- APPLICATION PRINCIPALE ---
export default function AppleWatchApp() {
  const [step, setStep] = useState(1);

  // Fonction pour gérer le clic avec vibration haptique
  const handleNext = (nextStep, vibrationPattern = 50) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(vibrationPattern); // Petit retour haptique
    }
    setStep(nextStep);
  };

  const watchStyle = {
    width: '187px',
    height: '223px',
    borderRadius: '35px',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
    background: 'linear-gradient(180deg, #D6EFFF 0%, #FFFFFF 100%)',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px 12px 12px 12px',
    color: '#000'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#111' }}>
      <div style={watchStyle}>
        {/* Barre de statut */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}>
          <div style={{ color: '#3891FF', background: '#E0F0FF', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✕</div>
          <span>9:41</span>
        </div>

        <AnimatePresence mode="wait">
          {/* ÉCRAN 1 : RACE DETECTED */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', flex: 1, gap: '15px' }}>
              <AnimatedSmiley />
              <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Race detected</div>
              <button onClick={() => handleNext(2)} style={btnStyle}>🏃 Start</button>
            </motion.div>
          )}

          {/* ÉCRAN 2 : CHALLENGE */}
          {step === 2 && (
            <motion.div key="s2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>Challenge</div>
              <div onClick={() => handleNext(3)} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '20px', padding: '20px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ color: '#3891FF', fontSize: '24px' }}>🏃‍♂️</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Express Boost</div>
                <div style={{ fontSize: '10px', opacity: 0.6 }}>45 second</div>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '4px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#000' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ccc' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ccc' }} />
              </div>
            </motion.div>
          )}

          {/* ÉCRAN 3 : SPEED */}
          {step === 3 && (
            <motion.div key="s3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', gap: '20px' }}>
              <AnimatedSmiley />
              <button onClick={() => handleNext(4, [30, 50, 30])} style={{ background: '#fff', border: 'none', borderRadius: '12px', padding: '10px 20px', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }}>
                10,2 <span style={{ fontSize: '12px' }}>mph</span>
              </button>
            </motion.div>
          )}

          {/* ÉCRAN 4 : SLUGGISH */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', flex: 1, gap: '15px', background: 'linear-gradient(180deg, #FFF9D6 0%, #FFFFFF 100%)', position: 'absolute', inset: 0, padding: '30px 12px 12px' }}>
              <AnimatedSmiley color="#444" />
              <div style={{ fontWeight: 'bold', fontSize: '11px', textAlign: 'center' }}>Feeling a little sluggish?</div>
              <button onClick={() => handleNext(5)} style={btnStyle}>Yes</button>
            </motion.div>
          )}

          {/* ÉCRAN 5 : IMPRESSION / JAUGE */}
          {step === 5 && (
            <motion.div key="s5" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', flex: 1, gap: '15px' }}>
              <AnimatedSmiley />
              <div style={{ width: '130px', height: '25px', borderRadius: '15px', background: 'linear-gradient(90deg, #A2FFB6 0%, #FFD0A2 50%, #FFA2A2 100%)', position: 'relative', cursor: 'pointer' }} onClick={() => handleNext(1, 100)}>
                <div style={{ position: 'absolute', left: '40%', top: '-5px', width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid #3891FF' }} />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '11px' }}>Your impression</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const btnStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '15px',
  border: 'none',
  background: '#FFF',
  fontWeight: 'bold',
  fontSize: '14px',
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
};