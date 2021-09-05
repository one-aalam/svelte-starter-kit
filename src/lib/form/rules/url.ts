
const IS_URL_REGEX = /(https?|ftp|git|svn):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
export function isUrl () {
    return function url(value) {
      return IS_URL_REGEX.test(value) || { url: true }
    }
}
