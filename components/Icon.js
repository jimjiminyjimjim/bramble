import * as Icons from 'react-icons/ai';

export const DynamicIcon = ({ iconName, ...props }) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
};
