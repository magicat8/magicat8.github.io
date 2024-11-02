document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // GitHub personal access token
    const token = 'YOUR_PERSONAL_ACCESS_TOKEN';

    // Repository details
    const owner = 'your-username';
    const repo = 'your-repository';
    const filePath = 'path/to/your/file.txt';

    // Fetch the current content of the file
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    }).then(response => response.json())
    .then(data => {
        const sha = data.sha;
        const newFileContent = document.getElementById('fileContent').value;
        const encodedContent = btoa(newFileContent);

        // Create a new branch
        const newBranchName = 'edit-branch';
        fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                ref: `refs/heads/${newBranchName}`,
                sha: sha
            })
        }).then(() => {
            // Commit the edited file to the new branch
            fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    message: 'Edit file content',
                    content: encodedContent,
                    branch: newBranchName,
                    sha: sha
                })
            }).then(() => {
                // Create a pull request
                fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify({
                        title: 'Edit file content',
                        head: newBranchName,
                        base: 'main'
                    })
                }).then(() => {
                    console.log('Pull request created successfully!');
                }).catch(error => {
                    console.error('Error creating pull request:', error);
                });
            }).catch(error => {
                console.error('Error committing file:', error);
            });
        }).catch(error => {
            console.error('Error creating branch:', error);
        });
    }).catch(error => {
        console.error('Error fetching file:', error);
    });
});
