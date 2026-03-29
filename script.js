const languageSelect= document.getElementById("language");
const resultBox= document.getElementById("result");

languageSelect.addEventListener("change", function()
    {
        const selectedLanguage= languageSelect.value;

        if(selectedLanguage === " ") {
            resultBox.textContent= "Please select a programming language.";
            return;
        }
        fetchRandomRepo(selectedLanguage);
    }
);

function fetchRandomRepo(language) {
    resultBox.innerHTML= ` <p>🔄 Loading repository...</p>`;

    const url= `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;

    fetch(url)
        .then(response=> response.json())
        .then(data=> {

            console.log(data);
            const repos= data.items;
             
            const randomIndex = Math.floor(Math.random() * repos.length);

            const repo = repos[randomIndex];

            resultBox.innerHTML= `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || "No description available."}</p>
            <p>⭐ Stars: ${repo.stargazers_count}</p>
            <p>🍴 Forks: ${repo.forks_count}</p>
            <p>🐞 Open Issues: ${repo.open_issues_count}</p>
            <button id="refreshBtn">Refresh</button>
            `; 

              document.getElementById("refreshBtn").addEventListener("click", function(){
            fetchRandomRepo(language);
        });

        })

        .catch(error => {
            resultBox.innerHTML = `<p style="color: red;">⚠ Failed to load repositories.</p>
                <button id="retryBtn">Try Again</button>
            `;

            document.getElementById("retryBtn").addEventListener("click", function() {
                fetchRandomRepo(language)
            });
            console.log(error);
        });
        
      
}