type KeyType = string
type ValueType = string

const sessionCache = {
  set(key: KeyType, value: ValueType) {
    if (!sessionStorage) {
      return
    }
    if (key != null && value != null) {
      sessionStorage.setItem(key, value)
    }
  },
  get(key: KeyType) {
    if (!sessionStorage) {
      return null
    }
    if (key == null) {
      return null
    }
    return sessionStorage.getItem(key)
  },
  setJSON(key: KeyType, jsonValue: object) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue))
    }
  },
  getJSON(key: KeyType) {
    const value = this.get(key)
    if (value != null) {
      return JSON.parse(value)
    }
  },
  remove(key: KeyType) {
    sessionStorage.removeItem(key)
  },
}
const localCache = {
  set(key: KeyType, value: ValueType) {
    if (!localStorage) {
      return
    }
    if (key != null && value != null) {
      localStorage.setItem(key, value)
    }
  },
  get(key: KeyType) {
    if (!localStorage) {
      return null
    }
    if (key == null) {
      return null
    }
    return localStorage.getItem(key)
  },
  setJSON(key: KeyType, jsonValue: object) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue))
    }
  },
  getJSON(key: KeyType) {
    const value = this.get(key)
    if (value != null) {
      return JSON.parse(value)
    }
  },
  remove(key: KeyType) {
    localStorage.removeItem(key)
  },
}

export default {
  /**
   * 会话级缓存
   */
  session: sessionCache,
  /**
   * 本地缓存
   */
  local: localCache,
}
