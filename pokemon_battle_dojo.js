onEvent("StartGame", "click", function( ) {
  setScreen("choosepokemon");
});

function stopMusic() {

stopSound("rivalbattleedited.mp3");
stopSound("011-Victory-Against-Wild-Poke-mon!.mp3");
stopSound("114-Battle!-Wild-Pokemon.mp3");
stopSound("143-Battle!-Trainer-(Kanto).mp3");
stopSound("143-Gym.mp3");
stopSound("52-Battle!-(Gym-Leader-Kanto-Version.mp3");
stopSound("144-Battle!-Gym-Leader.mp3");
stopSound("57-Battle!-(Champion-Hoenn-Version).mp3");
stopSound("329-Battle!-Legendary-Pokemon.mp3");
stopSound("229-Battle!-Elite-Four.mp3");
}


var userPokemon = 0;
var rivalPokemon = 0;

//choose text font set
setProperty("choosetext", "font-family", "Lucida Sans");
//battle text font set
setProperty("battletext", "font-size",12);
setProperty("battletext", "text-color", rgb(0,0,0));

//userlevel font
setProperty("level&xp", "font-family", "Arial");
setProperty("level&xp", "font-size", 11);
//userHP font
setProperty("userHP", "font-family", "Arial");
setProperty("userHP", "font-size", 11);
//userXP
setProperty("xpnum", "font-family", "Arial");
setProperty("xpnum", "font-size", 11);
//rivallevel
setProperty("rivalLevel", "font-family", "Arial");
setProperty("rivalLevel", "font-size", 11);
//rivalHP
setProperty("rivalHP", "font-family", "Arial");
setProperty("rivalHP", "font-size", 11);

//pokemon confirmation system
onEvent("nopokemon", "click", function( ) {
  hideElement("yespokemon");
  hideElement("nopokemon");
  setText("choosetext", "Who will be your new poke-friend?");
});
onEvent("yespokemon", "click", function( ) {
updateALLpokemon();
hideMoves();
battleBlue();

});
//pokemon choose screen size changer [design purposes]
function pokemonSizer(pokemon, height, width) {
  setProperty("choose" + pokemon, "width", width);
  setProperty("choose" + pokemon, "height", height);
}
//choose squirtle handlers
onEvent("choosesquirt", "mouseover", function() {
  pokemonSizer("squirt", 130, 140);
  onEvent("choosesquirt", "click", function( ) {
    userPokemon = "squirtle";
    showElement("yespokemon");
    showElement("nopokemon");
    setText("choosetext", "I see! Squirtle is your choice.");
  });
});
onEvent("choosesquirt", "mouseout", function( ) {
  pokemonSizer("squirt", 100, 110);
});
//choose bulbasaur handlers
onEvent("choosebulb", "mouseover", function( ) {
  pokemonSizer("bulb", 130, 140);
  onEvent("choosebulb", "click", function( ) {
    userPokemon = "bulbasaur";
    showElement("yespokemon");
    showElement("nopokemon");
    setText("choosetext", "Hm! Bulbasaur is your choice.");
  });
});
onEvent("choosebulb", "mouseout", function( ) {
  pokemonSizer("bulb", 100, 110);
});
//choose charmander handlers
onEvent("choosechar", "mouseover", function( ) {
  pokemonSizer("char", 130, 140);
  onEvent("choosechar", "click", function( ) {
    userPokemon = "charmander";
    showElement("yespokemon");
    showElement("nopokemon");
    setText("choosetext", "Ah! Charmander is your choice.");
  });
});
onEvent("choosechar", "mouseout", function( ) {
  pokemonSizer("char", 100, 110);
});


// pokemon battle system
var turn = 0;

var userMaxHP = 50;
var rivalMaxHP = 50;
var userHP = userMaxHP;
var rivalHP = rivalMaxHP;
var rivalLevel = 0;

updateHP();
//Turn Alternation System
var time = 7;
function timer(button) {
  timedLoop(150, function() {
    time = time-1;
    if (time <= 0) {
      time = 5;
      stopTimedLoop();
      showElement(button);
      hideElement("burnAnimation");
      hideElement("scratchAnimation");
      hideElement("userScratchAnimation");
      hideElement("quickAttackAnimation");
      hideElement("thunderboltAnimation");
      hideElement("thunderwaveAnimation");
    }
  });
}


function blockTimer(button) {
  time = 8;
  timedLoop(150, function() {
    time = time-1;
    if (time <= 0) {
      time = 8;
      stopTimedLoop();
      hideElement(button);
    }
  });
}


function postMoveUpdate() {
  healthBar();
  evolution();
  updateHP();
  timer("Enter");
  hideElement("openBag");
  hideElement("openParty");
  hideElement("whitebox");
  updateRivalSprite();
}
//Bug Moves
onEvent("Cmove.uturn", "click", function( ) {
  Cuturn(0);
  postMoveUpdate();
});
onEvent("Amove.bugbite", "click", function( ) {
  Abugbite(0);
  postMoveUpdate();
});
onEvent("Dmove.xscissor", "click", function( ) {
  Dxscissor(0);
  postMoveUpdate();
});
//Electric Moves
onEvent("Cmove.thunderwave", "click", function( ) {
  Cthunderwave(0);
  evolution();
  timer("Enter");
  hideElement("openBag");
  hideElement("openParty");
});
onEvent("Bmove.thundershock", "click", function( ) {
  Bthundershock(0);
  postMoveUpdate();
});
//Fire Moves
onEvent("Bmove.burn", "click", function( ) {
  Bburn(0);
  evolution();
  timer("Enter");
  hideElement("openBag");
  hideElement("openParty");
});
onEvent("Cmove.flameburst", "click", function( ) {
  Cflameburst(0);
  postMoveUpdate();
});
onEvent("Cmove.fireblast", "click", function( ) {
  Cfireblast(0);
  postMoveUpdate();
});
//Grass Moves
onEvent("Bmove.absorb", "click", function( ) {
  Babsorb(0);
  postMoveUpdate();
});
onEvent("Cmove.vinewhip", "click", function( ) {
  Cvinewhip(0);
  postMoveUpdate();
});
onEvent("Cmove.razorleaf", "click", function( ) {
  Crazorleaf(0);
  postMoveUpdate();
});
onEvent("Dmove.synthesis", "click", function( ) {
  Dsynthesis(1);
  evolution();
  timer("Enter");
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
});
//Normal Moves
onEvent("Amove.scratch", "click", function( ) {
  Ascratch(0);
  postMoveUpdate();
});
onEvent("Amove.quickattack", "click", function( ) {
  Aquickattack(0);
  postMoveUpdate();
});
onEvent("Amove.takedown", "click", function( ) {
  Atakedown(0);
  postMoveUpdate();
});
onEvent("Amove.tackle", "click", function( ) {
  Atackle(0);
  postMoveUpdate();
});
onEvent("Dmove.hyperblast", "click", function( ) {
  Dhyperblast(0);
  postMoveUpdate();
});
//Rock Moves
onEvent("Bmove.stealthrock", "click", function( ) {
  Bstealthrock(0);
  postMoveUpdate();
});
onEvent("Amove.rocktomb", "click", function( ) {
  Arocktomb(0);
  postMoveUpdate();
});
onEvent("Amove.rockslide", "click", function( ) {
  Arockslide(0);
  postMoveUpdate();
});
//Dark Moves
onEvent("Bmove.falseswipe", "click", function( ) {
  Bfalseswipe(0);
  postMoveUpdate();
});
onEvent("Cmove.fakeout", "click", function( ) {
  if (rivalflinch == 1){
  showElement("whitebox");
  } else {
    hideElement("whitebox");
  }
  Cfakeout(0);
  healthBar();
  evolution();
  updateHP();
  timer("Enter");
  hideElement("openBag");
  hideElement("openParty");
});
onEvent("Bmove.bite", "click", function( ) {
  Bbite(0);
  postMoveUpdate();
});
onEvent("Amove.crunch", "click", function( ) {
  Acrunch(0);
  postMoveUpdate();
});
//Flying Moves
onEvent("Bmove.defog", "click", function( ) {
  Cdefog(0);
  postMoveUpdate();
});
onEvent("Dmove.roost", "click", function( ) {
  Droost(0);
  postMoveUpdate();
});
onEvent("Amove.wingattack", "click", function( ) {
  Awingattack(0);
  postMoveUpdate();
});
//Ground Moves
onEvent("Bmove.sandsweep", "click", function( ) {
  Bsandsweep(0);
  postMoveUpdate();
});
onEvent("Cmove.bonerush", "click", function( ) {
  Cbonerush(0);
  postMoveUpdate();
});
//Poison Moves
onEvent("Amove.toxic", "click", function( ) {
  Atoxic(0);
  evolution();
  timer("Enter");
  hideElement("openBag");
  hideElement("openParty");
});
onEvent("Bmove.poisondrip", "click", function( ) {
  Bpoisondrip(0);
  postMoveUpdate();
});
//Steel Moves
onEvent("Cmove.steelwing", "click", function( ) {
  Csteelwing(0);
  postMoveUpdate();
});
onEvent("Cmove.metalclaw", "click", function( ) {
  Cmetalclaw(0);
  postMoveUpdate();
});
//Dragon Moves
onEvent("Dmove.dragonclaw", "click", function( ) {
  Ddragonclaw(0);
  postMoveUpdate();
});
onEvent("Dmove.dragonbreath", "click", function( ) {
  Ddragonbreath(0);
  postMoveUpdate();
});
//Fighting Moves
onEvent("Amove.megapunch", "click", function( ) {
  Amegapunch(0);
  postMoveUpdate();
});
onEvent("Bmove.lowjab", "click", function( ) {
  Blowjab(0);
  postMoveUpdate();
});
//Ghost Moves
onEvent("Bmove.shadowflame", "click", function( ) {
  Bshadowflame(0);
  postMoveUpdate();
});
onEvent("Dmove.glare", "click", function( ) {
  Dglare(0);
  postMoveUpdate();
});
//Ice Moves
onEvent("Bmove.icecrash", "click", function( ) {
  Bicecrash(0);
  postMoveUpdate();
});
onEvent("Dmove.freezeblast", "click", function( ) {
  Dfreezeblast(0);
  postMoveUpdate();
});
//Psychic Moves
onEvent("Bmove.confuseray", "click", function( ) {
  Bconfuseray(0);
  evolution();
  timer("Enter");
  hideElement("openBag");
  hideElement("openParty");
});
onEvent("Cmove.psychic", "click", function( ) {
  Cpsychic(0);
  postMoveUpdate();
});
onEvent("Dmove.regenerate", "click", function( ) {
  Dregenerate(0);
  postMoveUpdate();
});
//Water Moves
onEvent("Amove.shellbash", "click", function( ) {
  Ashellbash(0);
  postMoveUpdate();
});
onEvent("Bmove.bubble", "click", function( ) {
  Bbubble(0);
  postMoveUpdate();
});
onEvent("Cmove.watergun", "click", function( ) {
  Cwatergun(0);
  postMoveUpdate();
});
onEvent("Cmove.whirlpool", "click", function( ) {
  Cwhirlpool(0);
  postMoveUpdate();
});




// RivalAI
function rivalAI() {
  if (rivalPokemon == "bulbasaur") {
    bulbasaurAI();
  } else if (rivalPokemon == "charmander") {
    charmanderAI();
  } else if (rivalPokemon == "squirtle") {
    squirtleAI();
  } else if ((rivalPokemon == "pidgey")) {
    pidgeyAI();
  } else if ((rivalPokemon == "pidgeotto")) {
    pidgeottoAI();
  } else if ((rivalPokemon == "pidgeot")) {
    pidgeotAI();
  } else if ((rivalPokemon == "zigzagoon")) {
    zigzagoonAI();
  } else if ((rivalPokemon == "linoone")) {
    linooneAI();
  } else if ((rivalPokemon == "caterpie")) {
    caterpieAI();
  } else if ((rivalPokemon == "butterfree")) {
    butterfreeAI();
  } else if ((rivalPokemon == "pikachu")) {
    pikachuAI();
  } else if ((rivalPokemon == "eevee")) {
    eeveeAI();
  } else if ((rivalPokemon == "cubone")) {
    cuboneAI();
  } else if ((rivalPokemon == "marowak")) {
    marowakAI();
  } else if ((rivalPokemon == "zubat")) {
    zubatAI();
  } else if ((rivalPokemon == "golbat")) {
    golbatAI();
  } else if ((rivalPokemon == "crobat")) {
    crobatAI();
  } else if ((rivalPokemon == "geodude")) {
    geodudeAI();
  } else if ((rivalPokemon == "slowpoke")) {
    slowpokeAI();
  } else if ((rivalPokemon == "slowbro")) {
    slowbroAI();
  } else if ((rivalPokemon == "gastly")) {
    gastlyAI();
  } else if ((rivalPokemon == "haunter")) {
    haunterAI();
  } else if ((rivalPokemon == "gengar")) {
    gengarAI();
  } else if ((rivalPokemon == "rhyhorn")) {
    rhyhornAI();
  } else if ((rivalPokemon == "rhydon")) {
    rhydonAI();
  } else if ((rivalPokemon == "scyther")) {
    scytherAI();
  } else if ((rivalPokemon == "sneasel")) {
    sneaselAI();
  } else if ((rivalPokemon == "weavile")) {
    weavileAI();
  } else if ((rivalPokemon == "roselia")) {
    roseliaAI();
  } else if ((rivalPokemon == "roserade")) {
    roseradeAI();
  } else if ((rivalPokemon == "riolu")) {
    rioluAI();
  } else if ((rivalPokemon == "kadabra")) {
    kadabraAI();
  } else if ((rivalPokemon == "buizel")) {
    buizelAI();
  } else if ((rivalPokemon == "mewtwo")) {
    mewtwoAI();
  } else if ((rivalPokemon == "spearow")) {
    spearowAI();
  } else if ((rivalPokemon == "vulpix")) {
    vulpixAI();
  } else if ((rivalPokemon == "galvantula")) {
    galvantulaAI();
  } else if ((rivalPokemon == "persian")) {
    persianAI();
  } else if ((rivalPokemon == "dragonair")) {
    dragonairAI();
  } else if ((rivalPokemon == "nuzleaf")) {
    nuzleafAI();
  } else if ((rivalPokemon == "seviper")) {
    seviperAI();
  } else if ((rivalPokemon == "dusclops")) {
    dusclopsAI();
  } else if ((rivalPokemon == "kabutops")) {
    kabutopsAI();
  } else if ((rivalPokemon == "sandslash")) {
    sandslashAI();
  } else if ((rivalPokemon == "bisharp")) {
    bisharpAI();
  } else if ((rivalPokemon == "cofagrigus")) {
    cofagrigusAI();
  } else if ((rivalPokemon == "zweilous")) {
    zweilousAI();
  } else if ((rivalPokemon == "espeon")) {
    espeonAI();
  } else if ((rivalPokemon == "lapras")) {
    laprasAI();
  } else if ((rivalPokemon == "ninetales")) {
    ninetalesAI();
  } else if ((rivalPokemon == "dragonite")) {
    dragoniteAI();
  } else if ((rivalPokemon == "ninjask")) {
    ninjaskAI();
  } else if ((rivalPokemon == "shiftry")) {
    shiftryAI();
  } else if ((rivalPokemon == "hydreigon")) {
    hydreigonAI();
  } else if ((rivalPokemon == "gyarados")) {
    gyaradosAI();
  } else if ((rivalPokemon == "houndoom")) {
    houndoomAI();
  } else if ((rivalPokemon == "aerodactyl")) {
    aerodactylAI();
  } else if ((rivalPokemon == "tauros")) {
    taurosAI();
  } else if ((rivalPokemon == "tyranitar")) {
    tyranitarAI();
  }  
  
  updateALLpokemon();
  updateHP();
  healthBar();
}
//
//
var attack = 0;
function bulbasaurAI() {
  Atackle(1);
}
function charmanderAI() {
  Ascratch(1);
}
function squirtleAI() {
  Ascratch(1);
} 
function zigzagoonAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Bsandsweep(1);   
    }
  else if (attack == 2 ){
    Ascratch(1);
  }
}
function linooneAI() {
  attack = randomNumber(1, 4);
    if (attack == 1 ) {
     Aquickattack(1);
  }
  else if (attack == 2 ){
     Bsandsweep(1);
  }
  else if (attack == 3 ){
     Cmetalclaw(1);
  }
  else if (attack == 4 ){
     Dglare(1);
  }
}
function pidgeyAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Awingattack(1);
  }
  else if (attack == 2 ){
     Bsandsweep(1);
  }
}
function pidgeottoAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Awingattack(1);
  }
  else if (attack == 2 ){
     Csteelwing(1);
  }
  else if (attack == 3 ){
     Bsandsweep(1);
  }
}
function caterpieAI() {
  Abugbite(1);
}
function butterfreeAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Awingattack(1);
  }
  else if (attack == 2 ){
     Bpoisondrip(1);
  }
  else if (attack == 3 ){
     Dsynthesis(1);
  }
}
function pikachuAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Aquickattack(1);
  }
  else if (attack == 2 ){
     Bthundershock(1);
  }
  else if (attack == 3 ){
     Cthunderwave(1);
  }
}
function eeveeAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Atakedown(1);
  }
  else if (attack == 2 ){
     Bsandsweep(1);
  }
}
function cuboneAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Atackle(1);
  }
  else if (attack == 2 ){
     Bsandsweep(1);
  }
}
function marowakAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Cbonerush(1);
  }
  else if (attack == 2 ){
     Bsandsweep(1);
  }
}
function geodudeAI() {
  Arocktomb(1);
}
function zubatAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Awingattack(1);
  }
  else if (attack == 2 ){
     Bbite(1);
  }
}
function golbatAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Awingattack(1);
  }
  else if (attack == 2 ){
     Bbite(1);
  }
  else if (attack == 3 ){
     Csteelwing(1);
  }
}
function crobatAI() {
  attack = randomNumber(1, 4);
    if (usertype == "psychic" || usertype == "ghost") {
     Acrunch(1);
  }
  else if (usertype == "grass"){
     Dxscissor(1);
  }
  else if (usertype == "rock"){
     steelwing(1);
  }
  else if (attack == 1 ){
     Acrunch(1);
  }
  else if (attack == 2 ){
     Awingattack(1);
  }
  else if (attack == 3 ){
     Csteelwing(1);
  }
  else if (attack == 4 ){
     Dxscissor(1);
  }
}
function slowpokeAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Atackle(1);
  }
  else if (attack == 2 ){
     Bconfuseray(1);
  }
}
function slowbroAI() {
  attack = randomNumber(1, 4);
    if (attack == 1 ) {
     Ashellbash(1);
  }
  else if (attack == 2 ){
     Bconfuseray(1);
  }
  else if (attack == 3 ){
     Cpsychic(1);
  }
  else if (attack == 4 ){
     Dhyperblast(1);
  }
}
function gastlyAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Atoxic(1);
  }
  else if (attack == 2 ){
     Bshadowflame(1);
  }
}
function haunterAI() {
  attack = randomNumber(1, 3);
  if (attack == 1 ) {
     Atoxic(1);
  }
  else if (attack == 2 ){
     Bshadowflame(1);
  }
  else if (attack == 3 ){
     Cfakeout(1);
  }
}
function gengarAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Atoxic(1);
  }
  else if (attack == 2 ){
     Bpoisondrip(1);
  }
  else if (attack == 2 ){
     Bshadowflame(1);
  }
  else if (attack == 2 ){
     Cfakeout(1);
  }
}
function rhyhornAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Atakedown(1);
  }
  else if (attack == 2 ){
     Arocktomb(1);
  }
}
function rhydonAI() {
  attack = randomNumber(1, 4);
    if (usertype == "fire") {
     Arockslide(1);
  }
  else if (attack == 1 ){
     Arockslide(1);
  }
  else if (attack == 2 ){
     Bstealthrock(1);
  }
  else if (attack == 3 ){
     Cmetalclaw(1);
  }
  else if (attack == 4 ){
     Dhyperblast(1);
  }
}
function scytherAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Aquickattack(1);
  }
  else if (attack == 2 ){
     Dxscissor(1);
  }
}
function sneaselAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Cfakeout(1);
  }
  else if (attack == 2 ){
     Bicecrash(1);
  }
  else if (attack == 2 ){
     Aquickattack(1);
  }
}
var flinchcheck = 0;
function weavileAI() {
  attack = randomNumber(1, 2);
    if (flinchcheck == 0) {
     Cfakeout(1);
     flinchcheck = 1;
  }
  else if (usertype == "grass"){
     Bicecrash(1);
  }
  else if (attack == 1 ){
     Aquickattack(1);
  }
  else if (attack == 2 ){
     Bicecrash(1);
  }
  else if (attack == 3 ){
     Cfakeout(1);
  }
  else if (attack == 4 ){
     Dxscissor(1);
  }
}
function roseliaAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Atoxic(1);
  }
  else if (attack == 2 ){
     Babsorb(1);
  }
}
var healcheck = 0;
function roseradeAI() {
  attack = randomNumber(1, 2);
    if (flinchcheck == 0) {
     Atoxic(1);
     flinchcheck = 1;
  }
  else if (healcheck == 0){
     Dsynthesis(1);
     healcheck = 1;
  }
  else if (attack == 1 ){
     Bpoisondrip(1);
  }
  else if (attack == 2 ){
     Crazorleaf(1);
  }
}
function rioluAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Atackle(1);
  }
  else if (attack == 2 ){
     Blowjab(1);
  }
}
function kadabraAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Ascratch(1);
  }
  else if (attack == 2 ){
     Bconfuseray(1);
  }
  else if (attack == 3 ){
     Cpsychic(1);
  }
}
function buizelAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Aquickattack(1);
  }
  else if (attack == 2 ){
     Bbubble(1);
  }
}
function mewtwoAI() {
  attack = randomNumber(1, 4);
    if (usertype == "rock") {
     Amegapunch(1);
  }
  else if (usertype == "psychic"){
     Bshadowflame(1);
  }
  else if (usertype == "fighting"){
     Cpsychic(1);
  }
  else if (attack == 1 ){
     Amegapunch(1);
  }
  else if (attack == 2 ){
     Bshadowflame(1);
  }
  else if (attack == 3 ){
     Cpsychic(1);
  }
  else if (attack == 4 ){
     Dregenerate(1);
  }
}
function spearowAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Awingattack(1);
  }
  else if (attack == 2 ){
     Bsandsweep(1);
  }
}
function vulpixAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Atackle(1);
  }
  else if (attack == 2 ){
     Bburn(1);
  }
  else if (attack == 2 ){
     Cflameburst(1);
  }
}
function ninetalesAI() {
  attack = randomNumber(1, 4);
    if (healcheck == 0) {
     Bburn(1);
     healcheck = 1;
  }
  else if (usertype == "psychic"){
     Acrunch(1);
  }
  else if (usertype == "grass" || usertype == "bug"){
     Cfireblast(1);
  }
  else if (attack == 1 ){
     Bshadowflame(1);
  }
  else if (attack == 2 ){
     Cfireblast(1);
  }
  else if (attack == 3 ){
     Acrunch(1);
  }
   else if (attack == 4 ){
     Atakedown(1);
  }
}
function galvantulaAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Abugbite(1);
  }
  else if (attack == 2 ){
     Bthundershock(1);
  }
}
function persianAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Bbite(1);
  }
  else if (attack == 2 ){
     Cfakeout(1);
  }
  else if (attack == 3 ){
     Ascratch(1);
  }
}
function dragonairAI() {
  attack = randomNumber(1, 4);
    if (usertype == "water") {
     Bthundershock(1);
  }
  else if (usertype == "grass"){
     Cflameburst(1);
  }
  else if (attack == 1 ){
     Ddragonbreath(1);
  }
  else if (attack == 2 ){
     Bthundershock(1);
  }
  else if (attack == 3 ){
     Cflameburst(1);
  }
  else if (attack == 3 ){
     Ddragonbreath(1);
  }
}
function dragoniteAI() {
  attack = randomNumber(1, 4);
    if (attack == 1 ) {
     Ddragonbreath(1);
  }
  else if (usertype == "fighting"){
     Awingattack(1);
  }
  else if (usertype == "water"){
     Bthundershock(1);
  }
  else if (usertype == "grass" || usertype == "ice"){
     Cfireblast(1);
  }
  else if (attack == 2){
     Adragonclaw(1);
  }
  else if (usertype == "psychic"){
     Acrunch(1);
  }
  else if (attack == 3){
     Dregenerate();
  }
  else if (usertype == "rock"){
     Csteelwing();
  }
  else if (attack == 4){
     Dhyperblast();
  }
}
function nuzleafAI() {
  attack = randomNumber(1,2);
    if (flinchcheck == 0) {
     Cfakeout(1);
     flinchcheck = 1;
  }
  else if (attack == 1 ){
     Cvinewhip(1);
  }
  else if (attack == 2 ){
     Ascratch(1);
  }
}
function shiftryAI() {
  attack = randomNumber(1, 2);
    if (flinchcheck == 0) {
     Cfakeout(1);
     flinchcheck = 1;
  }
  else if (healcheck == 0){
    Cuturn(1);
    healcheck = 1;
  }
  else if (attack == 1 ){
    Crazorleaf(1);
  }
  else if (attack == 2 ){
    Aquickattack(1);
  }
}
function seviperAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Acrunch(1);
  }
  else if (attack == 2 ){
     Atoxic(1);
  }
  else if (attack == 3 ){
     Bpoisondrip(1);
  }
}
function dusclopsAI() {
  attack = randomNumber(1, 2);
    if (attack == 1 ) {
     Bshadowflame(1);
  }
  else if (attack == 2 ){
     Dglare(1);
  }
}
function kabutopsAI() {
  attack = randomNumber(1, 4);
    if (usertype == "rock" || usertype == "fire") {
     Cwatergun(1);
  }
  else if (attack == 1 ){
     Arockslide(1);
  }
  else if (attack == 2 ){
     Dxscissor(1);
  }
  else if (attack == 3 ){
     Bfalseswipe(1);
  }
  else if (attack == 4 ){
     Cwatergun(1);
  }
}
function sandslashAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Bsandsweep(1);
  }
  else if (attack == 2 ){
     Cmetalclaw(1);
  }
  else if (attack == 3 ){
     Ascratch(1);
  }
}
function bisharpAI() {
  attack = randomNumber(1, 3);
    if (usertype == "rock") {
     Cmetalclaw(1);
  }
  else if (attack == 1 ){
     Bfalseswipe(1);
  }
  else if (attack == 2 ){
     Dscissor(1);
  }
  else if (attack == 3 ){
     Bstealthrock(1);
  }
}
function cofagrigusAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Bsandsweep(1);
  }
  else if (attack == 2 ){
     Bshadowflame(1);
  }
  else if (attack == 3 ){
     Dglare(1);
  }
}
function zweilousAI() {
  attack = randomNumber(1, 3);
    if (attack == 1 ) {
     Bbite(1);
  }
  else if (attack == 2 ){
     Ddragonclaw(1);
  }
  else if (attack == 3 ){
     Atakedown(1);
  }
}
function espeonAI() {
  attack = randomNumber(1, 2);
    if (flinchcheck == 0) {
     Cfakeout(1);
     flinchcheck = 1;
  }
  else if (healcheck == 0){
     Dsynthesis(1);
     healcheck = 1;
  }
  else if (usertype == "fighting"){
     Cpsychic(1);
  }
  else if (attack == 1 ){
     Cpsychic(1);
  }
  else if (attack == 2 ){
     Dregenerate(1);
}
}
function laprasAI() {
  attack = randomNumber(1, 2);
    if (usertype == "fire") {
     Cwhirlpool(1);
  }
  else if (usertype == "psychic"){
     Acrunch(1);
  }
  else if (attack == 1 ){
     Acrunch(1);
  }
  else if (attack == 2 ){
     Cwhirlpool(1);
  }
  else if (attack == 3 ){
     Dfreezeblast(1);
  }
  else if (attack == 4 ){
     Dregenerate(1);
  }
}
function ninjaskAI() {
  attack = randomNumber(1, 2);
    if (flinchcheck == 0) {
     Bstealthrock(1);
     flinchcheck = 1;
  }
  else if (healcheck == 0){
     Cuturn(1);
     healcheck = 1;
  }
  else if (attack == 1 ){
     Cuturn(1);
  }
  else if (attack == 2 ){
     Abugbite(1);
  }
}
function hydreigonAI() {
  attack = randomNumber(1, 2);
    if (usertype == "grass") {
     Cfireblast(1);
  }
  else if (usertype == "psychic"){
     Acrunch(1);
  }
  else if (attack == 1 ){
     Bburn(1);
  }
  else if (attack == 2 ){
     Ddragonbreath(1);
  }
  else if (attack == 3 ){
     Ddragonclaw(1);
  }
  else if (attack == 4 ){
     Acrunch(1);
  }
}
function gyaradosAI() {
  attack = randomNumber(1, 4);
    if (attack == 1 ) {
     Cwhirlpool(1);
  }
  else if (attack == 2 ){
     Acrunch(1);
  }
  else if (attack == 3 ){
     Ddrangonbreath(1);
  }
  else if (attack == 4 ){
     Dglare(1);
  }
}
function houndoomAI() {
  attack = randomNumber(1, 2);
    if (usertype == "grass") {
     Cfireblast(1);
  }
  else if (usertype == "psychic"){
     Acrunch(1);
  }
  else if (attack == 1 ){
     Acrunch(1);
  }
  else if (attack == 2 ){
     Bburn(1);
  }
  else if (attack == 3 ){
     Cfireblast(1);
  }
  else if (attack == 4 ){
     (1);
  }
}
function aerodactylAI() {
  attack = randomNumber(1, 2);
    if (usertype == "psychic") {
     Acrunch(1);
  }
  else if (usertype == "fire"){
     Arockslide(1);
  }
  else if (attack == 1 ){
     Acrunch(1);
  }
  else if (attack == 3 ){
     Arockslide(1);
  }
  else if (attack == 4 ){
     Bsandsweep(1);
  }
  else if (attack == 4 ){
     Awingattack(1);
  }
}
function taurosAI() {
  attack = randomNumber(1, 4);
    if (attack == 1 ) {
     Atackle(1);
  }
  else if (attack == 2 ){
     Dhyperblast(1);
  }
  else if (attack == 3 ){
     Atakedown(1);
  }
   else if (attack == 4 ){
     Bsandsweep(1);
  }
}
function tyranitarAI() {
  attack = randomNumber(1, 4);
    if (attack == 1 ) {
     Dhyperblast(1);
  }
  else if (attack == 2 ){
     Acrunch(1);
  }
  else if (attack == 3 ){
     Cfireblast(1);
  }
  else if (attack == 4 ){
     Ddragonclaw(1);
  }
}






