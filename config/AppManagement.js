module.exports = {
	apps: [
		{
			id: "redmine",
			name: "Redmine",
			logo: "https://blog.desdelinux.net/wp-content/uploads/2013/05/redmine.png",
			authentication : {
				headerKey: "X-Redmine-API-Key",
				params: [	{
								id: "token",
								name : "Token",
								description: "Token disponible a través de la cuenta de administrador"
							}
				]
			},
			api: {
				addProject: {
								url: "/redmine/projects.json",
								method: "POST",
								formatRequest: function(name, key, description){
									let projectFormat = {
										"project": {
											"name": name,
											"identifier": key,
											"description": description,
											"homepage": "",
											"status": 1,
											"is_public": true
										}
									};
									return projectFormat;
								},
								formatResponse: function(projectRedmine){
									let projectFormat = {
										"id": projectRedmine.id,
										"name": projectRedmine.name,
										"key": projectRedmine.identifier,
										"description": projectRedmine.description
									};
									return projectFormat;
								}
				},
				getProjects:{
								url: "/redmine/projects.json",
								method: "GET",
								format: function(response){
									let projectsFormat = [];
									response.projects.forEach(function(project){
										projectsFormat.push({id: project.id, name: project.name})
									});
									return projectsFormat;
								}
				},
				getIssues:{
								url: "/redmine/issues.json?project_id=",
								method: "GET",
								format: function(issuesRedmine){
									let issuesFormat = [];
									issuesRedmine.issues.forEach(function(issue){
										issuesFormat.push({	id: issue.id,
															title: issue.subject,
															description: issue.description
														});
									});
									return issuesFormat;
								}
				},
				createIssue:{
								url: "/redmine/issues.json",
								method: "POST",
								format: function(issue, projectId){
									let issueFormat = {
										"issue": {
											project_id: projectId,
											subject: issue.title,
											description: issue.description,
											priority_id: 4
										}
									};
									return issueFormat;
								}
				}
			}
		}
	]
};


/*


{
			id: "jira",
			name: "Jira Atlassian",
			logo: "https://www.redmineup.com/cms/assets/thumbnail/33796/600/jira_logo.png",
			authentication : {
				params: [
							{
								id: "email",
								name : "Correo electrónico",
								description: "Email del usuario con permisos de administrador"
							},
							{
								id: "password",
								name: "Contraseña",
								description: "Contraseña del usuario con permisos de administrador"
							}
				]
			},
			api: {
				addProject: {url: "/rest/api/2/project", method: "POST"},
				getProjects: {url: "/rest/api/2/project", method: "GET", format: function(){}}
			}
		},


{
			id: "trello",
			name: "Trello",
			logo: "http://www.freelogovectors.net/wp-content/uploads/2017/03/trello-logo.png",
			authentication : {
				params: [
					{
						id: "email",
						name : "Correo electrónico",
						description: "Email del usuario con permisos de administrador"
					},
					{
						id: "password",
						name: "Contraseña",
						description: "Contraseña del usuario con permisos de administrador"
					}
				]
			},
			api: {
				addProject: "/redmine/projects.json",
				getProjects: "/redmine/projects.json"
			}
		}

		*/
