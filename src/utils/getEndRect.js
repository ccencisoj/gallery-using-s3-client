const getEndRect = (image)=> {
  let { naturalWidth, naturalHeight } = image;
  let maxWidth = window.innerWidth * 0.6;
  let maxHeight = window.innerHeight * 0.7;

  if(innerWidth <= 640) {
    maxWidth = window.innerWidth * 1;
    maxHeight = window.innerHeight * 0.7;
  }

  let pendient = (naturalHeight / naturalWidth);
  let candidate1 = [maxHeight / pendient, maxHeight];
  let candidate2 = [maxWidth, pendient * maxWidth];

  let top = null;
  let left = null;
  let width = null;
  let height = null;

  if(candidate1[0] <= maxWidth && 
    candidate1[1] <= maxHeight) {
    width = candidate1[0];
    height = candidate1[1];
  }
  
  if(candidate2[0] <= maxWidth && 
    candidate2[1] <= maxHeight) {
    width = candidate2[0];
    height = candidate2[1];
  }

  top = (window.innerHeight - height) / 2;
  left = (window.innerWidth - width) / 2;

  return { 
    top: parseFloat(top.toFixed(2)), 
    left: parseFloat(left.toFixed(2)), 
    width: parseFloat(width.toFixed(2)), 
    height: parseFloat(height.toFixed(2)) 
  };
}

export default getEndRect;