var damagecounter = 0;
function userLevelAdjustor() {
  if (level == 5) {
    damagecounter = 1;
  } else if (level == 6) {
    damagecounter = 1.1;
  } else if (level == 7) {
    damagecounter = 1.2;
  } else if (level == 8) {
    damagecounter = 1.3;
  } else if (level == 9) {
    damagecounter = 1.4;
  } else if (level == 10) {
    damagecounter = 1.5;
  } else if (level == 11) {
    damagecounter = 1.6;
  } else if (level == 12) {
    damagecounter = 1.7;
  } else if (level == 13) {
    damagecounter = 1.8;
  } else if (level == 14) {
    damagecounter = 1.9;
  } else if (level == 15) {
    damagecounter = 2.0;
  } else if (level == 16) {
    damagecounter = 2.1;
  } else if (level == 17) {
    damagecounter = 2.2;
  } else if (level == 18) {
    damagecounter = 2.3;
  } else if (level === 19) {
    damagecounter = 2.4;
  } else if (level == 20) {
    damagecounter = 2.5;
  }
}

function rivalLevelAdjustor() {
  if (rivalLevel == 5) {
    damagecounter = 1;
  } else if (rivalLevel == 6) {
    damagecounter = 1.1;
  } else if (rivalLevel == 7) {
    damagecounter = 1.2;
  } else if (rivalLevel == 8) {
    damagecounter = 1.3;
  } else if (rivalLevel == 9) {
    damagecounter = 1.4;
  } else if (rivalLevel == 10) {
    damagecounter = 1.5;
  } else if (rivalLevel == 11) {
    damagecounter = 1.6;
  } else if (rivalLevel == 12) {
    damagecounter = 1.7;
  } else if (rivalLevel == 13) {
    damagecounter = 1.8;
  } else if (rivalLevel == 14) {
    damagecounter = 1.9;
  } else if (rivalLevel == 15) {
    damagecounter = 2.0;
  } else if (rivalLevel == 16) {
    damagecounter = 2.1;
  } else if (rivalLevel == 17) {
    damagecounter = 2.2;
  } else if (rivalLevel == 18) {
    damagecounter = 2.3;
  } else if (rivalLevel === 19) {
    damagecounter = 2.4;
  } else if (rivalLevel == 20) {
    damagecounter = 2.5;
  }
}

var effective = 0;
var movetype = 0;
//User Type Advantages
function usertypeadvantage() {
 //bug
 if (movetype == "bug" && (rivaltype == "grass" || rivaltype == "psychic" || rivaltype == "dark")) {
    effective = 2;
  } else if (movetype == "bug" && (rivaltype == "fire" || rivaltype == "poison" || rivaltype == "flying" || rivaltype == "steel")) {
    effective = 0.75;
  } 
 //electric
  else if (movetype == "electric" && (rivaltype == "water" || rivaltype == "flying")) {
   effective = 2;
 } else if (movetype == "electric" && (rivaltype == "electric" || rivaltype == "dragon" || rivaltype == "grass")) {
   effective = 0.75;
 } 
 //fire
  else if (movetype == "fire" && (rivaltype == "grass" || rivaltype == "bug" || rivaltype == "ice" || rivaltype == "steel")) {
   effective = 2;
 } else if (movetype == "fire" && (rivaltype == "fire" || rivaltype == "water" || rivaltype == "rock" || rivaltype == "dragon")) {
   effective = 0.75;
 } 
 //grass
  else if (movetype == "grass" && (rivaltype == "water" || rivaltype == "ground" || rivaltype == "rock")) {
   effective = 2;
 } else if (movetype == "grass" && (rivaltype == "fire" || rivaltype == "grass" || rivaltype == "poison" || rivaltype == "bug" || rivaltype == "flying")) {
   effective = 0.75;
 } 
 //normal
  else if (movetype == "normal" && (rivaltype == "steel" || rivaltype == "fighting")) {
   effective = 0.75;  
 } else if (movetype == "normal" && (rivaltype == "ghost")) {
   effective = 0;
   setText("battletext", "normal-type moves cannot damage ghost-type pokemon");
 //rock
 } else if (movetype == "rock" && (rivaltype == "fire" || rivaltype == "ice" || rivaltype == "flying" || rivaltype == "bug")) {
   effective = 2;
 } else if (movetype == "rock" && (rivaltype == "steel" || rivaltype == "fighting" || rivaltype == "ground")) {
   effective = 0.75;
 //dark
 } else if (movetype == "dark" && (rivaltype == "psychic" || rivaltype == "ghost")) {
   effective = 2;
 } else if (movetype == "dark" && (rivaltype == "fighting" || rivaltype == "dark")) {
   effective = 0.75;
 //flying
 } else if (movetype == "flying" && (rivaltype == "grass" || rivaltype == "fighting" || rivaltype == "bug")) {
   effective = 2;
 } else if (movetype == "flying" && (rivaltype == "electric" || rivaltype == "rock")) {
   effective = 0.75;
 //ground
 } else if (movetype == "ground" && (rivaltype == "electric" || rivaltype == "fire" || rivaltype == "poison" || rivaltype == "rock" || rivaltype == "steel" )) {
   effective = 2;
 } else if (movetype == "ground" && (rivaltype == "grass" || rivaltype == "bug")) {
   effective = 0.75;
 } else if (movetype == "ground" && (rivaltype == "flying")) {
   effective = 0;
   setText("battletext", "ground-type moves cannot damage flying-type pokemon");
 //poison
 } else if (movetype == "poison" && (rivaltype == "grass")) {
   effective = 2;
 } else if (movetype == "poison" && (rivaltype == "poison" || rivaltype == "ground" || rivaltype == "rock" || rivaltype == "ghost")) {
   effective = 0.75;
 } else if (movetype == "poison" && (rivaltype == "steel")) {
   effective = 0;
   setText("battletext", "poison-type moves cannot damage steel-type pokemon");
 //steel
 } else if (movetype == "steel" && (rivaltype == "ice" || rivaltype == "rock")) {
   effective = 2;
 } else if (movetype == "steel" && (rivaltype == "fire" || rivaltype == "water" || rivaltype == "electric" || rivaltype == "steel")) {
   effective = 0.75;
 //dragon
 } else if (movetype == "dragon" && (rivaltype == "dragon")) {
   effective = 2;
 } else if (movetype == "dragon" && (rivaltype == "steel")) {
   effective = 0.75;
 //fighting
 } else if (movetype == "fighting" && (rivaltype == "normal" || rivaltype == "ice" || rivaltype == "rock" || rivaltype == "dark" || rivaltype == "steel")) {
   effective = 2;
 } else if (movetype == "fighting" && (rivaltype == "poison" || rivaltype == "bug" || rivaltype == "psychic" || rivaltype == "flying")) {
   effective = 0.75;
 //ghost
 } else if (movetype == "ghost" && (rivaltype == "psychic" || rivaltype == "ghost")) {
   effective = 2;
 } else if (movetype == "ghost" && (rivaltype == "dark")) {
   effective = 0.75;
 } else if (movetype == "ghost" && (rivaltype == "normal")) {
   effective = 0;
   setText("battletext", "ghost-type moves cannot damage normal-type pokemon");
 //ice
 } else if (movetype == "ice" && (rivaltype == "flying" || rivaltype == "grass" || rivaltype == "dragon" || rivaltype == "ground")) {
   effective = 2;
 } else if (movetype == "ice" && (rivaltype == "fire" || rivaltype == "water" || rivaltype == "ice" || rivaltype == "steel")) {
   effective = 0.75;
 //psychic
 } else if (movetype == "psychic" && (rivaltype == "fighting" || rivaltype == "poison")) {
   effective = 2;
 } else if (movetype == "psychic" && (rivaltype == "psychic" || rivaltype == "steel")) {
   effective = 0.75;
 } else if (movetype == "psychic" && (rivaltype == "dark")) {
   effective = 0;
   setText("battletext", "psychic-type moves cannot damage dark-type pokemon");
 //water
 } else if (movetype == "water" && (rivaltype == "fire" || rivaltype == "ground" || rivaltype == "rock")) {
   effective = 2;
 } else if (movetype == "water" && (rivaltype == "water" || rivaltype == "grass" || rivaltype == "dragon")) {
   effective = 0.75;
 } else if (movetype == "bug" || movetype == "electric" || movetype == "fire" || movetype == "grass" || movetype == "normal" || movetype == "rock") {
   effective = 1;
 } else if (movetype == "dark" || movetype == "flying" || movetype == "ground" || movetype == "poison" || movetype == "steel") {
   effective = 1;
 } else if (movetype == "dragon" || movetype == "fighting" || movetype == "ghost" || movetype == "ice" || movetype == "psychic" || movetype == "water") {
  effective = 1;
 }
}


//Rival Type Advantages
function rivaltypeadvantage() {
 //bug
 if (movetype == "bug" && (usertype == "grass" || usertype == "psychic" || usertype == "dark")) {
    effective = 2;
  } else if (movetype == "bug" && (usertype == "fire" || usertype == "poison" || usertype == "flying" || usertype == "steel")) {
    effective = 0.75;
  } 
 //electric
  else if (movetype == "electric" && (usertype == "water" || usertype == "flying")) {
   effective = 2;
 } else if (movetype == "electric" && (usertype == "electric" || usertype == "dragon" || usertype == "grass")) {
   effective = 0.75;
 } 
 //fire
  else if (movetype == "fire" && (usertype == "grass" || usertype == "bug" || usertype == "ice" || usertype == "steel")) {
   effective = 2;
 } else if (movetype == "fire" && (usertype == "fire" || usertype == "water" || usertype == "rock" || usertype == "dragon")) {
   effective = 0.75;
 } 
 //grass
  else if (movetype == "grass" && (usertype == "water" || usertype == "ground" || usertype == "rock")) {
   effective = 2;
 } else if (movetype == "grass" && (usertype == "fire" || usertype == "grass" || usertype == "poison" || usertype == "bug" || usertype == "flying")) {
   effective = 0.75;
 } 
 //normal
  else if (movetype == "normal" && (usertype == "steel" || usertype == "fighting")) {
   effective = 0.75;  
 } else if (movetype == "normal" && (usertype == "ghost")) {
   effective = 0;
   setText("battletext", "normal-type moves cannot damage ghost-type pokemon");
 //rock
 } else if (movetype == "rock" && (usertype == "fire" || usertype == "ice" || usertype == "flying" || usertype == "bug")) {
   effective = 2;
 } else if (movetype == "rock" && (usertype == "steel" || usertype == "fighting" || usertype == "ground")) {
   effective = 0.75;
 //dark
 } else if (movetype == "dark" && (usertype == "psychic" || usertype == "ghost")) {
   effective = 2;
 } else if (movetype == "dark" && (usertype == "fighting" || usertype == "dark")) {
   effective = 0.75;
 //flying
 } else if (movetype == "flying" && (usertype == "grass" || usertype == "fighting" || usertype == "bug")) {
   effective = 2;
 } else if (movetype == "flying" && (usertype == "electric" || usertype == "rock")) {
   effective = 0.75;
 //ground
 } else if (movetype == "ground" && (usertype == "electric" || usertype == "fire" || usertype == "poison" || usertype == "rock" || usertype == "steel" )) {
   effective = 2;
 } else if (movetype == "ground" && (usertype == "grass" || usertype == "bug")) {
   effective = 0.75;
 } else if (movetype == "ground" && (usertype == "flying")) {
   effective = 0;
   setText("battletext", "ground-type moves cannot damage flying-type pokemon");
 //poison
 } else if (movetype == "poison" && (usertype == "grass")) {
   effective = 2;
 } else if (movetype == "poison" && (usertype == "poison" || usertype == "ground" || usertype == "rock" || usertype == "ghost")) {
   effective = 0.75;
 } else if (movetype == "poison" && (usertype == "steel")) {
   effective = 0;
   setText("battletext", "poison-type moves cannot damage steel-type pokemon");
 //steel
 } else if (movetype == "steel" && (usertype == "ice" || usertype == "rock")) {
   effective = 2;
 } else if (movetype == "steel" && (usertype == "fire" || usertype == "water" || usertype == "electric" || usertype == "steel")) {
   effective = 0.75;
 //dragon
 } else if (movetype == "dragon" && (usertype == "dragon")) {
   effective = 2;
 } else if (movetype == "dragon" && (usertype == "steel")) {
   effective = 0.75;
 //fighting
 } else if (movetype == "fighting" && (usertype == "normal" || usertype == "ice" || usertype == "rock" || usertype == "dark" || usertype == "steel")) {
   effective = 2;
 } else if (movetype == "fighting" && (usertype == "poison" || usertype == "bug" || usertype == "psychic" || usertype == "flying")) {
   effective = 0.75;
 //ghost
 } else if (movetype == "ghost" && (usertype == "psychic" || usertype == "ghost")) {
   effective = 2;
 } else if (movetype == "ghost" && (usertype == "dark")) {
   effective = 0.75;
 } else if (movetype == "ghost" && (usertype == "normal")) {
   effective = 0;
   setText("battletext", "ghost-type moves cannot damage normal-type pokemon");
 //ice
 } else if (movetype == "ice" && (usertype == "flying" || usertype == "grass" || usertype == "dragon" || usertype == "ground")) {
   effective = 2;
 } else if (movetype == "ice" && (usertype == "fire" || usertype == "water" || usertype == "ice" || usertype == "steel")) {
   effective = 0.75;
 //psychic
 } else if (movetype == "psychic" && (usertype == "fighting" || usertype == "poison")) {
   effective = 2;
 } else if (movetype == "psychic" && (usertype == "psychic" || usertype == "steel")) {
   effective = 0.75;
 } else if (movetype == "psychic" && (usertype == "dark")) {
   effective = 0;
   setText("battletext", "psychic-type moves cannot damage dark-type pokemon");
 //water
 } else if (movetype == "water" && (usertype == "fire" || usertype == "ground" || usertype == "rock")) {
   effective = 2;
 } else if (movetype == "water" && (usertype == "water" || usertype == "grass" || usertype == "dragon")) {
   effective = 0.75;
 } else if (movetype == "bug" || movetype == "electric" || movetype == "fire" || movetype == "grass" || movetype == "normal" || movetype == "rock") {
   effective = 1;
 } else if (movetype == "dark" || movetype == "flying" || movetype == "ground" || movetype == "poison" || movetype == "steel") {
   effective = 1;
 } else if (movetype == "dragon" || movetype == "fighting" || movetype == "ghost" || movetype == "ice" || movetype == "psychic" || movetype == "water") {
 effective = 1;
 }
}

