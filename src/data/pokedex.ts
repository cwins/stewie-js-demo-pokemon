export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'dragon'
  | 'flying'
  | 'dark'
  | 'steel'
  | 'ice'
  | 'rock'
  | 'ground'
  | 'fighting'
  | 'ghost'
  | 'poison'
  | 'bug'
  | 'fairy'

export type DiscoverSort = 'pokedex' | 'aura' | 'quest'
export type AbilityCategory = 'all' | 'offense' | 'defense' | 'support' | 'utility' | 'weather'

export interface TypeOption {
  value: 'all' | PokemonType
  label: string
  icon: string
}

export interface AbilityCategoryOption {
  value: AbilityCategory
  label: string
  icon: string
}

export interface QuestCard {
  id: string
  title: string
  subtitle: string
  icon: string
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

export interface PokemonAbilityModel {
  slug: string
  name: string
  summary: string
  category: Exclude<AbilityCategory, 'all'>
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
  abilities: PokemonAbilityModel[]
  moves: Array<{ name: string; type: PokemonType; pp: string; summary: string }>
  quickFacts: Array<{ label: string; value: string }>
  tabs: Record<'overview' | 'moves' | 'habitat' | 'evolution', { title: string; body: string }>
  evolutionLine?: Array<{ id: number; slug: string; name: string; number: string; image: string; isCurrent: boolean }>
}

export interface AbilityUserModel {
  slug: string
  name: string
  number: string
  image: string
  types: PokemonType[]
  classification: string
}

export interface AbilityModel {
  id: number
  slug: string
  name: string
  category: Exclude<AbilityCategory, 'all'>
  categoryLabel: string
  accent: string
  glow: string
  crest: string
  summary: string
  effectSummary: string
  strategyNotes: string[]
  interactionNotes: string[]
  tags: string[]
  users: AbilityUserModel[]
  relatedAbilitySlugs: string[]
}

export interface DiscoverPageData {
  mode: 'discover'
  heroTitle: string
  heroSubtitle: string
  featuredSlug: string
  quests: QuestCard[]
  explore: ExploreModule[]
  pokemon: PokemonCardModel[]
}

export interface AbilitiesPageData {
  heroTitle: string
  heroSubtitle: string
  featuredAbilitySlug: string
  abilities: AbilityModel[]
  trending: AbilityModel[]
}

interface LivePokemonAbilityEntry {
  ability?: {
    name?: string | null
    abilityeffecttexts?: AbilityEffectText[] | null
  } | null
}

interface LivePokemonTypeEntry {
  type?: {
    name?: string | null
  } | null
}

interface LivePokemonMoveEntry {
  move?: {
    name?: string | null
    pp?: number | null
    power?: number | null
    type?: {
      name?: string | null
    } | null
  } | null
}

interface LivePokemonStatEntry {
  base_stat?: number | null
  stat?: {
    name?: string | null
  } | null
}

interface LivePokemonSpeciesEvolutionEntry {
  evolved_species_id?: number | null
  min_level?: number | null
  min_happiness?: number | null
  min_affection?: number | null
  min_beauty?: number | null
  needs_overworld_rain?: boolean | null
  time_of_day?: string | null
  evolutiontrigger?: {
    name?: string | null
  } | null
  item?: {
    name?: string | null
  } | null
  location?: {
    name?: string | null
  } | null
}

interface LivePokemonSpeciesNode {
  name?: string | null
  pokemonhabitat?: {
    name?: string | null
  } | null
  pokemonshape?: {
    name?: string | null
  } | null
  generation?: {
    name?: string | null
  } | null
  growthrate?: {
    name?: string | null
  } | null
  evolves_from_species_id?: number | null
  capture_rate?: number | null
  gender_rate?: number | null
  hatch_counter?: number | null
  base_happiness?: number | null
  pokemonspeciesnames?: Array<{
    name?: string | null
    genus?: string | null
  }> | null
  pokemonspeciesflavortexts?: Array<{
    flavor_text?: string | null
    version?: {
      name?: string | null
    } | null
  }> | null
  evolutionchain?: {
    pokemonspecies?: Array<{
      id?: number | null
      name?: string | null
      evolves_from_species_id?: number | null
    }> | null
  } | null
  pokemonevolutions?: LivePokemonSpeciesEvolutionEntry[] | null
}

interface LivePokemonNode {
  id: number
  name: string
  height?: number | null
  weight?: number | null
  base_experience?: number | null
  pokemontypes?: LivePokemonTypeEntry[] | null
  pokemonabilities?: LivePokemonAbilityEntry[] | null
  pokemonmoves?: LivePokemonMoveEntry[] | null
  pokemonstats?: LivePokemonStatEntry[] | null
  pokemonspecy?: LivePokemonSpeciesNode | null
}

const artwork = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

const categoryLabel = (category: Exclude<AbilityCategory, 'all'>): string => {
  switch (category) {
    case 'offense':
      return 'Offense'
    case 'defense':
      return 'Defense'
    case 'support':
      return 'Support'
    case 'utility':
      return 'Utility'
    case 'weather':
      return 'Weather'
  }
}

export const TYPE_OPTIONS: TypeOption[] = [
  { value: 'all', label: 'All', icon: '◎' },
  { value: 'fire', label: 'Fire', icon: '✹' },
  { value: 'water', label: 'Water', icon: '💧' },
  { value: 'grass', label: 'Grass', icon: '❋' },
  { value: 'electric', label: 'Electric', icon: '⚡' },
  { value: 'psychic', label: 'Psychic', icon: '◌' },
]

export const ABILITY_CATEGORY_OPTIONS: AbilityCategoryOption[] = [
  { value: 'all', label: 'All', icon: '◎' },
  { value: 'offense', label: 'Offense', icon: '✦' },
  { value: 'defense', label: 'Defense', icon: '⬢' },
  { value: 'support', label: 'Support', icon: '✚' },
  { value: 'utility', label: 'Utility', icon: '⟡' },
  { value: 'weather', label: 'Weather', icon: '☀' },
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
      { slug: 'static', name: 'Static', summary: 'Stores a crackling field that can stun on contact.', category: 'support' },
      { slug: 'lightning-rod', name: 'Lightning Rod', summary: 'Pulls electric energy inward and surges harder.', category: 'utility' },
    ],
    moves: [
      { name: 'Thunderbolt', type: 'electric', pp: '15/15', summary: 'A focused lightning strike with cinematic snap.' },
      { name: 'Volt Tackle', type: 'electric', pp: '5/5', summary: 'A blazing charge wrapped in gold static.' },
      { name: 'Quick Attack', type: 'normal', pp: '30/30', summary: 'A blink-fast dash that keeps momentum high.' },
      { name: 'Iron Tail', type: 'steel', pp: '15/15', summary: 'A finishing sweep that cuts through guard.' },
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
      { slug: 'blaze', name: 'Blaze', summary: 'Fire surges brighter when the pressure spikes.', category: 'offense' },
      { slug: 'solar-power', name: 'Solar Power', summary: 'Turns harsh sunlight into a dramatic offense boost.', category: 'weather' },
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
      { slug: 'torrent', name: 'Torrent', summary: 'Water pressure rises when the battle turns tense.', category: 'offense' },
      { slug: 'rain-dish', name: 'Rain Dish', summary: 'Restores momentum under cleansing rainfall.', category: 'weather' },
    ],
    moves: [
      { name: 'Water Pulse', type: 'water', pp: '20/20', summary: 'A smooth ring of water that warps the air around it.' },
      { name: 'Aqua Tail', type: 'water', pp: '10/10', summary: 'A snapping sweep with a strong silhouette.' },
      { name: 'Bite', type: 'dark', pp: '25/25', summary: 'A fast interruption tool for close space.' },
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
      { slug: 'overgrow', name: 'Overgrow', summary: 'Plant power blooms hardest when the stakes rise.', category: 'support' },
      { slug: 'chlorophyll', name: 'Chlorophyll', summary: 'Sunlight turns every motion lighter and faster.', category: 'weather' },
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
      { slug: 'run-away', name: 'Run Away', summary: 'Keeps mobile under pressure and slips out cleanly.', category: 'utility' },
      { slug: 'adaptability', name: 'Adaptability', summary: 'Sharpens familiar moves into signature highlights.', category: 'offense' },
    ],
    moves: [
      { name: 'Swift', type: 'normal', pp: '20/20', summary: 'A bright starburst that never feels wasted.' },
      { name: 'Quick Attack', type: 'normal', pp: '30/30', summary: 'Short, snappy, and easy to read on every screen.' },
      { name: 'Bite', type: 'dark', pp: '25/25', summary: 'A light interruption tool with attitude.' },
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
    trainerCallout: 'The unmistakable ace for a bold detail reveal and ability-forward exploration.',
    stats: { hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100 },
    abilities: [
      { slug: 'blaze', name: 'Blaze', summary: 'Powers up Fire-type moves in a pinch.', category: 'offense' },
      { slug: 'solar-power', name: 'Solar Power', summary: 'Boosts Sp. Atk in strong sunlight.', category: 'weather' },
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
      evolution: { title: 'Lineage Complete', body: 'The Charmander line scales upward naturally, but the real story here is how its abilities turn style into strategy.' },
    },
  },
]

