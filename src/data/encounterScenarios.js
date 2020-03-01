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
                positive: 'You successfully fought him off!',
                negative: 'He beat you senseless and helped himself to your property.' 
            },
            {
                positive: 'You successfully fled from the robber!',
                negative: 'He caught you trying to escape and took what he wanted from you.'
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
    // {
    //     type: 'looting',
    //     text: 'You find an overturned caravan in a ditch beside the road. The owner appears to be dead.',
    //     result: 1
    // }
];

export default encounterScenarios;