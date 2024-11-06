export const login = async (username, password) => {
    try {
        const res = await fetch("http://localhost:8086/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}
export const logout = async () => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "authorization": `bearer ${token}`
            },
        })
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}
export const getProfile = async () => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/profile", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "authorization": `bearer ${token}`
            },
        })
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}
export const updateProfile = async (username, nickname) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/profile", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "authorization": `bearer ${token}`
            },
            body: JSON.stringify({ username, nickname })
        })
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}
export const getField = async () => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/fields", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "authorization": `bearer ${token}`
            },
        })
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}
export const getResults = async () => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/results", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "authorization": `bearer ${token}`
            },
        })
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}
export const postResult = async (block_moves, time) => {
    try {
        const token = sessionStorage.getItem("token")
        const res = await fetch("http://localhost:8086/api/results", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "authorization": `bearer ${token}`
            },
            body: JSON.stringify({block_moves, time})
        })
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}