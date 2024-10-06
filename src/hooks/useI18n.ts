"use client";

import { useEffect } from 'react';
import i18n from '@/i18n.js';

const useI18n = () => {
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);
};

export default useI18n;
