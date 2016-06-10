import $ from 'cheerio'
import MetaTagsParser from './parsers/metatag-parser'
import MicroRdfaParser from './parsers/micro-rdfa-parser'
import JsonldParser from './parsers/jsonld-parser'

const WAEParserObject = () => {
  return {
    find () {

    }
  }
}

const WAEObject = {
  parseMicrodata () {
    return Object.assign(WAEParserObject(), MicroRdfaParser(this.$html, 'micro'))
  },
  parseRdfa () {
    return Object.assign(WAEParserObject(), MicroRdfaParser(this.$html, 'rdfa'))
  },
  parseJsonld () {
    return Object.assign(WAEParserObject(), JsonldParser(this.$html))
  },
  parseMetaTags () {
    return Object.assign(WAEParserObject(), MetaTagsParser(this.$html))
  },
  parse () {
    return {
      meta: this.parseMetaTags().data(),
      micro: this.parseMicrodata().data(),
      rdfa: this.parseRdfa().data(),
      jsonld: this.parseJsonld().data()
    }
  }
}

export default {
  init (html) {
    const $html = $.load(html, { xmlMode: true })
    return Object.assign({}, WAEObject, {
      $html
    })
  }
}
