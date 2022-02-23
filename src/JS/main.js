document.addEventListener('DOMContentLoaded', ()=>{
   mapa();
   buscar();
});
//Traido desde la api
let archivos;
let map;
 async function geo(direccion){
     const api = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_I2iEIlOKrBJCDQhfE0RPj3N694HyT&ipAddress=8.8.8.8";
     //Hacemos la peticion para traer los datos
     //evitamos que salga error
     if( direccion != '' && direccion.length >10 && parseInt(direccion) > 0 ) {
      const respuesta = await fetch(api + "apiKey=1538077&" + `ipAddress=${direccion}`);
      archivos = await respuesta.json();
     }
   
      else{
         alert('Not found');
      }
}
 function mapa(){
  
     map = L.map('map').setView([51.505, -0.09], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

}
function buscar(){
   let direccion;
   const btn = document.querySelector('.btn');
   const inputBucar = document.querySelector('#buscarIp');
   const ip = document.querySelector('#ip');
   const loc = document.querySelector('#location');
   const time = document.querySelector('#time');
   const isp = document.querySelector('#isp');
   inputBucar.addEventListener('change', (e)=>{
      direccion = e.target.value.trim();
 
      if(direccion != '')
       geo(direccion);
   });
   btn.addEventListener('click', (e)=>{
     
      e.preventDefault();
   if(archivos){
      const {country, region, timezone, lat, lng} = archivos.location;
      ip.textContent = archivos.ip;
      loc.textContent = country + ", " + region; 
      time.textContent = `UTC ${timezone}`;
      isp.textContent = archivos.isp;
     let locacion = [lat, lng];
     map.flyTo(locacion, 13);
     let myIcon = L.icon({
        iconUrl: '/build/images/icon-location.svg',
        iconSize: [38, 50],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    L.marker([lat, lng], {icon: myIcon}).addTo(map);
   }else{
      alert('Write an IP')
   }
    
   });
}
