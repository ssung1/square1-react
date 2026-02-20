export function normalizeDegrees(degrees) {
  return ((degrees % 360) + 360) % 360;
}

export function rotate(currentAngle, rotation) {
  return normalizeDegrees(currentAngle + rotation);
}