const pokemonSummary = (slug: string): AbilityUserModel => {
  const pokemon = getPokemonBySlug(slug)
  return {
    slug: pokemon.slug,
    name: pokemon.name,
    number: pokemon.number,
    image: pokemon.image,
    types: pokemon.types,
    classification: pokemon.classification,
  }
}

const ABILITIES: AbilityModel[] = [
  {
    id: 66,
    slug: 'blaze',
    name: 'Blaze',
    category: 'offense',
    categoryLabel: categoryLabel('offense'),
    accent: '#f36a2f',
    glow: '#ffbf8e',
    crest: 'BZ',
    summary: 'Powers up Fire-type moves when the Pokemon is in a pinch.',
    effectSummary: 'Fire techniques flare harder once the user is fighting from low health.',
    strategyNotes: [
      'Perfect for dramatic closer turns and pressure-heavy finishing lines.',
      'Combines cleanly with high-tempo attackers and burst-oriented move kits.',
      'Rewards confident play without demanding complicated setup.',
    ],
    interactionNotes: [
      'Triggers only while HP is low, so it favors late-battle swing turns.',
      'Stacks naturally with premium fire coverage like Flamethrower and Fire Fang.',
    ],
    tags: ['Pinch Power', 'Fire Burst', 'Closer'],
    users: [pokemonSummary('charmander'), pokemonSummary('charizard')],
    relatedAbilitySlugs: ['solar-power', 'adaptability', 'torrent', 'static'],
  },
  {
    id: 9,
    slug: 'static',
    name: 'Static',
    category: 'support',
    categoryLabel: categoryLabel('support'),
    accent: '#f4c542',
    glow: '#ffe28b',
    crest: 'ST',
    summary: 'Contact with the Pokemon may leave the attacker paralyzed.',
    effectSummary: 'A crackling retaliatory field punishes contact and shifts momentum immediately.',
    strategyNotes: [
      'Ideal for tempo control and making physical attackers second-guess every touch.',
      'Works best on characters who naturally invite close-range challenges.',
      'Keeps the pace lively because its value is felt in one instant, not over long setup windows.',
    ],
    interactionNotes: [
      'Especially strong in skirmishes where the opponent needs repeated contact.',
      'Pairs beautifully with fast repositioning and speed-led pressure.',
    ],
    tags: ['Status', 'Momentum', 'Electric Field'],
    users: [pokemonSummary('pikachu')],
    relatedAbilitySlugs: ['lightning-rod', 'overgrow', 'adaptability', 'run-away'],
  },
  {
    id: 31,
    slug: 'lightning-rod',
    name: 'Lightning Rod',
    category: 'utility',
    categoryLabel: categoryLabel('utility'),
    accent: '#ffb12e',
    glow: '#ffe59b',
    crest: 'LR',
    summary: 'Draws in electric moves to boost special attack instead of taking damage.',
    effectSummary: 'The user converts incoming electrical pressure into a sharper special strike profile.',
    strategyNotes: [
      'Great for route planning because it changes how an entire matchup has to be approached.',
      'Turns a defensive read into a visible power spike, which fits the cinematic UI language well.',
    ],
    interactionNotes: [
      'Most valuable when you can predict electric pressure or protect a partner in doubles-like scenarios.',
    ],
    tags: ['Redirection', 'Special Boost', 'Counterplay'],
    users: [pokemonSummary('pikachu')],
    relatedAbilitySlugs: ['static', 'solar-power', 'run-away', 'rain-dish'],
  },
  {
    id: 67,
    slug: 'torrent',
    name: 'Torrent',
    category: 'offense',
    categoryLabel: categoryLabel('offense'),
    accent: '#4abcf1',
    glow: '#b7ecff',
    crest: 'TR',
    summary: 'Powers up Water-type moves when the Pokemon is in a pinch.',
    effectSummary: 'Water techniques surge with extra force once the user enters clutch range.',
    strategyNotes: [
      'A clean offensive mirror to Blaze, but with calmer, more controlled pressure.',
      'Especially good on balanced profiles that can stay alive long enough to cash in the boost.',
    ],
    interactionNotes: [
      'Best expressed through decisive water finishers and tempo swings in the late phase of a battle.',
    ],
    tags: ['Pinch Power', 'Water Burst', 'Clutch'],
    users: [pokemonSummary('squirtle')],
    relatedAbilitySlugs: ['rain-dish', 'blaze', 'overgrow', 'adaptability'],
  },
  {
    id: 44,
    slug: 'rain-dish',
    name: 'Rain Dish',
    category: 'weather',
    categoryLabel: categoryLabel('weather'),
    accent: '#5bc7f6',
    glow: '#8edbff',
    crest: 'RD',
    summary: 'The Pokemon gradually regains HP in rain.',
    effectSummary: 'A quiet sustain engine that turns rainy field states into steady healing.',
    strategyNotes: [
      'Shifts the mood from explosive to patient, letting defensive rhythm become its own reward.',
      'Works well when you want the interface to suggest strategic composure instead of pure offense.',
    ],
    interactionNotes: [
      'Most effective when the battle plan can reliably maintain rain for multiple turns.',
    ],
    tags: ['Weather', 'Recovery', 'Sustain'],
    users: [pokemonSummary('squirtle')],
    relatedAbilitySlugs: ['torrent', 'chlorophyll', 'solar-power', 'run-away'],
  },
  {
    id: 65,
    slug: 'overgrow',
    name: 'Overgrow',
    category: 'support',
    categoryLabel: categoryLabel('support'),
    accent: '#63b96a',
    glow: '#bbf0c0',
    crest: 'OG',
    summary: 'Powers up Grass-type moves when the Pokemon is in a pinch.',
    effectSummary: 'Plant-driven pressure blooms once the user is cornered, turning resilience into payoff.',
    strategyNotes: [
      'Strong on grounded, dependable builds that want a restorative emotional tone without losing teeth.',
      'Helps grass rosters feel like sustain and pressure belong in the same frame.',
    ],
    interactionNotes: [
      'Creates the most value on teams that can survive long enough to trigger a decisive grass response.',
    ],
    tags: ['Growth', 'Pinch Power', 'Recovery Mood'],
    users: [pokemonSummary('bulbasaur')],
    relatedAbilitySlugs: ['chlorophyll', 'static', 'torrent', 'adaptability'],
  },
  {
    id: 34,
    slug: 'chlorophyll',
    name: 'Chlorophyll',
    category: 'weather',
    categoryLabel: categoryLabel('weather'),
    accent: '#5dbb68',
    glow: '#bff5a8',
    crest: 'CL',
    summary: 'Boosts the Pokemon speed in sunshine.',
    effectSummary: 'Bright field conditions sharpen movement, creating a lighter and faster combat rhythm.',
    strategyNotes: [
      'A sunshine ability that feels nimble instead of explosive, which gives weather teams more range of tone.',
      'Pairs especially well with clean movement silhouettes and fast repositioning.',
    ],
    interactionNotes: [
      'Requires sun support to reach full value, but pays it back in immediate pacing changes.',
    ],
    tags: ['Weather', 'Speed', 'Sunlight'],
    users: [pokemonSummary('bulbasaur')],
    relatedAbilitySlugs: ['solar-power', 'rain-dish', 'overgrow', 'lightning-rod'],
  },
  {
    id: 91,
    slug: 'adaptability',
    name: 'Adaptability',
    category: 'offense',
    categoryLabel: categoryLabel('offense'),
    accent: '#a88157',
    glow: '#d8b89a',
    crest: 'AD',
    summary: 'Powers up moves of the same type as the Pokemon.',
    effectSummary: 'The user’s natural move identity hits harder, making familiar attacks feel premium and reliable.',
    strategyNotes: [
      'Great for demo UX because its value is easy to explain and easy to feel.',
      'Lets a Pokemon double down on its core identity rather than branching into niche tech.',
    ],
    interactionNotes: [
      'Especially effective when the user already has a clean, recognizable primary attack profile.',
    ],
    tags: ['Signature Damage', 'Identity', 'Reliable Pressure'],
    users: [pokemonSummary('eevee')],
    relatedAbilitySlugs: ['run-away', 'blaze', 'static', 'overgrow'],
  },
  {
    id: 94,
    slug: 'solar-power',
    name: 'Solar Power',
    category: 'weather',
    categoryLabel: categoryLabel('weather'),
    accent: '#ef8b35',
    glow: '#ffc883',
    crest: 'SP',
    summary: 'Boosts special attack in sunshine at the cost of some HP.',
    effectSummary: 'Sunlight ignites a high-risk special attack engine that trades safety for spectacle.',
    strategyNotes: [
      'This is the most cinematic ability in the set because the upside is visible and the cost is tangible.',
      'Perfect on characters who are already framed like boss reveals or finishing aces.',
    ],
    interactionNotes: [
      'Thrives on sun-supported teams and asks the player to commit to momentum over comfort.',
    ],
    tags: ['Weather', 'Risk Reward', 'Special Burst'],
    users: [pokemonSummary('charmander'), pokemonSummary('charizard')],
    relatedAbilitySlugs: ['blaze', 'chlorophyll', 'rain-dish', 'lightning-rod'],
  },
  {
    id: 50,
    slug: 'run-away',
    name: 'Run Away',
    category: 'utility',
    categoryLabel: categoryLabel('utility'),
    accent: '#9f7b5f',
    glow: '#d8c2a7',
    crest: 'RA',
    summary: 'Enables the Pokemon to escape from wild battles without fail.',
    effectSummary: 'Pure route flexibility that reinforces mobility, charm, and low-friction repositioning.',
    strategyNotes: [
      'Not flashy, but it gives the app a nice utility note among the more combat-forward powers.',
      'Works well as a companion ability in a collectible browsing experience because it reads immediately.',
    ],
    interactionNotes: [
      'In a demo context, its value is less battle pressure and more identity: quick, nimble, and free-moving.',
    ],
    tags: ['Mobility', 'Escape', 'Traversal'],
    users: [pokemonSummary('eevee')],
    relatedAbilitySlugs: ['adaptability', 'lightning-rod', 'rain-dish', 'static'],
  },
]

