const formatString = (str) => {
    return str.toLowerCase().replace(/\s+/g, '_');
  };

export const anchorTags = (anchor) => {
    return anchor ? { id: formatString(anchor) } : {};
}