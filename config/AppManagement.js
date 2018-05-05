module.exports = {
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
			api: {
				addProject: {url: "/rest/api/2/project", method: "POST"},
				getProject: {url: "/rest/api/2/project", method: "GET", format: function(){}}
			}
		},
		{
			id: "redmine",
			name: "Redmine",
			logo: "https://blog.desdelinux.net/wp-content/uploads/2013/05/redmine.png",
			authentication : {
				url: "api/",
				type: "header",
				params: {	id: "token",
							name : "Token",
							description: "Token disponible a través de la cuenta de administrador"
				}
			},
			api: {
				addProject: "/redmine/projects.json",
				getProjects: {	url: "/redmine/projects.json",
								method: "GET",
								format: function(response){
									let projectsFormat = [];
									response.projects.forEach(function(project){
										projectsFormat.push({id: project.id, name: project.name})
									});
									return projectsFormat;
								}
							}
			}
		},
		{
			id: "trello",
			name: "Trello",
			logo: "https://blog.desdelinux.net/wp-content/uploads/2013/05/redmine.png",
			authentication : {
				url: "api/",
				type: "header",
				params: {
					id: "token",
					name : "Token",
					description: "Token disponible a través de la cuenta de administrador"
				}
			},
			api: {
				addProject: "/redmine/projects.json",
				getProject: "/redmine/projects.json"
			}
		}
	]
};