// Pokemon Moves
  //Bug Type Moves
    //move.bugbite
        function Abugbite(num){
        movetype = "bug";
        var damage = randomNumber(6, 9);
        turn = num;
        if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used bug bite.");
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used bug bite.");
      }
        updateHP();
        hideMoves();
      }
    //move.u-turn
        function Cuturn(num) {
        movetype = "bug";
        var damage = randomNumber(12,15);
        turn = num;
        if (turn == 0) {
        userClearStatusEffects();
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        if (partypkmn1 != false) {
        setScreen("party");
        hideElement("party2battle");
      }
        setText("battletext", userPokemon + " used u-turn.");
      } else if (turn == 1) {
        rivalClearStatusEffects();
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        if (rivalHPpp1 > 0 && rivalEXISTpp1 == true) {
        rivalSwitch1();
        setText("battletext", rivalpp1 + " used u-turn.");
      } else if (rivalHPpp2 >= 0 && rivalEXISTpp2 == true) {
        rivalSwitch2();
        setText("battletext", rivalpp2 + " used u-turn.");
      } else if (rivalHPpp3 > 0 && rivalEXISTpp3 == true) {
        rivalSwitch3();
        setText("battletext", rivalpp3 + " used u-turn.");
      } else if (rivalHPpp4 > 0 && rivalEXISTpp4 == true) {
        rivalSwitch4();
        setText("battletext", rivalpp4 + " used u-turn.");
      } else {
        rivalPokemon = rivalPokemon;
        setText("battletext", "the u-turn failed.");
      }
      }
        updateHP();
        hideMoves();
      }
    //move.x-scissor
        function Dxscissor(num){
        movetype = "bug";
        var damage = randomNumber(16, 20);
        turn = num;
        if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used x-scissor.");
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used x-scissor.");
      }
        updateHP();
        hideMoves();
      }
  //Electric Type Moves
     //move.thunderwave Function
  var userParalysis = false;
  var rivalParalysis = false;
        function Cthunderwave(num) {
        movetype = "electric";
        turn = num;
        if (turn == 0) {
        rivalClearStatusEffects();
        rivalParalysis = true;
            setText("battletext", (userPokemon + " used thunderwave. " + rivalPokemon+ " is paralyzed."));
      } else if (turn == 1) {
        showElement("thunderwaveAnimation");
        playSound("Thunder-Wave.mp3", false);
        userClearStatusEffects();
        userParalysis = true;
        setText("battletext", (rivalPokemon + " used thunderwave. " + userPokemon+ " is paralyzed."));
      }
        updateHP();
       healthBar();
       hideMoves();
      }
    //move.thundershock Function
        function Bthundershock(num) {
        movetype = "electric";
        turn = num;
        var damage = randomNumber(13, 15);
        if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", (userPokemon + " used thundershock. "));
      } else if (turn == 1) {
        showElement("thunderboltAnimation");
        playSound("Thunderbolt.mp3", false);
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", (rivalPokemon + " used thundershock. "));
      }
        hideMoves();
        updateHP();
      }
    //paralysis function
        function paralysis() {
    if (rivalParalysis == true) {
        setText("battletext", rivalPokemon + " is paralyzed.");
      } else if (userParalysis == true) {
        setText("battletext", userPokemon + " is paralyzed.");
        hideElement("Fight");
      }
        updateHP();
        healthBar();
      } 
  //Fire Type Moves
    //move.burn Function 
    var userBurn = false;
    var rivalBurn = false;
      function Bburn(num) {
        
        var damage = randomNumber(9,10);
        turn = num;
        if (turn == 0) {
          rivalClearStatusEffects();
          setText("battletext", userPokemon + " burned " + rivalPokemon );
          if (userBurn == false) {
            if (rivaltype == "grass") {
              damage = damage * 1.3;
              damage = Math.round(damage);
              rivalHP = rivalHP-damage;
            } else if ((rivaltype == "water")) {
              damage = damage * 0.75;
              damage = Math.round(damage);
              rivalHP = rivalHP-damage;
            } else {
              rivalHP = rivalHP-damage;
            }
            rivalBurn = true;
            showElement("burnlabelrival");
            showElement("burnAnimation");
            playSound("Ember.mp3", false);
            
          }
        } else if (turn == 1) {
          userClearStatusEffects();
          setText("battletext", rivalPokemon + " burned " + userPokemon );
          if (userBurn == false) {
            if (usertype == "grass") {
              damage = damage * 1.3;
              damage = Math.round(damage);
              userHP = userHP-damage;
            } else if ((usertype == "water")) {
              damage = damage * 0.75;
              damage = Math.round(damage);
              userHP = userHP-damage;
            } else {
              userHP = userHP-damage;
            }
            userBurn = true;
            showElement("burnlabeluser");
          }
        }
        updateHP();
        healthBar();
        hideMoves();
      }
      function burnedFunction() {
        var damage = randomNumber(4, 5);
        if (userBurn == true) {
          userHP = userHP - damage;
        } else if ((rivalBurn == true)) {
          rivalHP = rivalHP-damage;
          if (rivalHP <= 0) {
            faintedFunc();
            battleRegulate();
          }
        }
        updateHP();
        healthBar();
      }
    //move.flameburst
      function Cflameburst(num){
        movetype = "fire";
        var damage = randomNumber(14, 17);
        turn = num;
    if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used flame burst.");
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used flame burst.");
      }
        updateHP();
        hideMoves();
      }
    //move.fireblast
      function Cfireblast(num){
        movetype = "fire";
        var damage = randomNumber(22, 30);
        turn = num;
    if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used fire blast.");
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used fire blast.");
      }
        updateHP();
        hideMoves();
      }
  //Grass Type Moves
    //move.synthesis Function 
        movetype = "synthesis";
        var userSynth = false;
        var rivalSynth = false;
        function Dsynthesis(num) {
          var healAmnt = randomNumber(1, 2);
          turn = num;
          if (turn == 1) {
            userHP = userHP + healAmnt;
            userSynth = true;
            setText("battletext", rivalPokemon + " used synthesis.");
          } else if ((turn == 0)) {
            rivalHP = rivalHP + healAmnt;
            rivalSynth = true;
            setText("battletext", userPokemon + " used synthesis.");
          }
          updateHP();
          hideMoves();
        }
        function synthesized() {
          var healAmnt = randomNumber(3, 4);
          if (userSynth == true) {
            userHP = userHP + healAmnt;
          } else if (rivalSynth == true) {
            rivalHP = rivalHP + healAmnt;
          }
          updateHP();
          healthBar();
        }
    //move.absorb function
        function Babsorb(num) {
          movetype = "grass";
          var damage = randomNumber(6, 9);
          turn = num;
          //directs damage and doesn't increase HP if HP > 50
          if (turn == 0) {
            setText("battletext", userPokemon + " used absorb.");
            usertypeadvantage();
           damage = effective * damage;
           userLevelAdjustor();
          damage = damagecounter * damage;
           damage = Math.round(damage);
            rivalHP = rivalHP - damage;
            if (userHP >= 50) {
              userHP = userHP;
            } else {
              userHP = userHP + damage;
            }
          } else if ((turn == 1)) {
            setText("battletext", rivalPokemon + " used absorb.");
              rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
              userHP = userHP - damage;
              if (rivalHP >= 50) {
                rivalHP = rivalHP;
              } else {
                rivalHP = rivalHP+damage;
              }
          }
          hideMoves();
          updateHP();
        }
    //move.vinewhip
      function Cvinewhip(num){
        movetype = "grass";
        var damage = randomNumber(14, 17);
        turn = num;
    if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used vine whip.");
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used vine whip.");
      }
        updateHP();
        hideMoves();
      }
     //move.razorleaf
      function Crazorleaf(num){
        movetype = "grass";
        var damage = randomNumber(23, 31);
        turn = num;
    if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used razor leaf.");
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used razor leaf.");
      }
        updateHP();
        hideMoves();
      }
  //Normal Type Moves
    //move.scratch function
        function Ascratch(num){
        movetype = "normal";
        var damage = randomNumber(6, 7);
        turn = num;
    if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used scratch.");
        showElement("scratchAnimation");
        playSound("Scratch.mp3", false);
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used scratch.");
        showElement("userScratchAnimation");
        playSound("Scratch.mp3", false);
      }
        updateHP();
        hideMoves();
      }
    //move.tackle function
        function Atackle(num){
        movetype = "normal";
        var damage = randomNumber(6, 7);
        turn = num;
        if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used tackle.");
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used tackle.");
      }
        updateHP();
        hideMoves();
      }
    //move.quickattack function
        function Aquickattack(num){
        movetype = "normal";
        var damage = randomNumber(13, 15);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used quick attack.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used quick attack.");
          showElement("quickAttackAnimation");
        playSound("Quick-Attack.mp3", false);
        }
          updateHP();
          hideMoves();
        }
     //move.hyperblast function
        function Dhyperblast(num){
        movetype = "normal";
        var damage = randomNumber(20, 23);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used hyper blast.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used hyper blast.");
        }
          updateHP();
          hideMoves();
        }
    //move.take-down function
        function Atakedown(num){
          //Damage System
          movetype = "normal";
          var damage = randomNumber(20, 25);
          turn = num;
          //this statement directs damage
          if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          userHP = userHP - 0.25*damage;
          userHP = Math.round(userHP);
          setText("battletext", userPokemon + " used take down and took recoil damage.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          rivalHP = rivalHP - (0.25*damage);
          rivalHP = Math.round(rivalHP);
          setText("battletext", rivalPokemon + " used take down and took recoil damage.");
        }
          updateHP();
          hideMoves();
        }
  //Rock Type Moves
    var userSTLTHrock = false;
    var rivalSTLTHrock = false;
    //move.stealthrock Function
      function Bstealthrock(num) {
        movetype = "rock";
        turn = num;
        if (turn == 0) {
          setText("battletext", userPokemon + " used stealth rock.");
          rivalSTLTHrock = true;
        } else if (turn == 1) {
          userSTLTHrock = true;
          setText("battletext", rivalPokemon + " used stealth rock.");
        }
        updateHP();
        hideMoves();
      }
    //move.rocktomb function
        function Arocktomb(num){
        movetype = "rock";
        var damage = randomNumber(13, 15);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used rock tomb.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used rock tomb.");
        }
          updateHP();
          hideMoves();
        }
     //move.rockslide function
        function Arockslide(num){
        movetype = "rock";
        var damage = randomNumber(25, 31);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used rock slide.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used rock slide.");
        }
          updateHP();
          hideMoves();
        }
  //Dark Type Moves
     //move.bite function
        function Bbite(num){
        movetype = "dark";
        var damage = randomNumber(13, 15);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used bite.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used bite.");
        }
          updateHP();
          hideMoves();
        }
     //move.crunch function
        function Acrunch(num){
        movetype = "dark";
        var damage = randomNumber(22,29);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used bite.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used bite.");
        }
          updateHP();
          hideMoves();
        }
    var userflinch = 1;
    var rivalflinch = 1;
      //move.fakeout function
        function Cfakeout(num){
        movetype = "dark";
        var damage = randomNumber(6, 7);
        turn = num;
    if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        rivalHP = rivalHP - damage;
        setText("battletext", userPokemon + " used fake out.");
        if (rivalflinch == 1) {
        setText("battletext", userPokemon + " used fake out. the opponent flinched.");
        
        showElement("Fight");
        rivalflinch = 0;
        }
      } else if (turn == 1) {
        rivaltypeadvantage();
        damage = effective * damage;
        rivalLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        userHP = userHP - damage;
        setText("battletext", rivalPokemon + " used fake out.");
        if (userflinch == 1) {
        setText("battletext", rivalPokemon + " used fake out. your pokemon flinched.");
        showElement("Enter");
        hideElement("whitebox");
        hideElement("blackbox");
        blockTimer("Fight");
        userflinch = 0;
        }
      }
        updateHP();
        hideMoves();
      }
      //move.falseswipe function
        function Bfalseswipe(num){
        movetype = "dark";
        var damage = randomNumber(12, 13);
        turn = num;
        if (turn == 0) {
        usertypeadvantage();
        damage = effective * damage;
        userLevelAdjustor();
        damage = damagecounter * damage;
        damage = Math.round(damage);
        if (rivalHP > 1) {
        rivalHP = rivalHP - damage;
        }
        if (rivalHP <= 1) {
          rivalHP = 1;
        }
        setText("battletext", userPokemon + " used false swipe.");
        }
        updateHP();
        hideMoves();
      }
  //Flying Moves
    //move.defog function
      function Cdefog(num) {
        movetype = "flying";
        turn = num;
        if (turn == 0) {
          userSTLTHrock = false;
          setText("battletext", userPokemon + " cleared battle hazards.");
        } else if (turn == 1) {
          rivalSTLTHrock = false;
          setText("battletext", rivalPokemon + " cleared battle hazards.");
        }
        updateHP();
        hideMoves();
      }
    //move.roost function
      function Droost(num) {
        movetype = "flying";
        turn = num;
        if (turn == 0) {
          userHP = userHP + (userMaxHP - userHP)/3;
          userHP = Math.round(userHP);
          setText("battletext", userPokemon + " used defog.");
        } else if (turn == 1) {
          rivalHP = rivalHP + (rivalMaxHP - rivalHP)/3;
          rivalHP = Math.round(rivalHP);
          setText("battletext", rivalPokemon + " used defog.");
        }
        updateHP();
        hideMoves();
      }
    //move.wing attack function
        function Awingattack(num){
        movetype = "flying";
        var damage = randomNumber(13, 15);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used wing attack.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used wing attack.");
        }
          updateHP();
          hideMoves();
        }
  //Groun Type Moves
    //move.bonerush function
        function Cbonerush(num){
        movetype = "ground";
        var damage = randomNumber(15, 18);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used bone rush.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used bone rush.");
        }
          updateHP();
          hideMoves();
        }
    //move.sandsweep Function 
          movetype = "ground";
          var userEvade = 0;
          var rivalEvade = 0;
          function Bsandsweep(num) {
            turn = num;
            if (turn == 0) {
              if (userEvade < 4) {
                userEvade = userEvade + 1;
                setText("battletext", userPokemon + " used sand sweep. " + userPokemon + "'s evasiveness increased to " + userEvade);
              } else {
                setText("battletext", userPokemon + " is at max evasiveness.");
              }
            } else if (turn == 1) {
              if (rivalEvade < 4) {
                rivalEvade = rivalEvade + 1;
                 setText("battletext", rivalPokemon + " used sand sweep. " + rivalPokemon + "'s evasiveness increased to " + rivalEvade);
              } else {
                rivalEvade = rivalEvade;
                setText("battletext", rivalPokemon + " is at max evasiveness.");
              }
            }
          updateHP();
          hideMoves();
          }

  //Poison Type Moves
    var userPoison = false;
    var rivalPoison = false;
      function Atoxic(num) {
        turn = num;
        if (turn == 0) {
          rivalClearStatusEffects();
          setText("battletext", userPokemon + " poisoned " + rivalPokemon );
          rivalPoison = true;
          showElement("poisonlabelrival");
        } else if (turn == 1) {
          userClearStatusEffects();
          setText("battletext", rivalPokemon + " poisoned " + userPokemon );
          userPoison = true;
          showElement("poisonlabeluser");
        }
        updateHP();
        healthBar();
        hideMoves();
      }
      function poisonedFunction() {
        var damage = randomNumber(4, 5);
        if (userPoison == true) {
          userHP = userHP - damage;
        } else if ((rivalPoison == true)) {
          rivalHP = rivalHP-damage;
          if (rivalHP <= 0) {
            faintedFunc();
            battleRegulate();
          }
        }
        updateHP();
        healthBar();
      }
    //move.poisondrip function
        function Bpoisondrip(num){
        movetype = "poison";
        var damage = randomNumber(15, 16);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used poison drip.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used poison drip.");
        }
          updateHP();
          hideMoves();
        }
  //Steel Type Moves
    //move.steelwing function
        function Csteelwing(num){
        movetype = "steel";
        var damage = randomNumber(15, 19);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used steel wing.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used steel wing.");
        }
          updateHP();
          hideMoves();
        }
    //move.metalclaw function
        function Cmetalclaw(num){
        movetype = "steel";
        var damage = randomNumber(17, 19);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used metal claw.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used metal claw.");
        }
          updateHP();
          hideMoves();
        }
  //Dragon Type Moves
    //move.dragonclaw function
        function Ddragonclaw(num){
        movetype = "dragon";
        var damage = randomNumber(20, 23);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used dragon claw.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used dragon claw.");
        }
          updateHP();
          hideMoves();
        }
      //move.dragonbreath function
        function Ddragonbreath(num){
        movetype = "dragon";
        var damage = randomNumber(23, 27);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used dragon breath.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used dragon breath.");
        }
          updateHP();
          hideMoves();
        }
  //Fighting Type Moves
    //move.megapunch function
        function Amegapunch(num){
        movetype = "fighting";
        var damage = randomNumber(15, 16);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used mega punch.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used mega punch.");
        }
          updateHP();
          hideMoves();
        }
      //move.megapunch function
        function Blowjab(num){
        movetype = "fighting";
        var damage = randomNumber(15, 16);
        var paralyzechance = randomNumber(1,4);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          if (paralyzechance == 1) {
          rivalParalysis = true;
          }
          setText("battletext", userPokemon + " used low jab.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used low jab.");
          if (paralyzechance == 1) {
          userParalysis = true;
          }
        }
          updateHP();
          hideMoves();
        }
  //Ghost Type Moves
    //move.shadowflame function
        function Bshadowflame(num){
        movetype = "ghost";
        var damage = randomNumber(17, 20);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used shadow flame.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used shadow flame.");
        }
          updateHP();
          hideMoves();
        }
    //move.glare function
        function Dglare(num){
        movetype = "ghost";
        var damage = randomNumber(5, 7);
        var paralyzechance = randomNumber(1,2);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          if (paralyzechance == 1) {
          rivalParalysis = true;
          }
          setText("battletext", userPokemon + " used glare.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used glare.");
          if (paralyzechance == 1) {
          userParalysis = true;
          }
        }
          updateHP();
          hideMoves();
        }
  //Ice Type Moves
    //move.icecrash function
        function Bicecrash(num){
        movetype = "ice";
        var damage = randomNumber(17, 20);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used ice crash.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used ice crash.");
        }
          updateHP();
          hideMoves();
        } 
    //move.freezeblast function
        function Dfreezeblast(num){
        movetype = "ice";
        var damage = randomNumber(23, 30);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used freeze blast.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used freeze blast.");
        }
          updateHP();
          hideMoves();
        } 
  //Psychic Type Moves
      //move.psychic function
        function Cpsychic(num){
        movetype = "psychic";
        var damage = randomNumber(17, 20);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used psychic.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used psychic.");
        }
          updateHP();
          hideMoves();
        } 
      //move.regenerate function
        function Dregenerate(num){
        movetype = "psychic";
        var heal = randomNumber(17, 20);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          userHP = userHP + heal;
          setText("battletext", userPokemon + " used regenerate.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          rivalHP = rivalHP + heal;
          setText("battletext", rivalPokemon + " used regenerate.");
        }
          updateHP();
          hideMoves();
        } 
    //confuse ray function
      movetype = "psychic";
      var userConfusion = false;
      var rivalConfusion = false;
      function Bconfuseray(num) {
         turn = num;
        if (turn == 0) {
          rivalClearStatusEffects();
          rivalConfusion = true;
          setText("battletext", (userPokemon + " used confuse ray. " + rivalPokemon+ " is confused."));
        } else if (turn == 1) {
          userClearStatusEffects();
          userConfusion = true;
          setText("battletext", (rivalPokemon + " used confuse ray. " + userPokemon+ " is confused."));
        }
        updateHP();
        healthBar();
        hideMoves();
      }
      function confusion() {
        var damage = randomNumber(5, 6);
        
        if (rivalConfusion == true) {
          rivalHP = rivalHP - damage;
          setText("battletext", rivalPokemon + " hit itself in its confusion.");
        } else if (userConfusion == true) {
        userHP = userHP - damage;
        setText("battletext", userPokemon + " hit itself in its confusion.");
        hideElement("Fight");
        }
        updateHP();
        healthBar();
      }
  //Water Type Moves
    //move.bubble function
          function Bbubble(num){
          movetype = "water";
          var damage = randomNumber(9, 13);
          var confusechance = randomNumber(1,3);
          turn = num;
          if (turn == 0) {
            usertypeadvantage();
            damage = effective * damage;
            userLevelAdjustor();
            damage = damagecounter * damage;
            damage = Math.round(damage);
            rivalHP = rivalHP - damage;
            setText("battletext", userPokemon + " bubble.");
            if (confusechance == 1) {
              rivalConfusion = true;
            }
          } else if (turn == 1) {
            rivaltypeadvantage();
            damage = effective * damage;
            rivalLevelAdjustor();
            damage = damagecounter * damage;
            damage = Math.round(damage);
            userHP = userHP - damage;
            setText("battletext", rivalPokemon + " used bubble.");
            if (confusechance == 1) {
              userConfusion = true;
            }
          }
            updateHP();
            hideMoves();
          } 
    //move.shellbash Function
    movetype = "water";
    function Ashellbash(num) {
      var damage = randomNumber(20, 21);
      var falter = randomNumber(1, 5);
      turn = num;
      if (turn == 0) {
        setText("battletext", userPokemon + " used shell bash.");
        usertypeadvantage();
       damage = effective * damage;
       userLevelAdjustor();
      damage = damagecounter * damage;
       damage = Math.round(damage);
        rivalHP = rivalHP-damage;
        if (falter == 2) {
          var time = 7;
          timedLoop(151, function() {
            time = time-1;
            stopTimedLoop();
            hideElement("Enter");
            showElement("Fight");
          });
          hideElement("Enter");
          setText("battletext", userPokemon + " used shell bash. " +rivalPokemon + " couldn't move.");
        }
      } else if (turn == 1) {
        setText("battletext", rivalPokemon + " used shell bash.");
        rivaltypeadvantage();
       damage = effective * damage;
       rivalLevelAdjustor();
      damage = damagecounter * damage;
       damage = Math.round(damage);
        userHP = userHP-damage;
        if (falter == 2) {
          setText("battletext", rivalPokemon + " used shell bash. " + userPokemon + " couldn't move.");
          timer("Enter");
          hideElement("Fight");
        }
      }
      updateHP();
      hideMoves();
    }
  //move.watergun function
        function Cwatergun(num){
        movetype = "water";
        var damage = randomNumber(12, 15);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used water gun.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used water gun.");
        }
          updateHP();
          hideMoves();
        } 
 //move.whirlpool function
        function Cwhirlpool(num){
        movetype = "water";
        var damage = randomNumber(20, 21);
        turn = num;
        if (turn == 0) {
          usertypeadvantage();
          damage = effective * damage;
          userLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          rivalHP = rivalHP - damage;
          setText("battletext", userPokemon + " used whirlpool.");
        } else if (turn == 1) {
          rivaltypeadvantage();
          damage = effective * damage;
          rivalLevelAdjustor();
          damage = damagecounter * damage;
          damage = Math.round(damage);
          userHP = userHP - damage;
          setText("battletext", rivalPokemon + " used whirlpool.");
        }
          updateHP();
          hideMoves();
        } 

