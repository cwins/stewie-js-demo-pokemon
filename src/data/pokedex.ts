export type PokemonType = 'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'dragon' | 'flying'
export type DiscoverSort = 'pokedex' | 'aura' | 'quest'

export interface TypeOption {
  value: 'all' | PokemonType
  label: string
  icon: string
}

export interface QuestCard {
  id: string
  title: string
  subtitle: string
  progress: number
  total: number
  accent: string
}

export interface ExploreModule {
  id: string
  title: string
  subtitle: string
  accent: string
}

export interface PokemonCardModel {
  id: number
  slug: string
  name: string
  number: string
  types: PokemonType[]
  accent: string
  glow: string
  image: string
  discovery: string
  classification: string
  habitat: string
  region: string
  auraRank: number
  spotlight: string
  trainerCallout: string
  stats: Record<'hp' | 'attack' | 'defense' | 'spAtk' | 'spDef' | 'speed', number>
  abilities: Array<{ name: string; summary: string }>
  moves: Array<{ name: string; type: PokemonType; pp: string; summary: string }>
  quickFacts: Array<{ label: string; value: string }>
  tabs: Record<'overview' | 'moves' | 'habitat' | 'evolution', { title: string; body: string }>
  speciesSlug: string
}

export interface SpeciesModel {
  slug: string
  title: string
  number: string
  name: string
  types: PokemonType[]
  accent: string
  glow: string
  image: string
  summary: string
  evolutionPath: Array<{
    id: string
    slug: string
    name: string
    number: string
    image: string
  }>
  metadata: Array<{ label: string; value: string }>
  trainerNote: string
  variants: Array<{
    id: string
    name: string
    subtitle: string
    accent: string
    image: string
  }>
  synergy: {
    strongAgainst: PokemonType[]
    weakAgainst: PokemonType[]
    abilityPool: string[]
    relatedSpecies: Array<{ slug: string; name: string; image: string }>
  }
}

export interface DiscoverPageData {
  mode: 'discover' | 'type-lab'
  heroNumber: string
  heroTitle: string
  heroSubtitle: string
  featuredSlug: string
  quests: QuestCard[]
  explore: ExploreModule[]
  pokemon: PokemonCardModel[]
}

const artwork = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const TYPE_OPTIONS: TypeOption[] = [
  { value: 'all', label: 'All', icon: '✦' },
  { value: 'fire', label: 'Fire', icon: '✹' },
  { value: 'water', label: 'Water', icon: '💧' },
  { value: 'grass', label: 'Grass', icon: '❋' },
  { value: 'electric', label: 'Electric', icon: '⚡' },
  { value: 'psychic', label: 'Psychic', icon: '◌' },
]

export const SORT_OPTIONS: Array<{ value: DiscoverSort; label: string }> = [
  { value: 'pokedex', label: 'Pokedex' },
  { value: 'aura', label: 'Aura' },
  { value: 'quest', label: 'Quest Ready' },
]

