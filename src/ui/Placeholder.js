foam.CLASS({
    package: 'styro.ui',
    name: 'Placeholder',
    extends: 'foam.u2.Element',

    css: `
        ^ {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2.4rem;
            font-family: Helvetica;
            font-weight: 600;
            color: rgba(255,255,255,0.4);
            background: repeating-linear-gradient(
                -55deg,
                #222,
                #222 10px,
                #333 10px,
                #333 20px
            );
        }
    `,

    methods: [
        function render () {
            this.addClass(this.myClass())
                .add('placeholder');
        }
    ]
});
