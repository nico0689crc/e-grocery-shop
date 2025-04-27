'use client';

import React, { useState, useEffect } from 'react'; // React imports
import { motion } from 'framer-motion'; // Third-party library imports
import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';

type TypewriterEffectProps = TypographyProps & {
  phrases: string[];
  period?: number;
};

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  phrases,
  period = 2000,
  ...props
}) => {
  const [text, setText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopNum % phrases.length];
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const delta = isDeleting ? 100 : 200;
    const timeout = setTimeout(handleTyping, delta);

    return () => clearTimeout(timeout); // Clean up on unmount
  }, [text, isDeleting, loopNum, phrases, period]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Typography {...props}>{text}</Typography>
    </motion.div>
  );
};

export default TypewriterEffect;
