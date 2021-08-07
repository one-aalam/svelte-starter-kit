import { writable } from "svelte/store"
import type { Alert } from './alert.type'
import { ALERT_FADE_IN } from './alert.config'

export const alerts = writable<Array<Alert>>([])

export const handleAlert = (alert: Alert): void => {
    alerts.update(alerts => alerts.concat([alert]))
    setTimeout(() => {
        alerts.update(alerts => alerts.slice(1))
    }, ALERT_FADE_IN );
}
