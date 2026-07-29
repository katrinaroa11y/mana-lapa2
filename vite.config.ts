import React from 'react';

export function renderFormattedText(text: string): React.ReactNode {
  if (!text) return text;
  const parts = text.split(/(\*\*.*?\*\*|<strong>.*?<\/strong>|<b>.*?<\/b>)/g);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-[#3E4950]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
      return (
        <strong key={index} className="font-semibold text-[#3E4950]">
          {part.slice(8, -9)}
        </strong>
      );
    }
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      return (
        <strong key={index} className="font-semibold text-[#3E4950]">
          {part.slice(3, -4)}
        </strong>
      );
    }
    return part;
  });
}
