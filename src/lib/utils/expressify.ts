import * as cookie from 'cookie'

export function expressifyReq(req) {
    return {
        ...req,
        cookies: cookie.parse(req.headers.cookie || '')
    }
}

export function expressifyResp(resp) {
    return {
        ...resp,
        getHeader: (header) => resp.headers[header.toLowerCase()],
        setHeader: (header, value) => resp.headers[header.toLowerCase()] = value,
        status: (p) => ({json: (p) => {}})
    }
}

export function deExpressifyResp(resp) {
    const {
        getHeader,
        setHeader,
        ...returnAbleResp
    } = resp
    return returnAbleResp
}
