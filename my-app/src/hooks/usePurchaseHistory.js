// filepath: /Users/jp/Downloads/LocalProjectFolder/FractalSonics/my-app/src/hooks/usePurchaseHistory.js
import { useState, useEffect } from 'react';

export function usePurchaseHistory(onError) {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/purchase-history', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setPurchaseHistory(data);
        setLoading(false);
      })
      .catch(err => {
        if (onError) onError(err);
        setLoading(false);
      });
  }, [onError]);

  return { purchaseHistory, loading };
}