// Fainted Function
var level = 5;
var leveluplngth = 10;
var userxp = 0;
var leftoverxp = 0;
evolution();
function xpBar() { 
  setProperty("XPbar", "width", (userxp)*(89/leveluplngth));
}
userxp = 0;
leveluplngth = 10;
hideElement("XPbar");

function faintedFunc() {
  updateRivalSprite();
  if (rivalHP <= 0) {
    rivalClearStatusEffects();
    if (rivalLevel == 5) {
      userxp = userxp+5;
      bp = bp + 100;
      setText("battletext", "the opponent fainted. you received 100 battle points");
    } else if (rivalLevel == 6) {
      userxp = userxp+7;
      bp = bp + 100;
      setText("battletext", "the opponent fainted. you received 100 battle points");
    } else if (rivalLevel == 7) {
      userxp = userxp+9;
      bp = bp + 200;
      setText("battletext", "the opponent fainted. you received 200 battle points");
    } else if (rivalLevel == 8) {
      userxp = userxp+11;
      bp = bp + 200;
      setText("battletext", "the opponent fainted. you received 200 battle points");
    } else if (rivalLevel == 9) {
      userxp = userxp+13;
      bp = bp + 300;
      setText("battletext", "the opponent fainted. you received 300 battle points");
    } else if (rivalLevel == 10) {
      userxp = userxp+15;
       bp = bp + 300;
      setText("battletext", "the opponent fainted. you received 300 battle points");
    } else if (rivalLevel == 11) {
      userxp = userxp+17;
       bp = bp + 400;
      setText("battletext", "the opponent fainted. you received 400 battle points");
    } else if (rivalLevel == 12) {
      userxp = userxp+19;
      bp = bp + 400;
      setText("battletext", "the opponent fainted. you received 400 battle points");
    } else if (rivalLevel == 13) {
      userxp = userxp+21;
      bp = bp + 500;
      setText("battletext", "the opponent fainted. you received 500 battle points");
    } else if (rivalLevel == 14) {
      userxp = userxp+23;
      bp = bp + 500;
      setText("battletext", "the opponent fainted. you received 500 battle points");
    } else if (rivalLevel == 15) {
      userxp = userxp+25;
      bp = bp + 600;
      setText("battletext", "the opponent fainted. you received 600 battle points");
    } else if (rivalLevel == 16) {
      userxp = userxp+30;
      bp = bp + 600;
      setText("battletext", "the opponent fainted. you received 600 battle points");
    } else if (rivalLevel == 17) {
      userxp = userxp+35;
      bp = bp + 700;
      setText("battletext", "the opponent fainted. you received 700 battle points");
    } else if (rivalLevel == 18) {
      userxp = userxp+40;
      bp = bp + 700;
      setText("battletext", "the opponent fainted. you received 700 battle points");
    } else if (rivalLevel == 19) {
      userxp = userxp+45;
      bp = bp + 900;
      setText("battletext", "the opponent fainted. you received 900 battle points");
    } else if (rivalLevel == 20) {
      userxp = userxp+60;
      bp = bp + 1000;
      setText("battletext", "the opponent fainted. you received 1000 battle points");
    }
 
    if (userxp >= leveluplngth) {
      for (var i = 0; i < 10; i++) {
        if (userxp > leveluplngth) {
          userxp = userxp - leveluplngth;
          leftoverxp = userxp;
          leftoverxp = Math.abs(leftoverxp);
          leveluplngth = leveluplngth+5;
          level = level+1;
          if (level == 100) {
      userMaxHP = userMaxHP + 10;
    } else if ((level == 6)) {
      userMaxHP = userMaxHP+10;
    } else if (level == 7) {
      userMaxHP = userMaxHP+15;
    } else if (level == 8) {
      userMaxHP = userMaxHP+15;
    } else if (level == 9) {
      userMaxHP = userMaxHP+20;
    } else if (level == 10) {
      userMaxHP = userMaxHP+20;
    } else if (level == 11) {
      userMaxHP = userMaxHP+25;
    } else if (level == 12) {
      userMaxHP = userMaxHP+25;
    } else if (level == 13) {
      userMaxHP = userMaxHP+30;
    } else if (level == 14) {
      userMaxHP = userMaxHP+30;
    } else if (level == 15) {
      userMaxHP = userMaxHP+35;
    } else if (level == 16) {
      userMaxHP = userMaxHP+35;
    } else if (level == 17) {
      userMaxHP = userMaxHP+40;
    } else if (level == 18) {
      userMaxHP = userMaxHP+40;
    } else if (level == 19) {
      userMaxHP = userMaxHP+45;
    } else if (level == 20) {
      userMaxHP = userMaxHP+65;
    }
        }
      }
    }
    xpBar();
    updateHP();
    if (userxp == leveluplngth) {
      hideElement("XPbar");
      setText("xpnum", "0/" + (leveluplngth + 5));
    } else {
      showElement("XPbar");
      setText("xpnum", userxp + "/" + leveluplngth);
    }
    
    var time = 7;
    timedLoop(158, function() {
      time = time-1;
      if (time <= 0) {
        hideElement("Enter");
      }
    });
  }
}
//Allows player to exit battle
onEvent("Return", "click", function( ) {
  evolution();
  setText("level&xp", (level));
  userHP = userMaxHP;
  pp1HP = pp1MAXHP; 
  pp2HP = pp2MAXHP; 
  pp3HP = pp3MAXHP; 
  pp4HP = pp4MAXHP; 
  pp5HP = pp5MAXHP; 
  stopMusic();
  playSound("In-Battle-Switch-Flee-Run-(1).mp3", false);
  playSound("143-Gym.mp3", true);
  hideElement("bag2battle");
  hideElement("Enter");
  showElement("whitebox");
  setScreen("gameMenu");
  hideElement("Return");
  rivalHP = rivalMaxHP;
  userClearStatusEffects();
  rivalClearStatusEffects();
  updateHP();
  healthBar();
  showElement("openBag");
  showElement("openParty");
  hideElement("pokeball");
  setText("battletext", "");
  setImageURL("rivalPokemon", rivalPokemon+".png");
  updateALLpokemon();
  hideElement("whitebox");
  flinchcheck = 0;
  healcheck = 0;
  setText("level&xp", (level));
  showElement("party2battle");
});


var partysize = 0;

function rivalpartyRegulate() {
  if (partysize == 2) {
    rivalEXISTpp1 = true;
    rivalHPpp2 = 0;
    rivalHPpp3 = 0;
    rivalHPpp4 = 0;
  } else if (partysize == 3) {
    rivalEXISTpp1 = true;
    rivalEXISTpp2 = true;
    rivalHPpp3 = 0;
    rivalHPpp4 = 0;
  } else if (partysize == 4) {
    rivalEXISTpp1 = true;
    rivalEXISTpp2 = true;
    rivalEXISTpp3 = true;
    rivalHPpp4 = 0;
  } else if (partysize == 5) {
    rivalEXISTpp1 = true;
    rivalEXISTpp2 = true;
    rivalEXISTpp3 = true;
    rivalEXISTpp4 = true;
  }
}
//Checks opponent pokemon when fainted
function battleRegulate() {
 if (rivalHP == 0 && rivalHPpp1 == 0 && rivalHPpp2 == 0 && rivalHPpp3 == 0 && rivalHPpp4 == 0) {
    setImageURL("rivalPokemon", "BLANK.png");
    hideMoves();
    hideElement("openBag");
    hideElement("openParty");
    blockTimer("Fight");
    showElement("Return");
    stopMusic();
    playSound("011-Victory-Against-Wild-Poke-mon!.mp3", false);
    updateRivalSprite();
  } 
    else if (rivalHP == 0 && rivalHPpp1 > 0 && rivalEXISTpp1 == true) {
    rivalSwitch1();
    hideMoves();
    timer("Fight");
    updateRivalSprite();
  } else if (rivalHP == 0 && rivalHPpp2 >= 0 && rivalEXISTpp2 == true) {
    rivalSwitch2();
    hideMoves();
    timer("Fight");
    updateRivalSprite();
  } else if (rivalHP == 0 && rivalHPpp3 > 0 && rivalEXISTpp3 == true) {
    rivalSwitch3();
    hideMoves();
    timer("Fight");
    updateRivalSprite();
  } else if (rivalHP == 0 && rivalHPpp4 > 0 && rivalEXISTpp4 == true) {
    rivalSwitch4();
    hideMoves();
    timer("Fight");
    updateRivalSprite();
  } 
  updateHP();
}

//Enter Button 
onEvent("Enter", "click", function( ) {
  hideElement("blackbox");
  setText("level&xp", (level));
  var paralyzechance = randomNumber(1, 4);
  var confusedchance = randomNumber(1, 5);
  var evadechance = randomNumber(1, 10);
  
  if (userEvade == 1) {
    evadechance = randomNumber(1, 6);
  } else if (userEvade == 2) {
    evadechance = randomNumber(1, 5);
  } else if (userEvade == 3) {
    evadechance = randomNumber(1, 4);
  } else if (userEvade == 4) {
    evadechance = randomNumber(1,3);
  } else {
    evadechance = 0;
  }
  
  if (rivalHP <= 0 && rivalHPpp1 <= 0 && rivalHPpp2 <= 0 && rivalHPpp3 <= 0 && rivalHPpp4 <= 0) {
    hideMoves();
    hideElement("openBag");
    hideElement("openParty");
    hideElement("Enter");
    blockTimer("Fight");
    showElement("Return");
    evolution();
  } else if ((rivalHP >= 0 )) {
    if (rivalParalysis == true && paralyzechance == 3) {
      paralysis();
    } else if (rivalConfusion == true && confusedchance == 1) {
      confusion();
      if (rivalHP == 0) {
        blockTimer("Fight");
      }
    } else if (evadechance == 2) {
      setText("battletext", userPokemon + " evaded the opponent " + rivalPokemon + "'s attack.");
      showElement("Fight");
    } else {
      rivalAI();
    }
    hideElement("Enter");
    timer("Fight");
    updateALLpokemon();
    updateRivalSprite ();
  }
   
  if (rivalHP <= 0 && rivalHPpp1 <= 0 && rivalHPpp2 <= 0 && rivalHPpp3 <= 0 && rivalHPpp4 <= 0) {
    hideMoves();
    hideElement("openBag");
    hideElement("openParty");
    hideElement("Enter");
    hideElement("Fight");
    showElement("Return");
    evolution();
    userClearStatusEffects();
  }
  hideMoves();
  rivalpartyRegulate();
  if (rivalHP <= 0 && rivalHPpp1 <= 0 && rivalHPpp2 <= 0 && rivalHPpp3 <= 0 && rivalHPpp4 <= 0) {
    hideMoves();
    hideElement("openBag");
    hideElement("openParty");
    hideElement("Enter");
    hideElement("Fight");
    blockTimer("Fight");
    showElement("Return");
    evolution();
  }
  faintedFunc();
  battleRegulate();
  userFaintedRegulation();
  setText("level&xp", (level));
  updateRivalSprite();
});

//Fight Buttons 


onEvent("Fight", "click", function( ) {
  evolution();
  setText("level&xp", (level));
  hideElement("Return");
  var paralyzedchance = randomNumber(1, 4);
  var confusedchance = randomNumber(1,4);
  var evadechance = randomNumber(1, 10);
  if (rivalEvade == 1) {
    evadechance = randomNumber(1, 6);
  } else if (rivalEvade == 2) {
    evadechance = randomNumber(1, 5);
  } else if (rivalEvade == 3) {
    evadechance = randomNumber(1, 4);
  } else if (rivalEvade == 4) {
    evadechance = randomNumber(1,3);
  } else {
    evadechance = 0;
  }
  synthesized();
  
  hideElement("Fight");
 
  if (userParalysis == true && paralyzedchance == 2) {
    paralysis();
    hideElement("whitebox");
    timer("Enter");
  } else if (userConfusion == true && confusedchance == 1) {
    confusion();
    hideElement("whitebox");
    timer("Enter");
  } else if (evadechance == 2) {
   setText("battletext", rivalPokemon + " evaded your " + userPokemon + "'s attack.");
    hideElement("Fight");
    hideMoves();
    timer("Enter");
  } else {
    setText("battletext", "");
    showElement("openBag");
    showElement("openParty");
    updateALLpokemon();
  }
  if (rivalHP == 0) {
    hideElement("openBag");
    hideElement("openParty");
  }
  burnedFunction();
  poisonedFunction();
  updateRivalSprite ();
  setText("level&xp", (level));
  showElement("bag2battle");
});

//Hide All Moves & Bag
function hideMoves() {
  
  hideElement("Amove.bugbite");
  hideElement("Cmove.uturn");
  hideElement("Dmove.xscissor");
  
  hideElement("Cmove.thunderwave");
  hideElement("Bmove.thundershock");
  
  hideElement("Bmove.burn");
  hideElement("Cmove.flameburst");
  hideElement("Cmove.fireblast");
  
  hideElement("Bmove.absorb");
  hideElement("Dmove.synthesis");
  hideElement("Cmove.vinewhip");
  hideElement("Cmove.razorleaf");
  
  hideElement("Amove.scratch");
  hideElement("Amove.tackle");
  hideElement("Amove.quickattack");
  hideElement("Amove.takedown");
  hideElement("Dmove.hyperblast");
  
  hideElement("Amove.rocktomb");
  hideElement("Amove.rockslide");
  hideElement("Bmove.stealthrock");
  
  hideElement("Bmove.bite");
  hideElement("Bmove.falseswipe");
  hideElement("Amove.crunch");
  hideElement("Cmove.fakeout");
  
  hideElement("Amove.wingattack");
  hideElement("Dmove.roost");
  hideElement("Bmove.defog");
 
  hideElement("Amove.toxic");
  hideElement("Bmove.poisondrip");
  
  hideElement("Bmove.sandsweep");
  hideElement("Cmove.bonerush");
  
  hideElement("Cmove.steelwing");
  hideElement("Cmove.metalclaw");
  
  hideElement("Dmove.dragonclaw");
  hideElement("Dmove.dragonbreath");
  
  hideElement("Amove.megapunch");
  hideElement("Bmove.lowjab");
  
  hideElement("Bmove.shadowflame");
  hideElement("Dmove.glare");
  
  hideElement("Bmove.icecrash");
  hideElement("Dmove.freezeblast");
 
  hideElement("Bmove.confuseray");
  hideElement("Cmove.psychic");
  hideElement("Dmove.regenerate");
  
  hideElement("Bmove.bubble");
  hideElement("Cmove.watergun");
  hideElement("Cmove.whirlpool");
  hideElement("Amove.shellbash");
}


  
//Clear Status Effects
function userClearStatusEffects() {
  userSynth = false;
  userBurn = false;
  userPoison = false;
  userParalysis = false;
  userConfusion = false;
  hideElement("burnlabeluser");
  hideElement("poisonlabeluser");
  hideElement("synthlabel");
  userflinch = 1;
  rivalflinch = 1;
}
function rivalClearStatusEffects() {
  rivalSynth = false;
  rivalBurn = false;
  rivalPoison = false;
  rivalParalysis = false;
  rivalConfusion = false;
  hideElement("burnlabelrival");
  hideElement("poisonlabelrival");
  rivalflinch = 1;
  userflinch = 1;
}
// battle points
var bp = 1000 ;
onEvent("openDelivery", "click", function( ) {
  setScreen("delivery");
  setText("yourBP", "Battle Points: " + bp);
});

onEvent("BuyPokeball", "click", function( ) {
  if (bp >= 300) {
    bp = bp - 300;
    pballCount = pballCount + 1;
    setText("yourBP", "Battle Points: " + bp);
    setText("pokeballCount", pballCount + " pokeballs");
  }
});
onEvent("BuyPotion", "click", function( ) {
  if (bp >= 400) {
    bp = bp - 400;
    potionCount = potionCount + 1;
    setText("yourBP", "Battle Points: " + bp);
     setText("potionCount", potionCount + " potions");
  }
});
var stoneCount = 0;
onEvent("BuyFireStone", "click", function( ) {
  if (bp >= 2000) {
    bp = bp - 2000;
    stoneCount = stoneCount + 1;
    setText("yourBP", "Battle Points: " + bp);
    deleteElement("BuyFireStone");
    deleteElement("stone1");
    deleteElement("BuyWaterStone");
    deleteElement("stone2");
    deleteElement("BuyThunderStone");
    deleteElement("stone3");
  }
});
onEvent("BuyWaterStone", "click", function( ) {
  if (bp >= 2000) {
    bp = bp - 2000;
    stoneCount = stoneCount + 1;
    setText("yourBP", "Battle Points: " + bp);
    deleteElement("BuyWaterStone");
    deleteElement("stone2");
    deleteElement("BuyFireStone");
    deleteElement("stone1");
    deleteElement("BuyThunderStone");
    deleteElement("stone3");
  }
});
onEvent("BuyThunderStone", "click", function( ) {
  if (bp >= 2000) {
    bp = bp - 2000;
    stoneCount = stoneCount + 1;
    setText("yourBP", "Battle Points: " + bp);
    deleteElement("BuyThunderStone");
    deleteElement("stone3");
    deleteElement("BuyWaterStone");
    deleteElement("stone2");
    deleteElement("BuyFireStone");
    deleteElement("stone1");
  }
});

onEvent("openBag", "click", function( ) {
  updateHP();
  updateALLpokemon();
  setScreen("bag");
  setText("potionCount", potionCount + " potions");
  setText("pokeballCount", pballCount + " pokeballs");
});
onEvent("bag2battle", "click", function( ) {
  setScreen("battlescreen");
});


