export function setCookie(name, value, days = 7) {
	const expires = new Date(Date.now() + days * 864e5).toUTCString(); 
	document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/`;
}


export function getCookie(name) {
	const cookies = document.cookie.split("; ");
	for (let i = 0; i < cookies.length; i++) {
		const [cookieName, cookieValue] = cookies[i].split("=");
		if (cookieName === name) {
			try {
				return decodeURIComponent(cookieValue);
			} catch (e) {
				return null;
			}
		}
	}
	return null;
}


export function removeCookie(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
