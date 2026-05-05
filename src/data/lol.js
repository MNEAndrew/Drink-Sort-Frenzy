// ============================================================
// lol.js — League of Legends champion dataset
//
// Champions are sorted by their home region.
// Emojis reflect role (⚔️ Fighter · 🔮 Mage · 🏹 Marksman
//                       🛡️ Tank · 🗡️ Assassin · 💫 Support)
//
// image: path to champion portrait in /public/champs/ — null if
//        the asset isn't available (newer/unreleased champions).
//
// Disclaimer: All champion names and related intellectual
// property belong to Riot Games. Fan-made project — not
// affiliated with or endorsed by Riot Games.
// ============================================================

export const CATEGORIES = [
  { id: "Demacia",          label: "Demacia",      emoji: "⚜️",  color: "#f0c040", image: "/regions/Demacia_Crest.png" },
  { id: "Noxus",            label: "Noxus",        emoji: "🔱",  color: "#e74c3c", image: "/regions/Noxus_Crest.png" },
  { id: "Ionia",            label: "Ionia",        emoji: "🌸",  color: "#ff69b4", image: "/regions/Ionia_Crest.png" },
  { id: "Freljord",         label: "Freljord",     emoji: "❄️",  color: "#74b9ff", image: "/regions/Freljord_crest.png" },
  { id: "Bilgewater",       label: "Bilgewater",   emoji: "⚓",  color: "#0984e3", image: "/regions/Bilgewater_Crest.png" },
  { id: "Piltover",         label: "Piltover",     emoji: "⚙️",  color: "#fdcb6e", image: "/regions/Piltover_Crest.png" },
  { id: "Zaun",             label: "Zaun",         emoji: "🧪",  color: "#00b894", image: "/regions/Zaun_Crest.png" },
  { id: "Shurima",          label: "Shurima",      emoji: "🌅",  color: "#e17055", image: "/regions/Shuriman_Crest.png" },
  { id: "Targon",           label: "Targon",       emoji: "✨",  color: "#a29bfe", image: "/regions/Mount_Targon_Crest.png" },
  { id: "Shadow Isles",     label: "Shadow Isles", emoji: "💀",  color: "#55efc4", image: "/regions/Shadow_Isles_Crest.png" },
  { id: "Ixtal",            label: "Ixtal",        emoji: "🌿",  color: "#6ab04c", image: "/regions/Ixtal_Crest.png" },
  { id: "The Void",         label: "The Void",     emoji: "🌀",  color: "#9b59b6", image: "/regions/Void_Crest.png" },
  { id: "Bandle City",      label: "Bandle City",  emoji: "🎪",  color: "#ffeaa7", image: "/regions/Bandle_City_Crest.png" },
  { id: "Runeterra / Other",label: "Runeterra",    emoji: "🌍",  color: "#b2bec3", image: "/regions/Runeterra_Crest.png" },
]

