import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Redstone from '@/components/Redstone'

import Dashboard from '@/components/dashboard/Dashboard'
import Dashboardsystems from '@/components/dashboard/Dashboard.systems'

import Diagnosisinfo from '@/components/diagnosis/Diagnosis.info'
import Diagnosispc from '@/components/diagnosis/Diagnosis.pc'
import Diagnosisanalysis from '@/components/diagnosis/Diagnosis.analysis'

import Searchfile from '@/components/search/Search.file'
import Searchprocess from '@/components/search/Search.process'
import Searchnetwork from '@/components/search/Search.network'
import Searchanalysis from '@/components/search/Search.analysis'

import Securitymedia from '@/components/security/Security.media'
import Securityaccount from '@/components/security/Security.account'
import Securitywirelesslan from '@/components/security/Security.wirelesslan.vue'

import Propertysw from '@/components/property/Property.sw'
import Propertyhw from '@/components/property/Property.hw'
import Propertysensor from '@/components/property/Property.sensor'

import Systemadmin from '@/components/system/System.admin'
import Systemsensor from '@/components/system/System.sensor'
import Systemenviroment from '@/components/system/System.enviroment'
import Systemlog from '@/components/system/System.log'
import Systemresponse from '@/components/system/System.response'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Redstone',
      component: Redstone,
      children: [
        {
          path: '/',
          redirect: 'Dashboard'
        },
        {
          path: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'Dashboard-systems',
          component: Dashboardsystems
        },
        {
          path: 'Diagnosis-info',
          component: Diagnosisinfo
        },
        {
          path: 'Diagnosis-pc',
          component: Diagnosispc
        },
        {
          path: 'Diagnosis-analysis',
          component: Diagnosisanalysis
        },
        {
          path: 'Search-analysis',
          component: Searchanalysis
        },
        {
          path: 'Search-file',
          component: Searchfile
        },
        {
          path: 'Search-process',
          component: Searchprocess,
          props: true
        },
        {
          path: 'Search-network',
          component: Searchnetwork
        },

        {
          path: 'Security-media',
          component: Securitymedia
        },
        {
          path: 'Security-account',
          component: Securityaccount
        },
        {
          path: 'Security-wirelesslan',
          component: Securitywirelesslan
        },
        {
          path: 'Property-sw',
          component: Propertysw
        },
        {
          path: 'Property-hw',
          component: Propertyhw
        },
        {
          path: 'Property-sensor',
          component: Propertysensor
        },
        {
          path: 'System-admin',
          component: Systemadmin
        },
        {
          path: 'System-sensor',
          component: Systemsensor
        },
        {
          path: 'System-enviroment',
          component: Systemenviroment
        },
        {
          path: 'System-log',
          component: Systemlog
        },
        {
          path: 'System-response',
          component: Systemresponse
        }
      ]
    }
  ]
});

