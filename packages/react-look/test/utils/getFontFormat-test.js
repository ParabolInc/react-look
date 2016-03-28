import getFontFormat from '../../modules/utils/getFontFormat'

describe('Evaluating the font format', () => {

  it('should return correct formats', () => {
    expect(getFontFormat('foo.ttf')).to.eql('truetype')
    expect(getFontFormat('foo.woff')).to.eql('woff')
    expect(getFontFormat('foo.eof')).to.eql('eof')
    expect(getFontFormat('foo.svg')).to.eql('svg')
    expect(getFontFormat('foo.svg#2345')).to.eql('svg')
  })

  it('should return undefined if wrong source paths are passed', () => {
    expect(getFontFormat('foo.tttf')).to.eql(undefined)
  })
})
