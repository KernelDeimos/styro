foam.POM({
    name: 'com-ericdube-command',
    version: 1,
    files: [
        'Command',
        'ToTerminalE'
    ].map(name => ({ name, flags: 'js' }))
});
