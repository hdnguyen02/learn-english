export const baseUrl = "http://localhost:8080"
export const authSignInUrl = "/api/v1/auth/sign-in"
export const authSignUpUrl = "/api/v1/auth/sign-up"
export const authSignOutUrl = "/api/v1/auth/sign-out"
export const userInfoUrl = "/api/v1/users"
export const version = "/api/v1"


export async function fetchData(subUrl, method, body) {
    const url =  `${baseUrl + version}${subUrl}`
    const accessToken = localStorage.getItem('accessToken') 
    if (!accessToken) throw new Error("Access token is missing")

    const options = { 
        method: method, 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }, 
    }
    if (body) options.body = JSON.stringify(body)
    try { 
        const responseAPI = await fetch(url, options)
        const response = await responseAPI.json()  
        if (!responseAPI.ok) {
            const error = { code: responseAPI.status, message: response.message || 'An error occurred' };
            throw error;
        }
        return {
            data: response.data, 
            message: response.message
        }
    }
    catch(error) {
        throw error
    }    
}

export function convertValueFromSelect(str) { 
    if (str === 'null') return null
    if (str == 'true') return true
    if (str === 'false') return false
    else return +str // chuyển về số.
}


export function handleError(code) { 
    switch (code) {
        case 400:
            console.error('Bad Request: Yêu cầu không hợp lệ!')
            break;
        case 401:
            console.error('Unauthorized: Người dùng chưa đăng nhập!')
            
            break;
        case 403:
            console.error('Forbidden: Người dùng không có quyền truy cập!')
            break;
        case 404:
            console.error('Not Found: Không tìm thấy tài nguyên!')
            break;
        default:
            console.error('Lỗi khác:', error)
            break;
    }
}