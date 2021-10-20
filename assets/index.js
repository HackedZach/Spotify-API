const fetchSongs = async () => {
    const search = document.getElementById('song_name').value
    const result = await fetch('/song', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({search}),
    }).then((res) => res.json())

    return result
}

document.getElementById('btn_submit').addEventListener('click', async (event) => {
    event.preventDefault()
    console.log(await fetchSongs())
})