const QUESTS: QuestCard[] = [
  { id: 'electric-quest', title: 'Catch 15 Electric Type', subtitle: 'Static hunt', icon: 'EL', progress: 9, total: 15, accent: '#f4c542' },
  { id: 'gym-battles', title: 'Win 3 Gym Battles', subtitle: 'Arena push', icon: 'GY', progress: 2, total: 3, accent: '#63b96a' },
  { id: 'water-log', title: 'Discover 10 Water Type', subtitle: 'Tidal scouting', icon: 'WT', progress: 6, total: 10, accent: '#5bc7f6' },
  { id: 'boss-run', title: 'Defeat a Team Star Boss', subtitle: 'Night raid', icon: 'TS', progress: 0, total: 1, accent: '#8a837b' },
]

const EXPLORE: ExploreModule[] = [
  { id: 'gym', title: 'Gym Challenges', subtitle: 'Test your strength', accent: '#e85c4a' },
  { id: 'region', title: 'Region Atlas', subtitle: 'Explore the world', accent: '#5bc7f6' },
  { id: 'abilities', title: 'Ability Atlas', subtitle: 'Trace powers and traits', accent: '#f4c542' },
  { id: 'daily', title: 'Daily Expedition', subtitle: 'New rewards every day', accent: '#63b96a' },
]

