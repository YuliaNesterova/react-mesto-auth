export const BASE_URL = 'https://auth.nomoreparties.co';

export function register (password, email) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((res) => res.json())
        // .then((response) => {
        //     try {
        //         if (response.status === 200){
        //             return response.json();
        //         }
        //     } catch(e){
        //         return (e)
        //     }
        // })
        // .then((res) => {
        //     return res;
        // })
        .catch((err) => console.log(err));
}

export function authorize (password, email) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response => response.json()))
        .then((data) => {
            if (data.token){
                localStorage.setItem('token', data.token);
                return data;
            }
        })
        .catch(err => console.log(err))
};

export function getUserData(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data)
}