var potionCount = 5;
onEvent("potionUse", "click", function( ) {
  if (potionCount > 0 && userHP < userMaxHP) {
    potionCount = potionCount - 1;
    userHP = userHP + 25 + Math.round(0.25*userMaxHP);
    hideMoves();
    hpAdjustor();
    updateHP();
    timer("Enter");
    healthBar();
    playSound("In-Battle-Heal-Status-Refresh.mp3", false);
    setText("battletext", userPokemon + " used a potion." );
    setScreen("battlescreen");
    hideElement("openBag");
    hideElement("openParty");
    hideElement("Fight");
  }
  setText("potionCount", potionCount + " potions");
});
// Health Point Systems
function updateHP() {
  hpAdjustor();
  setProperty("level&xp", "font-family", "Arial");
  setProperty("userHP", "font-size", 10);
  setProperty("rivalHP", "font-size", 10);
  setProperty("rivalHP", "font-family", "Arial");
  setText("userHP",userHP + "/" + userMaxHP);
  setText("rivalHP",rivalHP + "/" + rivalMaxHP);
  setProperty("userName", "font-size", 11);
  setProperty("rivalName", "font-size", 11);
  setText("userName", userPokemon);
  setText("rivalName", rivalPokemon );
}
function healthBar() {
  setProperty("rivalHP_bar", "width", rivalHP*(65/rivalMaxHP));
  setProperty("userHP_bar", "width", userHP*(65/userMaxHP));
  if (userHP > userMaxHP * 0.50) {
    setImageURL("userHP_bar", "greengrass.png");
    setProperty("userHP_bar", "border-width", 1);
  } else if (userHP > userMaxHP * 0.20) {
    setImageURL("userHP_bar", "yellow.jpg");
    setProperty("userHP_bar", "border-width", 1);
  } else if ((userHP > 0)) {
    setImageURL("userHP_bar", "red.jpg");
    setProperty("userHP_bar", "border-width", 1);
  } else if ((userHP <= 0)) {
    setImageURL("userHP_bar", "BLANK.png");
    setProperty("userHP_bar", "border-width", 0);
  }
   if (rivalHP > rivalMaxHP * 0.50) {
    setImageURL("rivalHP_bar", "greengrass.png");
    setProperty("rivalHP_bar", "border-width", 1);
  } else if (rivalHP > rivalMaxHP * 0.20) {
    setImageURL("rivalHP_bar", "yellow.jpg");
    setProperty("rivalHP_bar", "border-width", 1);
  } else if ((rivalHP > 0)) {
    setImageURL("rivalHP_bar", "red.jpg");
    setProperty("rivalHP_bar", "border-width", 1);
  } else if ((rivalHP <= 0)) {
    setImageURL("rivalHP_bar", "BLANK.png");
    setProperty("rivalHP_bar", "border-width", 0);
  }
}


function hpAdjustor() {
  if (userHP - userMaxHP > 0) {
    userHP = userMaxHP;
  } else if ((userMaxHP - userHP > userMaxHP)) {
    userHP = 0;
  } else if ((rivalHP - rivalMaxHP > 0)) {
    rivalHP = rivalMaxHP;
  } else if ((rivalMaxHP - rivalHP > rivalMaxHP)) {
    rivalHP = 0;
  }
}
function partyHPupdater() {
  setText("partyPP1HP", "HP: " + pp1HP + "/" + pp1MAXHP);
  setText("partyPP2HP", "HP: " + pp2HP + "/" + pp2MAXHP);
  setText("partyPP3HP", "HP: " + pp3HP + "/" + pp3MAXHP);
  setText("partyPP4HP", "HP: " + pp4HP + "/" + pp4MAXHP);
  setText("partyPP5HP", "HP: " + pp5HP + "/" + pp5MAXHP);
  setText("partyUSERHP", "HP: " + userHP + "/" + userMaxHP);
}
var partypokemon1 = 0;
var partypokemon2 = 0;
var partypokemon3 = 0;
var partypokemon4 = 0;
var partypokemon5 = 0;
var partypkmn1 = false;
var partypkmn2 = false;
var partypkmn3 = false;
var partypkmn4 = false;
var partypkmn5 = false;
// Catching Pokemon
onEvent("pokeballUse", "click", function( ) {
  if (pballCount > 0) {
    pballCount = pballCount - 1;
    var catchChance = 0;
    if (rivalHP > 0.75 * rivalMaxHP) {
      catchChance = randomNumber(1, 10);
      
    } else if (rivalHP > 0.50 * rivalMaxHP) {
      catchChance = randomNumber(1, 5);
      
    } else if (rivalHP > 0.25 * rivalMaxHP) {
      catchChance = randomNumber(1,3);
      
    } else {
      catchChance = randomNumber(1, 1);
      
    }
    setScreen("battlescreen");
    showElement("pokeball");
    setImageURL("rivalPokemon", "BLANK.png");
    hideMoves();
    hideElement("openParty");
    hideElement("openBag");
    if (catchChance != 1) {
      playSound("In-Battle-Recall-Switch-Pokeball.mp3", false);
      setImageURL("rivalPokemon", rivalPokemon +".png");
      showElement("openParty");
      showElement("openBag");
      hideElement("pokeball");
      hideMoves();
      timer("Enter");
      setText("battletext", "the opponent " + rivalPokemon + " dodged the pokeball");
    } else if ((catchChance == 1)) {
      playSound("In-Battle-Recall-Switch-Pokeball.mp3", false);
      hideMoves();
      hideElement("rivalPokemon");
      showElement("whitebox");
      setText("battletext", rivalPokemon + " was caught!");
      if (partypkmn5 == true) {
        playSound("In-Battle-Recall-Switch-Pokeball.mp3", false);
        setImageURL("rivalPokemon", rivalPokemon +".png");
        showElement("rivalPokemon");
        showElement("openParty");
        showElement("openBag");
        hideElement("pokeball");
        setText("battletext", "you have max pokemon");
        pballCount = pballCount + 1;
      } else if ((partypkmn1 == false)) {
        //Second Pokemon
        setText("battletext", "gotcha! " + rivalPokemon + " was caught.");
        stopMusic();
        playSound("In-Battle-Recall-Switch-Pokeball.mp3", false);
        playSound("06-caught-a-pokemon.mp3", false);
        partypokemon1 = rivalPokemon;
        partypkmn1 = true;
        pp1Level = rivalLevel;
        pp1MAXHP = rivalMaxHP;
        pp1HP = rivalMaxHP;
        showElement("partyPP1HP");
        showElement("switch1");
        setText("statsPP1", ("Level: " + pp1Level + " XP: ") + pp1XP + "/" + pp1leveluplngth);
      } else if ((partypkmn2 == false)) {
        //Third Pokemon
        setText("battletext", "gotcha! " + rivalPokemon + " was caught.");
        stopMusic();
        playSound("In-Battle-Recall-Switch-Pokeball.mp3", false);
        playSound("06-caught-a-pokemon.mp3", false);
        partypokemon2 = rivalPokemon;
        partypkmn2 = true;
        pp2Level = rivalLevel;
        pp2MAXHP = rivalMaxHP;
        pp2HP = rivalMaxHP;
        showElement("partyPP2HP");
        showElement("switch2");
        setText("statsPP2", ((("Level: " + pp2Level) + " XP: ") + pp2XP) + "/" + pp2leveluplngth);
      } else if ((partypkmn3 == false)) {
        //Fourth Pokemon
        setText("battletext", "gotcha! " + rivalPokemon + " was caught.");
        stopMusic();
        playSound("In-Battle-Recall-Switch-Pokeball.mp3", false);
        playSound("06-caught-a-pokemon.mp3", false);
        partypokemon3 = rivalPokemon;
        showElement("partyPP3HP");
        showElement("switch3");
        partypkmn3 = true;
        pp3Level = rivalLevel;
        pp3MAXHP = rivalMaxHP;
        pp3HP = rivalMaxHP;
         setText("statsPP3", ((("Level: " + pp3Level) + " XP: ") + pp3XP) + "/" + pp3leveluplngth);
      } else if ((partypkmn4 == false)) {
        //Fifth Pokemon
        setText("battletext", "gotcha! " + rivalPokemon + " was caught.");
        stopMusic();
        playSound("In-Battle-Recall-Switch-Pokeball.mp3", false);
        playSound("06-caught-a-pokemon.mp3", false);
        partypokemon4 = rivalPokemon;
        showElement("partyPP4HP");
        showElement("switch4");
        partypkmn4 = true;
        pp4Level = rivalLevel;
        pp4MAXHP = rivalMaxHP;
        pp4HP = rivalMaxHP;
          setText("statsPP4", ((("Level: " + pp4Level) + " XP: ") + pp4XP) + "/" + pp4leveluplngth);
      } else if ((partypkmn5 == false)) {
        //Sixth Pokemon
        setText("battletext", "gotcha! " + rivalPokemon + " was caught.");
        stopMusic();
        playSound("In-Battle-Recall-Switch-Pokeball.mp3", false);
        playSound("06-caught-a-pokemon.mp3", false);
        partypokemon5 = rivalPokemon;
        showElement("partyPP5HP");
        showElement("switch5");
        partypkmn5 = true;
        pp5Level = rivalLevel;
        pp5MAXHP = rivalMaxHP;
        pp5HP = rivalMaxHP;
        setText("statsPP5", ((("Level: " + pp5Level) + " XP: ") + pp5XP) + "/" + pp5leveluplngth);
      }
      showElement("Return");
    }
  }
  updateALLpokemon();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  setText("pokeballCount", pballCount + " pokeballs");
});
//
//
//

var rivalpp1 = 0;
var rivalmaxHPpp1 = 0;
var rivalHPpp1 = 0;
var rivalLevelpp1 = 0;
var rivalEXISTpp1 = false;

var rivalpp2 = 0;
var rivalmaxHPpp2 = 0;
var rivalHPpp2 = 0;
var rivalLevelpp2 = 0;
var rivalEXISTpp2 = false;

var rivalpp3 = 0;
var rivalmaxHPpp3 = 0;
var rivalHPpp3 = 0;
var rivalLevelpp3 = 0;
var rivalEXISTpp3 = false;

var rivalpp4 = 0;
var rivalHPpp4 = 0;
var rivalLevelpp4 = 0;
var rivalmaxHPpp4 = 0;
var rivalEXISTpp4 = false;


var rivalTransitionLvl = 0;
var rivalTransitionHP = 0;
var rivalTransitionPKMN = 0;
var rivalTransitionMAXHP = 0;

function rivalSwitch1() {
  //switch maxHP 
  rivalTransitionMAXHP = rivalmaxHPpp1;
  rivalmaxHPpp1 = rivalMaxHP;
  rivalMaxHP = rivalTransitionMAXHP;
  //switch pokemonHP
  rivalTransitionHP = rivalHPpp1;
  rivalHPpp1 = rivalHP;
  rivalHP = rivalTransitionHP;
  //switch pokemon
  rivalTransitionPKMN = rivalpp1;
  rivalpp1 = rivalPokemon;
  rivalPokemon = rivalTransitionPKMN;
  //switch level
  rivalTransitionLvl = rivalLevelpp1;
  rivalLevelpp1 = rivalLevel;
  rivalLevel = rivalTransitionLvl;
  //updates
  hideMoves();
  hideElement("Fight");
  var damage = randomNumber(7,8);
  if (rivalSTLTHrock == true) {
      rivalHP = rivalHP - damage;
      setText("battletext", (rivalPokemon + " was damaged by the stones in the field."));
  }
  hideElement("Fight");
  rivalClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  updateALLpokemon();
  updateHP();
  healthBar();
  userflinch = 1;
  hideMoves();
  showElement("Fight");
  updateRivalSprite ();
}
function rivalSwitch2() {
  //switch maxHP 
  rivalTransitionMAXHP = rivalmaxHPpp2;
  rivalmaxHPpp2 = rivalMaxHP;
  rivalMaxHP = rivalTransitionMAXHP;
  //switch pokemonHP
  rivalTransitionHP = rivalHPpp2;
  rivalHPpp2 = rivalHP;
  rivalHP = rivalTransitionHP;
  //switch pokemon
  rivalTransitionPKMN = rivalpp2;
  rivalpp2 = rivalPokemon;
  rivalPokemon = rivalTransitionPKMN;
  //switch level
  rivalTransitionLvl = rivalLevelpp2;
  rivalLevelpp2 = rivalLevel;
  rivalLevel = rivalTransitionLvl;
  //updates
  hideMoves();
  hideElement("Fight");
    var damage = randomNumber(7,8);
  if (rivalSTLTHrock == true) {
      rivalHP = rivalHP - damage;
      setText("battletext", (rivalPokemon + " was damaged by the stones in the field."));
  }
  hideElement("Fight");
  rivalClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  updateALLpokemon();
  updateHP();
  healthBar();
  userflinch = 1;
  hideMoves();
  showElement("Fight");
  updateRivalSprite ();
}
function rivalSwitch3() {
  //switch maxHP 
  rivalTransitionMAXHP = rivalmaxHPpp3;
  rivalmaxHPpp3 = rivalMaxHP;
  rivalMaxHP = rivalTransitionMAXHP;
  //switch pokemonHP
  rivalTransitionHP = rivalHPpp3;
  rivalHPpp3 = rivalHP;
  rivalHP = rivalTransitionHP;
  //switch pokemon
  rivalTransitionPKMN = rivalpp3;
  rivalpp3 = rivalPokemon;
  rivalPokemon = rivalTransitionPKMN;
  //switch level
  rivalTransitionLvl = rivalLevelpp3;
  rivalLevelpp3 = rivalLevel;
  rivalLevel = rivalTransitionLvl;
  //updates
  hideMoves();
  
    var damage = randomNumber(7,8);
  if (rivalSTLTHrock == true) {
      rivalHP = rivalHP - damage;
      setText("battletext", (rivalPokemon + " was damaged by the stones in the field."));
  }
  hideElement("Fight");
  rivalClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  updateALLpokemon();
  updateHP();
  healthBar();
  userflinch = 1;
  hideMoves();
  showElement("Fight");
  updateRivalSprite ();
}
function rivalSwitch4() {
  //switch maxHP 
  rivalTransitionMAXHP = rivalmaxHPpp4;
  rivalmaxHPpp4 = rivalMaxHP;
  rivalMaxHP = rivalTransitionMAXHP;
  //switch pokemonHP
  rivalTransitionHP = rivalHPpp4;
  rivalHPpp4 = rivalHP;
  rivalHP = rivalTransitionHP;
  //switch pokemon
  rivalTransitionPKMN = rivalpp4;
  rivalpp4 = rivalPokemon;
  rivalPokemon = rivalTransitionPKMN;
  //switch level
  rivalTransitionLvl = rivalLevelpp4;
  rivalLevelpp4 = rivalLevel;
  rivalLevel = rivalTransitionLvl;
  //updates
  hideMoves();
  
    var damage = randomNumber(7,8);
  if (rivalSTLTHrock == true) {
      rivalHP = rivalHP - damage;
      setText("battletext", (rivalPokemon + " was damaged by the stones in the field."));
  }
  hideElement("Fight");
  rivalClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  updateALLpokemon();
  updateHP();
  healthBar();
  userflinch = 1;
  hideMoves();
  showElement("Fight");
  updateRivalSprite ();
}


//divider 
var pp1Level = 5;
var pp1leveluplngth = 10;
var pp1XP = 0;
var pp1HP = 0;
var pp1MAXHP = 0;
// divider
var pp2Level = 5;
var pp2leveluplngth = 10;
var pp2XP = 0;
var pp2HP = 0;
var pp2MAXHP = 0;
// divider
var pp3Level = 5;
var pp3leveluplngth = 10;
var pp3XP = 0;
var pp3HP = 0;
var pp3MAXHP = 0;
//divider
var pp4Level = 5;
var pp4leveluplngth = 10;
var pp4XP = 0;
var pp4HP = 0;
var pp4MAXHP = 0;
//divider
var pp5Level = 5;
var pp5leveluplngth = 10;
var pp5XP = 0;
var pp5HP = 0;
var pp5MAXHP = 0;
//divider

hideElement("switch1");
hideElement("switch2");
hideElement("switch3");
hideElement("switch4");
hideElement("switch5");
hideElement("partyPP1HP");
hideElement("partyPP2HP");
hideElement("partyPP3HP");
hideElement("partyPP4HP");
hideElement("partyPP5HP");

//User Party System
var pballCount = 30;
onEvent("openParty", "click", function( ) {
  hideElement("party2menu");
  if (partypkmn5 == true) {
    showElement("switch1");
    showElement("switch2");
    showElement("switch3");
    showElement("switch4");
    showElement("switch5");
  } else if (partypkmn4 == true) {
    showElement("switch1");
    showElement("switch2");
    showElement("switch3");
    showElement("switch4");
  } else if (partypkmn3 == true) {
    showElement("switch1");
    showElement("switch2");
    showElement("switch3");
  } else if (partypkmn2 == true) {
    showElement("switch1");
    showElement("switch2");
  } else if (partypkmn1 == true) {
    showElement("switch1");
  }
  setScreen("party");
  partyHPupdater();
});
onEvent("party2battle", "click", function( ) {
  setScreen("battlescreen");
});

var transitionXP = 0;
var transitionLvl = 0;
var transitionLL = 0;
var transitionHP = 0;
var transitionPKMN = 0;
var transitionMAXHP = 0;
onEvent("switch1", "click", function( ) {
  //level switch
  transitionLvl = pp1Level;
  pp1Level = level;
  level = transitionLvl;
  //level up length switch 
  transitionLL = pp1leveluplngth;
  pp1leveluplngth = leveluplngth;
  leveluplngth = transitionLL;
  //xp switch
  transitionXP = pp1XP;
  pp1XP = userxp;
  userxp = transitionXP;
  //HP switch 
  transitionHP = pp1HP;
  pp1HP = userHP;
  userHP = transitionHP;
  //Pokemon switch 
  transitionPKMN = partypokemon1;
  partypokemon1 = userPokemon;
  userPokemon = transitionPKMN;
  //maxHP switch
  transitionMAXHP = pp1MAXHP;
  pp1MAXHP = userMaxHP;
  userMaxHP = transitionMAXHP;
  var damage = randomNumber(7,8);
  if (userSTLTHrock == true) {
      userHP = userHP - damage;
      setText("battletext", (userPokemon + " was damaged by the stones in the field."));
  }
  userClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  setText("level&xp", (level));
  setText("statsPP1", (pp1Level));
  setText("statsUSER", (level));
  setText("xpnum", userxp + "/" + leveluplngth);
  setScreen("battlescreen");
  partyHPupdater();
  updateALLpokemon();
  updateHP();
  healthBar();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  timer("Enter");
  rivalEvade = 0;
  hideElement("whitebox");
  showElement("Enter");
  hideElement("Run");
  showElement("party2battle");
});
onEvent("switch2", "click", function( ) {
  //level switch
  transitionLvl = pp2Level;
  pp2Level = level;
  level = transitionLvl;
  //level up length switch 
  transitionLL = pp2leveluplngth;
  pp2leveluplngth = leveluplngth;
  leveluplngth = transitionLL;
  //xp switch
  transitionXP = pp2XP;
  pp2XP = userxp;
  userxp = transitionXP;
   //HP switch 
  transitionHP = pp2HP;
  pp2HP = userHP;
  userHP = transitionHP;
  //Pokemon switch 
  transitionPKMN = partypokemon2;
  partypokemon2 = userPokemon;
  userPokemon = transitionPKMN;
  //maxHP switch
  transitionMAXHP = pp2MAXHP;
  pp2MAXHP = userMaxHP;
  userMaxHP = transitionMAXHP;
  var damage = randomNumber(7,8);
  if (userSTLTHrock == true) {
      userHP = userHP - damage;
      setText("battletext", (userPokemon + " was damaged by the stones in the field."));
  }
  userClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  setText("level&xp", (level ));
  setText("statsPP2", (pp2Level));
  setText("statsUSER", (level ));
  setScreen("battlescreen");
  partyHPupdater();
  updateALLpokemon();
  updateHP();
  healthBar();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  timer("Enter");
  rivalEvade = 0;
  setText("xpnum", userxp + "/" + leveluplngth);
  hideElement("whitebox");
  showElement("Enter");
  hideElement("Run");
  showElement("party2battle");
});
onEvent("switch3", "click", function( ) {
  //level switch
  transitionLvl = pp3Level;
  pp3Level = level;
  level = transitionLvl;
  //level up length switch 
  transitionLL = pp3leveluplngth;
  pp3leveluplngth = leveluplngth;
  leveluplngth = transitionLL;
  //xp switch
  transitionXP = pp3XP;
  pp3XP = userxp;
  userxp = transitionXP;
   //HP switch 
  transitionHP = pp3HP;
  pp3HP = userHP;
  userHP = transitionHP;
  //Pokemon switch 
  transitionPKMN = partypokemon3;
  partypokemon3 = userPokemon;
  userPokemon = transitionPKMN;
  //maxHP switch
  transitionMAXHP = pp3MAXHP;
  pp3MAXHP = userMaxHP;
  userMaxHP = transitionMAXHP;
  var damage = randomNumber(7,8);
  if (userSTLTHrock == true) {
      userHP = userHP - damage;
      setText("battletext", (userPokemon + " was damaged by the stones in the field."));
  }
  userClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  setScreen("battlescreen");
  setText("level&xp", (level));
  setText("statsPP3", (pp3Level));
  setText("statsUSER", (level));
  partyHPupdater();
  updateALLpokemon();
  updateHP();
  healthBar();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  timer("Enter");
  rivalEvade = 0;
  setText("xpnum", userxp + "/" + leveluplngth);
  hideElement("whitebox");
  showElement("Enter");
  hideElement("Run");
  showElement("party2battle");
});
onEvent("switch4", "click", function( ) {
  //level switch
  transitionLvl = pp4Level;
  pp4Level = level;
  level = transitionLvl;
  //level up length switch 
  transitionLL = pp4leveluplngth;
  pp4leveluplngth = leveluplngth;
  leveluplngth = transitionLL;
  //xp switch
  transitionXP = pp4XP;
  pp4XP = userxp;
  userxp = transitionXP;
   //HP switch 
  transitionHP = pp4HP;
  pp4HP = userHP;
  userHP = transitionHP;
  //Pokemon switch 
  transitionPKMN = partypokemon4;
  partypokemon4 = userPokemon;
  userPokemon = transitionPKMN;
  //maxHP switch
  transitionMAXHP = pp4MAXHP;
  pp4MAXHP = userMaxHP;
  userMaxHP = transitionMAXHP;
  var damage = randomNumber(7,8);
  if (userSTLTHrock == true) {
      userHP = userHP - damage;
      setText("battletext", (userPokemon + " was damaged by the stones in the field."));
  }
  userClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  setText("level&xp", (level));
  setText("statsPP4", (pp4Level));
  setText("statsUSER", (level ));
  setScreen("battlescreen");
  partyHPupdater();
  updateALLpokemon();
  updateHP();
  healthBar();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  timer("Enter");
  rivalEvade = 0;
  setText("xpnum", userxp + "/" + leveluplngth);
  hideElement("whitebox");
  showElement("Enter");
  hideElement("Run");
  showElement("party2battle");
});
onEvent("switch5", "click", function( ) {
  //level switch
  transitionLvl = pp5Level;
  pp5Level = level;
  level = transitionLvl;
  //level up length switch 
  transitionLL = pp5leveluplngth;
  pp5leveluplngth = leveluplngth;
  leveluplngth = transitionLL;
  //xp switch
  transitionXP = pp5XP;
  pp5XP = userxp;
  userxp = transitionXP;
   //HP switch 
  transitionHP = pp5HP;
  pp5HP = userHP;
  userHP = transitionHP;
  //Pokemon switch 
  transitionPKMN = partypokemon5;
  partypokemon5 = userPokemon;
  userPokemon = transitionPKMN;
  //maxHP switch
  transitionMAXHP = pp5MAXHP;
  pp5MAXHP = userMaxHP;
  userMaxHP = transitionMAXHP;
  var damage = randomNumber(7,8);
  if (userSTLTHrock == true) {
      userHP = userHP - damage;
      setText("battletext", (userPokemon + " was damaged by the stones in the field."));
  }
  userClearStatusEffects();
  userEvade = 0;
  rivalEvade = 0;
  setScreen("battlescreen");
  setText("level&xp", (level ));
  setText("statsPP5", (pp5Level));
  setText("statsUSER", (level ));
  partyHPupdater();
  updateALLpokemon();
  updateHP();
  healthBar();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  timer("Enter");
  rivalEvade = 0;
  setText("xpnum", userxp + "/" + leveluplngth);
  hideElement("whitebox");
  showElement("Enter");
  hideElement("Run");
  showElement("party2battle");
});




