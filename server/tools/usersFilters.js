const gender = ({ orientation, gender }) => {
  if (orientation === 'Bisexuel') {
    return [ 'male', 'female' ];
  }
  if ((gender === 'male' && orientation === 'Hétérosexuel')
  || (gender === 'female' && orientation === 'Homosexuel')) {
    return [ 'female' ];
  }
  return [ 'male' ];
}

const orientation = ({ orientation }) => {
  if (orientation === 'Homosexuel') {
    return [ 'Bisexuel', 'Homosexuel' ];
  }
  if (orientation === 'Hétérosexuel') {
    return [ 'Bisexuel', 'Hétérosexuel' ];
  }
  return [ 'Bisexuel' ];
}

const distanceSlot = (distance) => {
  if (distance < 10) {
    return 4;
  }
  if (distance < 20) {
    return 3;
  }
  if (distance < 30) {
    return 2;
  }
  if (distance < 50) {
    return 1;
  }
  return 0;
}

export { gender, orientation, distanceSlot };
