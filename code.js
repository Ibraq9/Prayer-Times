
// Dark and light mode
let mood=document.getElementById("mood");
let a_mood=document.getElementById("a-mood");
let header=document.getElementById("header");
let intro=document.getElementById("intro");


// get the button and the country-city div
let countryCityDiv = document.getElementById('country-city');
let prayer_times=document.getElementById("prayer-times");

let country=document.getElementById("country");
let city=document.getElementById("city");

let input_country=document.getElementById("input-country");
let input_city=document.getElementById("input-city");
let location1=document.getElementById("location");

let main=document.getElementById("main");
let main2=document.getElementById("main2");


let Country_select=document.getElementById("Country-select");
let city_select=document.getElementById("city-select");

let date_=document.getElementById("date-");


let title=document.getElementById("title");

//descriptipn
let Muslims_website_dis=document.getElementById("Muslims-website-dis");
let for_dis=document.getElementById("for-dis");
let prayer_times_dis=document.getElementById("prayer-times-dis");


//prayer time
let enter_c_c=document.getElementById("enter-c-c");
let iso_country=document.getElementById("iso-country");
let iso_city=document.getElementById("iso-city");
let submitt=document.getElementById("submitt");

let fagr_name=document.getElementById("fagr-name");
let sunrise_name=document.getElementById("sunrise-name");
let dhuhr_name=document.getElementById("dhuhr-name");
let asr_name=document.getElementById("asr-name");
let maghrib_name=document.getElementById("maghrib-name");
let isha_name=document.getElementById("isha-name");


let pray_name=document.querySelectorAll(".pray-name")
let pray_time=document.getElementsByClassName("pray-time")


let fagr=document.getElementById("Fagr-time");
let sunrise=document.getElementById("Sunrise-time");
let dhuhr=document.getElementById("Dhuhr-time");
let maghrib=document.getElementById("Maghrib-time");
let Isha=document.getElementById("Isha-time");
let Asr=document.getElementById("Asr-time");

let prayers=document.getElementsByClassName("prayers");

let nextPrayer=document.getElementById("nextPrayer");
let reminig_time=document.getElementById("reminig-time");


let lower_page=document.getElementById("lower-page");
let today=document.getElementById("today");



title.onclick=()=>{
  window.location.reload(true)
}



window.onload = function() {
  
    popup.style.display = "block";
  
    closeBtn.onclick = function() {
        popup.style.display = "none";
    }
  
    window.onclick = function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    }
  };
  



let toggle = false;  

mood.addEventListener("click", function() {
  if (toggle) {
    document.body.style.background = `url('imagies/wallpaperflare.com_wallpaper (23).jpg') no-repeat center / cover`;
    a_mood.innerHTML=`<i class="fa-solid fa-moon"></i>`;
    header.style.color="white";
    intro.style.color="white";

    pray_name.forEach(pray=>{
      pray.style.filter="brightness(1)"
    })

    Array.from(pray_time).forEach(pray => {
      pray.style.filter = "brightness(1)";
  });
    
  } else {
    document.body.style.background = `url('imagies/kk.jpg') no-repeat center / cover`;
    a_mood.innerHTML=`<i class="fa-solid fa-sun"></i>`;
    header.style.color="rgb(151, 149, 149)";
    intro.style.color="rgb(151, 149, 149)";

    pray_name.forEach(pray=>{
      pray.style.filter="brightness(0.7)"
    })

    Array.from(pray_time).forEach(pray => {
      pray.style.filter = "brightness(0.8)";
  });
  }
  
  toggle = !toggle;  // Toggle the state
});






// add an event listener to the button
prayer_times.addEventListener('click', () => {
  // toggle the show class
  countryCityDiv.classList.toggle('show');
  countryCityDiv.style.display="block";
});




Country_select.addEventListener("change", (event) => {
  let countryChange = event.target.value;
  city_select.options.length="";
  get_cities(countryChange);
 });





  function get_Country() {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then(response => response.json())
      .then(data => {
        let countries = data.data;
        countries.forEach(country => {
          let options = document.createElement("option");
          options.value = country.country;
          options.innerHTML = country.country;
          Country_select.appendChild(options);
       });
      })
      .catch(error => console.error("Error fetching countries:", error));
  }
   



  function get_cities(Country) {
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "country": Country })
    })
      .then(response => response.json())
      .then(data => {
        let cities = data.data;
        cities.forEach(city => {
          let options = document.createElement("option");
          options.value = city;
          options.innerHTML = city;
          city_select.appendChild(options);
        });
      })
      .catch(error => console.error("Error fetching cities:", error));
  }




