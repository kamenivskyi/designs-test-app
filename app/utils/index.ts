export const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp(
        '^https?:\\/\\/' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // or IP
        '(\\:\\d+)?' + // port
        '(\\/[-a-z\\d%_.~+]*)*' + // route
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
        'i'
    )
    return pattern.test(url)
}