const GRAPHQL_ENDPOINT = 'https://graphql.pokeapi.co/v1beta2'
const graphQlCache = new Map<string, Promise<unknown>>()
const GRAPHQL_TIMEOUT_MS = 3500
const livePokemonModels = new Map<string, PokemonCardModel>()
const liveTypeSet = new Set<PokemonType>([
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'dragon',
  'flying',
  'dark',
  'steel',
  'ice',
  'rock',
  'ground',
  'fighting',
  'ghost',
  'poison',
  'bug',
  'fairy',
])
const trendingAbilitySlugs = ['solar-power', 'adaptability', 'lightning-rod', 'chlorophyll', 'run-away'] as const
const typeVisuals: Record<PokemonType, { accent: string; glow: string }> = {
  normal: { accent: '#a88157', glow: '#d8b89a' },
  fire: { accent: '#e85c4a', glow: '#ffb07a' },
  water: { accent: '#5bc7f6', glow: '#b7ecff' },
  grass: { accent: '#63b96a', glow: '#bbf0c0' },
  electric: { accent: '#f4c542', glow: '#ffe28b' },
  psychic: { accent: '#b26ce7', glow: '#efc9ff' },
  dragon: { accent: '#6c57d7', glow: '#b7acff' },
  flying: { accent: '#62a9e8', glow: '#bde5ff' },
  dark: { accent: '#5a5561', glow: '#9d96ab' },
  steel: { accent: '#8ca2b8', glow: '#d5e2ef' },
  ice: { accent: '#78d9f6', glow: '#d4f7ff' },
  rock: { accent: '#b48f5a', glow: '#e1c392' },
  ground: { accent: '#d3a15f', glow: '#efd2a1' },
  fighting: { accent: '#d05858', glow: '#f2acac' },
  ghost: { accent: '#7662ba', glow: '#c2b6ef' },
  poison: { accent: '#a963d0', glow: '#e1baf6' },
  bug: { accent: '#8bb34d', glow: '#d3f0aa' },
  fairy: { accent: '#e6a0c8', glow: '#ffdcef' },
}

interface AbilityEffectText {
  effect?: string | null
  short_effect?: string | null
}

interface AbilityAtlasQueryData {
  ability: Array<{
    id: number
    name: string
    abilityeffecttexts?: AbilityEffectText[] | null
    pokemonabilities?: Array<{
      pokemon?: {
        id: number
        name: string
        pokemontypes?: Array<{
          type?: {
            name?: string | null
          } | null
        }> | null
      } | null
    }> | null
  }>
}

type AbilityAtlasUserEntry = NonNullable<NonNullable<AbilityAtlasQueryData['ability'][number]['pokemonabilities']>[number]>

interface PokemonDetailQueryData {
  pokemon: LivePokemonNode[]
}

interface DiscoverPokemonQueryData {
  pokemon: LivePokemonNode[]
}

const abilityAtlasQuery = `
query AbilityAtlas($names: [String!]!) {
  ability(where: { name: { _in: $names } }) {
    id
    name
    abilityeffecttexts(where: { language: { name: { _eq: "en" } } }) {
      effect
      short_effect
    }
    pokemonabilities(limit: 8) {
      pokemon {
        id
        name
        pokemontypes {
          type {
            name
          }
        }
      }
    }
  }
}
`

