const erreurPosition = (error) => {
  var info = "Erreur lors de la géolocalisation : ";
  switch (error.code) {
    case error.TIMEOUT:
      info += "Timeout !";
      break;
    case error.PERMISSION_DENIED:
      info += "Vous n’avez pas donné la permission";
      break;
    case error.POSITION_UNAVAILABLE:
      info += "La position n’a pu être déterminée";
      break;
    case error.UNKNOWN_ERROR:
      info += "Erreur inconnue";
      break;
    default:
      break;
  }
  alert(info);
};

export const getLocalisation = (handlePositionSaving) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      handlePositionSaving,
      erreurPosition,
      { maximumAge: 0, enableHighAccuracy: true }
    );
  } else {
    alert("vous pouvez pas utilisé le taggings geolocalisation");
  }
};