export const ITEMS = [
  // ── DEMACIA ──────────────────────────────────────────────
  { name: "Fiora",       category: "Demacia", emoji: "⚔️",  hint: "The Grand Duelist",            image: "/champs/Fiora.png" },
  { name: "Galio",       category: "Demacia", emoji: "🛡️",  hint: "The Colossus",                 image: "/champs/Galio.png" },
  { name: "Garen",       category: "Demacia", emoji: "⚔️",  hint: "The Might of Demacia",          image: "/champs/Garen.png" },
  { name: "Jarvan IV",   category: "Demacia", emoji: "⚔️",  hint: "The Exemplar of Demacia",       image: "/champs/JarvanIV.png" },
  { name: "Kayle",       category: "Demacia", emoji: "⚔️",  hint: "The Righteous",                 image: "/champs/Kayle.png" },
  { name: "Lucian",      category: "Demacia", emoji: "🏹",  hint: "The Purifier",                  image: "/champs/Lucian.png" },
  { name: "Lux",         category: "Demacia", emoji: "🔮",  hint: "The Lady of Luminosity",        image: "/champs/Lux.png" },
  { name: "Morgana",     category: "Demacia", emoji: "🔮",  hint: "The Fallen",                    image: "/champs/Morgana.png" },
  { name: "Poppy",       category: "Demacia", emoji: "🛡️",  hint: "Keeper of the Hammer",          image: "/champs/Poppy.png" },
  { name: "Quinn",       category: "Demacia", emoji: "🏹",  hint: "Demacia's Wings",               image: "/champs/Quinn.png" },
  { name: "Senna",       category: "Demacia", emoji: "🏹",  hint: "The Redeemer",                  image: "/champs/Senna.png" },
  { name: "Shyvana",     category: "Demacia", emoji: "⚔️",  hint: "The Half-Dragon",               image: "/champs/Shyvana.png" },
  { name: "Sona",        category: "Demacia", emoji: "💫",  hint: "Maven of the Strings",          image: "/champs/Sona.png" },
  { name: "Sylas",       category: "Demacia", emoji: "🔮",  hint: "The Unshackled",                image: "/champs/Sylas.png" },
  { name: "Vayne",       category: "Demacia", emoji: "🏹",  hint: "The Night Hunter",              image: "/champs/Vayne.png" },
  { name: "Xin Zhao",    category: "Demacia", emoji: "⚔️",  hint: "The Seneschal of Demacia",      image: "/champs/XinZhao.png" },

  // ── NOXUS ────────────────────────────────────────────────
  { name: "Ambessa",     category: "Noxus", emoji: "⚔️",  hint: "The Iron Widow",                 image: null },
  { name: "Annie",       category: "Noxus", emoji: "🔮",  hint: "The Dark Child",                 image: "/champs/Annie.png" },
  { name: "Briar",       category: "Noxus", emoji: "⚔️",  hint: "The Restrained Hunger",          image: null },
  { name: "Cassiopeia",  category: "Noxus", emoji: "🔮",  hint: "The Serpent's Embrace",          image: "/champs/Cassio.png" },
  { name: "Darius",      category: "Noxus", emoji: "⚔️",  hint: "The Hand of Noxus",              image: "/champs/Darius.png" },
  { name: "Draven",      category: "Noxus", emoji: "🏹",  hint: "The Glorious Executioner",       image: "/champs/Draven.png" },
  { name: "Elise",       category: "Noxus", emoji: "🔮",  hint: "The Spider Queen",               image: "/champs/Elise.png" },
  { name: "Katarina",    category: "Noxus", emoji: "🗡️",  hint: "The Sinister Blade",             image: "/champs/Katarina.png" },
  { name: "Kled",        category: "Noxus", emoji: "⚔️",  hint: "The Cantankerous Cavalier",      image: "/champs/Kled.png" },
  { name: "LeBlanc",     category: "Noxus", emoji: "🗡️",  hint: "The Deceiver",                   image: "/champs/LeBlanc.png" },
  { name: "Mel",         category: "Noxus", emoji: "🔮",  hint: "The Golden Mage",                image: null },
  { name: "Mordekaiser", category: "Noxus", emoji: "⚔️",  hint: "The Iron Revenant",              image: "/champs/Mordekaiser.png" },
  { name: "Rell",        category: "Noxus", emoji: "🛡️",  hint: "The Iron Maiden",                image: "/champs/Rell.png" },
  { name: "Riven",       category: "Noxus", emoji: "⚔️",  hint: "The Exile",                      image: "/champs/Riven.png" },
  { name: "Samira",      category: "Noxus", emoji: "🏹",  hint: "The Desert Rose",                image: "/champs/Samira.png" },
  { name: "Sion",        category: "Noxus", emoji: "🛡️",  hint: "The Undead Juggernaut",          image: "/champs/Sion.png" },
  { name: "Swain",       category: "Noxus", emoji: "🔮",  hint: "The Noxian Grand General",       image: "/champs/Swain.png" },
  { name: "Talon",       category: "Noxus", emoji: "🗡️",  hint: "The Blade's Shadow",             image: "/champs/Talon.png" },
  { name: "Vladimir",    category: "Noxus", emoji: "🔮",  hint: "The Crimson Reaper",             image: "/champs/Vlad.png" },

  // ── IONIA ────────────────────────────────────────────────
  { name: "Ahri",        category: "Ionia", emoji: "🔮",  hint: "The Nine-Tailed Fox",            image: "/champs/Ahri.png" },
  { name: "Akali",       category: "Ionia", emoji: "🗡️",  hint: "The Rogue Assassin",             image: "/champs/Akali.png" },
  { name: "Hwei",        category: "Ionia", emoji: "🔮",  hint: "The Visionary",                  image: null },
  { name: "Irelia",      category: "Ionia", emoji: "⚔️",  hint: "The Blade Dancer",               image: "/champs/Irelia.png" },
  { name: "Ivern",       category: "Ionia", emoji: "💫",  hint: "The Green Father",               image: "/champs/Ivern.png" },
  { name: "Jhin",        category: "Ionia", emoji: "🏹",  hint: "The Virtuoso",                   image: "/champs/Jhin.png" },
  { name: "Karma",       category: "Ionia", emoji: "🔮",  hint: "The Enlightened One",            image: "/champs/Karma.png" },
  { name: "Kayn",        category: "Ionia", emoji: "⚔️",  hint: "The Shadow Reaper",              image: "/champs/Kayn.png" },
  { name: "Kennen",      category: "Ionia", emoji: "🔮",  hint: "The Heart of the Tempest",       image: "/champs/Kennen.png" },
  { name: "Lee Sin",     category: "Ionia", emoji: "⚔️",  hint: "The Blind Monk",                 image: "/champs/LeeSin.png" },
  { name: "Lillia",      category: "Ionia", emoji: "🔮",  hint: "The Bashful Bloom",              image: "/champs/Lillia.png" },
  { name: "Master Yi",   category: "Ionia", emoji: "⚔️",  hint: "The Wuju Bladesman",             image: "/champs/MasterYi.png" },
  { name: "Rakan",       category: "Ionia", emoji: "💫",  hint: "The Charmer",                    image: "/champs/Rakan.png" },
  { name: "Sett",        category: "Ionia", emoji: "⚔️",  hint: "The Boss",                       image: "/champs/Sett.png" },
  { name: "Shen",        category: "Ionia", emoji: "🛡️",  hint: "The Eye of Twilight",            image: "/champs/Shen.png" },
  { name: "Syndra",      category: "Ionia", emoji: "🔮",  hint: "The Dark Sovereign",             image: "/champs/Syndra.png" },
  { name: "Varus",       category: "Ionia", emoji: "🏹",  hint: "The Arrow of Retribution",       image: "/champs/Varus.png" },
  { name: "Wukong",      category: "Ionia", emoji: "⚔️",  hint: "The Monkey King",                image: "/champs/Wukong.png" },
  { name: "Xayah",       category: "Ionia", emoji: "🏹",  hint: "The Rebel",                      image: "/champs/Xayah.png" },
  { name: "Yasuo",       category: "Ionia", emoji: "⚔️",  hint: "The Unforgiven",                 image: "/champs/Yasuo.png" },
  { name: "Yone",        category: "Ionia", emoji: "⚔️",  hint: "The Unforgotten",                image: "/champs/Yone.png" },
  { name: "Yunara",      category: "Ionia", emoji: "🔮",  hint: "The Eternal Bloom",              image: null },
  { name: "Zed",         category: "Ionia", emoji: "🗡️",  hint: "The Master of Shadows",          image: "/champs/Zed.png" },

  // ── FRELJORD ─────────────────────────────────────────────
  { name: "Anivia",            category: "Freljord", emoji: "🔮",  hint: "The Cryophoenix",              image: "/champs/Anivia.png" },
  { name: "Ashe",              category: "Freljord", emoji: "🏹",  hint: "The Frost Archer",             image: "/champs/Ashe.png" },
  { name: "Aurora",            category: "Freljord", emoji: "🔮",  hint: "The Witch Between Worlds",     image: null },
  { name: "Braum",             category: "Freljord", emoji: "🛡️",  hint: "The Heart of the Freljord",    image: "/champs/Braum.png" },
  { name: "Gnar",              category: "Freljord", emoji: "⚔️",  hint: "The Missing Link",             image: "/champs/Gnar.png" },
  { name: "Gragas",            category: "Freljord", emoji: "⚔️",  hint: "The Rabble Rouser",            image: "/champs/Gragas.png" },
  { name: "Lissandra",         category: "Freljord", emoji: "🔮",  hint: "The Ice Witch",                image: "/champs/Lissandra.png" },
  { name: "Nunu & Willump",    category: "Freljord", emoji: "🛡️",  hint: "The Boy and His Yeti",         image: "/champs/Nunu.png" },
  { name: "Olaf",              category: "Freljord", emoji: "⚔️",  hint: "The Berserker",                image: "/champs/Olaf.png" },
  { name: "Ornn",              category: "Freljord", emoji: "🛡️",  hint: "The Fire Below the Mountain",  image: "/champs/Ornn.png" },
  { name: "Sejuani",           category: "Freljord", emoji: "🛡️",  hint: "Fury of the North",            image: "/champs/Sejuani.png" },
  { name: "Trundle",           category: "Freljord", emoji: "⚔️",  hint: "The Troll King",               image: "/champs/Trundle.png" },
  { name: "Tryndamere",        category: "Freljord", emoji: "⚔️",  hint: "The Barbarian King",           image: "/champs/Tryndamere.png" },
  { name: "Udyr",              category: "Freljord", emoji: "⚔️",  hint: "The Spirit Walker",            image: "/champs/Udyr.png" },
  { name: "Volibear",          category: "Freljord", emoji: "🛡️",  hint: "The Relentless Storm",         image: "/champs/Volibear.png" },

  // ── BILGEWATER ───────────────────────────────────────────
  { name: "Fizz",          category: "Bilgewater", emoji: "⚔️",  hint: "The Tidal Trickster",       image: "/champs/Fizz.png" },
  { name: "Gangplank",     category: "Bilgewater", emoji: "⚔️",  hint: "The Saltwater Scourge",     image: "/champs/Gangplank.png" },
  { name: "Graves",        category: "Bilgewater", emoji: "🏹",  hint: "The Outlaw",                 image: "/champs/Graves.png" },
  { name: "Illaoi",        category: "Bilgewater", emoji: "⚔️",  hint: "The Kraken Priestess",      image: "/champs/Illaoi.png" },
  { name: "Miss Fortune",  category: "Bilgewater", emoji: "🏹",  hint: "The Bounty Hunter",          image: "/champs/MissFortune.png" },
  { name: "Nautilus",      category: "Bilgewater", emoji: "🛡️",  hint: "The Titan of the Depths",   image: "/champs/Nautilus.png" },
  { name: "Nilah",         category: "Bilgewater", emoji: "⚔️",  hint: "The Joy Unbound",            image: null },
  { name: "Pyke",          category: "Bilgewater", emoji: "🗡️",  hint: "The Bloodharbor Ripper",    image: "/champs/Pyke.png" },
  { name: "Tahm Kench",    category: "Bilgewater", emoji: "🛡️",  hint: "The River King",             image: "/champs/TahmKench.png" },
  { name: "Twisted Fate",  category: "Bilgewater", emoji: "🔮",  hint: "The Card Master",            image: "/champs/TwistedFate.png" },

  // ── PILTOVER ─────────────────────────────────────────────
  { name: "Caitlyn",       category: "Piltover", emoji: "🏹",  hint: "The Sheriff of Piltover",    image: "/champs/Caitlyn.png" },
  { name: "Camille",       category: "Piltover", emoji: "⚔️",  hint: "The Steel Shadow",           image: "/champs/Camille.png" },
  { name: "Ezreal",        category: "Piltover", emoji: "🏹",  hint: "The Prodigal Explorer",      image: "/champs/Ezreal.png" },
  { name: "Heimerdinger",  category: "Piltover", emoji: "🔮",  hint: "The Revered Inventor",       image: "/champs/Heimer.png" },
  { name: "Jayce",         category: "Piltover", emoji: "⚔️",  hint: "The Defender of Tomorrow",   image: "/champs/Jayce.png" },
  { name: "Orianna",       category: "Piltover", emoji: "🔮",  hint: "The Lady of Clockwork",      image: "/champs/Orianna.png" },
  { name: "Seraphine",     category: "Piltover", emoji: "🔮",  hint: "The Starry-Eyed Songstress", image: "/champs/Seraphine.png" },
  { name: "Vi",            category: "Piltover", emoji: "⚔️",  hint: "The Piltover Enforcer",      image: "/champs/Vi.png" },

  // ── ZAUN ─────────────────────────────────────────────────
  { name: "Blitzcrank",    category: "Zaun", emoji: "🛡️",  hint: "The Great Steam Golem",         image: "/champs/Blitz.png" },
  { name: "Dr. Mundo",     category: "Zaun", emoji: "🛡️",  hint: "The Madman of Zaun",            image: "/champs/DrMundo.png" },
  { name: "Ekko",          category: "Zaun", emoji: "⚔️",  hint: "The Boy Who Shattered Time",    image: "/champs/Ekko.png" },
  { name: "Janna",         category: "Zaun", emoji: "💫",  hint: "The Storm's Fury",              image: "/champs/Janna.png" },
  { name: "Jinx",          category: "Zaun", emoji: "🏹",  hint: "The Loose Cannon",              image: "/champs/Jinx.png" },
  { name: "Renata Glasc",  category: "Zaun", emoji: "💫",  hint: "The Chem-Baroness",             image: "/champs/RenataGlasc.png" },
  { name: "Singed",        category: "Zaun", emoji: "⚔️",  hint: "The Mad Chemist",               image: "/champs/Singed.png" },
  { name: "Twitch",        category: "Zaun", emoji: "🏹",  hint: "The Plague Rat",                image: "/champs/Twitch.png" },
  { name: "Urgot",         category: "Zaun", emoji: "⚔️",  hint: "The Dreadnought",               image: "/champs/Urgot.png" },
  { name: "Viktor",        category: "Zaun", emoji: "🔮",  hint: "The Machine Herald",            image: "/champs/Viktor.png" },
  { name: "Warwick",       category: "Zaun", emoji: "⚔️",  hint: "The Uncaged Wrath of Zaun",     image: "/champs/Warwick.png" },
  { name: "Zac",           category: "Zaun", emoji: "🛡️",  hint: "The Secret Weapon",             image: "/champs/Zac.png" },
  { name: "Zeri",          category: "Zaun", emoji: "🏹",  hint: "The Spark of Zaun",             image: "/champs/Zeri.png" },
  { name: "Ziggs",         category: "Zaun", emoji: "🔮",  hint: "The Hexplosives Expert",        image: "/champs/Ziggs.png" },

  // ── SHURIMA ──────────────────────────────────────────────
  { name: "Aatrox",        category: "Shurima", emoji: "⚔️",  hint: "The Darkin Blade",             image: "/champs/Aatrox.png" },
  { name: "Akshan",        category: "Shurima", emoji: "🏹",  hint: "The Rogue Sentinel",           image: "/champs/Akshan.png" },
  { name: "Amumu",         category: "Shurima", emoji: "🛡️",  hint: "The Sad Mummy",                image: "/champs/Amumu.png" },
  { name: "Azir",          category: "Shurima", emoji: "🔮",  hint: "The Emperor of the Sands",     image: "/champs/Azir.png" },
  { name: "K'Sante",       category: "Shurima", emoji: "🛡️",  hint: "The Pride of Nazumah",         image: null },
  { name: "Naafiri",       category: "Shurima", emoji: "🗡️",  hint: "The Hound of a Hundred Bites", image: null },
  { name: "Nasus",         category: "Shurima", emoji: "⚔️",  hint: "The Curator of the Sands",     image: "/champs/Nasus.png" },
  { name: "Rammus",        category: "Shurima", emoji: "🛡️",  hint: "The Armordillo",               image: "/champs/Rammus.png" },
  { name: "Renekton",      category: "Shurima", emoji: "⚔️",  hint: "The Butcher of the Sands",     image: "/champs/Renekton.png" },
  { name: "Sivir",         category: "Shurima", emoji: "🏹",  hint: "The Battle Mistress",          image: "/champs/Sivir.png" },
  { name: "Taliyah",       category: "Shurima", emoji: "🔮",  hint: "The Stoneweaver",              image: "/champs/Taliyah.png" },
  { name: "Xerath",        category: "Shurima", emoji: "🔮",  hint: "The Magus Ascendant",          image: "/champs/Xerath.png" },
  { name: "Zilean",        category: "Shurima", emoji: "🔮",  hint: "The Chronokeeper",             image: "/champs/Zilean.png" },
  { name: "Zaahen",        category: "Shurima", emoji: "⚔️",  hint: "The Desert Guardian",          image: null },

  // ── TARGON ───────────────────────────────────────────────
  { name: "Alistar",       category: "Targon", emoji: "🛡️",  hint: "The Minotaur",                 image: "/champs/Alistar.png" },
  { name: "Aphelios",      category: "Targon", emoji: "🏹",  hint: "The Weapon of the Faithful",   image: "/champs/Aphelios.png" },
  { name: "Aurelion Sol",  category: "Targon", emoji: "🔮",  hint: "The Star Forger",              image: "/champs/Asol.png" },
  { name: "Diana",         category: "Targon", emoji: "⚔️",  hint: "Scorn of the Moon",            image: "/champs/Diana.png" },
  { name: "Leona",         category: "Targon", emoji: "🛡️",  hint: "The Radiant Dawn",             image: "/champs/Leona.png" },
  { name: "Nami",          category: "Targon", emoji: "💫",  hint: "The Tidecaller",               image: "/champs/Nami.png" },
  { name: "Pantheon",      category: "Targon", emoji: "⚔️",  hint: "The Unbreakable Spear",        image: "/champs/Pantheon.png" },
  { name: "Soraka",        category: "Targon", emoji: "💫",  hint: "The Starchild",                image: "/champs/Soraka.png" },
  { name: "Taric",         category: "Targon", emoji: "💫",  hint: "The Shield of Valoran",        image: "/champs/Taric.png" },
  { name: "Zoe",           category: "Targon", emoji: "🔮",  hint: "The Aspect of Twilight",       image: "/champs/Zoe.png" },

  // ── SHADOW ISLES ─────────────────────────────────────────
  { name: "Gwen",          category: "Shadow Isles", emoji: "⚔️",  hint: "The Hallowed Seamstress", image: "/champs/Gwen.png" },
  { name: "Hecarim",       category: "Shadow Isles", emoji: "⚔️",  hint: "The Shadow of War",       image: "/champs/Hecarim.png" },
  { name: "Kalista",       category: "Shadow Isles", emoji: "🏹",  hint: "The Spear of Vengeance",  image: "/champs/Kalista.png" },
  { name: "Karthus",       category: "Shadow Isles", emoji: "🔮",  hint: "The Deathsinger",         image: "/champs/Karthus.png" },
  { name: "Maokai",        category: "Shadow Isles", emoji: "🛡️",  hint: "The Twisted Treant",      image: "/champs/Maokai.png" },
  { name: "Thresh",        category: "Shadow Isles", emoji: "💫",  hint: "The Chain Warden",        image: "/champs/Thresh.png" },
  { name: "Vex",           category: "Shadow Isles", emoji: "🔮",  hint: "The Gloomist",            image: null },
  { name: "Viego",         category: "Shadow Isles", emoji: "⚔️",  hint: "The Ruined King",         image: "/champs/Viego.png" },
  { name: "Yorick",        category: "Shadow Isles", emoji: "⚔️",  hint: "Shepherd of Souls",       image: "/champs/Yorick.png" },

  // ── IXTAL ────────────────────────────────────────────────
  { name: "Malphite",      category: "Ixtal", emoji: "🛡️",  hint: "Shard of the Monolith",         image: "/champs/Malphite.png" },
  { name: "Milio",         category: "Ixtal", emoji: "💫",  hint: "The Gentle Flame",              image: null },
  { name: "Neeko",         category: "Ixtal", emoji: "🔮",  hint: "The Curious Chameleon",         image: "/champs/Neeko.png" },
  { name: "Nidalee",       category: "Ixtal", emoji: "🔮",  hint: "The Bestial Huntress",          image: "/champs/Nidalee.png" },
  { name: "Qiyana",        category: "Ixtal", emoji: "🗡️",  hint: "Empress of the Elements",       image: "/champs/Qiyana.png" },
  { name: "Rengar",        category: "Ixtal", emoji: "🗡️",  hint: "The Pridestalker",              image: "/champs/Rengar.png" },
  { name: "Skarner",       category: "Ixtal", emoji: "🛡️",  hint: "The Primordial Sovereign",      image: "/champs/Skarner.png" },
  { name: "Zyra",          category: "Ixtal", emoji: "🔮",  hint: "Rise of the Thorns",            image: "/champs/Zyra.png" },

  // ── THE VOID ─────────────────────────────────────────────
  { name: "Bel'Veth",      category: "The Void", emoji: "⚔️",  hint: "The Empress of the Void",    image: null },
  { name: "Cho'Gath",      category: "The Void", emoji: "🛡️",  hint: "The Terror of the Void",     image: "/champs/ChoGath.png" },
  { name: "Kai'Sa",        category: "The Void", emoji: "🏹",  hint: "Daughter of the Void",        image: "/champs/KAisa.png" },
  { name: "Kassadin",      category: "The Void", emoji: "🔮",  hint: "The Void Walker",             image: "/champs/Kassadin.png" },
  { name: "Kha'Zix",       category: "The Void", emoji: "🗡️",  hint: "The Voidreaver",              image: "/champs/Khazix.png" },
  { name: "Kog'Maw",       category: "The Void", emoji: "🏹",  hint: "The Mouth of the Abyss",      image: "/champs/KogMaw.png" },
  { name: "Malzahar",      category: "The Void", emoji: "🔮",  hint: "The Prophet of the Void",     image: "/champs/Malzahar.png" },
  { name: "Rek'Sai",       category: "The Void", emoji: "⚔️",  hint: "The Void Burrower",           image: "/champs/RekSai.png" },
  { name: "Vel'Koz",       category: "The Void", emoji: "🔮",  hint: "The Eye of the Void",         image: "/champs/VelKoz.png" },

  // ── BANDLE CITY ──────────────────────────────────────────
  { name: "Corki",         category: "Bandle City", emoji: "🏹",  hint: "The Daring Bombardier",    image: "/champs/Corki.png" },
  { name: "Lulu",          category: "Bandle City", emoji: "💫",  hint: "The Fae Sorceress",        image: "/champs/Lulu.png" },
  { name: "Rumble",        category: "Bandle City", emoji: "⚔️",  hint: "The Mechanized Menace",    image: "/champs/Rumble.png" },
  { name: "Teemo",         category: "Bandle City", emoji: "🔮",  hint: "The Swift Scout",          image: "/champs/Teemo.png" },
  { name: "Tristana",      category: "Bandle City", emoji: "🏹",  hint: "The Yordle Gunner",        image: "/champs/Tristana.png" },
  { name: "Veigar",        category: "Bandle City", emoji: "🔮",  hint: "The Tiny Master of Evil",  image: "/champs/Veigar.png" },
  { name: "Yuumi",         category: "Bandle City", emoji: "💫",  hint: "The Magical Cat",          image: "/champs/Yuumi.png" },

  // ── RUNETERRA / OTHER ────────────────────────────────────
  { name: "Bard",          category: "Runeterra / Other", emoji: "💫",  hint: "The Wandering Caretaker", image: "/champs/Bard.png" },
  { name: "Brand",         category: "Runeterra / Other", emoji: "🔮",  hint: "The Burning Vengeance",   image: "/champs/Brand.png" },
  { name: "Evelynn",       category: "Runeterra / Other", emoji: "🗡️",  hint: "Agony's Embrace",          image: "/champs/Evelyn.png" },
  { name: "Fiddlesticks",  category: "Runeterra / Other", emoji: "🔮",  hint: "The Ancient Fear",         image: "/champs/Fiddlesticks.png" },
  { name: "Jax",           category: "Runeterra / Other", emoji: "⚔️",  hint: "Grandmaster at Arms",      image: "/champs/Jax.png" },
  { name: "Kindred",       category: "Runeterra / Other", emoji: "🏹",  hint: "The Eternal Hunters",      image: "/champs/Kindred.png" },
  { name: "Nocturne",      category: "Runeterra / Other", emoji: "🗡️",  hint: "The Eternal Nightmare",    image: "/champs/Nocturne.png" },
  { name: "Ryze",          category: "Runeterra / Other", emoji: "🔮",  hint: "The Rune Mage",            image: "/champs/Ryze.png" },
  { name: "Shaco",         category: "Runeterra / Other", emoji: "🗡️",  hint: "The Demon Jester",         image: "/champs/Shaco.png" },
  { name: "Smolder",       category: "Runeterra / Other", emoji: "🔮",  hint: "The Fiery Fledgling",      image: null },
]