// Update Pokemon Sprites, Moves, Position, Size, & Evolution

function updateALLpokemon() {
  updatePokemon(userPokemon, "userPokemon");
  partypokemonimagechanger(partypokemon1, "partypokemon1");
  partypokemonimagechanger(partypokemon2, "partypokemon2");
  partypokemonimagechanger(partypokemon3, "partypokemon3");
  partypokemonimagechanger(partypokemon4, "partypokemon4");
  partypokemonimagechanger(partypokemon5, "partypokemon5");
  partypokemonimagechanger(userPokemon, "pokemon.in.use");
  rivalImageChanger(rivalPokemon, "rivalPokemon");
  setText("rivalLevel", rivalLevel);
  if (rivalEXISTpp1 == true && rivalEXISTpp2 == true && rivalEXISTpp3 == true && rivalEXISTpp4 == true && rivalHP == 0) {
    hideMoves();
  } else if (rivalEXISTpp1 == true && rivalEXISTpp2 == true && rivalEXISTpp3 == true && rivalHP == 0) {
    hideMoves();
  } else if (rivalEXISTpp1 == true && rivalEXISTpp2 == true && rivalHP == 0) {
    hideMoves();
  } else if (rivalEXISTpp1 == true && rivalHP == 0) {
    hideMoves();
  } else if (rivalEXISTpp1 != true && rivalHP == 0) {
    hideMoves();
  }
  
}
function updateRivalSprite () {
  rivalImageChanger(rivalPokemon, "rivalPokemon");
}




var usertype = 0;
var rivaltype = 0;
function updatePokemon(mypokemon, mypokemon2) {
  hideMoves();
      if (mypokemon == "charmander") {
        setPosition("userPokemon", 50, 148, 60, 60);
        setImageURL(mypokemon2, "charmander2.gif");
        showElement("Amove.scratch");
        showElement("Bmove.burn");
        usertype = "fire";
      } else if (mypokemon == "charmeleon") {
        setPosition("userPokemon", 43, 130, 89, 89);
        setImageURL(mypokemon2, "charmeleon2.gif");
        showElement("Amove.megapunch");
        showElement("Bmove.burn");
        showElement("Cmove.flameburst");
        usertype = "fire";
      } else if (mypokemon == "charizard") {
        setPosition("userPokemon", 18, 92, 131, 131);
        setImageURL(mypokemon2, "charizard2.gif");
        showElement("Amove.megapunch");
        showElement("Bmove.burn");
        showElement("Cmove.fireblast");
        showElement("Dmove.dragonbreath");
        usertype = "fire";
      } else if (mypokemon == "bulbasaur") {
        setPosition("userPokemon", 50, 148, 60, 60);
        setImageURL(mypokemon2, "bulbasaur2.gif");
        showElement("Amove.tackle");
        showElement("Bmove.absorb");
        usertype = "grass";
      } else if (mypokemon == "ivysaur") {
        setPosition("userPokemon", 50, 134, 83, 83);
        setImageURL(mypokemon2, "ivysaur2.gif");
        showElement("Amove.tackle");
        showElement("Bmove.absorb");
        showElement("Cmove.vinewhip");
        usertype = "grass";
      } else if ((mypokemon == "venusaur")) {
        setPosition("userPokemon", 31, 105, 122, 122);
        setImageURL(mypokemon2, "venusaur2.gif");
        showElement("Amove.toxic");
        showElement("Bmove.absorb");
        showElement("Cmove.razorleaf");
        showElement("Dmove.synthesis");
        usertype = "grass";
      } else if (mypokemon == "squirtle") {
        setPosition("userPokemon", 50, 148, 60, 60);
        setImageURL(mypokemon2, "squirtle2.gif");
        showElement("Amove.tackle");
        showElement("Bmove.bubble");
        usertype = "water";
      } else if (mypokemon == "wartortle") {
        setPosition("userPokemon", 50, 132, 84, 84);
        setImageURL(mypokemon2, "wartortle2.gif");
        showElement("Amove.tackle");
        showElement("Bmove.bubble");
        showElement("Cmove.watergun");
        usertype = "water";
      } else if (mypokemon == "blastoise") {
        setPosition("userPokemon", 37, 113, 99, 99);
        setImageURL(mypokemon2, "blastoise2.gif");
        showElement("Amove.shellbash");
        showElement("Bmove.bubble");
        showElement("Cmove.whirlpool");
        showElement("Dmove.freezeblast");
        usertype = "water";
      } else if (mypokemon == "pidgey") {
        setPosition("userPokemon", 60, 150, 62, 62);
        setImageURL(mypokemon2, "pidgey2.gif");
        showElement("Amove.wingattack");
        showElement("Bmove.sandsweep");
        usertype = "flying";
      } else if ((mypokemon == "pidgeotto")) {
        setPosition("userPokemon", 39, 103, 115, 115);
        setImageURL(mypokemon2, "pidgeotto2.gif");
        showElement("Amove.wingattack");
        showElement("Bmove.defog");
        showElement("Cmove.steelwing");
        usertype = "flying";
      } else if (mypokemon == "pidgeot") {
        setPosition("userPokemon", 29, 115, 95, 95);
        setImageURL(mypokemon2, "pidgeot2.gif");
        showElement("Amove.wingattack");
        showElement("Bmove.defog");
        showElement("Cmove.steelwing");
        showElement("Dmove.roost");
        usertype = "flying";
      } else if ((mypokemon == "zigzagoon")) {
        setPosition("userPokemon", 53, 156, 65, 65);
        setImageURL(mypokemon2, "zigzagoon2.gif");
        usertype = "normal";
        showElement("Amove.tackle");
        showElement("Bmove.sandsweep");
      } else if ((mypokemon == "linoone")) {
        setPosition("userPokemon", 42, 143, 90, 90);
        setImageURL(mypokemon2, "linoone2.gif");
        usertype = "normal";
        showElement("Amove.quickattack");
        showElement("Bmove.sandsweep");
        showElement("Cmove.metalclaw");
        showElement("Dmove.glare");
      } else if ((mypokemon == "caterpie")) {
        setPosition("userPokemon", 60, 160, 53, 53);
        setImageURL(mypokemon2, "caterpie2.gif");
        usertype = "bug";
        showElement("Amove.bugbite");
      } else if ((mypokemon == "metapod")) {
        setPosition("userPokemon", 49, 140, 64, 64);
        setImageURL(mypokemon2, "metapod2.gif");
        usertype = "bug";
        showElement("Amove.bugbite");
        showElement("Bmove.poisondrip");
      } else if ((mypokemon == "butterfree")) {
        setPosition("userPokemon", 49, 110, 88, 88);
        setImageURL(mypokemon2, "butterfree2.gif");
        usertype = "bug";
        showElement("Amove.wingattack");
        showElement("Bmove.poisondrip");
        showElement("Cmove.uturn");
        showElement("Dmove.synthesis");
      } else if ((mypokemon == "pikachu")) {
        setPosition("userPokemon", 53, 145, 62, 62);
        setImageURL(mypokemon2, "pikachu2.gif");
        usertype = "electric";
        showElement("Amove.quickattack");
        showElement("Bmove.thundershock");
        showElement("Cmove.thunderwave");
      } else if ((mypokemon == "eevee")) {
        setPosition("userPokemon", 53, 145, 68, 68);
        setImageURL(mypokemon2, "eevee2.gif");
        usertype = "normal";
        showElement("Amove.takedown");
        showElement("Bmove.bite");
      } else if ((mypokemon == "zubat")) {
        setPosition("userPokemon", 50, 140, 74, 74);
        setImageURL(mypokemon2, "zubat2.gif");
        usertype = "poison";
        showElement("Amove.wingattack");
        showElement("Bmove.bite");
      } else if ((mypokemon == "golbat")) {
        setPosition("userPokemon", 39, 113, 107, 107);
        setImageURL(mypokemon2, "golbat2.gif");
        usertype = "poison";
        showElement("Amove.wingattack");
        showElement("Bmove.bite");
        showElement("Cmove.steelwing");
        showElement("Dmove.xscissor");
      } else if ((mypokemon == "crobat")) {
        setPosition("userPokemon", 30, 104, 135,135);
        setImageURL(mypokemon2, "crobat2.gif");
        usertype = "poison";
        showElement("Amove.wingattack");
        showElement("Bmove.bite");
        showElement("Cmove.steelwing");
        showElement("Dmove.xscissor");
      } else if ((mypokemon == "cubone")) {
        setPosition("userPokemon", 60, 150, 69, 69);
        setImageURL(mypokemon2, "cubone2.gif");
        usertype = "ground";
        showElement("Amove.tackle");
        showElement("Bmove.sandsweep");
      } else if ((mypokemon == "marowak")) {
        setPosition("userPokemon", 43, 130, 90, 90);
        setImageURL(mypokemon2, "marowak2.gif");
        usertype = "ground";
        showElement("Amove.tackle");
        showElement("Bmove.sandsweep");
        showElement("Cmove.bonerush");
      } else if ((mypokemon == "geodude")) {
        setPosition("userPokemon", 50, 145, 70, 70);
        setImageURL(mypokemon2, "geodude2.gif");
        usertype = "rock";
        showElement("Amove.rocktomb");
        showElement("Bmove.stealthrock");
      } else if ((mypokemon == "graveler")) {
        setPosition("userPokemon", 52, 138, 88, 88);
        setImageURL(mypokemon2, "graveler2.gif");
        usertype = "rock";
        showElement("Amove.rocktomb");
        showElement("Bmove.stealthrock");
        showElement("Cmove.metalclaw");
      } else if ((mypokemon == "golem")) {
        setPosition("userPokemon", 43, 120, 100, 100);
        setImageURL(mypokemon2, "golem2.gif");
        usertype = "rock";
        showElement("Amove.rockslide");
        showElement("Bmove.stealthrock");
        showElement("Cmove.metalclaw");
      } else if ((mypokemon == "slowpoke")) {
        setPosition("userPokemon", 50, 150, 74, 74);
        setImageURL(mypokemon2, "slowpoke2.gif");
        usertype = "water";
        showElement("Amove.tackle");
        showElement("Bmove.confuseray");
      } else if ((mypokemon == "slowbro")) {
        setPosition("userPokemon", 34, 128, 92, 92);
        setImageURL(mypokemon2, "slowbro2.gif");
        usertype = "water";
        showElement("Amove.shellbash");
        showElement("Bmove.confuseray");
        showElement("Cmove.psychic");
        showElement("Dmove.hyperblast");
      } else if ((mypokemon == "gastly")) {
        setPosition("userPokemon", 37, 130, 87, 87);
        setImageURL(mypokemon2, "gastly2.gif");
        usertype = "ghost";
        showElement("Amove.toxic");
        showElement("Bmove.shadowflame");
      } else if ((mypokemon == "haunter")) {
        setPosition("userPokemon", 35, 120, 106, 106);
        setImageURL(mypokemon2, "haunter2.gif");
        usertype = "ghost";
        showElement("Amove.toxic");
        showElement("Bmove.shadowflame");
        showElement("Cmove.fakeout");
      } else if ((mypokemon == "gengar")) {
        setPosition("userPokemon", 40, 120, 96, 96);
        setImageURL(mypokemon2, "gengar2.gif");
        usertype = "ghost";
        showElement("Amove.crunch");
        showElement("Bmove.poisondrip");
        showElement("Cmove.fakeout");
        showElement("Dmove.glare");
      } else if ((mypokemon == "rhyhorn")) {
        setPosition("userPokemon", 46, 135, 88, 88);
        setImageURL(mypokemon2, "rhyhorn2.gif");
        usertype = "ground";
        showElement("Amove.takedown");
        showElement("Bmove.stealthrock");
      } else if ((mypokemon == "rhydon")) {
        setPosition("userPokemon", 30, 110, 117, 117);
        setImageURL(mypokemon2, "rhydon2.gif");
        usertype = "ground";
        showElement("Amove.rockslide");
        showElement("Bmove.stealthrock");
        showElement("Cmove.metalclaw");
        showElement("Dmove.hyperblast");
      } else if ((mypokemon == "scyther")) {
        setPosition("userPokemon", 48, 120, 97, 97);
        setImageURL(mypokemon2, "scyther2.gif");
        usertype = "bug";
        showElement("Amove.quickattack");
        showElement("Bmove.falseswipe");
        showElement("Cmove.uturn");
      } else if ((mypokemon == "scizor")) {
        setPosition("userPokemon", 49, 115, 101, 101);
        setImageURL(mypokemon2, "scizor2.gif");
        usertype = "bug";
        showElement("Amove.quickattack");
        showElement("Bmove.falseswipe");
        showElement("Cmove.uturn");
        showElement("Dmove.xscissor");
      } else if ((mypokemon == "sneasel")) {
        setPosition("userPokemon", 57, 145, 73, 73);
        setImageURL(mypokemon2, "sneasel2.gif");
        usertype = "dark";
        showElement("Amove.quickattack");
        showElement("Bmove.icecrash");
        showElement("Cmove.fakeout");
      } else if ((mypokemon == "weavile")) {
        setPosition("userPokemon", 39, 105, 108, 108);
        setImageURL(mypokemon2, "weavile2.gif");
        usertype = "dark";
        showElement("Amove.quickattack");
        showElement("Bmove.icecrash");
        showElement("Cmove.fakeout");
        showElement("Dmove.xscissor");
      } else if ((mypokemon == "roselia")) {
        setPosition("userPokemon", 50, 135, 79, 79);
        setImageURL(mypokemon2, "roselia2.gif");
        usertype = "grass";
        showElement("Amove.toxic");
        showElement("Bmove.absorb");
      } else if ((mypokemon == "roserade")) {
        setPosition("userPokemon", 45, 119, 96, 96);
        setImageURL(mypokemon2, "roserade2.gif");
        usertype = "grass";
        showElement("Amove.toxic");
        showElement("Bmove.poisondrip");
        showElement("Cmove.razorleaf");
        showElement("Dmove.synthesis");
      } else if ((mypokemon == "riolu")) {
        setPosition("userPokemon", 55, 139, 68, 68);
        setImageURL(mypokemon2, "riolu2.gif");
        usertype = "fighting";
        showElement("Amove.tackle");
        showElement("Bmove.lowjab");
      } else if ((mypokemon == "lucario")) {
        setPosition("userPokemon", 43, 115, 97,97 );
        setImageURL(mypokemon2, "lucario2.gif");
        usertype = "fighting";
        showElement("Amove.megapunch");
        showElement("Bmove.stealthrock");
        showElement("Cmove.bonerush");
        showElement("Dmove.hyperblast");
      } else if ((mypokemon == "kadabra")) {
        setPosition("userPokemon", 49, 124, 98, 98);
        setImageURL(mypokemon2, "kadabra2.gif");
        usertype = "psychic";
        showElement("Amove.scratch");
        showElement("Bmove.confuseray");
        showElement("Cmove.psychic");
      } else if ((mypokemon == "alakazam")) {
        setPosition("userPokemon", 45, 113, 108, 108);
        setImageURL(mypokemon2, "alakazam2.gif");
        usertype = "psychic";
        showElement("Amove.scratch");
        showElement("Bmove.confuseray");
        showElement("Cmove.psychic");
        showElement("Dmove.regenerate");
      } else if ((mypokemon == "buizel")) {
        setPosition("userPokemon", 52, 140, 70, 70);
        setImageURL(mypokemon2, "buizel2.gif");
        usertype = "water";
        showElement("Amove.quickattack");
        showElement("Bmove.bubble");
        showElement("Cmove.watergun");
      } else if ((mypokemon == "floatzel")) {
        setPosition("userPokemon", 40, 120, 92,92 );
        setImageURL(mypokemon2, "floatzel2.gif");
        usertype = "water";
        showElement("Amove.crunch");
        showElement("Bmove.bubble");
        showElement("Cmove.whirlpool");
  } else if ((mypokemon == "mewtwo")) {
    setPosition("userPokemon", 21, 105, 126, 126);
    setImageURL(mypokemon2, "mewtwo2.gif");
    usertype = "psychic";
    showElement("Amove.megapunch");
    showElement("Bmove.shadowflame");
    showElement("Cmove.psychic");
    showElement("Dmove.regenerate");
  } 
}

