const searchInput = document.querySelector('.search'); // Assuming .search is the class of your input field
const dataSearch = document.querySelector('.dataSearch')
const homeSearch = document.getElementById('homeSearch')
homeSearch.onclick = async ()=>{
   
    try {
        const searchTerm = searchInput.value; // Get the value of the input field
        const result = await fetch(`/homepage-search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: searchTerm })  
        });
        const data = await result.json();
        console.log(data);
        
        // Clear previous content
        dataSearch.innerHTML = '';
        
        // Loop through the data array
        for(let i = 0; i < data.length; i++) {
            // Create a new anchor element
            const anchor = document.createElement('a');
            const brak = document.createElement('br')
            
            // Set the href attribute of the anchor element
            anchor.href = data[i]._id;
            
            // Set the text content of the anchor element
            anchor.textContent = data[i].artist_name;
            
            // Append the anchor element to the dataSearch container
            dataSearch.appendChild(anchor);
            dataSearch.appendChild(brak)
            
            // Log the artist name
            console.log(data[i].artist_name);
        }
    } catch (err) {
        console.log(err);
    }
    
}
