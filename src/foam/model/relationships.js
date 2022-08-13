foam.RELATIONSHIP({
    sourceModel: 'styro.model.SourceFile',
    targetModel: 'styro.model.Definition',
    cardinality: '1:*',
    forwardName: 'definitions',
    inverseName: 'sourceFile'
})
