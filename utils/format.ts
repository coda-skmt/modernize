import dayjs from 'dayjs'

export const datetime = (time: Date) => dayjs(time).format('YYYY-MM-DD HH:MM:ss')

export const ymd = (time: Date) => dayjs(time).format('YYYY-MM-DD')

export const md = (time: Date) => dayjs(time).format('MM-DD')

export const _md = (time: Date) => dayjs(time).format('MM/DD')

export const rmb = (value: number) => {
    const formatter = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    })

    return formatter.format(value / 100)
}