function rivalImageChanger(mypokemon, mypokemon2) {
      if (mypokemon == "charmander") {
        setPosition("rivalPokemon", 210, 93, 54, 54);
        setImageURL(mypokemon2, "charmander1.gif");
        rivaltype = "fire";
      } else if (mypokemon == "bulbasaur") {
        setPosition("rivalPokemon", 210, 93, 54, 54);
        setImageURL(mypokemon2, "bulbasaur1.gif");
        rivaltype = "grass";
      } else if (mypokemon == "squirtle") {
        setPosition("rivalPokemon", 210, 93, 54, 54);
        setImageURL(mypokemon2, "squirtle1.gif");
        rivaltype = "water";
      } else if (mypokemon == "pidgey") {
        setPosition("rivalPokemon", 210, 85, 59, 59);
        rivaltype = "flying";
        setImageURL(mypokemon2, "pidgey1.gif");
      } else if (mypokemon == "zigzagoon") {
        setPosition("rivalPokemon", 210, 93, 63, 63);
        rivaltype = "normal";
        setImageURL(mypokemon2, "zigzagoon1.gif");
      } else if (mypokemon == "pidgeotto") {
        setPosition("rivalPokemon", 175, 40, 135, 135);
        rivaltype = "flying";
        setImageURL(mypokemon2, "pidgeotto1.gif");
      } else if (mypokemon == "linoone") {
        setPosition("rivalPokemon", 200, 85, 85, 85);
        rivaltype = "normal";
        setImageURL(mypokemon2, "linoone1.gif");
      } else if (mypokemon == "caterpie") {
        setPosition("rivalPokemon", 210, 93, 49,49 );
        rivaltype = "bug";
        setImageURL(mypokemon2, "caterpie1.gif");
      } else if (mypokemon == "butterfree") {
        setPosition("rivalPokemon", 190, 49, 83,83 );
        rivaltype = "bug";
        setImageURL(mypokemon2, "butterfree1.gif");
      } else if (mypokemon == "pikachu") {
        setPosition("rivalPokemon", 210, 85, 65, 65);
        rivaltype = "electric";
        setImageURL(mypokemon2, "pikachu1.gif");
      } else if (mypokemon == "eevee") {
        setPosition("rivalPokemon", 210, 93, 64,64 );
        rivaltype = "normal";
        setImageURL(mypokemon2, "eevee1.gif");
      } else if (mypokemon == "cubone") {
        setPosition("rivalPokemon", 210, 93, 62,62 );
        rivaltype = "ground";
        setImageURL(mypokemon2, "cubone1.gif");
      } else if (mypokemon == "marowak") {
        setPosition("rivalPokemon", 197, 81, 83,83 );
        rivaltype = "ground";
        setImageURL(mypokemon2, "marowak1.gif");
      } else if (mypokemon == "zubat") {
        setPosition("rivalPokemon", 210, 82, 68,68 );
        rivaltype = "poison";
        setImageURL(mypokemon2, "zubat1.gif");
      } else if (mypokemon == "golbat") {
        setPosition("rivalPokemon", 182, 43, 113,113 );
        rivaltype = "poison";
        setImageURL(mypokemon2, "golbat1.gif");
      } else if (mypokemon == "crobat") {
        setPosition("rivalPokemon", 182, 33, 123,123 );
        rivaltype = "poison";
        setImageURL(mypokemon2, "crobat1.gif");
      } else if (mypokemon == "geodude") {
        setPosition("rivalPokemon", 203, 87, 70, 70);
        rivaltype = "rock";
        setImageURL(mypokemon2, "geodude1.gif");
      } else if (mypokemon == "slowpoke") {
        setPosition("rivalPokemon", 208, 83, 70, 70);
        rivaltype = "water";
        setImageURL(mypokemon2, "slowpoke1.gif");
      } else if (mypokemon == "slowbro") {
        setPosition("rivalPokemon", 204, 79, 72,72 );
        rivaltype = "psychic";
        setImageURL(mypokemon2, "slowbro1.gif");
      } else if (mypokemon == "gastly") {
        setPosition("rivalPokemon", 195, 71, 88,88 );
        rivaltype = "ghost";
        setImageURL(mypokemon2, "gastly1.gif");
      } else if (mypokemon == "haunter") {
        setPosition("rivalPokemon", 187, 61, 98,98 );
        rivaltype = "ghost";
        setImageURL(mypokemon2, "haunter1.gif");
      } else if (mypokemon == "gengar") {
        setPosition("rivalPokemon", 183, 56, 102,102 );
        rivaltype = "ghost";
        setImageURL(mypokemon2, "gengar1.gif");
      } else if (mypokemon == "rhyhorn") {
        setPosition("rivalPokemon", 198, 79, 79,79 );
        rivaltype = "rock";
        setImageURL(mypokemon2, "rhyhorn1.gif");
      } else if (mypokemon == "rhydon") {
        setPosition("rivalPokemon", 192, 60, 95,95 );
        rivaltype = "rock";
        setImageURL(mypokemon2, "rhydon1.gif");
      } else if (mypokemon == "scyther") {
        setPosition("rivalPokemon", 195, 74, 78,78 );
        rivaltype = "bug";
        setImageURL(mypokemon2, "scyther1.gif");
      } else if (mypokemon == "sneasel") {
        setPosition("rivalPokemon", 204, 79, 72,72 );
        rivaltype = "ice";
        setImageURL(mypokemon2, "sneasel1.gif");
      } else if (mypokemon == "weavile") {
        setPosition("rivalPokemon", 183, 42, 100,100 );
        rivaltype = "ice";
        setImageURL(mypokemon2, "weavile1.gif");
      } else if (mypokemon == "roselia") {
        setPosition("rivalPokemon", 198, 73, 73,73 );
        rivaltype = "grass";
        setImageURL(mypokemon2, "roselia1.gif");
      } else if (mypokemon == "roserade") {
        setPosition("rivalPokemon", 189, 60, 90,90 );
        rivaltype = "grass";
        setImageURL(mypokemon2, "roserade1.gif");
      } else if (mypokemon == "riolu") {
        setPosition("rivalPokemon", 202, 78, 64,64 );
        rivaltype = "fighting";
        setImageURL(mypokemon2, "riolu1.gif");
      } else if (mypokemon == "kadabra") {
        setPosition("rivalPokemon", 202, 75, 83,83 );
        rivaltype = "psychic";
        setImageURL(mypokemon2, "kadabra1.gif");
      } else if (mypokemon == "alakazam") {
        setPosition("rivalPokemon", 182, 62, 104,104 );
        rivaltype = "psychic";
        setImageURL(mypokemon2, "alakazam1.gif");
      } else if (mypokemon == "buizel") {
        setPosition("rivalPokemon", 206, 75, 67,67 );
        rivaltype = "water";
        setImageURL(mypokemon2, "buizel1.gif");
      } else if (mypokemon == "mewtwo") {
        setPosition("rivalPokemon", 190, 46, 110,110 );
        rivaltype = "psychic";
        setImageURL(mypokemon2, "mewtwo1.gif");
      } else if (mypokemon == "spearow") {
        setPosition("rivalPokemon", 210, 88, 54, 54);
        rivaltype = "flying";
        setImageURL(mypokemon2, "spearow1.gif");
      } else if (mypokemon == "vulpix") {
        setPosition("rivalPokemon", 210, 88, 64, 64);
        rivaltype = "fire";
        setImageURL(mypokemon2, "vulpix1.gif");
      } else if (mypokemon == "galvantula") {
        setPosition("rivalPokemon", 200, 80, 77, 77);
        rivaltype = "electric";
        setImageURL(mypokemon2, "galvantula1.gif");
      } else if (mypokemon == "persian") {
        setPosition("rivalPokemon", 198, 68, 82, 82);
        rivaltype = "normal";
        setImageURL(mypokemon2, "persian1.gif");
      } else if (mypokemon == "dragonair") {
        setPosition("rivalPokemon", 195, 63, 88, 88);
        rivaltype = "dragon";
        setImageURL(mypokemon2, "dragonair1.gif");
      } else if (mypokemon == "nuzleaf") {
        setPosition("rivalPokemon", 210, 82, 67, 67);
        rivaltype = "leaf";
        setImageURL(mypokemon2, "nuzleaf1.gif");
      } else if (mypokemon == "seviper") {
        setPosition("rivalPokemon", 187, 58, 105, 105);
        rivaltype = "poison";
        setImageURL(mypokemon2, "seviper1.gif");
      } else if (mypokemon == "dusclops") {
        setPosition("rivalPokemon", 201, 68, 87, 87);
        rivaltype = "ghost";
        setImageURL(mypokemon2, "dusclops1.gif");
      } else if (mypokemon == "kabutops") {
        setPosition("rivalPokemon", 193, 68, 80, 80);
        rivaltype = "rock";
        setImageURL(mypokemon2, "kabutops1.gif");
      } else if (mypokemon == "sandslash") {
        setPosition("rivalPokemon", 197, 73, 74, 74);
        rivaltype = "ground";
        setImageURL(mypokemon2, "sandslash1.gif");
      } else if (mypokemon == "bisharp") {
        setPosition("rivalPokemon", 196, 58, 88, 88);
        rivaltype = "steel";
        setImageURL(mypokemon2, "bisharp1.gif");
      } else if (mypokemon == "cofagrigus") {
        setPosition("rivalPokemon", 182, 52, 119, 119);
        rivaltype = "ghost";
        setImageURL(mypokemon2, "cofagrigus1.gif");
      } else if (mypokemon == "zweilous") {
        setPosition("rivalPokemon", 196, 58, 83, 83);
        rivaltype = "dragon";
        setImageURL(mypokemon2, "zweilous1.gif");
      } else if (mypokemon == "espeon") {
        setPosition("rivalPokemon", 203, 60, 81, 81);
        rivaltype = "psychic";
        setImageURL(mypokemon2, "espeon1.gif");
      } else if (mypokemon == "lapras") {
        setPosition("rivalPokemon", 191, 57, 86, 86);
        rivaltype = "water";
        setImageURL(mypokemon2, "lapras1.gif");
      } else if (mypokemon == "ninetales") {
        setPosition("rivalPokemon", 195, 66, 82, 82);
        rivaltype = "fire";
        setImageURL(mypokemon2, "ninetales1.gif");
      } else if (mypokemon == "dragonite") {
        setPosition("rivalPokemon", 201, 52, 94, 94);
        rivaltype = "dragon";
        setImageURL(mypokemon2, "dragonite1.gif");
      } else if (mypokemon == "ninjask") {
        setPosition("rivalPokemon", 207, 60, 67, 67);
        rivaltype = "bug";
        setImageURL(mypokemon2, "ninjask1.gif");
      } else if (mypokemon == "shiftry") {
        setPosition("rivalPokemon", 190, 60, 109, 109);
        rivaltype = "grass";
        setImageURL(mypokemon2, "shiftry1.gif");
      } else if (mypokemon == "hydreigon") {
        setPosition("rivalPokemon", 185, 31, 119, 119);
        rivaltype = "dragon";
        setImageURL(mypokemon2, "hydreigon1.gif");
      } else if (mypokemon == "gyarados") {
        setPosition("rivalPokemon", 178, 52, 119, 119);
        rivaltype = "water";
            setImageURL(mypokemon2, "gyarados1.gif");
      } else if (mypokemon == "houndoom") {
        setPosition("rivalPokemon", 201, 52, 96, 96);
        rivaltype = "fire";
        setImageURL(mypokemon2, "houndoom1.gif");
      } else if (mypokemon == "aerodactyl") {
         setPosition("rivalPokemon", 181, 31, 114, 114);
        rivaltype = "rock";
        setImageURL(mypokemon2, "aerodactyl1.gif");
      } else if (mypokemon == "tauros") {
        setPosition("rivalPokemon", 191, 55, 96, 96);
        rivaltype = "normal";
        setImageURL(mypokemon2, "tauros1.gif");
      } else if (mypokemon == "tyranitar") {
        setPosition("rivalPokemon", 191, 52, 103, 103);
        rivaltype = "rock";
        setImageURL(mypokemon2, "tyranitar1.gif");
      }
}

function partypokemonimagechanger(mypokemon,mypokemon2) {
   if (mypokemon == "charmander") {
    setImageURL(mypokemon2, "charmanderTH.png");
  } else if (mypokemon == "charmeleon") {
    setImageURL(mypokemon2, "charmeleonTH.png");
  } else if (mypokemon == "charizard") {
    setImageURL(mypokemon2, "charizardTH.png");
  } else if (mypokemon == "bulbasaur") {
    setImageURL(mypokemon2, "bulbasaurTH.png");
  } else if (mypokemon == "ivysaur") {
    setImageURL(mypokemon2, "ivysaurTH.png");
  } else if ((mypokemon == "venusaur")) {
    setImageURL(mypokemon2, "venusaurTH.png");
  } else if (mypokemon == "squirtle") {
    setImageURL(mypokemon2, "squirtleTH.png");
  } else if (mypokemon == "wartortle") {
    setImageURL(mypokemon2, "wartortleTH.png");
  } else if (mypokemon == "blastoise") {
    setImageURL(mypokemon2, "blastoiseTH.png");
  } else if (mypokemon == "pidgey") {
    setImageURL(mypokemon2, "pidgeyTH.png");
  }else if (mypokemon == "pidgeotto") {
    setImageURL(mypokemon2, "pidgeottoTH.png");
  }else if (mypokemon == "pidgeot") {
    setImageURL(mypokemon2, "pidgeotTH.png");
  }else if (mypokemon == "zigzagoon") {
    setImageURL(mypokemon2, "zigzagoonTH.png");
  }else if (mypokemon == "linoone") {
    setImageURL(mypokemon2, "linooneTH.png");
  }else if (mypokemon == "caterpie") {
    setImageURL(mypokemon2, "caterpieTH.png");
  }else if (mypokemon == "metapod") {
    setImageURL(mypokemon2, "metapodTH.png");
  }else if (mypokemon == "butterfree") {
    setImageURL(mypokemon2, "butterfreeTH.png");
  }else if (mypokemon == "pikachu") {
    setImageURL(mypokemon2, "pikachuTH.png");
  }else if (mypokemon == "eevee") {
    setImageURL(mypokemon2, "eeveeTH.png");
  }else if (mypokemon == "flareon") {
    setImageURL(mypokemon2, "flareon1.png");
  }else if (mypokemon == "vaporeon") {
    setImageURL(mypokemon2, "vaporeon1.png");
  }else if (mypokemon == "jolteon") {
    setImageURL(mypokemon2, "jolteon1.png");
  }else if (mypokemon == "cubone") {
    setImageURL(mypokemon2, "cuboneTH.png");
  }else if (mypokemon == "marowak") {
    setImageURL(mypokemon2, "marowakTH.png");
  }else if (mypokemon == "zubat") {
    setImageURL(mypokemon2, "zubatTH.png");
  }else if (mypokemon == "golbat") {
    setImageURL(mypokemon2, "golbatTH.png");
  }else if (mypokemon == "crobat") {
    setImageURL(mypokemon2, "crobatTH.png");
  }else if (mypokemon == "geodude") {
    setImageURL(mypokemon2, "geodudeTH.png");
  }else if (mypokemon == "graveler") {
    setImageURL(mypokemon2, "gravelerTH.png");
  }else if (mypokemon == "golem") {
    setImageURL(mypokemon2, "golem.png");
  }else if (mypokemon == "slowpoke") {
    setImageURL(mypokemon2, "slowpoke.png");
  }else if (mypokemon == "slowbro") {
    setImageURL(mypokemon2, "slowbroTH.png");
  }else if (mypokemon == "gastly") {
    setImageURL(mypokemon2, "gastlyTH.png");
  }else if (mypokemon == "haunter") {
    setImageURL(mypokemon2, "haunterTH.png");
  }else if (mypokemon == "gengar") {
    setImageURL(mypokemon2, "gengarTH.png");
  }else if (mypokemon == "rhyhorn") {
    setImageURL(mypokemon2, "rhyhornTH.png");
  }else if (mypokemon == "rhydon") {
    setImageURL(mypokemon2, "rhydonTH.png");
  }else if (mypokemon == "scyther") {
    setImageURL(mypokemon2, "scytherTH.png");
  }else if (mypokemon == "scizor") {
    setImageURL(mypokemon2, "scizorTH.png");
  }else if (mypokemon == "sneasel") {
    setImageURL(mypokemon2, "sneaselTH.png");
  }else if (mypokemon == "weavile") {
    setImageURL(mypokemon2, "weavileTH.png");
  }else if (mypokemon == "roselia") {
    setImageURL(mypokemon2, "roseliaTH.png");
  }else if (mypokemon == "roserade") {
    setImageURL(mypokemon2, "roseradeTH.png");
  }else if (mypokemon == "riolu") {
    setImageURL(mypokemon2, "rioluTH.png");
  }else if (mypokemon == "lucario") {
    setImageURL(mypokemon2, "lucarioTH.png");
  }else if (mypokemon == "kadabra") {
    setImageURL(mypokemon2, "kadabraTH.png");
  }else if (mypokemon == "alakazam") {
    setImageURL(mypokemon2, "alakazamTH.png");
  }else if (mypokemon == "buizel") {
    setImageURL(mypokemon2, "buizelTH.png");
  }else if (mypokemon == "floatzel") {
    setImageURL(mypokemon2, "floatzelTH.png");
  }else if (mypokemon == "mewtwo") {
    setImageURL(mypokemon2, "mewtwoTH.png");
  } 
   setProperty("pokemon.in.use", "width", 75);
   setProperty("pokemon.in.use", "height", 75);
}

// evolution system
function evolution() {
  setText("level&xp", ( level ));
  setText("statsUSER",("Level: " + level ));
  if (userPokemon == "charmander" && level >= 8) {
    userPokemon = "charmeleon";
  } else if ((userPokemon == "bulbasaur" && level >= 8)) {
    userPokemon = "ivysaur";
  } else if ((userPokemon == "squirtle" && level >= 8)) {
    userPokemon = "wartortle";
  } else if (userPokemon == "charmeleon" && level >= 12) {
    userPokemon = "charizard";
  } else if (userPokemon == "ivysaur" && level >= 12) {
    userPokemon = "venusaur";
  } else if (userPokemon == "wartortle" && level >= 12) {
    userPokemon = "blastoise";
  } else if (userPokemon == "pidgey" && level >= 8 ) {
    userPokemon = "pidgeotto";
  } else if (userPokemon == "pidgeotto" && level >= 11 ) {
    userPokemon = "pidgeot";
  } else if (userPokemon == "zigzagoon" && level >= 8) {
    userPokemon = "linoone";
  } else if (userPokemon == "caterpie" && level >= 9 ) {
    userPokemon = "metapod";
  } else if (userPokemon == "metapod" && level >= 11 ) {
    userPokemon = "butterfree";
  } else if (userPokemon == "geodude" && level >= 9 ) {
    userPokemon = "graveler";
  } else if (userPokemon == "graveler" && level >= 12 ) {
    userPokemon = "golem";
  } else if (userPokemon == "slowpoke" && level >= 11 ) {
    userPokemon = "slowbro";
  } else if (userPokemon == "gastly" && level >= 10 ) {
    userPokemon = "haunter";
  } else if (userPokemon == "haunter" && level >= 11 ) {
    userPokemon = "gengar";
  } else if (userPokemon == "rhyhorn" && level >= 10 ) {
    userPokemon = "rhydon";
  } else if (userPokemon == "scyther" && level >= 10 ) {
    userPokemon = "scizor";
  } else if (userPokemon == "sneasel" && level >= 10 ) {
    userPokemon = "weavile";
  } else if (userPokemon == "roselia" && level >= 10 ) {
    userPokemon = "roserade";
  } else if (userPokemon == "riolu" && level >= 9 ) {
    userPokemon = "lucario";
  } else if (userPokemon == "kadabra" && level >= 10 ) {
    userPokemon = "alakazam";
  } else if (userPokemon == "buizel" && level >= 11 ) {
    userPokemon = "floatzel";
  }
}
//


function hideBacks() {
  hideElement("plainBack");
  hideElement("caveBack");
  hideElement("grassBack");
  hideElement("trainerBack");
  hideElement("finalBack");
}

onEvent("goToParty", "click", function( ) {
  setScreen("party");
  hideElement("switch1");
  hideElement("switch2");
  hideElement("switch3");
  hideElement("switch4");
  hideElement("switch5");
  hideElement("party2battle");
  showElement("party2menu")
});
onEvent("goToBag", "click", function( ) {
  setText("pokeballCount", pballCount + " pokeballs");
  setText("potionCount", potionCount + " potions");
  setScreen("bag");
  showElement("bagToMenu");
  hideElement("potionUse")
  hideElement("pokeballUse");
});
onEvent("bagToMenu", "click", function( ) {
  setScreen("gameMenu");
  hideElement("bagToMenu");
});
onEvent("deliveryToBag", "click", function( ) {
  setScreen("bag");
});
onEvent("party2menu", "click", function( ) {
  setScreen("gameMenu");
  hideElement("party2menu");
});



// Grass Patches