const pokemonDetailQuery = `
query PokemonDetail($name: String!) {
  pokemon(where: { name: { _eq: $name } }, limit: 1) {
    id
    name
    height
    weight
    base_experience
    pokemontypes {
      type {
        name
      }
    }
    pokemonabilities {
      ability {
        name
        abilityeffecttexts(where: { language: { name: { _eq: "en" } } }) {
          effect
          short_effect
        }
      }
    }
    pokemonstats {
      base_stat
      stat {
        name
      }
    }
    pokemonmoves(limit: 4) {
      move {
        name
        pp
        power
        type {
          name
        }
      }
    }
    pokemonspecy {
      name
      pokemonhabitat {
        name
      }
      pokemonshape {
        name
      }
      generation {
        name
      }
      growthrate {
        name
      }
      evolves_from_species_id
      capture_rate
      gender_rate
      hatch_counter
      base_happiness
      pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }, limit: 1) {
        name
        genus
      }
      pokemonspeciesflavortexts(where: { language: { name: { _eq: "en" } } }, limit: 3) {
        flavor_text
        version {
          name
        }
      }
      evolutionchain {
        pokemonspecies(order_by: { id: asc }) {
          id
          name
          evolves_from_species_id
        }
      }
      pokemonevolutions(order_by: { id: asc }) {
        evolved_species_id
        min_level
        min_happiness
        min_affection
        min_beauty
        needs_overworld_rain
        time_of_day
        evolutiontrigger {
          name
        }
        item {
          name
        }
        location {
          name
        }
      }
    }
  }
}
`

function isOfflineMode(): boolean {
  return import.meta.env.MODE === 'test' || import.meta.env.VITE_POKEDEX_OFFLINE === '1'
}

function toPokemonType(value?: string | null): PokemonType | null {
  if (!value) return null
  return liveTypeSet.has(value as PokemonType) ? value as PokemonType : null
}

function toTitleCase(value: string): string {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join(' ')
}