const POKEMON: PokemonCardModel[] = [
  {
    id: 25,
    slug: 'pikachu',
    name: 'Pikachu',
    number: '#025',
    types: ['electric'],
    accent: '#f4c542',
    glow: '#ffe28b',
    image: artwork(25),
    discovery: 'Featured discovery with a sprinting spark trail.',
    classification: 'Mouse Pokemon',
    habitat: 'Forest Canopy',
    region: 'Kanto',
    auraRank: 98,
    spotlight: 'A heroic burst of electricity that turns search into adventure.',
    trainerCallout: 'Crowd-favorite scout for quick challenges and bright routes.',
    stats: { hp: 35, attack: 55, defense: 40, spAtk: 50, spDef: 50, speed: 90 },
    abilities: [
      { name: 'Static', summary: 'Stores a crackling field that can stun on contact.' },
      { name: 'Lightning Rod', summary: 'Pulls electric energy inward and surges harder.' },
    ],
    moves: [
      { name: 'Thunderbolt', type: 'electric', pp: '15/15', summary: 'A focused lightning strike with cinematic snap.' },
      { name: 'Volt Tackle', type: 'electric', pp: '5/5', summary: 'A blazing charge wrapped in gold static.' },
      { name: 'Quick Attack', type: 'normal', pp: '30/30', summary: 'A blink-fast dash that keeps momentum high.' },
      { name: 'Iron Tail', type: 'normal', pp: '15/15', summary: 'A finishing sweep that cuts through guard.' },
    ],
    quickFacts: [
      { label: 'Height', value: '0.4 m' },
      { label: 'Weight', value: '6.0 kg' },
      { label: 'Habitat', value: 'Forest' },
      { label: 'Catch Rate', value: '190' },
      { label: 'Base Exp', value: '112' },
      { label: 'Temper', value: 'Bright' },
    ],
    tabs: {
      overview: { title: 'Spark Vanguard', body: 'Pikachu reads the field instantly and turns even small discoveries into headline moments.' },
      moves: { title: 'High Tempo Kit', body: 'Its move set favors quick confirms and bright, readable bursts that fit a premium action profile.' },
      habitat: { title: 'Forest Canopy', body: 'It thrives in dense woods where quick movement and charged surfaces turn the terrain into a playground.' },
      evolution: { title: 'Pichu to Raichu', body: 'The line grows from soft flickers into confident thunder, keeping speed and charisma at every step.' },
    },
    speciesSlug: 'pikachu',
  },
  {
    id: 4,
    slug: 'charmander',
    name: 'Charmander',
    number: '#004',
    types: ['fire'],
    accent: '#e85c4a',
    glow: '#ffb07a',
    image: artwork(4),
    discovery: 'A hot-blooded starter with ember-flecked confidence.',
    classification: 'Lizard Pokemon',
    habitat: 'Volcanic Trails',
    region: 'Kanto',
    auraRank: 84,
    spotlight: 'Warm ember trails and a fearless grin make this a classic opening quest.',
    trainerCallout: 'Quick to bond, quick to battle, and always camera-ready.',
    stats: { hp: 39, attack: 52, defense: 43, spAtk: 60, spDef: 50, speed: 65 },
    abilities: [
      { name: 'Blaze', summary: 'Fire surges brighter when the pressure spikes.' },
      { name: 'Solar Power', summary: 'Turns harsh sunlight into a dramatic offense boost.' },
    ],
    moves: [
      { name: 'Flame Burst', type: 'fire', pp: '15/15', summary: 'A compact detonation that keeps screens lively.' },
      { name: 'Dragon Breath', type: 'dragon', pp: '20/20', summary: 'A low rumble of draconic heat with rare bite.' },
      { name: 'Slash', type: 'normal', pp: '20/20', summary: 'A sharp finisher with classic anime timing.' },
      { name: 'Fire Fang', type: 'fire', pp: '15/15', summary: 'A lunging strike built for close range pressure.' },
    ],
    quickFacts: [
      { label: 'Height', value: '0.6 m' },
      { label: 'Weight', value: '8.5 kg' },
      { label: 'Habitat', value: 'Mountain' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Base Exp', value: '62' },
      { label: 'Temper', value: 'Brave' },
    ],
    tabs: {
      overview: { title: 'Quest Starter Flame', body: 'Charmander opens the fire lineage with straightforward hero energy and reliable presence.' },
      moves: { title: 'Compact Pressure', body: 'Its move set favors readable bursts, quick lunges, and flame arcs that are easy to stage dramatically.' },
      habitat: { title: 'Heat-Loving Rover', body: 'Mountain paths and volcanic edges suit its tail flame and adventurous pacing.' },
      evolution: { title: 'Fire Lineage', body: 'Each evolution broadens the same fiery identity instead of replacing it, which keeps the route coherent.' },
    },
    speciesSlug: 'charizard',
  },
  {
    id: 7,
    slug: 'squirtle',
    name: 'Squirtle',
    number: '#007',
    types: ['water'],
    accent: '#5bc7f6',
    glow: '#b7ecff',
    image: artwork(7),
    discovery: 'A cool-headed tactician with clean water arcs and shield-like posture.',
    classification: 'Tiny Turtle Pokemon',
    habitat: 'Lakeside Inlets',
    region: 'Kanto',
    auraRank: 76,
    spotlight: 'Balanced, clever, and effortlessly readable in motion-heavy layouts.',
    trainerCallout: 'Ideal for calm, strategic encounters and fluid route design.',
    stats: { hp: 44, attack: 48, defense: 65, spAtk: 50, spDef: 64, speed: 43 },
    abilities: [
      { name: 'Torrent', summary: 'Water pressure rises when the battle turns tense.' },
      { name: 'Rain Dish', summary: 'Restores momentum under cleansing rainfall.' },
    ],
    moves: [
      { name: 'Water Pulse', type: 'water', pp: '20/20', summary: 'A smooth ring of water that warps the air around it.' },
      { name: 'Aqua Tail', type: 'water', pp: '10/10', summary: 'A snapping sweep with a strong silhouette.' },
      { name: 'Bite', type: 'normal', pp: '25/25', summary: 'A fast interruption tool for close space.' },
      { name: 'Ice Spinner', type: 'water', pp: '15/15', summary: 'A cold flourish that clears the lane.' },
    ],
    quickFacts: [
      { label: 'Height', value: '0.5 m' },
      { label: 'Weight', value: '9.0 kg' },
      { label: 'Habitat', value: 'Lake' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Base Exp', value: '63' },
      { label: 'Temper', value: 'Calm' },
    ],
    tabs: {
      overview: { title: 'Calm Frontliner', body: 'Squirtle balances defense and poise, which gives the site a grounded counterpoint to the fire and electric heroes.' },
      moves: { title: 'Flow State Kit', body: 'Its attacks are circular and fluid, making them great anchors for chip rails and stat sweeps.' },
      habitat: { title: 'Lakeside Patrol', body: 'Quiet inlets and reflective water surfaces reinforce the clean, premium tone of the interface.' },
      evolution: { title: 'Shell-Borne Growth', body: 'The line grows sturdier and more commanding while preserving its composed silhouette.' },
    },
    speciesSlug: 'squirtle',
  },
  {
    id: 1,
    slug: 'bulbasaur',
    name: 'Bulbasaur',
    number: '#001',
    types: ['grass'],
    accent: '#63b96a',
    glow: '#bbf0c0',
    image: artwork(1),
    discovery: 'A grounded guardian with soft growth energy and reliable balance.',
    classification: 'Seed Pokemon',
    habitat: 'Sunlit Grove',
    region: 'Kanto',
    auraRank: 72,
    spotlight: 'A steady discoverable hero that brings nature motifs into the collection.',
    trainerCallout: 'Perfect for supportive quests and restorative exploration loops.',
    stats: { hp: 45, attack: 49, defense: 49, spAtk: 65, spDef: 65, speed: 45 },
    abilities: [
      { name: 'Overgrow', summary: 'Plant power blooms hardest when the stakes rise.' },
      { name: 'Chlorophyll', summary: 'Sunlight turns every motion lighter and faster.' },
    ],
    moves: [
      { name: 'Razor Leaf', type: 'grass', pp: '25/25', summary: 'A sharp spray of leaves with clean diagonal rhythm.' },
      { name: 'Vine Whip', type: 'grass', pp: '25/25', summary: 'Flexible reach with a satisfying snap.' },
      { name: 'Sleep Powder', type: 'grass', pp: '15/15', summary: 'A drifting setup move that softens the tempo.' },
      { name: 'Seed Bomb', type: 'grass', pp: '15/15', summary: 'A compact burst with earthy punch.' },
    ],
    quickFacts: [
      { label: 'Height', value: '0.7 m' },
      { label: 'Weight', value: '6.9 kg' },
      { label: 'Habitat', value: 'Grassland' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Base Exp', value: '64' },
      { label: 'Temper', value: 'Steady' },
    ],
    tabs: {
      overview: { title: 'Grove Guardian', body: 'Bulbasaur introduces the collection with dependable balance and restorative color.' },
      moves: { title: 'Control Through Vines', body: 'Its move set favors elegant lines and natural arcs that fit the page framing well.' },
      habitat: { title: 'Sunlit Grove', body: 'Warm light, paper textures, and green accents all reinforce its calm presence.' },
      evolution: { title: 'Blooming Progression', body: 'The species evolves by scaling power outward while preserving a rooted center.' },
    },
    speciesSlug: 'bulbasaur',
  },
  {
    id: 133,
    slug: 'eevee',
    name: 'Eevee',
    number: '#133',
    types: ['normal'],
    accent: '#a88157',
    glow: '#d8b89a',
    image: artwork(133),
    discovery: 'A flexible favorite whose potential fans out in many directions.',
    classification: 'Evolution Pokemon',
    habitat: 'Town Outskirts',
    region: 'Kanto',
    auraRank: 88,
    spotlight: 'A charming foil to the elemental starters, with collectible energy built in.',
    trainerCallout: 'Fans out beautifully into variants and route possibilities.',
    stats: { hp: 55, attack: 55, defense: 50, spAtk: 45, spDef: 65, speed: 55 },
    abilities: [
      { name: 'Run Away', summary: 'Keeps mobile under pressure and slips out cleanly.' },
      { name: 'Adaptability', summary: 'Sharpens familiar moves into signature highlights.' },
    ],
    moves: [
      { name: 'Swift', type: 'normal', pp: '20/20', summary: 'A bright starburst that never feels wasted.' },
      { name: 'Quick Attack', type: 'normal', pp: '30/30', summary: 'Short, snappy, and easy to read on every screen.' },
      { name: 'Bite', type: 'normal', pp: '25/25', summary: 'A light interruption tool with attitude.' },
      { name: 'Shadow Ball', type: 'psychic', pp: '15/15', summary: 'A mysterious flourish hinting at future branches.' },
    ],
    quickFacts: [
      { label: 'Height', value: '0.3 m' },
      { label: 'Weight', value: '6.5 kg' },
      { label: 'Habitat', value: 'Urban Edge' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Base Exp', value: '65' },
      { label: 'Temper', value: 'Curious' },
    ],
    tabs: {
      overview: { title: 'Potential Engine', body: 'Eevee is all about possibility, making it ideal for variant cards and branching discovery language.' },
      moves: { title: 'Flexible Toolkit', body: 'Its move set can pivot between cute charm and surprising bite without losing readability.' },
      habitat: { title: 'Urban Edge Wanderer', body: 'It lives near people and pathways, which makes it a natural connective tissue between site modules.' },
      evolution: { title: 'Branching Futures', body: 'Few species sell the idea of magical routes and collectible variants as cleanly as Eevee.' },
    },
    speciesSlug: 'eevee',
  },
  {
    id: 6,
    slug: 'charizard',
    name: 'Charizard',
    number: '#006',
    types: ['fire', 'flying'],
    accent: '#f08a3e',
    glow: '#ffcf8f',
    image: artwork(6),
    discovery: 'The cinematic closer: huge wingspan, molten sky, and premium hero energy.',
    classification: 'Flame Pokemon',
    habitat: 'Mountain',
    region: 'Kanto',
    auraRank: 100,
    spotlight: 'It spits fire hot enough to melt boulders and steal every frame around it.',
    trainerCallout: 'The unmistakable ace for a bold detail reveal and lineage page.',
    stats: { hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100 },
    abilities: [
      { name: 'Blaze', summary: 'Powers up Fire-type moves in a pinch.' },
      { name: 'Solar Power', summary: 'Boosts Sp. Atk in strong sunlight.' },
    ],
    moves: [
      { name: 'Flamethrower', type: 'fire', pp: '15/15', summary: 'Hurls a torrent of fire that may burn.' },
      { name: 'Air Slash', type: 'flying', pp: '15/15', summary: 'Slashes with a blade of air that may flinch.' },
      { name: 'Dragon Claw', type: 'dragon', pp: '15/15', summary: 'Sharp claws rake the foe to inflict damage.' },
      { name: 'Focus Blast', type: 'fire', pp: '5/5', summary: 'Unleashes a blast of concentrated energy.' },
    ],
    quickFacts: [
      { label: 'Height', value: '1.7 m' },
      { label: 'Weight', value: '90.5 kg' },
      { label: 'Habitat', value: 'Mountain' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Base Exp', value: '240' },
      { label: 'Gender Ratio', value: '87.5% ♂ / 12.5% ♀' },
    ],
    tabs: {
      overview: { title: 'Heroic Burst', body: 'Charizard is the cleanest proof point for a cinematic Pokemon profile: bold silhouette, readable stats, and high emotional weight.' },
      moves: { title: 'Air and Flame', body: 'Its kit mixes huge fire arcs with aerial slicing, which helps the move grid feel kinetic without becoming noisy.' },
      habitat: { title: 'Mountain Skies', body: 'Mountain thermals and open horizons fit the premium, adventurous tone better than a lab-like data backdrop ever could.' },
      evolution: { title: 'Lineage Complete', body: 'The Charmander line scales upward naturally, making it ideal for a drawn-in sigil route on the Species page.' },
    },
    speciesSlug: 'charizard',
  },
]

const SPECIES: SpeciesModel[] = [
  {
    slug: 'charizard',
    title: 'Species',
    number: '#006',
    name: 'Charizard',
    types: ['fire', 'flying'],
    accent: '#f08a3e',
    glow: '#ffcf8f',
    image: artwork(6),
    summary: 'It spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.',
    evolutionPath: [
      { id: 'charmander', slug: 'charmander', name: 'Charmander', number: '#004', image: artwork(4) },
      { id: 'charmeleon', slug: 'charmeleon', name: 'Charmeleon', number: '#005', image: artwork(5) },
      { id: 'charizard', slug: 'charizard', name: 'Charizard', number: '#006', image: artwork(6) },
    ],
    metadata: [
      { label: 'Category', value: 'Flame Pokemon' },
      { label: 'Height', value: '1.7 m' },
      { label: 'Weight', value: '90.5 kg' },
      { label: 'Habitat', value: 'Mountain' },
      { label: 'Type', value: 'Fire / Flying' },
      { label: 'Egg Group', value: 'Monster, Dragon' },
      { label: 'Growth Rate', value: 'Medium Fast' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Region', value: 'Kanto' },
      { label: 'Base Exp', value: '240' },
      { label: 'EV Yield', value: '3 Sp. Atk' },
      { label: 'Gender Ratio', value: '87.5% / 12.5%' },
    ],
    trainerNote: 'A formidable Pokemon that rules the skies. Best used to overwhelm foes with powerful special attacks.',
    variants: [
      { id: 'original', name: 'Charizard', subtitle: 'Original', accent: '#f08a3e', image: artwork(6) },
      { id: 'shiny', name: 'Charizard', subtitle: 'Shiny', accent: '#d3b164', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/6.png' },
      { id: 'mega-x', name: 'Mega Charizard X', subtitle: 'Shadow Flame', accent: '#4fa7df', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10034.png' },
      { id: 'mega-y', name: 'Mega Charizard Y', subtitle: 'Solar Crown', accent: '#ff8d4f', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10035.png' },
    ],
    synergy: {
      strongAgainst: ['grass', 'fire', 'electric', 'water'],
      weakAgainst: ['water', 'electric', 'dragon'],
      abilityPool: ['Blaze', 'Solar Power', 'Tough Claws', 'Drought'],
      relatedSpecies: [
        { slug: 'charizard', name: 'Charizard', image: artwork(6) },
        { slug: 'pikachu', name: 'Pikachu', image: artwork(25) },
        { slug: 'bulbasaur', name: 'Bulbasaur', image: artwork(1) },
      ],
    },
  },
  {
    slug: 'pikachu',
    title: 'Species',
    number: '#025',
    name: 'Pikachu',
    types: ['electric'],
    accent: '#f4c542',
    glow: '#ffe28b',
    image: artwork(25),
    summary: 'Whenever several of these Pokemon gather, their electricity could build and cause lightning storms.',
    evolutionPath: [
      { id: 'pichu', slug: 'pikachu', name: 'Pichu', number: '#172', image: artwork(172) },
      { id: 'pikachu', slug: 'pikachu', name: 'Pikachu', number: '#025', image: artwork(25) },
      { id: 'raichu', slug: 'pikachu', name: 'Raichu', number: '#026', image: artwork(26) },
    ],
    metadata: [
      { label: 'Category', value: 'Mouse Pokemon' },
      { label: 'Height', value: '0.4 m' },
      { label: 'Weight', value: '6.0 kg' },
      { label: 'Habitat', value: 'Forest' },
      { label: 'Type', value: 'Electric' },
      { label: 'Egg Group', value: 'Field, Fairy' },
      { label: 'Growth Rate', value: 'Medium Fast' },
      { label: 'Catch Rate', value: '190' },
      { label: 'Region', value: 'Kanto' },
      { label: 'Base Exp', value: '112' },
      { label: 'EV Yield', value: '2 Speed' },
      { label: 'Gender Ratio', value: '50% / 50%' },
    ],
    trainerNote: 'Fast, bright, and effortless to root for. It gives the product its quickest moments of delight.',
    variants: [
      { id: 'standard', name: 'Pikachu', subtitle: 'Core Form', accent: '#f4c542', image: artwork(25) },
      { id: 'partner', name: 'Partner Pikachu', subtitle: 'Starter Bond', accent: '#ffad4e', image: artwork(25) },
      { id: 'raichu', name: 'Raichu', subtitle: 'Evolution', accent: '#f08a3e', image: artwork(26) },
      { id: 'alolan', name: 'Alolan Raichu', subtitle: 'Surf Form', accent: '#8edbff', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10100.png' },
    ],
    synergy: {
      strongAgainst: ['water', 'flying'],
      weakAgainst: ['grass', 'dragon'],
      abilityPool: ['Static', 'Lightning Rod', 'Surge Surfer'],
      relatedSpecies: [
        { slug: 'pikachu', name: 'Raichu', image: artwork(26) },
        { slug: 'charizard', name: 'Charizard', image: artwork(6) },
        { slug: 'eevee', name: 'Eevee', image: artwork(133) },
      ],
    },
  },
  {
    slug: 'bulbasaur',
    title: 'Species',
    number: '#001',
    name: 'Bulbasaur',
    types: ['grass'],
    accent: '#63b96a',
    glow: '#bbf0c0',
    image: artwork(1),
    summary: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokemon.',
    evolutionPath: [
      { id: 'bulbasaur', slug: 'bulbasaur', name: 'Bulbasaur', number: '#001', image: artwork(1) },
      { id: 'ivysaur', slug: 'bulbasaur', name: 'Ivysaur', number: '#002', image: artwork(2) },
      { id: 'venusaur', slug: 'bulbasaur', name: 'Venusaur', number: '#003', image: artwork(3) },
    ],
    metadata: [
      { label: 'Category', value: 'Seed Pokemon' },
      { label: 'Height', value: '0.7 m' },
      { label: 'Weight', value: '6.9 kg' },
      { label: 'Habitat', value: 'Grassland' },
      { label: 'Type', value: 'Grass' },
      { label: 'Egg Group', value: 'Monster, Grass' },
      { label: 'Growth Rate', value: 'Medium Slow' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Region', value: 'Kanto' },
      { label: 'Base Exp', value: '64' },
      { label: 'EV Yield', value: '1 Sp. Atk' },
      { label: 'Gender Ratio', value: '87.5% / 12.5%' },
    ],
    trainerNote: 'A restorative presence that makes the species page feel alive rather than encyclopedic.',
    variants: [
      { id: 'bulbasaur', name: 'Bulbasaur', subtitle: 'Original', accent: '#63b96a', image: artwork(1) },
      { id: 'ivysaur', name: 'Ivysaur', subtitle: 'Middle Bloom', accent: '#5ab662', image: artwork(2) },
      { id: 'venusaur', name: 'Venusaur', subtitle: 'Full Bloom', accent: '#458f4b', image: artwork(3) },
      { id: 'mega-venusaur', name: 'Mega Venusaur', subtitle: 'Ancient Bloom', accent: '#5ccf6d', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10033.png' },
    ],
    synergy: {
      strongAgainst: ['water', 'grass'],
      weakAgainst: ['fire', 'flying'],
      abilityPool: ['Overgrow', 'Chlorophyll'],
      relatedSpecies: [
        { slug: 'bulbasaur', name: 'Venusaur', image: artwork(3) },
        { slug: 'squirtle', name: 'Squirtle', image: artwork(7) },
        { slug: 'charizard', name: 'Charizard', image: artwork(6) },
      ],
    },
  },
  {
    slug: 'squirtle',
    title: 'Species',
    number: '#007',
    name: 'Squirtle',
    types: ['water'],
    accent: '#5bc7f6',
    glow: '#b7ecff',
    image: artwork(7),
    summary: 'When it retracts its long neck into its shell, it squirts out water with vigorous force.',
    evolutionPath: [
      { id: 'squirtle', slug: 'squirtle', name: 'Squirtle', number: '#007', image: artwork(7) },
      { id: 'wartortle', slug: 'squirtle', name: 'Wartortle', number: '#008', image: artwork(8) },
      { id: 'blastoise', slug: 'squirtle', name: 'Blastoise', number: '#009', image: artwork(9) },
    ],
    metadata: [
      { label: 'Category', value: 'Tiny Turtle Pokemon' },
      { label: 'Height', value: '0.5 m' },
      { label: 'Weight', value: '9.0 kg' },
      { label: 'Habitat', value: 'Lake' },
      { label: 'Type', value: 'Water' },
      { label: 'Egg Group', value: 'Monster, Water 1' },
      { label: 'Growth Rate', value: 'Medium Slow' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Region', value: 'Kanto' },
      { label: 'Base Exp', value: '63' },
      { label: 'EV Yield', value: '1 Defense' },
      { label: 'Gender Ratio', value: '87.5% / 12.5%' },
    ],
    trainerNote: 'Shell-backed discipline and clean water geometry keep the page balanced.',
    variants: [
      { id: 'squirtle', name: 'Squirtle', subtitle: 'Original', accent: '#5bc7f6', image: artwork(7) },
      { id: 'wartortle', name: 'Wartortle', subtitle: 'Wave Crest', accent: '#4eaede', image: artwork(8) },
      { id: 'blastoise', name: 'Blastoise', subtitle: 'Heavy Cannon', accent: '#388fc0', image: artwork(9) },
      { id: 'mega-blastoise', name: 'Mega Blastoise', subtitle: 'Pressure Core', accent: '#62d8ff', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10036.png' },
    ],
    synergy: {
      strongAgainst: ['fire', 'water'],
      weakAgainst: ['grass', 'electric'],
      abilityPool: ['Torrent', 'Rain Dish', 'Mega Launcher'],
      relatedSpecies: [
        { slug: 'squirtle', name: 'Blastoise', image: artwork(9) },
        { slug: 'pikachu', name: 'Pikachu', image: artwork(25) },
        { slug: 'bulbasaur', name: 'Bulbasaur', image: artwork(1) },
      ],
    },
  },
  {
    slug: 'eevee',
    title: 'Species',
    number: '#133',
    name: 'Eevee',
    types: ['normal'],
    accent: '#a88157',
    glow: '#d8b89a',
    image: artwork(133),
    summary: 'Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones.',
    evolutionPath: [
      { id: 'eevee', slug: 'eevee', name: 'Eevee', number: '#133', image: artwork(133) },
      { id: 'vaporeon', slug: 'eevee', name: 'Vaporeon', number: '#134', image: artwork(134) },
      { id: 'jolteon', slug: 'eevee', name: 'Jolteon', number: '#135', image: artwork(135) },
    ],
    metadata: [
      { label: 'Category', value: 'Evolution Pokemon' },
      { label: 'Height', value: '0.3 m' },
      { label: 'Weight', value: '6.5 kg' },
      { label: 'Habitat', value: 'Urban Edge' },
      { label: 'Type', value: 'Normal' },
      { label: 'Egg Group', value: 'Field' },
      { label: 'Growth Rate', value: 'Medium Fast' },
      { label: 'Catch Rate', value: '45' },
      { label: 'Region', value: 'Kanto' },
      { label: 'Base Exp', value: '65' },
      { label: 'EV Yield', value: '1 Sp. Def' },
      { label: 'Gender Ratio', value: '87.5% / 12.5%' },
    ],
    trainerNote: 'Eevee sells possibility. Every variant card feels like a promise rather than a footnote.',
    variants: [
      { id: 'eevee', name: 'Eevee', subtitle: 'Original', accent: '#a88157', image: artwork(133) },
      { id: 'vaporeon', name: 'Vaporeon', subtitle: 'Tidal Form', accent: '#5bc7f6', image: artwork(134) },
      { id: 'jolteon', name: 'Jolteon', subtitle: 'Spark Form', accent: '#f4c542', image: artwork(135) },
      { id: 'flareon', name: 'Flareon', subtitle: 'Ember Form', accent: '#e85c4a', image: artwork(136) },
    ],
    synergy: {
      strongAgainst: ['electric', 'water'],
      weakAgainst: ['fire', 'grass'],
      abilityPool: ['Run Away', 'Adaptability', 'Anticipation'],
      relatedSpecies: [
        { slug: 'eevee', name: 'Vaporeon', image: artwork(134) },
        { slug: 'pikachu', name: 'Pikachu', image: artwork(25) },
        { slug: 'charizard', name: 'Charizard', image: artwork(6) },
      ],
    },
  },
]

const QUESTS: QuestCard[] = [
  { id: 'electric-quest', title: 'Catch 15 Electric Type', subtitle: 'Static hunt', progress: 9, total: 15, accent: '#f4c542' },
  { id: 'gym-battles', title: 'Win 3 Gym Battles', subtitle: 'Arena push', progress: 2, total: 3, accent: '#63b96a' },
  { id: 'water-log', title: 'Discover 10 Water Type', subtitle: 'Tidal scouting', progress: 6, total: 10, accent: '#5bc7f6' },
  { id: 'boss-run', title: 'Defeat a Team Star Boss', subtitle: 'Night raid', progress: 0, total: 1, accent: '#8a837b' },
]

const EXPLORE: ExploreModule[] = [
  { id: 'gym', title: 'Gym Challenges', subtitle: 'Test your strength', accent: '#e85c4a' },
  { id: 'region', title: 'Region Atlas', subtitle: 'Explore the world', accent: '#5bc7f6' },
  { id: 'lab', title: 'Type Lab', subtitle: 'Understand strengths', accent: '#f4c542' },
  { id: 'daily', title: 'Daily Expedition', subtitle: 'New rewards every day', accent: '#9d62ff' },
]

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export async function loadDiscoverData(mode: 'discover' | 'type-lab' = 'discover'): Promise<DiscoverPageData> {
  return {
    mode,
    heroNumber: mode === 'type-lab' ? '04' : '01',
    heroTitle: mode === 'type-lab' ? 'Type Lab' : 'Discover',
    heroSubtitle: mode === 'type-lab'
      ? 'Tune elemental matchups. Shape your next route.'
      : 'Find. Challenge. Be legendary.',
    featuredSlug: mode === 'type-lab' ? 'charizard' : 'pikachu',
    quests: QUESTS,
    explore: EXPLORE,
    pokemon: POKEMON,
  }
}

export async function loadPokemonDetail(slug: string): Promise<PokemonCardModel> {
  return getPokemonBySlug(slug)
}

export async function loadSpeciesDetail(slug: string): Promise<SpeciesModel> {
  return getSpeciesBySlug(slug)
}

export function getPokemonBySlug(slug: string): PokemonCardModel {
  return POKEMON.find((pokemon) => pokemon.slug === slug) ?? POKEMON.find((pokemon) => pokemon.slug === 'charizard')!
}

export function getSpeciesBySlug(slug: string): SpeciesModel {
  return SPECIES.find((species) => species.slug === slug) ?? SPECIES.find((species) => species.slug === 'charizard')!
}