function get_prayer_times() {
  let country1 = Country_select.value;
  let city1 = city_select.value;

  input_country.innerHTML = country1;
  input_city.innerHTML = city1;

  main.style.display = "none";
  main2.style.display = "block";

  fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city1}&country=${country1}`)
    .then(response => response.json())
    .then(data => {
      let times = data.data.timings;
     

      if (check_lang === "arabic") {
        fagr_name.innerHTML = "الفجر";
        sunrise_name.innerHTML = "الشروق";
        dhuhr_name.innerHTML = "الظهر";
        asr_name.innerHTML = "العصر";
        maghrib_name.innerHTML = "المغرب";
        isha_name.innerHTML = "العشاء";
       
        today.innerHTML=data.data.date.hijri.weekday.ar;
      } else {
        fagr_name.innerHTML = "Fagr";
        sunrise_name.innerHTML = "Sunrise";
        dhuhr_name.innerHTML = "Duhur";
        asr_name.innerHTML = "Asr";
        maghrib_name.innerHTML = "Maghrib";
        isha_name.innerHTML = "Isha";
       
        today.innerHTML=data.data.date.hijri.weekday.en;
      }

      // Assign times with `time_correction`
      fagr.innerHTML = time_correction(times.Fajr);
      sunrise.innerHTML = time_correction(times.Sunrise);
      dhuhr.innerHTML = time_correction(times.Dhuhr);
      Asr.innerHTML = time_correction(times.Asr);
      maghrib.innerHTML = time_correction(times.Maghrib);
      Isha.innerHTML = time_correction(times.Isha);

      // Set date
      date_.innerHTML = `${data.data.date.hijri.date} - ${data.data.date.readable}`;
    })
   
  countryCityDiv.style.display = "none";
}






let check_lang="";
let popup = document.getElementById("popup");
let closeBtn = document.getElementById("closeBtn");

function Arabic(){

  lower_page.dir = "rtl";

  // check open popup or close
 if(popup.style.display==="block"){
  popup.style.display="none";
 }else{
  popup.style.display="block";
 }

  check_lang="arabic"
  header.dir="rtl";

  countryCityDiv.dir="rtl"

  title.innerHTML="مسلمون";
 prayer_times.innerHTML="مواقيت الصلاة";
 

 Muslims_website_dis.innerHTML="موقع مسلمون"
 prayer_times_dis.innerHTML="مواقيت الصلاة"

 for_dis.style.display="none";
 main.dir="rtl";
 intro.style.marginRight="22%";

 enter_c_c.innerHTML="ادخل اسم الدولة والمدينة";


 fagr_name.innerHTML="الفجر"
 sunrise_name.innerHTML="الشروق"
 dhuhr_name.innerHTML="الظهر"
 asr_name.innerHTML="العصر"
 maghrib_name.innerHTML="المغرب"
 isha_name.innerHTML="العشاء"


 main.dir="rtl";

 Muslims_website_dis.innerHTML="موقع مسلمون"
 prayer_times_dis.innerHTML="مواقيت الصلاة"
 for_dis.style.display="none";

}





function English() {

  lower_page.dir = "ltr";

  // check open popup or close
 if(popup.style.display==="block"){
  popup.style.display="none";
 }else{
  popup.style.display="block";
 }

  check_lang="english"
  header.dir = "ltr";

  countryCityDiv.dir="ltr"

  title.innerHTML = "Muslims";
  prayer_times.innerHTML = "Prayer Times";
  
  Muslims_website_dis.innerHTML = "Muslims Website";
  prayer_times_dis.innerHTML = "Prayer times";

  fagr_name.innerHTML="Fagr"
  sunrise_name.innerHTML="Sunrise"
  dhuhr_name.innerHTML="Duhur"
  asr_name.innerHTML="Asr"
  maghrib_name.innerHTML="Maghrib"
  isha_name.innerHTML="Isha"

 
  for_dis.style.display = "block";
  main.dir = "ltr";
  intro.style.marginRight = "0";
  enter_c_c.innerHTML = "Enter Your Country and city";

};








function time_correction(time){

  let pmAM="";

  let splitsign=time.split(":");
  let hour= +splitsign[0];
  let minute= splitsign[1];

  
  if(hour >= 12){

    if(title.innerHTML==="Muslims"){
      pmAM="PM";
    }else{
      pmAM="م";
    }
   
    
    if(hour > 12){
      hour-=12;
    }
  
  }else{
    if(title.innerHTML==="مسلمون"){
      pmAM="ص";
    }else{
      pmAM="AM";
    }
  }

  if(hour===0){
    hour =12;
  }

 let timeCorrection=`${hour}:${minute} ${pmAM}`

  return timeCorrection;
}