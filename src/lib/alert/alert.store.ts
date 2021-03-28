import { writable } from "svelte/store"

type Alert = {
    text: string,
    type: AlertType
}

type AlertType = "default" | "success" | "error"

export const alerts = writable<Array<Alert>>([])

export const handleAlert = (alert: Alert) => {
    alerts.update(alerts => alerts.concat([alert]))
    setTimeout(() => {
        alerts.update(alerts => alerts.slice(1))
    }, 5000);
}

