foam.POM({
    name: 'untitled',
    version: 1,
    projects: [
        { name: 'node_modules/foam3/src/pom' },
        // { name: 'node_modules/foam3/src/foam/nanos/pom' },
        // { name: 'node_modules/foam3/src/foam/support/pom' },
        { name: 'src/pom' }
    ],
    foobar: {
        build: {
            objectDir: 'build'
        },
        target: {
            runDir: 'runtime',
            runtime: 'runtime'
        },
        protected: ['node_modeules', 'src'],
        runtime: 'runtime'
    }
});
