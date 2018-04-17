

apps: [
    {
        id: "jira",
        name: "Jira Atlassian",
        logo: "https://www.redmineup.com/cms/assets/thumbnail/33796/600/jira_logo.png",
        authentication : {
            url: "api/",
			method: "POST",
            type: "body",
            params: [
                {id: "email", name : "Correo electrónico", description: "Email del usuario con permisos de administrador"},
                {id: "password", name: "Contraseña", description: "Contraseña del usuario con permisos de administrador"}
            ]
        },
        api: [
            addProject: {url: "/rest/api/2/project", method: "POST"},
            getProject: {url: "/rest/api/2/project", method: "GET"}
        ]
    },
    {
        id: "redmine",
        name: "Redmine",
        logo: "https://blog.desdelinux.net/wp-content/uploads/2013/05/redmine.png",
        authentication : {
            url: "api/",
            type: "header"
            params: [
                {id: "token", name : "Token", description: "Token disponible a través de la cuenta de administrador"}
            ]
        },
        api: [
            addProject: "/redmine/projects.json",
            getProject: "/redmine/projects.json"
        ]
    }
]
