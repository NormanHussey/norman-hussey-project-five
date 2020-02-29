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
    // {
    //     type: 'looting',
    //     text: 'You find an overturned caravan in a ditch beside the road. The owner appears to be dead.',
    //     result: 1
    // }
];

export default encounterScenarios;