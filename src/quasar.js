import Vue from 'vue'

import './styles/quasar.scss'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import { Quasar, QStepper, QStep, QStepperNavigation, Notify, LoadingBar, Loading, QSpinnerTail, Dialog } from 'quasar'

const spinner = typeof QSpinnerTail !== 'undefined'
    ? QSpinnerTail
    : Quasar.components.QSpinnerTail

Vue.use(Quasar, {
    config: {
        loadingBar: {
            color: 'primary',
            size: '5px',
            position: 'top'
        },
        loading: {
            spinner,
            spinnerColor: 'secondary',
            spinnerSize: 100,
            backgroundColor: 'grey-8',
        }
    },
    components: { QStepper, QStep, QStepperNavigation, LoadingBar, Loading, },
    directives: {
        /* not needed if importStrategy is not 'manual' */
    },
    plugins: {
        Notify,
        Loading,
        LoadingBar,
        Dialog
    },
    iconSet: iconSet
});
