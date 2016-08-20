let localStorage = window.localStorage

export default {
  get (key) {
    let data = localStorage.getItem(key)
    return data || null
  },

  add (key, value) {
    let self = this
    try {
      localStorage.setItem(key, value)
    } catch (e) {
      if (self._isQuotaExceeded(e)) { // 超出缓存容量
        // 不做缓存处理
        self.clear()
        return this
      }
    }
    return this
  },

  destory (key) {
    localStorage.removeItem(key)
    return this
  },

  clear () {
    localStorage.clear()
    return this
  },

  _isQuotaExceeded (err) {
    let quotaExceeded = false
    if (err) {
      if (err.code) {
        switch (err.code) {
          case 22:
            quotaExceeded = true
            break
          case 1014:
            // Firefox
            if (err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
              quotaExceeded = true
            }
            break
        }
      }

      if (err.number === -2147024882) {
        // IE 8
        quotaExceeded = true
      }
    }
    return quotaExceeded
  }
}
