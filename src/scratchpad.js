foam.CLASS({
    package: 'styro.ui',
    name: 'TestEl',
    extends: 'foam.u2.Element',

    imports: [
        'consumeWindow'
    ],

    methods: [
        function render () {
            this
                .start('button')
                    .add('click me')
                    .on('click', () => {
                        this.consumeWindow(styro.ui.Window.create({
                            view: 'foam.u2.view.ValueView',
                            data: 'hello there'
                        }))
                    })
                .end()
        }
    ]
});
