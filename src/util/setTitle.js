import router from '../router'
import content from './seoContent'
const head = document.getElementsByTagName('head')
const meta1 = document.createElement('meta')
const meta2 = document.createElement('meta')

meta1.name = 'keywords'
meta2.name = 'description'
function getContent(key) {
  document.title = content[key].title
  meta1.content = content[key].keyWords
  meta2.content = content[key].description
  head[0].appendChild(meta1)
  head[0].appendChild(meta2)
  console.log(head)
}

router.beforeEach((to, from, next) => {
  if (to.meta.setSeo) {
    getContent(to.meta.seoKey)
  }
  next()
})
