export function GlowUpLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#0A0A14"/>
      <ellipse cx="31" cy="47" rx="17" ry="21" fill="#7C3AED" opacity="0.3"/>
      <ellipse cx="69" cy="47" rx="17" ry="21" fill="#3B82F6" opacity="0.3"/>
      <ellipse cx="31" cy="47" rx="13" ry="17" fill="#130823"/>
      <ellipse cx="69" cy="47" rx="13" ry="17" fill="#08142B"/>
      <ellipse cx="31" cy="47" rx="9" ry="11" fill="#8B5CF6"/>
      <ellipse cx="69" cy="47" rx="9" ry="11" fill="#60A5FA"/>
      <ellipse cx="31" cy="48" rx="5" ry="6" fill="#05050D"/>
      <ellipse cx="69" cy="48" rx="5" ry="6" fill="#05050D"/>
      <circle cx="34.5" cy="43" r="2.5" fill="white" opacity="0.9"/>
      <circle cx="72.5" cy="43" r="2.5" fill="white" opacity="0.9"/>
      <ellipse cx="50" cy="64" rx="4" ry="2.5" fill="#3D1A6E" opacity="0.6"/>
      <path d="M44 71 Q50 75 56 71" stroke="#3D1A6E" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}