function cleanFlavorText(value?: string | null): string | undefined {
  if (!value) return undefined
  return value.replace(/[\n\f]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function formatLabel(value?: string | null): string | undefined {
  if (!value) return undefined
  return toTitleCase(value)
}

function formatGeneration(value?: string | null): string | undefined {
  if (!value) return undefined
  return value.replace('generation-', 'Generation ').replace(/\b([ivx]+)$/i, (_, roman: string) => roman.toUpperCase())
}

function formatGenderRatio(genderRate?: number | null): string {
  if (genderRate === null || genderRate === undefined) return 'Unknown'
  if (genderRate < 0) return 'Genderless'
  const female = Math.round((genderRate / 8) * 100)
  const male = 100 - female
  return `${male}% M / ${female}% F`
}

function describeEvolutionTrigger(entry: LivePokemonSpeciesEvolutionEntry | undefined): string | undefined {
  if (!entry) return undefined

  const parts: string[] = []
  const trigger = formatLabel(entry.evolutiontrigger?.name)

  if (trigger === 'Level Up' && entry.min_level) {
    parts.push(`Evolves by level up at ${entry.min_level}`)
  } else if (trigger) {
    parts.push(`Evolution trigger: ${trigger}`)
  }

  if (entry.item?.name) {
    parts.push(`uses ${formatLabel(entry.item.name)}`)
  }
  if (entry.location?.name) {
    parts.push(`at ${formatLabel(entry.location.name)}`)
  }
  if (entry.time_of_day) {
    parts.push(`during the ${entry.time_of_day}`)
  }
  if (entry.needs_overworld_rain) {
    parts.push('while it is raining')
  }
  if (entry.min_happiness) {
    parts.push(`with high happiness (${entry.min_happiness})`)
  }
  if (entry.min_affection) {
    parts.push(`with affection ${entry.min_affection}+`)
  }
  if (entry.min_beauty) {
    parts.push(`with beauty ${entry.min_beauty}+`)
  }

  return parts.length ? `${parts.join(', ')}.` : undefined
}

function speciesLabelFromLive(live: LivePokemonNode): string | undefined {
  return live.pokemonspecy?.pokemonspeciesnames?.[0]?.genus ?? undefined
}

function liveSpotlightFromSpecies(live: LivePokemonNode): string | undefined {
  return cleanFlavorText(live.pokemonspecy?.pokemonspeciesflavortexts?.[0]?.flavor_text)
}

function buildEvolutionLine(live: LivePokemonNode, fallback?: PokemonCardModel['evolutionLine']): PokemonCardModel['evolutionLine'] {
  const chain = live.pokemonspecy?.evolutionchain?.pokemonspecies
  if (!chain?.length) return fallback

  const steps = chain
    .filter((entry): entry is { id: number; name: string; evolves_from_species_id?: number | null } => Boolean(entry?.id && entry?.name))
    .map((entry) => ({
      id: entry.id,
      slug: entry.name,
      name: toTitleCase(entry.name),
      number: `#${String(entry.id).padStart(3, '0')}`,
      image: artwork(entry.id),
      isCurrent: entry.name === live.name,
    }))

  return steps.length ? steps : fallback
}

function buildPlaceholderPokemonModel(slug: string): PokemonCardModel {
  const title = toTitleCase(slug)
  return {
    id: 0,
    slug,
    name: title,
    number: '#???',
    types: ['normal'],
    accent: '#a88157',
    glow: '#d8b89a',
    image: artwork(132),
    discovery: `Placeholder route for ${title}.`,
    classification: 'Pokemon',
    habitat: 'Unknown Habitat',
    region: 'Unknown Region',
    auraRank: 50,
    spotlight: `${title} is loading from the live roster for this detail route.`,
    trainerCallout: 'Live route placeholder.',
    stats: { hp: 50, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
    abilities: [],
    moves: [],
    quickFacts: [
      { label: 'Height', value: 'Unknown' },
      { label: 'Weight', value: 'Unknown' },
      { label: 'Habitat', value: 'Unknown' },
      { label: 'Generation', value: 'Unknown' },
      { label: 'Base Exp', value: 'Unknown' },
      { label: 'Growth Rate', value: 'Unknown' },
      { label: 'Gender Ratio', value: 'Unknown' },
      { label: 'Capture Rate', value: 'Unknown' },
    ],
    tabs: {
      overview: { title: `${title} Overview`, body: `${title} is loading from the live GraphQL roster.` },
      moves: { title: `${title} Moves`, body: `${title}'s move details will appear above once loaded.` },
      habitat: { title: 'Habitat', body: `${title}'s habitat details are not available yet.` },
      evolution: { title: 'Evolution', body: `${title}'s evolution details are not available yet.` },
    },
    evolutionLine: [],
  }
}

function firstEffectText(texts?: AbilityEffectText[] | null): string | undefined {
  if (!texts?.length) return undefined
  return texts[0]?.short_effect ?? texts[0]?.effect ?? undefined
}

function getTypeVisual(type?: PokemonType): { accent: string; glow: string } {
  return type ? typeVisuals[type] : { accent: '#a88157', glow: '#d8b89a' }
}

function getLiveTypes(entries?: LivePokemonTypeEntry[] | null, fallback?: PokemonType[]): PokemonType[] {
  const liveTypes = entries
    ?.map((entry) => toPokemonType(entry?.type?.name))
    .filter((value): value is PokemonType => value !== null)

  if (liveTypes?.length) return liveTypes
  if (fallback?.length) return fallback
  return ['normal']
}

function buildGenericQuickFacts(live: LivePokemonNode): PokemonCardModel['quickFacts'] {
  const species = live.pokemonspecy
  const habitat = formatLabel(species?.pokemonhabitat?.name) ?? 'Unknown'
  const generation = formatGeneration(species?.generation?.name) ?? 'Unknown'
  const growthRate = formatLabel(species?.growthrate?.name) ?? 'Unknown'

  return [
    { label: 'Height', value: live.height ? `${(live.height / 10).toFixed(1)} m` : 'Unknown' },
    { label: 'Weight', value: live.weight ? `${(live.weight / 10).toFixed(1)} kg` : 'Unknown' },
    { label: 'Habitat', value: habitat },
    { label: 'Generation', value: generation },
    { label: 'Base Exp', value: live.base_experience ? String(live.base_experience) : 'Unknown' },
    { label: 'Growth Rate', value: growthRate },
    { label: 'Gender Ratio', value: formatGenderRatio(species?.gender_rate) },
    { label: 'Capture Rate', value: species?.capture_rate ? String(species.capture_rate) : 'Unknown' },
  ]
}

function buildLiveNarratives(live: LivePokemonNode, title: string, fallback?: PokemonCardModel['tabs']): PokemonCardModel['tabs'] {
  const species = live.pokemonspecy
  if (!species) {
    return fallback ?? {
      overview: { title: `${title} Overview`, body: `${title} was loaded from the live GraphQL roster and mapped into the demo's premium presentation layer.` },
      moves: { title: `${title} Moves`, body: `A compact move kit keeps this imported profile usable even when the source roster extends beyond the original mock set.` },
      habitat: { title: `${title} Habitat`, body: `Some ecological details are not surfaced by the current endpoint, so this route stays intentionally generic for live-only arrivals.` },
      evolution: { title: `${title} Growth`, body: `Live Discover results can now open directly into a working detail route, even for Pokemon outside the original curated lineup.` },
    }
  }

  const flavorText = cleanFlavorText(species.pokemonspeciesflavortexts?.[0]?.flavor_text)
  const habitat = formatLabel(species.pokemonhabitat?.name) ?? 'Unknown habitat'
  const shape = formatLabel(species.pokemonshape?.name) ?? 'Unknown form'
  const generation = formatGeneration(species.generation?.name) ?? 'Unknown generation'
  const growthRate = formatLabel(species.growthrate?.name) ?? 'Unknown growth rate'
  const genus = species.pokemonspeciesnames?.[0]?.genus ?? fallback?.overview?.title ?? 'Pokemon'
  const chainNames = (species.evolutionchain?.pokemonspecies ?? [])
    .map((entry) => formatLabel(entry.name))
    .filter((value): value is string => Boolean(value))
  const incomingEvolution = describeEvolutionTrigger(species.pokemonevolutions?.[0])

  const habitatBodyParts = [
    `${title} is classified as the ${genus}, typically associated with ${habitat.toLowerCase()} habitat and a ${shape.toLowerCase()} body shape.`,
    `${generation} data lists a ${growthRate.toLowerCase()} growth rate for this line.`,
    flavorText,
  ].filter((value): value is string => Boolean(value))

  const evolutionBodyParts = [
    chainNames.length ? `Its known chain runs ${chainNames.join(' → ')}.` : undefined,
    species.evolves_from_species_id
      ? `${title} is a middle or later-stage evolution in its family.`
      : `This species begins its family's visible evolution line.`,
    incomingEvolution,
  ].filter((value): value is string => Boolean(value))

  return {
    overview: fallback?.overview ?? { title: `${title} Overview`, body: flavorText ?? `${title} is represented here with live species data and a focused combat profile.` },
    moves: fallback?.moves ?? { title: `${title} Moves`, body: `${title}'s move list is surfaced above as the primary battle kit for this profile.` },
    habitat: {
      title: habitat,
      body: habitatBodyParts.join(' '),
    },
    evolution: {
      title: 'Evolution Line',
      body: evolutionBodyParts.join(' '),
    },
  }
}

function buildGenericPokemonModelFromLive(live: LivePokemonNode, fallback?: PokemonCardModel): PokemonCardModel {
  const types = getLiveTypes(live.pokemontypes, fallback?.types)
  const visuals = getTypeVisual(types[0])
  const title = toTitleCase(live.name)
  const liveAbilities = live.pokemonabilities
    ?.map((entry) => {
      const abilityName = entry?.ability?.name
      if (!abilityName) return null
      const slug = abilityName
      const mockAbility = ABILITIES.find((ability) => ability.slug === slug)
      return {
        slug,
        name: toTitleCase(abilityName),
        summary: firstEffectText(entry?.ability?.abilityeffecttexts) ?? mockAbility?.summary ?? 'Battle-ready passive effect.',
        category: mockAbility?.category ?? 'utility',
      }
    })
    .filter((value): value is PokemonAbilityModel => value !== null)

  const genericMoves = live.pokemonmoves
    ?.map((entry) => {
      const move = entry?.move
      const moveName = move?.name
      const moveType = toPokemonType(move?.type?.name) ?? types[0] ?? 'normal'
      if (!moveName) return null
      return {
        name: toTitleCase(moveName),
        type: moveType,
        pp: move?.pp ? `${move.pp}/${move.pp}` : '—',
        summary: move?.power ? `${move.power} power move that keeps the roster grounded in live data.` : 'Status move carried through the live roster.',
      }
    })
    .filter((value): value is PokemonCardModel['moves'][number] => value !== null)

  const base = fallback ?? {
    id: live.id,
    slug: live.name,
    name: title,
    number: `#${String(live.id).padStart(3, '0')}`,
    types,
    accent: visuals.accent,
    glow: visuals.glow,
    image: artwork(live.id),
    discovery: `Live discovery routed in from PokeAPI for ${title}.`,
    classification: 'Pokemon',
    habitat: 'Unknown Habitat',
    region: 'Unknown Region',
    auraRank: Math.min(100, live.base_experience ?? 60),
    spotlight: `${title} arrives from the live roster with ${types.join(' / ')} energy and a fresh route into the detail view.`,
    trainerCallout: `A live-discovered encounter ready for detail view exploration.`,
    stats: { hp: 50, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
    abilities: [],
    moves: [],
    quickFacts: buildGenericQuickFacts(live),
    tabs: buildLiveNarratives(live, title),
    evolutionLine: buildEvolutionLine(live),
  }

  const statsByName = new Map((live.pokemonstats ?? []).map((entry) => [entry?.stat?.name ?? '', entry?.base_stat ?? 50]))

  const merged: PokemonCardModel = {
    ...base,
    id: live.id ?? base.id,
    slug: live.name ?? base.slug,
    name: title,
    number: `#${String(live.id).padStart(3, '0')}`,
    types,
    accent: fallback?.accent ?? visuals.accent,
    glow: fallback?.glow ?? visuals.glow,
    image: artwork(live.id),
    auraRank: Math.min(100, live.base_experience ?? base.auraRank),
    classification: speciesLabelFromLive(live) ?? base.classification,
    habitat: formatLabel(live.pokemonspecy?.pokemonhabitat?.name) ?? base.habitat,
    spotlight: liveSpotlightFromSpecies(live) ?? base.spotlight,
    abilities: liveAbilities?.length ? liveAbilities : base.abilities,
    moves: genericMoves?.length ? genericMoves : base.moves,
    quickFacts: buildGenericQuickFacts(live),
    tabs: buildLiveNarratives(live, title, base.tabs),
    evolutionLine: buildEvolutionLine(live, base.evolutionLine),
    stats: {
      hp: Number(statsByName.get('hp') ?? base.stats.hp),
      attack: Number(statsByName.get('attack') ?? base.stats.attack),
      defense: Number(statsByName.get('defense') ?? base.stats.defense),
      spAtk: Number(statsByName.get('special-attack') ?? base.stats.spAtk),
      spDef: Number(statsByName.get('special-defense') ?? base.stats.spDef),
      speed: Number(statsByName.get('speed') ?? base.stats.speed),
    },
  }

  livePokemonModels.set(merged.slug, merged)
  return merged
}

function getDiscoverQuery(term: string, type: string, limit: number): { query: string; variables: Record<string, unknown> } {
  const usesTypeFilter = type !== 'all'
  const filters = [`name: { _iregex: $term }`]

  if (usesTypeFilter) {
    filters.push(`pokemontypes: { type: { name: { _eq: $type } } }`)
  }

  return {
    query: `
query DiscoverPokemon($term: String!, $limit: Int!${usesTypeFilter ? ', $type: String!' : ''}) {
  pokemon(
    distinct_on: [id]
    where: { ${filters.join(', ')} }
    order_by: { id: asc }
    limit: $limit
  ) {
    id
    name
    height
    weight
    base_experience
    pokemontypes {
      type {
        name
      }
    }
    pokemonabilities {
      ability {
        name
        abilityeffecttexts(where: { language: { name: { _eq: "en" } } }) {
          short_effect
        }
      }
    }
  }
}
`,
    variables: {
      term,
      limit,
      ...(usesTypeFilter ? { type } : {}),
    },
  }
}

async function fetchPokeApiGraphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const cacheKey = JSON.stringify({ query, variables })
  const cached = graphQlCache.get(cacheKey) as Promise<T> | undefined
  if (cached) return cached

  const request = (async () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), GRAPHQL_TIMEOUT_MS)

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`PokeAPI GraphQL request failed with ${response.status}`)
      }

      const payload = await response.json() as { data?: T; errors?: Array<{ message?: string }> }

      if (payload.errors?.length) {
        throw new Error(payload.errors.map((error) => error.message ?? 'Unknown GraphQL error').join('; '))
      }

      if (!payload.data) {
        throw new Error('PokeAPI GraphQL returned no data')
      }

      return payload.data
    } finally {
      clearTimeout(timeoutId)
    }
  })()

  graphQlCache.set(cacheKey, request)
  try {
    return await request
  } catch (error) {
    graphQlCache.delete(cacheKey)
    throw error
  }
}

