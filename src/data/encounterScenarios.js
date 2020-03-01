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
    }


];

export default encounterScenarios;