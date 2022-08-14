foam.CLASS({
    package: 'styro.ui',
    name: 'WindowConsumer',

    imports: [
        'consumeWindow? as parentConsumeWindow'
    ],

    exports: [
        'consumeWindow'
    ],

    properties: [
        {
            class: 'StringArray',
            name: 'receives'
        }
    ],

    methods: [
        function consumeWindow(window, predicate) {
            const e = foam.mlang.Expressions.create();
            if ( ! predicate ) {
                predicate = e.CONTAINS(styro.ui.WindowConsumer.RECEIVES, "default");
            }
            return this.consumeWindow_(window, predicate);
        },
        function comsumeWindow_(window, predicate) {
            throw new Error('WindowConsumer did not implement consumeWindow_');
        }
    ]
});
