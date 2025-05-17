import React, { useMemo } from 'react';

const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1; // Has uppercase
    if (/[a-z]/.test(password)) strength += 1; // Has lowercase
    if (/[0-9]/.test(password)) strength += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Has special char
    
    // Normalize to 0-4 scale
    return Math.min(4, Math.floor(strength / 1.5));
  };
  
  const strength = useMemo(() => calculateStrength(password), [password]);
  
  const getColor = () => {
    switch (strength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };
  
  const getLabel = () => {
    switch (strength) {
      case 0: return 'Too weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };
  
  if (!password) return null;
  
  return (
    <div className="mt-2">
      <div className="flex space-x-1 mb-1">
        {[0, 1, 2, 3].map((index) => (
          <div 
            key={index}
            className={`h-1 flex-1 rounded-full ${index < strength ? getColor() : 'bg-gray-200'}`}
          ></div>
        ))}
      </div>
      <p className={`text-xs ${
        strength === 0 ? 'text-gray-500' :
        strength === 1 ? 'text-red-500' :
        strength === 2 ? 'text-orange-500' :
        strength === 3 ? 'text-yellow-600' :
        'text-green-500'
      }`}>
        {getLabel()}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
