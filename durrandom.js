const truthQues = [
	"T'es vierge ?",
	"Tu es plutôt fesses ou seins ?",
	"Tu as déjà vu des gens en train de faire des trucs ?",
	"Avec quelle célébrité aimerais-tu passer une nuit endiablée ?",
	"Tu t'es déjà masturbé ?",
	"Y'a des trucs bizarres qui t'excitent ?",
	"Nomme la fille ou le garçon le / la plus mignon/ne de ta classe",
	"As-tu déjà fait des photos nu(e) ? ",
	"Quel est le plus gros mensonge que tu aies jamais dit à ton/ta partenaire ?" ,
	"Est-ce que tu regardes des pornos ?",
	"Si la partenaire te convient, tu accepterais de faire un porno et de le publier sur un site connu ?",
	"Note chaque participant du jeux de 1 a 10 ou de ta classe",
	"As-tu déjà embrassé une personne du sexe oposer ? ",
	"Quel est le prénom de ton premier coup de cœur ?",
	"Est-ce que tu as déjà été infidèle ?",
	"Quel est ton plus grand fantasme sexuel?",
	"Quelle est ton crush en ce moment?",
	"Sodomie ou félation?",
	"Si tu devais faire un plan a 3, quelle  personne tu choisirais pour le faire? ",
	"Si tu devais sortir avec quelqu’un ici ce serait qui ?",
	"Quelle est la personne que tu deteste le plus ici ou dans ton entourage ?",
	"La levrette ou le missionnaire ?",
	"Arrêter de faire l'amour pendant un an ou arrêter de te masturber pendant un an ?",
	"Branler un pote et personne ne le sait ou ne pas le faire et que tout le monde pense que tu l'as fait ?",
	"Voudrais-tu avoir des relations sexuelles avec une personne de ta classe ou se groupe ?",
	"Qui, parmi les personnes de ce groupe, a le plus beau corps ?",
	"Quelle est ta position sexuelle préférée ?",
	"Par devant ou par derriere avec une inconnue",
	"La taille de ta bite (pas au repo) si tes un mec  ou la taille qui te satisfait pour fille",
	"Actrisse /acteur p.... preferee",
	"Dans ce groupe, qui amènerais-tu avec toi sur une île déserte ?",
	"As-tu déjà envoyé une photo coquine par portable ?",	
	"Est-ce que tu pourrais coucher avec quelqu'un pour beaucoup d'argent ?",
];

const dareQues = [
	"Montre tes 5 dernieres discussion (si t'as pas ton tel, tu montre plus tard)",
	"Embrasse sur la joue quelqu’un de ce groupe du sexe oposer",
	"Appele la personne  que les autre jouer vont choisir en parlant avec une voix sexy.",
	"Envoie un message coquin à la dernière personne à qui tu as parlé par message ",
	"Choisis un vêtement et enlève-le ",
	"Reste assis(e) sur les genoux si tes un mec tu choisit quelle fille et pour une fille tu choisis le gars jusqu'a ton prochain tour",
	"Donne ton telephone a une personne du jeux et laisse la ecrire un message",
	"Embrasse sur la joue quelqu’un de ce groupe du sexe oposer",
	"Case un je taime et un nom dun fille ou mec parmis ton entourage pendant le travail ",
	"Quelqun peut te poser une question et tu dois répondre",
	"Mets une vidéo porno et regarder la.",	
	"Fait une photo avec une personne qui est dans le groupe joueur qu'ils ont choisis et envoie leur",
	"repond a un fuck mary kill que les autres joueur vont te poser",
	"Envoie un message disant ‘Je t’aime” à 2 personnes les autre participant choisise a qui.",
	"Appelez au hasard une personne de votre téléphone et dis lui se que les autre gens choisissent.",
	"Dessine une bite ou qqch dautre sur le cahier d'une meuf/mec de ton groupe d'amis",
	"Filme toi quand tu danse et met la video sur TikTok ou skip   ",


];
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function showdare() 
{

textbox = document.getElementById("truth").innerHTML = dareQues[Math.floor(Math.random() * dareQues.length)];

}


function showtruth() 
{

textbox = document.getElementById("dare").innerHTML = truthQues[Math.floor(Math.random() * truthQues.length)];


   }
       
