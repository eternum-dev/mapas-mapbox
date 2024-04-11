



export const getUserLocation = async (): Promise<[number, number]> => {


  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
    },
    (error) => {
        alert('no se pudo obtner la geolocalizacion');
        console.log(error);
        reject;
    }
);
  });
};