onEvent("catchPokemon", "click", function( ) {

showElement("Return");
        showElement("bag2battle");
        hideBacks();
        showElement("grassBack")
          healthBar();
          userEvade = 0;
          rivalEvade = 0;
          userSTLTHrock = false;
          rivalSTLTHrock = false;
          userClearStatusEffects();
          rivalClearStatusEffects();
          partysize = 1;
          rivalLevel = randomNumber(6,7);
          showElement("pokeballUse");
          var encounter = randomNumber(1,16);
          if (encounter == 1) {
          stopMusic();
          rivalPokemon = "pidgey";
          setText("battletext", "A wild pidgey appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 2) {
          stopMusic();
          rivalPokemon = "zigzagoon";
          setText("battletext", "A wild zigzagoon appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 3) {
          stopMusic();
          rivalPokemon = "caterpie";
          setText("battletext", "A wild caterpie appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 4) {
          stopMusic();
          rivalPokemon = "eevee";
          setText("battletext", "A wild eevee appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 5) {
          stopMusic();
          rivalPokemon = "pikachu";
          setText("battletext", "A wild pikachu appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 6) {
          stopMusic();
          rivalPokemon = "cubone";
          setText("battletext", "A wild cubone appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 7) {
          stopMusic();
          rivalPokemon = "riolu";
          setText("battletext", "A wild riolu appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 8) {
          stopMusic();
          rivalPokemon = "roselia";
          setText("battletext", "A wild roselia appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 9) {
          stopMusic();
          rivalPokemon = "scyther";
          setText("battletext", "A wild scyther appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 10) {
          stopMusic();
          rivalPokemon = "rhyhorn";
          setText("battletext", "A wild rhyhorn appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 11) {
          stopMusic();
          rivalPokemon = "buizel";
          setText("battletext", "A wild buizel appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 12) {
          stopMusic();
          rivalPokemon = "slowpoke";
          setText("battletext", "A wild slowpoke appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 13) {
          stopMusic();
          rivalPokemon = "sneasel";
          setText("battletext", "A wild sneasel appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 14) {
          stopMusic();
          rivalPokemon = "kadabra";
          setText("battletext", "A wild kadabra appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 15) {
          stopMusic();
          rivalPokemon = "geodude";
          setText("battletext", "A wild geodude appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 16) {
          stopMusic();
          rivalPokemon = "zubat";
          setText("battletext", "A wild zubat appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        } else if (encounter == 16) {
          stopMusic();
          rivalPokemon = "gastly";
          setText("battletext", "A wild gastly appeared");
          rivalMaxHP = randomNumber(50, 60);
          rivalHP = rivalMaxHP;
          rivalLevel = randomNumber(5,7);
          setScreen("battlescreen");
        }
          showElement("rivalPokemon");
          updateHP();
          updateALLpokemon();
          hideMoves();
          hideElement("openBag");
          hideElement("openParty");
          playSound("114-Battle!-Wild-Pokemon.mp3", true);
          showElement("Fight");
});

function battleBlue() {
  showElement("bag2battle");
  stopMusic();
  playSound("143-Battle!-Trainer-(Kanto).mp3", true);
  hideBacks();
  showElement("trainerBack")
  healthBar();
  userEvade = 0;
  rivalEvade = 0;
  userSTLTHrock = false;
  rivalSTLTHrock = false;
  userClearStatusEffects();
  rivalClearStatusEffects();
   hideElement("pokeballUse");
   if (userPokemon == "charmander") {
    rivalLevel = 5;
    rivalMaxHP = 50;
    rivalHP = rivalMaxHP;
    rivalPokemon = "squirtle";
  } else if (userPokemon == "bulbasaur") {
    rivalLevel = 5;
    rivalMaxHP = 50;
    rivalPokemon = "charmander";
  } else if (userPokemon == "squirtle") {
    rivalLevel = 5;
    rivalMaxHP = 50;
    rivalPokemon = "bulbasaur";
  }
  setScreen("battlescreen");
  showElement("rivalPokemon");
  updateHP();
  healthBar();
  updateALLpokemon();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  showElement("Fight");
  }
    
onEvent("level1", "click", function( ) {
  stopSound();
  playSound("52-Battle!-(Gym-Leader-Kanto-Version.mp3", true);
  var pokemon1 = randomNumber(1, 4);
  var pokemon2 = randomNumber(1, 4);
  var pokemon3 = randomNumber(1, 4);
   //1st Pokemon 
  if (pokemon1 == 1) {
    rivalPokemon = "zigzagoon" ;
  } else if (pokemon1 == 2) {
    rivalPokemon = "spearow" ;
  } else if (pokemon1 == 3) {
    rivalPokemon = "pidgey";
  } else if (pokemon1 == 4) {
    rivalPokemon = "pikachu";
  }
  rivalMaxHP = 60;
  rivalHP = 60;
  rivalLevel = randomNumber(5, 7);
  //2nd Pokemon
  if (pokemon2 == 1) {
    rivalpp1 = "roselia";
  } else if (pokemon2 == 2) {
    rivalpp1 = "vulpix";
  } else if (pokemon2 == 3) {
    rivalpp1 = "butterfree";
  } else if (pokemon2 == 4) {
    rivalpp1 = "pidgey";
  }
  rivalEXISTpp1 = true;
  rivalmaxHPpp1 = 75;
  rivalHPpp1 = 75;
  rivalLevelpp1 = randomNumber(5, 7);;
   //3rd Pokemon
   if (pokemon3 == 1) {
    rivalpp2 = "spearow";
  } else if (pokemon3 == 2) {
    rivalpp2 = "slowpoke";
  } else if (pokemon3 == 3) {
    rivalpp2 = "riolu";
  } else if (pokemon3 == 4) {
    rivalpp2 = "caterpie";
  }
  rivalEXISTpp2 = true;
  rivalmaxHPpp2 = 90;
  rivalHPpp2 = 90;
  rivalLevelpp2 = 8;
  healthBar();
  userEvade = 0;
  rivalEvade = 0;
  userSTLTHrock = false;
  rivalSTLTHrock = false;
  userClearStatusEffects();
  rivalClearStatusEffects();
  partysize = 3;
  setScreen("battlescreen");
  hideElement("pokeballUse");
  updateHP();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  showElement("Fight");
  updateALLpokemon();
  showElement("rivalPokemon");
  updateALLpokemon();
  hideMoves();
});

onEvent("level2", "click", function( ) {
  stopSound();
  playSound("144-Battle!-Gym-Leader.mp3", true);
  updateALLpokemon();
  var pokemon1 = randomNumber(1, 4);
  var pokemon2 = randomNumber(1, 4);
  var pokemon3 = randomNumber(1, 4);
   //1st Pokemon 
  if (pokemon1 == 1) {
    rivalPokemon = "linoone" ;
  } else if (pokemon1 == 2) {
    rivalPokemon = "pidgeotto" ;
  } else if (pokemon1 == 3) {
    rivalPokemon = "galvantula";
  } else if (pokemon1 == 4) {
    rivalPokemon = "persian";
  }
  updateALLpokemon();
  rivalMaxHP = 95;
  rivalHP = 95;
  rivalLevel = randomNumber(8, 9);
  //2nd Pokemon
  if (pokemon2 == 1) {
    rivalpp1 = "roselia";
  } else if (pokemon2 == 2) {
    rivalpp1 = "scyther";
  } else if (pokemon2 == 3) {
    rivalpp1 = "kadabra";
  } else if (pokemon2 == 4) {
    rivalpp1 = "haunter";
  }
  rivalEXISTpp1 = true;
  rivalmaxHPpp1 = 130;
  rivalHPpp1 = 130;
  rivalLevelpp1 = randomNumber(8, 10 );;
   //3rd Pokemon
   if (pokemon3 == 1) {
    rivalpp2 = "marowak";
  } else if (pokemon3 == 2) {
    rivalpp2 = "nuzleaf";
  } else if (pokemon3 == 3) {
    rivalpp2 = "dusclops";
  } else if (pokemon3 == 4) {
    rivalpp2 = "seviper";
  }
  rivalEXISTpp2 = true;
  rivalmaxHPpp2 = 150;
  rivalHPpp2 = 150;
  rivalLevelpp2 = 11;
  
  healthBar();
  userEvade = 0;
  rivalEvade = 0;
  userSTLTHrock = false;
  rivalSTLTHrock = false;
  userClearStatusEffects();
  rivalClearStatusEffects();
  partysize = 3;
  setScreen("battlescreen");
  hideElement("pokeballUse");
  updateHP();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  showElement("Fight");
  updateALLpokemon();
  showElement("rivalPokemon");
  updateALLpokemon();
  hideMoves();
});

onEvent("level3", "click", function( ) {
  stopSound();
  playSound("57-Battle!-(Champion-Hoenn-Version).mp3", true);
  updateALLpokemon();
  var pokemon1 = randomNumber(1, 4);
  var pokemon2 = randomNumber(1, 4);
  var pokemon3 = randomNumber(1, 4);
   //1st Pokemon 
  if (pokemon1 == 1) {
    rivalPokemon = "rhydon" ;
  } else if (pokemon1 == 2) {
    rivalPokemon = "pidgeotto" ;
  } else if (pokemon1 == 3) {
    rivalPokemon = "weavile";
  } else if (pokemon1 == 4) {
    rivalPokemon = "galvantula";
  }
  updateALLpokemon();
  rivalMaxHP = 150;
  rivalHP = 150;
  rivalLevel = randomNumber(10, 11);
  //2nd Pokemon
  if (pokemon2 == 1) {
    rivalpp1 = "pikachu";
  } else if (pokemon2 == 2) {
    rivalpp1 = "scyther";
  } else if (pokemon2 == 3) {
    rivalpp1 = "kadabra";
  } else if (pokemon2 == 4) {
    rivalpp1 = "persian";
  }
  rivalEXISTpp1 = true;
  rivalmaxHPpp1 = 160;
  rivalHPpp1 = 160;
  rivalLevelpp1 = randomNumber(10, 11 );;
   //3rd Pokemon
   if (pokemon3 == 1) {
    rivalpp2 = "dragonair";
  } else if (pokemon3 == 2) {
    rivalpp2 = "dusclops";
  } else if (pokemon3 == 3) {
    rivalpp2 = "kabutops";
  } else if (pokemon3 == 4) {
    rivalpp2 = "seviper";
  }
  rivalEXISTpp2 = true;
  rivalmaxHPpp2 = 180;
  rivalHPpp2 = 180;
  rivalLevelpp2 = 12;
  
  healthBar();
  userEvade = 0;
  rivalEvade = 0;
  userSTLTHrock = false;
  rivalSTLTHrock = false;
  userClearStatusEffects();
  rivalClearStatusEffects();
  partysize = 3;
  setScreen("battlescreen");
  hideElement("pokeballUse");
  updateHP();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  showElement("Fight");
  updateALLpokemon();
  showElement("rivalPokemon");
  updateALLpokemon();
  hideMoves();
});

onEvent("level4", "click", function( ) {
  stopSound();
  playSound("329-Battle!-Legendary-Pokemon.mp3", true);
  updateALLpokemon();
  var pokemon1 = randomNumber(1, 4);
  var pokemon2 = randomNumber(1, 4);
  var pokemon3 = randomNumber(1, 4);
  var pokemon4 = randomNumber(1, 4);
   //1st Pokemon 
  if (pokemon1 == 1) {
    rivalPokemon = "rhydon" ;
  } else if (pokemon1 == 2) {
    rivalPokemon = "ninetales" ;
  } else if (pokemon1 == 3) {
    rivalPokemon = "weavile";
  } else if (pokemon1 == 4) {
    rivalPokemon = "crobat";
  }
  updateALLpokemon();
  rivalMaxHP = 200;
  rivalHP = 200;
  rivalLevel = randomNumber(12, 13);
  //2nd Pokemon
  if (pokemon2 == 1) {
    rivalpp1 = "slowbro";
  } else if (pokemon2 == 2) {
    rivalpp1 = "seviper";
  } else if (pokemon2 == 3) {
    rivalpp1 = "sandslash";
  } else if (pokemon2 == 4) {
    rivalpp1 = "cofagrigus";
  }
  rivalEXISTpp1 = true;
  rivalmaxHPpp1 = 240;
  rivalHPpp1 = 240;
  rivalLevelpp1 = randomNumber(13, 14);;
   //3rd Pokemon
   if (pokemon3 == 1) {
    rivalpp2 = "kabutops";
  } else if (pokemon3 == 2) {
    rivalpp2 = "bisharp";
  } else if (pokemon3 == 3) {
    rivalpp2 = "galvantula";
  } else if (pokemon3 == 4) {
    rivalpp2 = "zweilous";
  }
  rivalEXISTpp2 = true;
  rivalmaxHPpp2 = 250;
  rivalHPpp2 = 250;
  rivalLevelpp2 = randomNumber(13, 14 );;
  
    //4th Pokemon
   if (pokemon4 == 1) {
    rivalpp3 = "tauros";
  } else if (pokemon4 == 2) {
    rivalpp3 = "pikachu";
  } else if (pokemon4 == 3) {
    rivalpp3 = "gyarados";
  } else if (pokemon4 == 4) {
    rivalpp3 = "ninetales";
  }
  rivalEXISTpp3 = true;
  rivalmaxHPpp3 = 280;
  rivalHPpp3 = 280;
  rivalLevelpp3 = 15;
  
  healthBar();
  userEvade = 0;
  rivalEvade = 0;
  userSTLTHrock = false;
  rivalSTLTHrock = false;
  userClearStatusEffects();
  rivalClearStatusEffects();
  partysize = 4;
  setScreen("battlescreen");
  hideElement("pokeballUse");
  updateHP();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  showElement("Fight");
  updateALLpokemon();
  showElement("rivalPokemon");
  updateALLpokemon();
  hideMoves();
});

onEvent("level5", "click", function( ) {
  stopSound();
  playSound("229-Battle!-Elite-Four.mp3", true);
  updateALLpokemon();
  var pokemon1 = randomNumber(1, 4);
  var pokemon2 = randomNumber(1, 4);
  var pokemon3 = randomNumber(1, 4);
  var pokemon4 = randomNumber(1, 4);
  var pokemon5 = randomNumber(1, 5);
   //1st Pokemon 
  if (pokemon1 == 1) {
    rivalPokemon = "espeon" ;
  } else if (pokemon1 == 2) {
    rivalPokemon = "ninetales" ;
  } else if (pokemon1 == 3) {
    rivalPokemon = "weavile";
  } else if (pokemon1 == 4) {
    rivalPokemon = "crobat";
  }
  updateALLpokemon();
  rivalMaxHP = 300;
  rivalHP = 300;
  rivalLevel = randomNumber(16, 17);
  //2nd Pokemon
  if (pokemon2 == 1) {
    rivalpp1 = "roserade";
  } else if (pokemon2 == 2) {
    rivalpp1 = "lapras";
  } else if (pokemon2 == 3) {
    rivalpp1 = "ninetales";
  } else if (pokemon2 == 4) {
    rivalpp1 = "ninjask";
  }
  rivalEXISTpp1 = true;
  rivalmaxHPpp1 = 350;
  rivalHPpp1 = 350;
  rivalLevelpp1 = randomNumber(16, 18);;
   //3rd Pokemon
   if (pokemon3 == 1) {
    rivalpp2 = "shiftry";
  } else if (pokemon3 == 2) {
    rivalpp2 = "gengar";
  } else if (pokemon3 == 3) {
    rivalpp2 = "houndoom";
  } else if (pokemon3 == 4) {
    rivalpp2 = "aerodactyl";
  }
  rivalEXISTpp2 = true;
  rivalmaxHPpp2 = 390;
  rivalHPpp2 = 390;
  rivalLevelpp2 = randomNumber(16, 18 );;
  
    //4th Pokemon
   if (pokemon4 == 1) {
    rivalpp3 = "ninjask";
  } else if (pokemon4 == 2) {
    rivalpp3 = "tauros";
  } else if (pokemon4 == 3) {
    rivalpp3 = "bisharp";
  } else if (pokemon4 == 4) {
    rivalpp3 = "roserade";
  }
  rivalEXISTpp3 = true;
  rivalmaxHPpp3 = 450;
  rivalHPpp3 = 450;
  rivalLevelpp3 = 19;
  
    //5th Pokemon
   if (pokemon5 == 1) {
    rivalpp4 = "hydreigon";
  } else if (pokemon5 == 2) {
    rivalpp4 = "tyranitar";
  } else if (pokemon5 == 3) {
    rivalpp4 = "dragonite";
  } else if (pokemon5 == 4) {
    rivalpp4 = "gyarados";
  }
  rivalEXISTpp4 = true;
  rivalmaxHPpp4 = 500;
  rivalHPpp4 = 500;
  rivalLevelpp4 = 20;
  
  healthBar();
  userEvade = 0;
  rivalEvade = 0;
  userSTLTHrock = false;
  rivalSTLTHrock = false;
  userClearStatusEffects();
  rivalClearStatusEffects();
  partysize = 5;
  setScreen("battlescreen");
  hideElement("pokeballUse");
  updateHP();
  hideMoves();
  hideElement("openBag");
  hideElement("openParty");
  showElement("Fight");
  updateALLpokemon();
  showElement("rivalPokemon");
  updateALLpokemon();
  hideMoves();
});

onEvent("healPokemon", "click", function( ) {
  userHP = userMaxHP;
  pp1HP = pp1MAXHP; 
  pp2HP = pp2MAXHP; 
  pp3HP = pp3MAXHP; 
  pp4HP = pp4MAXHP; 
  pp5HP = pp5MAXHP; 
  playSound("120-Recovery.mp3", false);
});



function userFaintedRegulation () {
   
    if (userHP <= 0) {
    playSound("In-Battle-Faint-No-Health.mp3", false);
    setScreen("party");
    hideElement("party2battle");
    hideElement("party2menu");
    userClearStatusEffects();
    showElement("whitebox");
    hideElement("Enter");
    showElement("blackbox");
    showElement("Run");
  }
   if (pp1HP <= 0) {
    hideElement("switch1");
    userClearStatusEffects();
  } else if (pp2HP <= 0) {
    hideElement("switch2");
    userClearStatusEffects();
  } else if (pp3HP <= 0) {
    hideElement("switch3");
    userClearStatusEffects();
  } else if (pp4HP <= 0) {
    hideElement("switch4");
    userClearStatusEffects();
  } else if (pp5HP <= 0) {
    hideElement("switch5");
    userClearStatusEffects();
  } 
  if (partypkmn1 == true && partypkmn2  == true && partypkmn3  == true && partypkmn4  == true && partypkmn5  == true && userHP <= 0 && pp1HP <= 0 && pp2HP <= 0 && pp3HP <= 0 && pp4HP <= 0 && pp5HP <= 0) {
  setScreen("battlescreen");
  stopMusic();
  hideElement("Fight");
  setText("battletext", "your pokemon fainted. you are out of usable pokemon.");
  showElement("Run");
  } else if (partypkmn1 == true && partypkmn2  == true && partypkmn3  == true && partypkmn4  == true && partypkmn5  != true && userHP <= 0 && pp1HP <= 0 && pp2HP <= 0 && pp3HP <= 0 && pp4HP <= 0) {
  setScreen("battlescreen");
  stopMusic();
  hideElement("Fight");
  setText("battletext", "your pokemon fainted. you are out of usable pokemon.");
  showElement("Run");
  } else if (partypkmn1 == true && partypkmn2  == true && partypkmn3  == true && partypkmn4  != true && partypkmn5  != true && userHP <= 0 && pp1HP <= 0 && pp2HP <= 0 && pp3HP <= 0) {
  setScreen("battlescreen");
  stopMusic();
  hideElement("Fight");
  setText("battletext", "your pokemon fainted. you are out of usable pokemon.");
  showElement("Run");
  } else if (partypkmn1 == true && partypkmn2  == true && partypkmn3  != true && partypkmn4  != true && partypkmn5  != true && userHP <= 0 && pp1HP <= 0 && pp2HP <= 0) {
  setScreen("battlescreen");
  stopMusic();
  hideElement("Fight");
  setText("battletext", "your pokemon fainted. you are out of usable pokemon.");
  showElement("Run");
  } else if (partypkmn1 == true && partypkmn2  != true && partypkmn3  != true && partypkmn4  != true && partypkmn5  != true && userHP <= 0 && pp1HP <= 0) {
  setScreen("battlescreen");
  stopMusic();
  hideElement("Fight");
  setText("battletext", "your pokemon fainted. you are out of usable pokemon.");
  showElement("Run");
  } else if (partypkmn1 != true && partypkmn2  != true && partypkmn3  != true && partypkmn4  != true && partypkmn5  != true && userHP <= 0) {
  setScreen("battlescreen");
  stopMusic();
  hideElement("Fight");
  setText("battletext", "your pokemon fainted. you are out of usable pokemon.");
  showElement("Run");
  }
}

onEvent("Run", "click", function( ) {
  setScreen("gameMenu");
  hideElement("Run");
  hideElement("blackbox");
  userHP = userMaxHP;
  pp1HP = pp1MAXHP; 
  pp2HP = pp2MAXHP; 
  pp3HP = pp3MAXHP; 
  pp4HP = pp4MAXHP; 
  pp5HP = pp5MAXHP; 
  playSound("120-Recovery.mp3", false);
  rivalClearStatusEffects();
  userClearStatusEffects();  
  hideElement("whitebox");
  if (pp1HP > 5) {
     showElement("switch1");
  } else if (pp2HP > 5) {
    showElement("switch2");
  } else if (pp3HP > 5) {
    showElement("switch3");
  } else if (pp4HP > 5) {
    showElement("switch4");
  } else if (pp5HP > 5) {
    showElement("switch5");
  }
});
onEvent("Exit", "click", function( ) {
  setScreen("gameMenu");
  stopMusic();
});

//Bibliography of Images and Music used in my Program

// Game Freak 2010, Pokemon Black and White, video game, Nintendo DS, Nintendo, Japan.
// Game Freak 2012, Pokemon Black 2 and White 2, video game, Nintendo DS, Nintendo, Japan.
// Game Freak 2008, Pokemon Diamond and Pearl, video game, Nintendo DS, Nintendo, Japan.
// Game Freak 2004, Pokemon FireRed and LeafGreen, video game, Gameboy Advance, Nintendo, Japan. 
//“Game Boy Advance - Pokémon FireRed / LeafGreen.” The Spriters Resource, www.spriters-resource.com/game_boy_advance/pokemonfireredleafgreen/.
//Game Freak 2009, Pokemon HeartGold and SoulSilver, video game, Nintendo DS, Nintendo, Japan.
//Game Freak 2004, Pokemon Ruby and Sapphire, video game, Gameboy Advance, Nintendo, Japan.
//Junichi Masuda. Nintendo DS Pokémon Black · White Super Music Collection. Game Freak, 2010.
//Junichi Masuda. Nintendo DS Pokémon Black2 · White2 Super Music Complete. Game Freak, 2012.
//Junichi Masuda. GBA Pokémon Firered & Leafgreen Music Super Complete. Game Freak, 2004.
//Junichi Masuda. Nintendo DS Pokémon HeartGold & SoulSilver Music Super Complete. Game Freak, 2009.
//“List of Pokémon (Sprites Gallery).” (Sprites Gallery) | Pokémon Database, pokemondb.net/pokedex/national.
//“Potion.” Potion - Bulbapedia, the Community-Driven Pokémon Encyclopedia, bulbapedia.bulbagarden.net/wiki/Potion.
//“Poké Ball.” Poké Ball - Bulbapedia, the Community-Driven Pokémon Encyclopedia, bulbapedia.bulbagarden.net/wiki/Pok%C3%A9_Ball.
//“The Official Pokémon Website: Pokemon.com: Explore the World of Pokémon.” The Official Pokémon Website | Pokemon.com | Explore the World of Pokémon, www.pokemon.com/us/.
//“VideoGameMusic.” Video Game Music Downloads - Free MP3 OST Downloads , downloads.khinsider.com/.