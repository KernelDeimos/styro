foam.CLASS({
    package: 'com.ericdube.wm',
    name: 'TWMView',
    extends: 'foam.u2.View',

    exports: [
        'createContainerElement',
        'createWindowElement'
    ],

    css: `
        BODY {
            margin: 0;
            padding: 0;
        }

        ^ {
            background-color: #333;
            display: flex;
            width: 100vw;
            height: 100vh;
            justify-contents: stretch;
            align-items: stretch;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
        }
        ^header {
            flex-basis: 20pt;
            display: flex;
            padding: 0 10pt;
            line-height: 24pt;
            background-color: #000;
            color: #DDD;
        }
        ^modeIndicator {
            padding: 0 5pt;
            margin-left: 5pt;
            text-align: center;
        }
        ^modeIndicator > span {
            font-family: monospace;
            font-size: 9pt;
        }
        ^windowmgr {
            flex-grow: 1;
            display: flex;
            gap: 10pt;
            padding: 10pt;
            min-height: 0;
        }
        ^container {
            flex-grow: 1;
            display: flex;
            gap: 10pt;
            min-width: 0;
            min-height: 0;
        }
        ^container.ready {
            padding: 2pt;
            border: 1px solid #7DD;
        }
        ^container.active {
            outline: 2px solid #7DD;
        }
        ^window {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            border-radius: 4pt;
            border: 2px solid #555;
            background-color: rgba(0,0,0,0.5);
            color: #EEE;
            overflow: hidden;
        }
        ^window .window-contents {
            overflow-y: auto;
            min-height: 0;
            flex-grow: 1;
        }
        ^window.selected {
            border-color: #777;
        }
        ^window.active {
            border-color: #ffdb58;
        }
        ^window-navbar {
            height: 20pt;
            display: flex;
            background-color: #7f6400;
        }
        ^window-navbar-title {
            line-height: 20pt;
            padding: 0 5pt
        }
        ^sticky-window-icon {
            line-height: 20pt;
            padding-left: 5pt;
        }
    `,

    requires: [
        'com.ericdube.wm.WindowButton'
    ],

    properties: [
        {
            class: 'FObjectProperty',
            of: 'com.ericdube.wm.TWMModel',
            name: 'data'
        }
    ],

    methods: [
        function render () {
            const self = this;
            
            this
                .addClass(this.myClass())
                .add(this.slot(function (data$rootContainer) {
                    if ( ! data$rootContainer ) return this.E();
                    return this.E()
                        .addClass(this.myClass('windowmgr'))
                        .add(data$rootContainer.createElement({}))
                        ;
                }));
        },
        function createContainerElement () {
            return this.E().addClass(this.myClass('container'))
        },
        function createWindowElement({ win }) {
            return this.E()
                .addClass(this.myClass('window'))
                .on('click', () => {
                    // this.focusWindow(win);
                })
                .start()
                    .addClass(this.myClass('window-navbar'))
                    .start(this.WindowButton, { label: 'X' })
                        .show(win.closable$)
                        .on('click', evt => {
                            // this.removeWindow(win);
                            evt.stopPropagation();
                        })
                    .end()
                    .start()
                        .show(win.closable$.map(v => ! v))
                        .addClass(this.myClass('sticky-window-icon'))
                        .add('⚬')
                    .end()
                    .start()
                        .addClass(this.myClass('window-navbar-title'))
                        .add(win.title)
                    .end()
                .end()
                ;
        },
    ]
});
