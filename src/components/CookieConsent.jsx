import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

function updateGAConsent(granted) {
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  })
}

export default function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      onConsent() {
        updateGAConsent(CookieConsent.acceptedCategory('analytics'))
      },
      onChange() {
        updateGAConsent(CookieConsent.acceptedCategory('analytics'))
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {},
      },

      language: {
        default: 'fi',
        translations: {
          fi: {
            consentModal: {
              title: 'Käytämme evästeitä',
              description:
                'Käytämme analytiikkaevästeitä ymmärtääksemme, miten sivustoa käytetään. Voit hyväksyä kaikki evästeet tai valita vain välttämättömät.',
              acceptAllBtn: 'Hyväksy kaikki',
              acceptNecessaryBtn: 'Vain välttämättömät',
              showPreferencesBtn: 'Muokkaa asetuksia',
            },
            preferencesModal: {
              title: 'Evästeasetukset',
              acceptAllBtn: 'Hyväksy kaikki',
              acceptNecessaryBtn: 'Vain välttämättömät',
              savePreferencesBtn: 'Tallenna asetukset',
              closeIconLabel: 'Sulje',
              sections: [
                {
                  title: 'Välttämättömät evästeet',
                  description:
                    'Nämä evästeet ovat välttämättömiä sivuston toiminnalle eikä niitä voi poistaa käytöstä.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Analytiikkaevästeet',
                  description:
                    'Google Analytics -evästeet auttavat meitä ymmärtämään, miten kävijät käyttävät sivustoa. Kaikki tiedot kerätään nimettömästi.',
                  linkedCategory: 'analytics',
                },
              ],
            },
          },
        },
      },
    })
  }, [])

  return null
}
