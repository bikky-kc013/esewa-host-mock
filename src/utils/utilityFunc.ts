type LocationDataProps = {
    latitude: number;
    longitude: number;
    accuracy: number;
    address: string;
}

export function getCurrentLocation(): Promise<LocationDataProps> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          if (!response.ok) {
            throw new Error("Failed to get address.");
          }

          const data = await response.json();

          resolve({
            latitude,
            longitude,
            accuracy,
            address: data.display_name ?? "",
          });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error(error.message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}