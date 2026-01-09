import type { GameData } from "../types";

export const demonsSoulsData: GameData = {
  game: {
    id: "demons-souls",
    slug: "demons-souls",
    name: "Demon's Souls",
    shortName: "Demon's Souls",
    releaseYear: 2020,
  },
  checklist: [
    {
      id: "des-step-1",
      order: 1,
      locationCode: "1-1",
      title: "Gates of Boletaria",
      tasks: [
        {
          id: "des-1-1-cling-ring",
          text: "Pick up the Cling Ring",
          note: "On a corpse after the first shortcut is opened at the bottom of the first tower",
        },
        {
          id: "des-1-1-jade-ornament",
          text: "Obtain the Jade Ornament",
          note: "Cut the 2 chains supporting the balcony on first tower. Used to trade later for a ring",
        },
        {
          id: "des-1-1-kill-ostrava",
          text: "Kill Ostrava for the Mausoleum Key",
          note: "You can opt to help him instead, but you will have to complete his whole quest chain without him dying in order to get the key later. You don't need his quest chain for platinum, so if you want one less thing to worry about, just kill him now",
          isMissable: true,
        },
        {
          id: "des-1-1-thief-ring",
          text: "Pick up the Thief Ring",
          note: "Right beside where you killed Ostrava",
        },
        {
          id: "des-1-1-phalanx",
          text: "Defeat Phalanx",
        },
        {
          id: "des-1-1-nexus-setup",
          text: "Warp to Nexus, talk to maiden, talk to monumental, talk to maiden to level up",
        },
        {
          id: "des-1-1-suicide-nexus",
          text: "Kill yourself in the Nexus to go to Soul form",
        },
      ],
    },
    {
      id: "des-step-2",
      order: 2,
      locationCode: "1-2",
      title: "The Lord's Path",
      tasks: [
        {
          id: "des-1-2-tower-knight",
          text: "Defeat Tower Knight without killing any archers",
          note: "This also unlocks the 'One Shall Fall' trophy",
        },
        {
          id: "des-1-2-return-suicide",
          text: "Return to Nexus, suicide",
        },
      ],
    },
    {
      id: "des-step-3",
      order: 3,
      locationCode: "2-1",
      title: "Smithing Grounds",
      tasks: [
        {
          id: "des-2-1-fat-officials",
          text: "Kill Fat Officials to start collecting the Official's gear",
          note: "Keep in your inventory",
        },
        {
          id: "des-2-1-lifts-lava",
          text: "Activate lifts, drain the lava pit",
        },
        {
          id: "des-2-1-poison-ring",
          text: "Collect Ring of Poison Resistance where lava pit was",
        },
        {
          id: "des-2-1-armor-spider",
          text: "Defeat Armor Spider",
        },
        {
          id: "des-2-1-return-no-suicide",
          text: "Return to Nexus, do NOT suicide!",
          note: "We now want to start dying in world 2 to bring it to black",
        },
      ],
    },
    {
      id: "des-step-4",
      order: 4,
      locationCode: "2-2",
      title: "The Tunnel City",
      tasks: [
        {
          id: "des-2-2-gold-coin",
          text: "Farm Gold Coin from Fat Official",
          note: "Run up tunnel, turn left, run past 3 exploding minecarts. Kill fat official. Suicide. Repeat until Gold Coin drops",
          isMissable: true,
        },
        {
          id: "des-2-2-disease-ring",
          text: "Pick up Ring of Disease Resistance",
          note: "Run up tunnel, turn right, start dropping down all the scaffolding. On a corpse. Some wikis call this Ring of Plague Resistance",
        },
        {
          id: "des-2-2-hands-of-god",
          text: "Get Hands of God fist weapons",
          note: "At very bottom of shaft, go through door, turn left",
        },
        {
          id: "des-2-2-flamelurker",
          text: "Defeat Flamelurker",
        },
        {
          id: "des-2-2-return-suicide",
          text: "Return to Nexus, level up, warp back to 2-3 and suicide in level",
        },
      ],
    },
    {
      id: "des-step-5",
      order: 5,
      locationCode: "2-3",
      title: "Underground Temple",
      tasks: [
        {
          id: "des-2-3-masters-ring",
          text: "Pickup Master's Ring",
          note: "Behind the second ballista on a corpse",
        },
        {
          id: "des-2-3-dragon-god",
          text: "Defeat Dragon God with Hands of God equipped",
          note: "Deliver the final blow with BOTH Hands of God equipped, one in each hand. You can lower his HP with your weapon of choice but deliver final blow with Hands of God. This unlocks 'Fists of Legend' trophy",
        },
        {
          id: "des-2-3-return-suicide",
          text: "Return to Nexus, level up, warp back to 2-3 and suicide in level",
        },
      ],
    },
    {
      id: "des-step-6",
      order: 6,
      locationCode: "1-3",
      title: "Inner Ward",
      tasks: [
        {
          id: "des-1-3-officials-gear",
          text: "Kill Fat Officials for Iron Ring of Keys and Official's cap",
        },
        {
          id: "des-1-3-shortcut",
          text: "Open the large gate shortcut back to Tower Knight archstone",
        },
        {
          id: "des-1-3-bloody-key",
          text: "Use Iron Ring of Keys to go to dungeon, kill Fat Official for Bloody Iron Key",
        },
        {
          id: "des-1-3-biorr",
          text: "Free Biorr of the Twin Fangs",
        },
        {
          id: "des-1-3-yuria",
          text: "Free Yuria after equipping all 4 pieces of Official's clothes",
          note: "Use Bloody Iron Key. This unlocks 'Witch in the Tower' trophy",
        },
        {
          id: "des-1-3-rings",
          text: "Pickup Ring of Magical Nature and Ring of the Accursed from Yuria's room",
        },
        {
          id: "des-1-3-penetrator",
          text: "Defeat Penetrator",
          note: "Biorr will show up to help and also unlock 'Brother-in-Arms' trophy",
        },
        {
          id: "des-1-3-firestorm",
          text: "Return to Nexus, learn Firestorm from Yuria",
          note: "This will help immensely. Suicide in World 2 somewhere",
        },
      ],
    },
    {
      id: "des-step-7",
      order: 7,
      locationCode: "3-1",
      title: "Prison of Hope",
      tasks: [
        {
          id: "des-3-1-magical-sharpness",
          text: "Pickup Ring of Magical Sharpness",
          note: "In the cell with 4 iron maiden caskets",
        },
        {
          id: "des-3-1-rolling",
          text: "Roll across the bridge to dodge volleys from large idol",
          note: "This unlocks 'Time for Rolling' trophy",
        },
        {
          id: "des-3-1-clever-rat",
          text: "Pickup Clever Rat's Ring",
          note: "On bridge after deactivating the large idol",
        },
        {
          id: "des-3-1-black-phantom",
          text: "Kill Black Phantom on stairs",
          note: "Get Black Eye Stone and Stone of Ephemeral Eyes x2",
        },
        {
          id: "des-3-1-frekes-keys",
          text: "Defeat the man on balcony (right side) before Fool's Idol fog gate",
          note: "Grab Freke's cell keys off the wall",
        },
        {
          id: "des-3-1-freke",
          text: "Free Sage Freke",
          note: "Unlocks 'A Dash of Sage' trophy",
        },
        {
          id: "des-3-1-fools-idol",
          text: "Defeat Fool's Idol, only attacking the true idol",
          note: "This unlocks 'Not Fooled' trophy as well",
        },
        {
          id: "des-3-1-soul-ray",
          text: "Return to Nexus, learn Soul Ray from Freke. Suicide in World 2",
        },
      ],
    },
    {
      id: "des-step-8",
      order: 8,
      locationCode: "3-2",
      title: "Upper Latria",
      tasks: [
        {
          id: "des-3-2-first-chain",
          text: "Make your way to top of first chain tower, kill fanatics to break chain",
        },
        {
          id: "des-3-2-yurt",
          text: "Free Yurt from cage, then kill him",
          note: "On first playthrough, you can skip interacting with Yurt entirely if you prefer",
          isMissable: true,
        },
        {
          id: "des-3-2-fragrant-ring",
          text: "Pickup Fragrant Ring in blood swamp",
          note: "Not needed if you started as Royalty",
        },
        {
          id: "des-3-2-second-chain",
          text: "Work your way to top of second tower, kill fanatics to break chain",
        },
        {
          id: "des-3-2-avarice-mask",
          text: "Pickup Ring of Avarice and Gold Mask",
          note: "At the bottom of the area where the heart was hanging",
        },
        {
          id: "des-3-2-maneaters",
          text: "Defeat Maneaters",
          note: "Firestorm can one-shot",
        },
        {
          id: "des-3-2-return-suicide",
          text: "Return to Nexus, suicide in World 2 somewhere",
        },
      ],
    },
    {
      id: "des-step-9",
      order: 9,
      locationCode: "3-3",
      title: "The Ivory Tower",
      tasks: [
        {
          id: "des-3-3-old-monk",
          text: "Defeat Old Monk",
        },
        {
          id: "des-3-3-soul-thirst",
          text: "Return to Nexus, learn Soul Thirst from Yuria",
        },
        {
          id: "des-3-3-suicide-world2",
          text: "Suicide in world 2 somewhere (should be pure black by now)",
        },
        {
          id: "des-3-3-rydell-keys",
          text: "Return to 3-2 (should now be Pure White World Tendency)",
          note: "Run back to the top of the first chain tower. You should now be able to go to very top and pick up Rydell's cell keys (Prison of Hope 2F West Key)",
        },
        {
          id: "des-3-3-rydell",
          text: "Free Lord Rydell to get Dull Rat's Ring",
        },
      ],
    },
    {
      id: "des-step-10",
      order: 10,
      locationCode: "4-1",
      title: "Island's Edge",
      tasks: [
        {
          id: "des-4-1-talisman",
          text: "Pickup Talisman of God",
          note: "From corpse before first fog gate",
        },
        {
          id: "des-4-1-regenerator",
          text: "Pickup Regenerator's Ring",
          note: "From the crystal lizard path before Adjudicator fog gate",
        },
        {
          id: "des-4-1-graverobber",
          text: "Pickup Graverobber's Ring",
          note: "From wooden platform before Adjudicator fog gate",
        },
        {
          id: "des-4-1-adjudicator",
          text: "Defeat Adjudicator without having him fall down",
          note: "Stay up top and use ranged/magic on his head. Unlocks 'One Shall Stand' trophy",
        },
        {
          id: "des-4-1-return",
          text: "Return to Nexus, Warp to 3-2, then suicide",
          note: "We want to start bringing this world to black",
        },
      ],
    },
    {
      id: "des-step-11",
      order: 11,
      locationCode: "4-2",
      title: "The Ritual Path",
      tasks: [
        {
          id: "des-4-2-bladestone",
          text: "Farm Pure Bladestone from Black Skeletons",
          note: "Repeatedly kill Black Skeletons until you get Pure Bladestone. Google farming methods",
          isMissable: true,
        },
        {
          id: "des-4-2-patches",
          text: "Kill the reaper, step on switch, talk to Patches, let him kick you into basement",
        },
        {
          id: "des-4-2-urbain",
          text: "Kill black phantom and talk to Saint Urbain",
          note: "Unlocks 'Umbasa' trophy",
        },
        {
          id: "des-4-2-gash-ring",
          text: "Walk upstairs and talk to Patches for Ring of Gash Resistance",
        },
        {
          id: "des-4-2-ronins-ring",
          text: "Pickup Ronin's Ring in the glowing pools cavern",
        },
        {
          id: "des-4-2-old-hero",
          text: "Defeat Old Hero",
          note: "Firestorm can almost one-shot",
        },
        {
          id: "des-4-2-return-suicide",
          text: "Return to Nexus, Warp to 3-2, then suicide",
        },
      ],
    },
    {
      id: "des-step-12",
      order: 12,
      locationCode: "4-3",
      title: "Altar of Storms",
      tasks: [
        {
          id: "des-4-3-storm-king",
          text: "Defeat Storm King",
        },
        {
          id: "des-4-3-return-suicide",
          text: "Return to Nexus, Warp to 3-2, then suicide",
        },
      ],
    },
    {
      id: "des-step-13",
      order: 13,
      locationCode: "3-2",
      title: "Upper Latria",
      isRevisit: true,
      tasks: [
        {
          id: "des-3-2r-pure-black",
          text: "Get world to Pure Black",
          note: "Use Stone of Ephemeral Eyes to become human and suicide. Alternate warping between 3-2 and 3-3 archstone after each death to refresh world tendency state",
        },
        {
          id: "des-3-2r-sodden-ring",
          text: "Pickup Sodden Ring",
          note: "Behind a pillar near Prisoner Horde in the depths of 3-2. Requires pure black world tendency",
        },
        {
          id: "des-3-2r-primeval-demon",
          text: "Kill the Primeval Demon down in the swamp",
          note: "Get Colorless Demon's Soul",
        },
      ],
    },
    {
      id: "des-step-14",
      order: 14,
      locationCode: "5-1",
      title: "Depraved Chasm",
      tasks: [
        {
          id: "des-5-1-magical-dullness",
          text: "Pickup Ring of Magical Dullness",
          note: "Towards the start of level, on top of shack roof",
        },
        {
          id: "des-5-1-leechmonger",
          text: "Defeat Leechmonger",
          note: "Firestorm can almost one-shot",
        },
        {
          id: "des-5-1-return-suicide",
          text: "Return to Nexus, suicide",
        },
      ],
    },
    {
      id: "des-step-15",
      order: 15,
      locationCode: "5-2",
      title: "Swamp of Sorrow",
      tasks: [
        {
          id: "des-5-2-cats-ring",
          text: "Equip Sodden Ring, find Cat's Ring in swamp",
          note: "Guarded by a black phantom",
        },
        {
          id: "des-5-2-dirty-colossus",
          text: "Defeat Dirty Colossus",
          note: "Firestorm can one-shot",
        },
        {
          id: "des-5-2-return-suicide",
          text: "Return to Nexus, suicide",
        },
      ],
    },
    {
      id: "des-step-16",
      order: 16,
      locationCode: "5-3",
      title: "Rotting Haven",
      tasks: [
        {
          id: "des-5-3-astraea",
          text: "Defeat Maiden Astraea without killing her bodyguard",
          note: "Unlocks 'May you be unharmed' trophy",
        },
        {
          id: "des-5-3-sincere-prayer",
          text: "Pickup Ring of Sincere Prayer by touching archstone after killing Astraea",
        },
        {
          id: "des-5-3-relief",
          text: "Return to Nexus, learn Relief from Yuria. Suicide",
        },
        {
          id: "des-5-3-istarelle",
          text: "Warp to 5-2, run backwards through level until finding new ladder (Pure White world only)",
          note: "Follow the path, kill enemies, find the shining spear (Istarelle). Unlocks 'One of the few' trophy",
        },
      ],
    },
    {
      id: "des-step-17",
      order: 17,
      locationCode: "4-1",
      title: "Island's Edge",
      isRevisit: true,
      tasks: [
        {
          id: "des-4-1r-satsuki",
          text: "Talk to Satsuki at the front gate (Pure white world)",
          note: "Accept quest to get the sword",
        },
        {
          id: "des-4-1r-mikoto",
          text: "Travel to dungeon where Patches kicked you, loot Mikoto sword",
        },
        {
          id: "des-4-1r-give-sword",
          text: "Return to Satsuki, give him the sword (do NOT have it equipped)",
          note: "Unlocks 'Worthy of the Sword' trophy. You can kill him after he attacks you",
        },
        {
          id: "des-4-1r-sparkly-bladestone",
          text: "Trade Pure Bladestone at Sparkly the Crow for Ring of Longevity",
        },
        {
          id: "des-4-1r-sparkly-coin",
          text: "Trade Gold Coin for Ring of Uneven Scales",
        },
        {
          id: "des-4-1r-sparkly-mask-talisman",
          text: "Trade Gold Mask for Colorless Demon's Soul",
          note: "Also trade Talisman of God for another Colorless Demon's Soul",
        },
      ],
    },
    {
      id: "des-step-18",
      order: 18,
      locationCode: "1-4",
      title: "The King's Tower",
      tasks: [
        {
          id: "des-1-4-false-king",
          text: "Kill False King",
        },
        {
          id: "des-1-4-dragon-treasures",
          text: "With Pure White world tendency, get dragon treasures from 1-1",
          note: "Head back to the area of 1-1 the dragons guarded. Pickup Ring of Flame Resistance and Ring of Great Strength. Consider returning to Nexus first to suicide to avoid invasions",
        },
        {
          id: "des-1-4-return-no-maiden",
          text: "Return to Nexus, do NOT talk to Maiden in Black yet",
        },
      ],
    },
    {
      id: "des-step-19",
      order: 19,
      locationCode: "1-2",
      title: "The Lord's Path",
      isRevisit: true,
      tasks: [
        {
          id: "des-1-2r-mausoleum",
          text: "Warp to Phalanx stone, climb back to top of first wall",
          note: "Find path to the Mausoleum on one end",
        },
        {
          id: "des-1-2r-doran",
          text: "Use Mausoleum Key, talk to Old King Doran",
          note: "Fight him until ~75% health, he will surrender",
        },
        {
          id: "des-1-2r-demonbrandt",
          text: "Pickup the Demonbrandt",
        },
        {
          id: "des-1-2r-kill-doran",
          text: "Kill Old King Doran to get Eternal Warrior's Ring",
        },
        {
          id: "des-1-2r-return-no-maiden",
          text: "Return to Nexus, do NOT talk to Maiden in Black yet",
        },
      ],
    },
    {
      id: "des-step-20",
      order: 20,
      locationCode: "NEXUS",
      title: "Nexus",
      tasks: [
        {
          id: "des-nexus-spells",
          text: "Learn all normal spells/miracles from Yuria, Freke, Urbain",
        },
        {
          id: "des-nexus-boss-spells",
          text: "Learn all boss spells/miracles from Yuria, Freke, Urbain",
        },
        {
          id: "des-nexus-jade-trade",
          text: "Trade Jade Ornament to Stockpile Thomas for Ring of Herculean Strength",
        },
        {
          id: "des-nexus-pure-black",
          text: "Get all worlds to pure black by dying as human form",
          note: "At pure black, kill the named Black Phantom NPCs (Miralda, Scirvir, Rydell, Satsuki, Selen). IMPORTANT: do NOT kill them by fall damage/poison/bleed/etc",
          isMissable: true,
        },
        {
          id: "des-nexus-pure-white-char",
          text: "Get Pure White character tendency",
          note: "To save time, you can have a friend invade you and kill them a few times",
        },
        {
          id: "des-nexus-ally-ring",
          text: "Talk to the monumental (say Yes, keep talking) for Ally's ring",
          note: "Do not talk to Maiden in Black before acquiring this ring!",
          isMissable: true,
        },
        {
          id: "des-nexus-return-form",
          text: "Use Blue Eye Stone near boss gates to help someone beat a boss",
          note: "Unlocks 'Return to Form' trophy",
        },
        {
          id: "des-nexus-unwelcome-guest",
          text: "Use Black Eye Stone to invade and kill someone",
          note: "Unlocks 'Unwelcome Guest' trophy",
        },
      ],
    },
    {
      id: "des-step-21",
      order: 21,
      locationCode: "END",
      title: "The Old One",
      tasks: [
        {
          id: "des-end-transport",
          text: "Speak to the Maiden to be transported below",
        },
        {
          id: "des-end-allant",
          text: "Kill Old King Allant and obtain Soulbrandt",
        },
        {
          id: "des-end-good-ending",
          text: "Leave and allow Maiden to lull the Old One to slumber",
          note: "This beats the game and obtains Maiden in Black's Demon's Soul",
        },
      ],
    },
    {
      id: "des-step-22",
      order: 22,
      locationCode: "NG+",
      title: "New Game Plus",
      tasks: [
        {
          id: "des-ngplus-bosses",
          text: "Beat all world bosses again. Skip everything optional",
        },
        {
          id: "des-ngplus-yurt",
          text: "Kill Yurt",
        },
        {
          id: "des-ngplus-free-npcs",
          text: "Free Freke, Urbain, and Yuria",
        },
        {
          id: "des-ngplus-blacksmith",
          text: "Go to blacksmith in 2-1, give Searing Demon's Soul",
          note: "Unlocks 'Road to Possibilities' trophy",
        },
        {
          id: "des-ngplus-northern-regalia",
          text: "Select 'upgrade' weapon with Demonbrandt and Soulbrandt on hand",
          note: "Forms the Northern Regalia. Unlocks 'Legacy of the Kings' trophy",
        },
        {
          id: "des-ngplus-backup-save",
          text: "Create a backup save",
          note: "If you're not comfortable abusing saves, you'll need a third playthrough (NG++)",
        },
        {
          id: "des-ngplus-miracles",
          text: "Learn all miracles from Urbain for Saint's Trophy. Revert to old save",
          isMissable: true,
        },
        {
          id: "des-ngplus-spells",
          text: "Learn all spells from Freke/Yuria for Sage's Trophy",
        },
        {
          id: "des-ngplus-pure-black-char",
          text: "Get pure black Character tendency by killing NPCs (4-5 kills)",
          note: "Do not kill Yuria yet. Kill Urbain and loot his Ring of Devout Prayer",
        },
        {
          id: "des-ngplus-mephistopheles",
          text: "Accept Mephistopheles quests to kill NPCs",
          note: "She appears on 2nd level of Nexus. Do her quests until she asks you to kill Yuria",
        },
        {
          id: "des-ngplus-foes-ring",
          text: "Kill Yuria, report to Mephistopheles for Foe's Ring",
          note: "Also unlocks 'King of Rings' trophy",
        },
        {
          id: "des-ngplus-bad-ending",
          text: "Descend with Maiden in Black, kill Old King Allant, then kill Maiden",
          note: "Unlocks 'Seekest soul power' trophy",
        },
        {
          id: "des-ngplus-platinum",
          text: "You should now have Slayer of Trophies platinum!",
        },
      ],
    },
  ],
  trophies: [
    // Platinum
    {
      id: "des-trophy-platinum",
      name: "Slayer of Trophies",
      description: "All Trophies Obtained",
      type: "platinum",
    },
    // Gold
    {
      id: "des-trophy-world-uniter",
      name: "World Uniter's Trophy",
      description: "Old Beast Put to Sleep & World United",
      type: "gold",
    },
    {
      id: "des-trophy-sage",
      name: "Sage's Trophy",
      description: "All Spells Learned",
      type: "gold",
    },
    {
      id: "des-trophy-saint",
      name: "Saint's Trophy",
      description: "All Miracles Learned",
      type: "gold",
    },
    {
      id: "des-trophy-rogue",
      name: "Rogue's Trophy",
      description: "All Rings Obtained",
      type: "gold",
    },
    {
      id: "des-trophy-soldier",
      name: "Soldier's Trophy",
      description: "All Valuable Weapons Obtained",
      type: "gold",
    },
    // Silver - Boss Trophies
    {
      id: "des-trophy-false-king",
      name: "False King's Trophy",
      description: "Slayer of Demon False King",
      type: "silver",
    },
    {
      id: "des-trophy-storm-king",
      name: "Storm King's Trophy",
      description: "Slayer of Demon Storm King",
      type: "silver",
    },
    {
      id: "des-trophy-old-monk",
      name: "Old Monk's Trophy",
      description: "Slayer of Demon Old Monk",
      type: "silver",
    },
    {
      id: "des-trophy-maiden-astraea",
      name: "Maiden Astraea's Trophy",
      description: "Slayer of Demon Maiden Astraea",
      type: "silver",
    },
    {
      id: "des-trophy-dragon-god",
      name: "Dragon God's Trophy",
      description: "Slayer of Demon Dragon God",
      type: "silver",
    },
    // Bronze - Boss Trophies
    {
      id: "des-trophy-old-king",
      name: "Old King's Trophy",
      description: "Conquerer of Old King Doran",
      type: "bronze",
    },
    {
      id: "des-trophy-flying-dragon",
      name: "Flying Dragon's Trophy",
      description: "Slayer of Demon Flying Dragon",
      type: "bronze",
    },
    {
      id: "des-trophy-phalanx",
      name: "Phalanx's Trophy",
      description: "Slayer of Demon Phalanx",
      type: "bronze",
    },
    {
      id: "des-trophy-tower-knight",
      name: "Tower Knight's Trophy",
      description: "Slayer of Demon Tower Knight",
      type: "bronze",
    },
    {
      id: "des-trophy-penetrator",
      name: "Penetrator's Trophy",
      description: "Slayer of Demon Penetrator",
      type: "bronze",
    },
    {
      id: "des-trophy-adjudicator",
      name: "Adjudicator's Trophy",
      description: "Slayer of Demon Adjudicator",
      type: "bronze",
    },
    {
      id: "des-trophy-old-hero",
      name: "Old Hero's Trophy",
      description: "Slayer of Demon Old Hero",
      type: "bronze",
    },
    {
      id: "des-trophy-fools-idol",
      name: "Fool's Idol's Trophy",
      description: "Slayer of Demon Fool's Idol",
      type: "bronze",
    },
    {
      id: "des-trophy-maneater",
      name: "Maneater's Trophy",
      description: "Slayer of Demon Maneater",
      type: "bronze",
    },
    {
      id: "des-trophy-leechmonger",
      name: "Leechmonger's Trophy",
      description: "Slayer of Demon Leechmonger",
      type: "bronze",
    },
    {
      id: "des-trophy-dirty-colossus",
      name: "Dirty Colossus' Trophy",
      description: "Slayer of Demon Dirty Colossus",
      type: "bronze",
    },
    {
      id: "des-trophy-armor-spider",
      name: "Armor Spider's Trophy",
      description: "Slayer of Demon Armor Spider",
      type: "bronze",
    },
    {
      id: "des-trophy-flamelurker",
      name: "Flamelurker's Trophy",
      description: "Slayer of Demon Flamelurker",
      type: "bronze",
    },
    // Bronze - Upgrade Trophies
    {
      id: "des-trophy-hardness",
      name: "Trophy of Hardness",
      description: "Obtained Best Weapon by Splinterstone",
      type: "bronze",
    },
    {
      id: "des-trophy-sharpness",
      name: "Trophy of Sharpness",
      description: "Obtained Best Weapon by Sharpstone",
      type: "bronze",
    },
    {
      id: "des-trophy-distinction",
      name: "Trophy of Distinction",
      description: "Obtained Best Weapon by Clearstone",
      type: "bronze",
    },
    {
      id: "des-trophy-master-hitter",
      name: "Master Hitter's Trophy",
      description: "Obtained Best Weapon by Greystone",
      type: "bronze",
    },
    {
      id: "des-trophy-master-slicer",
      name: "Master Slicer's Trophy",
      description: "Obtained Best Weapon by Bladestone",
      type: "bronze",
    },
    {
      id: "des-trophy-master-bowman",
      name: "Master Bowman's Trophy",
      description: "Obtained Best Bow by Spiderstone",
      type: "bronze",
    },
    {
      id: "des-trophy-poison-master",
      name: "Poison Master's Trophy",
      description: "Obtained Best Weapon by Mercurystone",
      type: "bronze",
    },
    {
      id: "des-trophy-flame-master",
      name: "Flame Master's Trophy",
      description: "Obtained Best Weapon by Dragonstone",
      type: "bronze",
    },
    {
      id: "des-trophy-blood-master",
      name: "Blood Master's Trophy",
      description: "Obtained Best Weapon by Suckerstone",
      type: "bronze",
    },
    {
      id: "des-trophy-life-master",
      name: "Life Master's Trophy",
      description: "Obtained Best Weapon by Pulpstone",
      type: "bronze",
    },
    {
      id: "des-trophy-moonlighter",
      name: "Moonlighter's Trophy",
      description: "Obtained Best Weapon by Moonlightstone",
      type: "bronze",
    },
    {
      id: "des-trophy-darkmoon-master",
      name: "Darkmoon Master's Trophy",
      description: "Obtained Best Weapon by Darkmoonstone",
      type: "bronze",
    },
    {
      id: "des-trophy-congratulant",
      name: "Congratulant's Trophy",
      description: "Obtained Best Weapon by Faintstone",
      type: "bronze",
    },
    {
      id: "des-trophy-shade-master",
      name: "Shade Master's Trophy",
      description: "Obtained Best Weapon by Cloudstone",
      type: "bronze",
    },
  ],
};