function toAbilityUserModel(user: AbilityAtlasUserEntry): AbilityUserModel | null {
  const pokemon = user?.pokemon
  if (!pokemon?.name || !pokemon.id) return null

  const mockPokemon = POKEMON.find((entry) => entry.slug === pokemon.name)
  const resolvedTypes = getLiveTypes(pokemon.pokemontypes, mockPokemon?.types)

  return {
    slug: pokemon.name,
    name: toTitleCase(pokemon.name),
    number: `#${String(pokemon.id).padStart(3, '0')}`,
    image: artwork(pokemon.id),
    types: resolvedTypes,
    classification: mockPokemon?.classification ?? 'Pokemon',
  }
}

function mergeAbilityWithLive(base: AbilityModel, live: AbilityAtlasQueryData['ability'][number] | undefined): AbilityModel {
  if (!live) return base

  const effectText = firstEffectText(live.abilityeffecttexts)
  const users = live.pokemonabilities
    ?.map((entry) => toAbilityUserModel(entry))
    .filter((value): value is AbilityUserModel => value !== null)

  return {
    ...base,
    id: live.id ?? base.id,
    summary: effectText ?? base.summary,
    effectSummary: effectText ?? base.effectSummary,
    users: users?.length ? users : base.users,
  }
}

function mergePokemonWithLive(base: PokemonCardModel, live: PokemonDetailQueryData['pokemon'][number] | undefined): PokemonCardModel {
  if (!live) return base

  return buildGenericPokemonModelFromLive(live, base)
}

