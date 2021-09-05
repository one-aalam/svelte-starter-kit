import { goto } from '$app/navigation'
import { page } from '$app/stores'

function queryParamsToObject(params){
    const queryObj = {};
    for (const key of params.keys()) {
        if (params.getAll(key).length > 1) {
            queryObj[key] = params.getAll(key);
        } else {
            queryObj[key] = params.get(key);
        }
    }
    return queryObj;
}

function goByQuery(query: string) {
    const urlSearchParams = new URLSearchParams(query)
    const gotoRelativePath = `?${urlSearchParams.toString()}`
    goto(gotoRelativePath, {
        keepfocus:true,
        replaceState:true,
        noscroll:true
    })
}

export function createQueryStore(key: string) {
  var query = undefined
  return {
    subscribe: handler => {
      return page.subscribe(path =>{
        query = queryParamsToObject(path.query)
        handler(query[key])
      })
    },
    set: val => {
      query[key] = val
      goByQuery(query)
    },
    unset: () => {
        delete query[key]
        goByQuery(query)
    },
  };
}
