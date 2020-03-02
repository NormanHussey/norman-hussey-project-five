const encounterScenarios = [
    {
        type: 'robbery',
        text: 'You are stopped by an armed highwayman demanding either money or wares.',
        options: [
            'Give him money',
            'Give him wares',
            'Try to Fight',
            'Try to flee'
        ],
        outcomes: [
            "He takes your money and rides away.",
            'He chooses some of your wares and leaves you be.',
            {
                positive: 'You successfully fight him off!',
                negative: 'He beats you senseless and helps himself to your property.' 
            },
            {
                positive: 'You successfully flee from the robber!',
                negative: 'He catches you trying to escape and takes what he wants from you.'
            }
        ]
    },
    {
        type: 'looting',
        text: 'You find an overturned caravan in a ditch beside the road. The owner appears to be dead.',
        options: [
            'Loot the caravan',
            'Loot the owner',
            'Try to help the owner',
            'Just keep riding'
        ],
        outcomes: [
            {
                positive: 'You scrounge around inside the caravan and find some items!',
                negative: 'The caravan is empty.' 
            },
            {
                positive: 'You dig through his pockets and find some money!',
                negative: 'His pockets are empty. It seems another person of low moral fibre beat you to it.'
            },
            {
                positive: "He regains consciousness! He wasn't dead after all and is now very grateful! He gives you a big reward!",
                negative: "He opens his eyes and swiftly brings a knife to your throat! You fell for his trap so he robs you."
            },
            'You continue on your way.'
        ]
    },
    {
        type: 'saviour',
        text: 'You see a young family being robbed in the forest beside the road.',
        options: [
            'Pay off the robber',
            'Fight off the robber',
            'Help the robber',
            'Mind your own business'
        ],
        outcomes: [
            {
                positive: 'The robber is spooked by your arrival and rides away empty-handed. The family offers you a reward.',
                negative: 'The robber helps himself to your property and rides away satisfied.'
            },
            {
                positive: 'You successfully fight him off! The family greatly rewards your gallantry.',
                negative: 'He beats you to an inch of your life but the family is able to escape so he robs you instead.'
            },
            {
                positive: 'He is grateful for your assistance and splits the haul with you.',
                negative: 'He accepts your help but turns on your afterwards.'
            },
            "You ride away swiftly to the sound of sobbing children echoing through the trees."
        ]
    },
    {
        type: 'robbery',
        text: 'You are ambushed by a gang of rugged thieves.',
        options: [
            'Give them money',
            'Give them wares',
            'Try to Fight',
            'Try to flee'
        ],
        outcomes: [
            "They take your money and ride away.",
            'They help themselves to your inventory and ride off.',
            {
                positive: 'You successfully fight them off!',
                negative: 'They beat you to pulp and plunder your caravan.' 
            },
            {
                positive: 'You successfully flee from the gang!',
                negative: "They seize you immediately and rummage through your caravan."
            }
        ]
    },
    {
        type: 'looting',
        text: 'You ride by an old abandoned farm.',
        options: [
            'Search the barn',
            'Search the farmhouse',
            'Announce yourself then approach',
            'Ignore it and keep going'
        ],
        outcomes: [
            {
                positive: 'You dig through a pile of hay and find some stashed goods!',
                negative: 'You rummage around but find only hay and manure.' 
            },
            {
                positive: 'You find an old wooden chest under a bed. There is money inside!',
                negative: 'You search every nook and cranny of the house but find nothing of value. Perhaps another scoundrel got here first.'
            },
            {
                positive: "An old man cries out from the barn. He is pinned under a wagon wheel. You rescue him and he rewards you greatly!",
                negative: "A band of thieves come running out of the house. It seems this was their hideout. They relieve you of your property."
            },
            'You keep moving without looking back.'
        ]
    },
    {
        type: 'saviour',
        text: 'A destitute old woman is sitting sorrowfully at the side of the road.',
        options: [
            'Offer her some money',
            'Offer her a ride to the next village',
            'Rob her',
            'Ride away'
        ],
        outcomes: [
            {
                positive: 'She thanks you for your kindness but refuses your money. All she wants is company. You have a lovely chat and she hands you some items before you leave.',
                negative: 'She takes your money but not your pity and turns her back to you without a word of thanks.'
            },
            {
                positive: 'She is overjoyed and gladly joins you in the caravan. When you reach the next village, she pays you handsomely for the trip.',
                negative: 'She accepts the lift but when you reach the village, she pulls a knife on you and helps herself to your purse.'
            },
            {
                positive: "You fleece her for everything she's got and leave her crying at the side of the road.",
                negative: "Just as you begin digging through her pockets, her huge and imposing son comes out of the bushes after relieving himself. He makes you pay for your fiendish ways."
            },
            "You continue riding by, refusing to make eye contact, as she stares up at you in despair."
        ]
    }


];

export default encounterScenarios;