async function loadLiveAbilityAtlas(): Promise<Map<string, AbilityAtlasQueryData['ability'][number]>> {
  const data = await fetchPokeApiGraphql<AbilityAtlasQueryData>(abilityAtlasQuery, {
    names: ABILITIES.map((ability) => ability.slug),
  })

  return new Map(data.ability.map((ability) => [ability.name, ability]))
}

async function loadLivePokemonDetail(slug: string): Promise<PokemonDetailQueryData['pokemon'][number] | undefined> {
  const data = await fetchPokeApiGraphql<PokemonDetailQueryData>(pokemonDetailQuery, {
    name: slug,
  })
  return data.pokemon[0]
}

function filterOfflineDiscoverPokemon(search: string, type: string): PokemonCardModel[] {
  const phrase = search.trim().toLowerCase()

  return POKEMON.filter((pokemon) => {
    const matchesSearch = phrase === ''
      || pokemon.name.toLowerCase().includes(phrase)
      || pokemon.classification.toLowerCase().includes(phrase)
      || pokemon.abilities.some((ability) => ability.name.toLowerCase().includes(phrase))
    const matchesType = type === 'all' || pokemon.types.includes(type as PokemonType)
    return matchesSearch && matchesType
  })
}

export async function loadDiscoverData(mode: 'discover' = 'discover'): Promise<DiscoverPageData> {
  return {
    mode,
    heroTitle: 'Discover',
    heroSubtitle: 'Find. Challenge. Be legendary.',
    featuredSlug: 'pikachu',
    quests: QUESTS,
    explore: EXPLORE,
    pokemon: POKEMON,
  }
}

export async function loadDiscoverPokemon(search: string, type: string): Promise<PokemonCardModel[]> {
  const fallback = filterOfflineDiscoverPokemon(search, type)

  if (isOfflineMode()) {
    return fallback
  }

  try {
    const { query, variables } = getDiscoverQuery(search.trim() ? `.*${search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*` : '.*', type, 24)
    const data = await fetchPokeApiGraphql<DiscoverPokemonQueryData>(query, variables)

    const liveResults = data.pokemon.map((pokemon) => {
      const mockPokemon = POKEMON.find((entry) => entry.slug === pokemon.name)
      return buildGenericPokemonModelFromLive(pokemon, mockPokemon)
    })

    return liveResults.length ? liveResults : fallback
  } catch {
    return fallback
  }
}

export async function loadAbilitiesData(): Promise<AbilitiesPageData> {
  const fallback = {
    heroTitle: 'Abilities Atlas',
    heroSubtitle: 'Powers. Traits. Battle-changing effects.',
    featuredAbilitySlug: 'blaze',
    abilities: ABILITIES,
    trending: [...trendingAbilitySlugs]
      .map((slug) => getAbilityBySlug(slug)),
  }

  if (isOfflineMode()) {
    return fallback
  }

  try {
    const liveAtlas = await loadLiveAbilityAtlas()
    const abilities = ABILITIES.map((ability) => mergeAbilityWithLive(ability, liveAtlas.get(ability.slug)))

    return {
      ...fallback,
      abilities,
      trending: [...trendingAbilitySlugs]
        .map((slug) => abilities.find((ability) => ability.slug === slug) ?? getAbilityBySlug(slug)),
    }
  } catch {
    return fallback
  }
}

export async function loadAbilityDetail(slug: string): Promise<AbilityModel> {
  const fallback = getAbilityBySlug(slug)

  if (isOfflineMode()) {
    return fallback
  }

  try {
    const liveAtlas = await loadLiveAbilityAtlas()
    return mergeAbilityWithLive(fallback, liveAtlas.get(slug))
  } catch {
    return fallback
  }
}

export async function loadPokemonDetail(slug: string): Promise<PokemonCardModel> {
  const fallback = getPokemonBySlug(slug)

  if (isOfflineMode()) {
    return fallback
  }

  try {
    const livePokemon = await loadLivePokemonDetail(slug)
    return mergePokemonWithLive(fallback, livePokemon)
  } catch {
    return fallback
  }
}

export function getPokemonBySlug(slug: string): PokemonCardModel {
  return POKEMON.find((pokemon) => pokemon.slug === slug)
    ?? livePokemonModels.get(slug)
    ?? buildPlaceholderPokemonModel(slug)
}

export function getAbilityBySlug(slug: string): AbilityModel {
  return ABILITIES.find((ability) => ability.slug === slug) ?? ABILITIES.find((ability) => ability.slug === 'blaze')!
}

export function getRelatedAbilities(ability: AbilityModel): AbilityModel[] {
  return ability.relatedAbilitySlugs.map((slug) => getAbilityBySlug(slug))
}

export function getOfflineDiscoverPokemon(search: string, type: string): PokemonCardModel[] {
  return filterOfflineDiscoverPokemon(search, type)
}
