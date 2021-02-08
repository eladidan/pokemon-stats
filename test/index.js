 describe('stub tests', () => {
    fancy
    .stub(os, 'platform', () => 'foobar')
    .it('sets os', () => {
      expect(os.platform()).to.equal('foobar')
    })
  
    fancy
    .stub(os, 'platform', sinon.stub().returns('foobar'))
    .it('uses sinon', () => {
      expect(os.platform()).to.equal('foobar')
      expect(os.platform.called).to.equal(true)
    })
  })