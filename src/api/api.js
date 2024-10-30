export const login = async (username, password) => {
    try {
        const res = await fetch("http://localhost:8086/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ username, password })
        })
        if(!res.ok){
            throw new Error("faild");
            
        }
        const data = await res.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", data.username)
        return data
    }
    catch (e) {
        return e.message
    }
}
export const logout = async () => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
        const data = await res.json()
        if (data.success) {
            sessionStorage.removeItem("token")
        }
    }
    catch (e) {
        return e.message
    }
}
export const getProfile = async () => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
        const data = await res.json()
        return data
    }
    catch (e) {
        return e.message
    }
}
export const updateProfile = async (username, nickname) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: JSON.stringify({ username, nickname })
        })
        const data = await res.json()
        return data
    }
    catch (e) {
        return e.message
    }
}
export const getField = async (difficulty) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/fields", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
        const data = await res.json()
        return data
    }
    catch (e) {
        return e.message
    }
}
export const getResults = async () => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/results", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
        const data = await res.json()
        return data
    }
    catch (e) {
        return e.message
    }
}
export const postResult = async (block_moves, time) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
            body: JSON.stringify({ block_moves, time })
        })
        const data = await res.json()
        return data
    }
    catch (e) {
        return e.message
    }
}
