export const timeAgoFormatting = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const intervals: { label: string; seconds: number }[] = [
        { label: 'año', seconds: 365 * 24 * 60 * 60 }, // 365 dias / 24 horas / 60 minutos / 60 segundos
        { label: 'mes', seconds: 30 * 24 * 60 * 60 },
        { label: 'día', seconds: 24 * 60 * 60 },
        { label: 'hora', seconds: 60 * 60 },
        { label: 'minuto', seconds: 60 },
        { label: 'segundo', seconds: 1 },
    ]

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds)
        if (count >= 1) {
            return `hace ${count} ${interval.label}${count > 1 ? 's' : ''}`
        }
    }

    return 'justo ahora'
}
