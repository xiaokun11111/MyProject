import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'
import table from '@/components/TableDemo'
import test2 from '@/components/test2'
import test4 from '@/components/test4'
import editor from '@/components/editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '/test4',
      name: 'test4',
      component: test4
    },
    {
      path: '/editor',
      name: 'editor',
      component: editor
    },
    {
      path: '/table',
      name: 'table',
      component: table
    }
  ]
})
