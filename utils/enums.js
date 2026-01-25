// Vehicle types enum for consistent naming across frontend and backend
export const VehicleType = {
  SEDAN: 'Sedan',
  SUV: 'SUV',
  VAN: 'Van'
};

// Display names for vehicle types in UI
export const VehicleDisplayNames = {
  [VehicleType.SEDAN]: 'Sedan Taxi',
  [VehicleType.SUV]: 'SUV Taxi',
  [VehicleType.VAN]: 'Maxi Taxi'
};

// Vehicle descriptions for UI
export const VehicleDescriptions = {
  [VehicleType.SEDAN]: 'Up to 4 passengers',
  [VehicleType.SUV]: 'Up to 6 passengers with extra space',
  [VehicleType.VAN]: 'Up to 11 passengers'
};

// Default export for convenience
export default VehicleType;
