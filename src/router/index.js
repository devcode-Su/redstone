import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Redstone from '@/components/Redstone'
import ExplanationInfo from '@/components/popup/Explanation.info'
import ExplanationRule from '@/components/popup/Explanation.rule'

import Dashboard from '@/components/dashboard/Dashboard'
import Dashboardsystems from '@/components/dashboard/Dashboard.systems'

import Diagnosisinfo from '@/components/diagnosis/Diagnosis.info'
import Diagnosispc from '@/components/diagnosis/Diagnosis.pc'

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
import Propertydetail from '@/components/property/Property.detail'
import Systemsensorlog from '@/components/system/System.sensor.log'
import Systemsadminlog from '@/components/system/System.admin.log'

import Setupadmin from '@/components/setup/Setup.admin'
import Setupsensor from '@/components/setup/Setup.sensor'
import Setupenviroment from '@/components/setup/Setup.enviroment'

import TestComponent from '@/components/test/Test.component'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: "/Explanation-Info",
      name: "ExplanationInfo",
      component: ExplanationInfo
    },
    {
      path : "/Explanation-Rule",
      name : "ExplanationRuleId",
      component : ExplanationRule
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
          path: 'Security-wireless-lan',
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
          path: 'Property-detail',
          component: Propertydetail
        },
        {
          path: 'System-sensor-log',
          component: Systemsensorlog
        },
        {
          path: 'System-admin-log',
          component: Systemsadminlog
        },
        {
          path: 'Setup-admin',
          component: Setupadmin
        },
        {
          path: 'Setup-sensor',
          component: Setupsensor
        },
        {
          path: 'Setup-enviroment',
          component: Setupenviroment
        },
        {
          path : "Redstone-test",
          component : TestComponent
        }
      ]
    }
  ]
});

