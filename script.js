const database_side = [
  ['Links: ',  'links.mp3',],
  ['Rechts: ', 'rechts.mp3'],
];
const database_technique = [
  ['Tan Sao',  'tan.mp3',  'tan.jpg'],
  ['Gan Sao',  'gan.mp3',  'gan.jpg'],
  ['Pak Sao',  'pak.mp3',  'pak.jpg'],
  ['Cham Sao', 'cham.mp3', 'cham.jpg'],
  ['Bong Sao', 'bong.mp3', 'bong.jpg'],
];

// Entry point, gets started if button is pressed
function start() {
  html("running");
    
  let commands_array = [];
  for (let index = 0; index < get_repetitions() * 4; index += 4) {
    let random_side      = Math.round(Math.random());
    let random_technique = Math.floor(Math.random() * get_difficulty());
    
    commands_array[index+0] = database_side[random_side][0] + database_technique[random_technique][0];
    commands_array[index+1] = "images/" + database_technique[random_technique][2];
    commands_array[index+2] = "audio/side/"  + database_side[random_side][1];
    commands_array[index+3] = "audio/technique/"  + database_technique[random_technique][1];
  }
  
  console.table(commands_array);

  let index  = 0;
  let toggle = 1; //toggles between side and technique
  text.innerHTML = commands_array[index+0];
  image.src      = commands_array[index+1];
  audio.src      = commands_array[index+2];
  audio.play();
  audio.onended = function() {
    if(index < commands_array.length) {
      if(toggle == 0){
        setTimeout(function(){
          text.innerHTML = commands_array[index+0];
          image.src      = commands_array[index+1];
          audio.src      = commands_array[index+2];
          audio.play();
        },get_speed());
        toggle = 1;
      } 
      else {
        audio.src      = commands_array[index+3];
        audio.play();
        toggle = 0;
        index += 4;
      }
    } 
    else {
      html("reset");
    }
  }
}

// manipulate html depending on state
function html(state) {
  if (state == "running") {
    interaction.style.display = "none";
  }
  else if (state == "reset") {
    interaction.style.display = "block";
    image.src      = "images/hand.jpg"
    text.innerHTML = "";
  }
}

// Get value of html-select to decides which elements of *database_commands_array* 
// should be included
function get_difficulty() {
  return select.options[select.selectedIndex].value;
}

// Get waitingg time between commands
function get_speed() {
  return speed.options[speed.selectedIndex].value;
}

// Get value of repetitions input field
function get_repetitions() {
  return repetitions.value;
}