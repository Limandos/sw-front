export async function getData(url) {
    const response = await fetch(url);
    if (response.ok) {
        const json = await response.json();
        return { ...json, succes: true }
    }
    else {
        //console.error(response.statusText)
        return { success: false, error: response.status }
    }
}